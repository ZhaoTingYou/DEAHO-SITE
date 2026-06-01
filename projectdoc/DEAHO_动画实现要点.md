# DEAHO 复杂动画 · 实现要点(给 Codex)

> **这份文件是什么。** 讲清楚几个"招牌动画"怎么用 Lenis / Framer Motion 的 `useScroll`、
> `useTransform`、`position:sticky`、SVG `pathLength` 搭起来——**只讲思路、结构、要映射的值和坑,
> 不提供成品代码**(代码由你/Codex 写)。配合《DEAHO_设计书.md》第 2 节(每页招牌动作)与第 4 节
> (移动端)一起看。
>
> 命名约定:下文出现的 `scrollYProgress`、`pathLength`、`whileInView` 等是 Framer Motion 的现成 API,
> 直接用即可。所有"把 A 映射到 B"都指 `useTransform(来源值, [输入区间], [输出区间])`。

---

## 1. 全局动画基建(先搭好这层,其余都依赖它)

**库分工**
- **Lenis** = 平滑惯性滚动(只桌面;触屏建议关,见第 6 节)。
- **Framer Motion** = 声明式入场(`whileInView`)+ 滚动驱动(`useScroll`/`useTransform`/`useSpring`)。
- 不必再单独引 IntersectionObserver——`whileInView` 内部已用它。

**Lenis 与 Framer 的同步(关键坑)**
- Lenis 接管了滚动后,Framer 的 `useScroll` 默认读"原生 scroll",可能与 Lenis 的位移不同步、出现抖动。
- 做法:在 Lenis 的每帧回调里,用 `requestAnimationFrame` 驱动 Lenis 的 `raf`;并把 Lenis 的滚动接到 Framer——
  最稳的是让 Framer 的 `useScroll` 监听**真实滚动容器**(Lenis 用原生滚动条模式 `wrapper=window` 时,`useScroll`
  能读到正确进度)。若仍抖,改为:监听 Lenis 的 `scroll` 事件 → 写入一个 `useMotionValue` → 后续 `useTransform`
  全部基于这个 motionValue,而不是 Framer 自带的 `scrollYProgress`。
- 验证:滚动时 hero 视差与时间轴描线**不掉帧、不回弹**即同步成功。

**reduced-motion 全局开关**
- 建一个 `usePrefersReducedMotion` hook(读 `matchMedia('(prefers-reduced-motion: reduce)')`)。
- 用一个 Context 把它广播下去;为真时:**所有滚动驱动直接给终态值**(描线=满、钉屏=只显第1步或全部展开、视差=0、漂浮/Ken-Burns 关),入场退化为 ≤200ms 瞬时淡入。

**性能铁律**
- 动画只碰 `transform` 和 `opacity`(`filter:blur` 仅用在少量一次性入场,别绑进逐帧滚动)。
- 滚动驱动的连续值用 **motionValue**(`useTransform` 链),**绝不每帧 `setState`**;只有"离散状态变化"(如七步当前序号要显示数字)才允许用 `useMotionValueEvent` 在跨区间时 `setState` 一次。
- `whileInView` 一律加 `viewport={{ once:true, amount:0.2 }}`,避免反复触发。
- `will-change` 只在动画进行时加,结束移除。

---

## 2. 通用积木(全站复用)

- **滚动揭示 reveal:** 父级 `variants` 用 `staggerChildren: 0.08–0.12`;子级 `hidden {opacity:0, y:28}` → `visible {opacity:1, y:0}`,`--ease-expo`,900ms。包成一个 `<Reveal>` 组件全站用。
- **数字 count-up:** 用 `useInView`(once)触发 → `animate(0, 目标值, { duration:2, ease, onUpdate })`,`onUpdate` 把值经 `Intl.NumberFormat`(千分位)写进 ref 的 `textContent`;**不要走 React state**。单位(년/제작/%)落定后延迟 200ms 再淡入。
- **Hover Zoom:** 纯 CSS——外层 `overflow:hidden`,内层 `transition: transform var(--dur-hover) var(--ease)`,`:hover` 时 `scale(1.04)`。无需 JS。
- **亮调层次切换(无深色):** 段落背景只在 `--bg`(象牙)与 `--white`(纯白)之间走。每段自带背景色,靠正常滚动 + **柔和投影渐显**叠出"聚光/退场"层次即可(优先这个,省事且稳);**不做明暗反色、不出现深色背景**。如需更顺,可监听"哪段在视口中央"在 ivory/white 间过渡 600ms。

---

## 3. CHRONICLE 时间轴 · "随滚动自我绘制"(详)

**目标:** 一条竖向轴线随下滑一笔笔画出来;经过的节点点亮;年份对焦显影;条目左右交替滑入。

**DOM 结构(示意,非代码)**
```
<section ref=timelineRef>              ← 定位上下文
  <svg 贴在轴线位置, 高度=内容高度>
     <motion.path 轴线 />               ← 描线主体
     <circle ×N 节点 />                  ← 沿轴的里程碑圆点
  </svg>
  <div 条目列表>
     <TimelineEntry ×N>(年份 + 标题 + FIRST徽章 + 图)
  </div>
</section>
```

**① 描线**
- `useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.2'] })` → 得 `scrollYProgress`(该 section 从"顶部进到视口 80%"算 0、"底部退到 20%"算 1)。
- 给它套 `useSpring`(stiffness ~80, damping ~30)做平滑 → `smoothProgress`。
- `<motion.path>` 的 `style={{ pathLength: smoothProgress }}`。**Framer 会自动把 pathLength 0→1 换算成 `strokeDasharray/offset`**,你**不用手算路径长度**。路径用 `stroke`,`fill:none`,`strokeLinecap:round`。

**② 节点点亮**
- 每个节点在轴上的归一化位置 `t = i /(N-1)`(或按真实年份分布)。
- 圆点 `opacity/scale = useTransform(smoothProgress, [t-0.03, t], [0, 1])`;酒红描边一闪用 `stroke-opacity = useTransform(smoothProgress, [t-0.03, t, t+0.05], [0, 1, 0])`。

**③ 年份对焦显影 + ④ 图显影 + ⑤ 左右交替**(都用 `whileInView`,与描线相互独立)
- 年份:`hidden {opacity:.3, filter:'blur(8px)'}` → `visible {opacity:1, filter:'blur(0)'}`,700ms。(blur 只此处一次性用,别进滚动逐帧。)
- 图:`hidden {filter:'saturate(.6) brightness(.85)'}` → `visible` 正常,1s,"老照片冲洗"感。
- 左侧条目 `hidden {x:-40,opacity:0}`、右侧 `{x:40,opacity:0}` → `visible {x:0,opacity:1}`。
- FIRST 徽章:`hidden {scale:.8}` → `visible {scale:[.8,1.05,1]}` 轻弹。

**坑**
- SVG 高度要等于条目内容总高:让 `<svg>` 用 `height:100%` 铺满 section,`viewBox` 配 `preserveAspectRatio="none"`,path 用百分比/viewBox 坐标。
- 确认 `useScroll` 读的是 Lenis 同步后的滚动(见 §1),否则描线与滚动错位。
- 移动端轴线移到最左、放弃连续描线,见 §6。

---

## 4. SPECIALTY 七步 · "钉屏推进 + 交叉溶解"(详,全站最难的一段)

**目标:** 七步区域吸顶不动,随滚动:左侧步骤号 `01→07` 跳变、中央微距图交叉溶解到下一步、右侧文案错位滑动。

**DOM 结构(示意)**
```
<section ref=stepsRef 高度≈700–800vh>     ← 提供"滚动行程"
  <div sticky 容器 (position:sticky; top:0; height:100vh)>
     <div 左: 大步骤号(01..07)>
     <div 中: 7张微距图绝对叠放>
     <div 右: 7段文案绝对叠放>
  </div>
</section>
```
要点:**section 很高**(给滚动行程),**里面的 sticky 容器只占一屏**并被钉住——下滑时人看着同一屏、内容在变。

**① 总进度**
- `useScroll({ target: stepsRef, offset: ['start start', 'end end'] })` → `scrollYProgress` 0→1 覆盖整个钉屏过程(可再套 `useSpring`)。

**② 不用离散 index,用"钟形"交叉溶解(更顺)**
- 七步中心点 `c_i = i /(N-1)`(i=0..6)。
- 第 i 张图/文案的 `opacity = useTransform(progress, [c_i-0.5/(N-1), c_i, c_i+0.5/(N-1)], [0, 1, 0])` —— 一个三角/钟形:到本步中心最亮,相邻步之间交叉溶解。
- 图可再叠 `scale = useTransform(同区间, [1.0, 1.04, 1.0])` 增强溶解质感;文案叠 `y` 微位移。

**③ 步骤号数字(离散,允许一次 setState)**
- 用 `useMotionValueEvent(progress, 'change', v => { const idx = clamp(round(v*(N-1)),0,6); if(idx!==cur) setCur(idx) })`——只在跨步时更新一次,低频,安全。号码本身可做切换淡入。

**④ 行程数学**
- 7 步,每步约 80–100vh 行程 → section 高约 **700–800vh**;首尾各留 ~0.5 步缓冲,起步和收尾不突兀。

**坑**
- sticky 容器必须是高 section 的**直接子级**,且祖先没有 `overflow:hidden/auto`(会废掉 sticky)。
- iOS Safari 对"超高 section + sticky"基本 OK 但**务必真机测**;**移动端建议整段不钉屏**,见 §6。
- reduced-motion:直接平铺七步或只显第一步。

**横向替代方案(二选一)**
- 把中区换成一条横向 track:`x = useTransform(progress, [0,1], ['0%','-600%'])`,7 屏横移。观感更"Porsche",但移动端更难,默认仍用上面的纵向钟形溶解。

---

## 5. 其他招牌(简要实现思路)

- **HOME hero 逐词上浮:** 标题按词拆成多个 `span`;父 `variants` `staggerChildren:0.12`,子 `hidden {y:40,opacity:0}`→`visible`,`--ease-expo`。hero 图 `initial scale:1.06`→`animate scale:1.0` 1600ms。
- **漂浮 float:** 纯 CSS `@keyframes` `translateY:±6px`,6s `ease-in-out infinite alternate`(最省)。或 FM `animate={{y:[-6,6]}}` `repeat:Infinity, repeatType:'mirror'`。多个元素**相位错开**(不同 `animation-delay`)。
- **视差 parallax:** 元素 `y = useTransform(页面或局部 scrollYProgress, [0,1], [0, -距离])`;hero 图比背景慢 ~20%。
- **LEGACY 光扫文字:** 每行 `clip-path` 从 `inset(0 100% 0 0)`→`inset(0 0 0 0)`,1s,逐行 `delay +0.6s`;可叠一条 `::after` 高光条沿行 `translateX` 扫过。reduced/移动端 → 逐行淡入+位移。
- **GOLF 配置器(state 驱动,不涉及滚动):** `selectedHead` state;中区叠多张 hero 图,选中项 `opacity:1` 其余 `0`,切换 400ms 交叉溶解;选项卡当前态加细边框 + 轻微下沉。颜色卡同理(可选增强,先做 hover 放大)。
- **NEWS COMING SOON 微光:** 标签上一条 `::after` 线性高光,`@keyframes` `translateX(-120%→120%)` 2.5s infinite;featured 图静态光边。
- **Ken-Burns(GOLF 实物/生活方式):** CSS `@keyframes` `scale 1→1.06` + 微平移,10s alternate;**仅桌面**。

---

## 6. 移动端降级(逐个,务必照做)

> 总则:触屏**禁用 Lenis**(用系统原生滚动,更跟手更省电);**关闭视差 / Ken-Burns / 漂浮**;`prefers-reduced-motion` 时所有滚动驱动直接给终态。

- **CHRONICLE 时间轴 → 放弃连续描线。** 轴线移到最左单列;改为**节点逐个 `whileInView` 点亮 + 轴线分段填充**(每过一个节点,该段轴线用 CSS 过渡填色)。避免在原生滚动上跑逐帧 `pathLength` 的开销与抖动。
- **SPECIALTY 七步 → 放弃钉屏。** 改为**七张全幅卡片正常流堆叠**:每张 = 大步骤号 `01..07`(静态)+ 微距图 + 文案,`whileInView` 揭示(图 `scale 1.04→1.0` + 文案上浮)。彻底绕开移动端 sticky+超高 section 的卡顿与 iOS 抖动。
- **LEGACY 光扫文字 →** 退化为逐行淡入 + 轻微位移。
- **GOLF 配置器 →** hero 交叉溶解切换**保留**(state 驱动,便宜);杆头/颜色选项改**横向 snap carousel**(每项约 70% 宽,露出下一项暗示可滑)。
- **HOME 逐词 hero →** 保留但缩短(stagger 0.08、位移 24px);hero 改竖向满屏图。
- **视差 / 漂浮 / Ken-Burns →** 一律关闭;count-up、reveal、hover→点击态 保留(reveal 缩短为 600ms、错峰 60ms)。

---

## 7. 自测验收
- 桌面:Lenis 平滑滚动下,时间轴描线、七步溶解、视差**不掉帧、不回弹**(同步 OK)。
- 七步钉屏:首尾不突兀,跨步号码只在跨界变一次,无频繁 re-render(React DevTools Profiler 确认)。
- 移动端真机(iOS Safari + 低端安卓):七步=堆叠卡片、时间轴=分段点亮、无 sticky 抖动,滚动 ~60fps。
- 开 `prefers-reduced-motion`:全部退化为静态/瞬时,信息无缺失。
- 所有动画只用 transform/opacity;无 hover-only 的关键交互(触屏可达)。
