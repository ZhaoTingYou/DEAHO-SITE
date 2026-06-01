# DEAHO 网站设计书 · 视觉 + 动画(亮调版)

> **这份文件是什么。** DEAHO 品牌官网的完整设计书:设计系统 + 每一页的设计概念、视觉设计、动画编排。
> 配套文件 `DEAHO_生图Prompt.md`(生图)、`DEAHO_动画实现要点.md`(给 Codex 的复杂动画做法)。三份图片文件名互相对应。
>
> **基调一句话:明亮的世家(bright quiet luxury)。以暖象牙白为绝对主调,通透、克制、留白大;靠光与材质取胜,不用黑色。**
> 色彩/字体唯一标准 = 你的基调表(5 色 + 4 字体)。`GOLF.png` 只作**版式/构图**参考,其黑底**不采用**,一律改为高调亮场。
> 对标:Omega / Patek Philippe / Cartier / Rolex / Montblanc / Porsche(均有大量明亮页面)。

---

## 0. 品牌叙事主线(整站的骨架)

1. **CHRONICLE** → 我们创造了这个市场
2. **LEGACY** → 所以你可以信赖我们
3. **SPECIALTY** → 所以我们是最好的
4. **NEWS** → 而且现在仍在持续创造
5. **GOLF** → 为高尔夫爱好者打造的独立高级饰品线

设计目标:滑到底只剩一句话——**在韩国做冠军戒指 / 任官戒指,DEAHO 就是原点。**

---

## 1. 设计系统

### 1.1 色彩(亮调铁律)

```css
:root{
  --bg:       #F8F6F2; /* 暖象牙白 · 整站主基调,占比最大 */
  --white:    #FFFFFF; /* 纯白 · 产品"聚光"段,与象牙白形成细腻层次 */
  --primary:  #101D30; /* 深海军蓝 · 当"墨色"用:标题/正文/细线/页脚/极少量小色块 */
  --accent:   #7A2230; /* 酒红 · 仅点睛 */
  --text:     #1A1A1A; /* 近黑正文(纯文字,绝不当背景) */
  --subtext:  #666666; /* 次级文字 / 说明 */
  --hairline: rgba(16,29,48,.14); /* 海军蓝细分隔线 */
  --on-navy:  #F8F6F2; /* 万一用到海军蓝小色块/页脚时的文字色 */
}
```

**铁律**
- 整站**亮调为主**:默认底 `--bg`(暖象牙白),产品聚光段用 `--white`。**不使用黑色 / 近黑背景。**
- 层次来自 **象牙白 ↔ 纯白 的细腻切换 + 柔和长投影 + 大图**,**不靠明暗反色**。
- 海军蓝 `--primary` 主要当"**墨色**":大标题、正文、细线、页脚。**不大面积铺作背景。** 若全站需要一处"重锚"(通常仅页脚,或某一句收束),可用**小面积**海军蓝块、文字反白 `--on-navy`——但要少而精,整站仍是亮调。
- 酒红是手术刀:当前态下划线、单个强调词、COMING SOON、细分隔。**绝不大面积。**
- 文字优先用 `--text`/`--primary`;次要信息 `--subtext`(小字 ≥14px)。

### 1.2 字体(双语策略 · 与你的基调表一致)

| 角色 | 字体 | 来源 |
|---|---|---|
| 英文展示标题 | **Cormorant Garamond** 700 | Google Fonts |
| 英文正文 / UI / 数字 | **Inter** | Google Fonts |
| 韩文标题 | **MaruBuri** SemiBold | Naver 官方 webfont |
| 韩文正文 / 数字 | **Pretendard** | jsDelivr |

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css">
```
```css
@font-face{font-family:'MaruBuri';font-weight:600;font-display:swap;
  src:url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.woff2') format('woff2');}
@font-face{font-family:'MaruBuri';font-weight:400;font-display:swap;
  src:url('https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2') format('woff2');}
```

**按语言切换:** `locale=ko` → 标题 MaruBuri、正文 Pretendard;`locale=en` → 标题 Cormorant Garamond、正文 Inter。用 `body.locale-ko/.locale-en` 切换字体变量。数字恒用 Inter(英)/ Pretendard(韩)SemiBold。

**字号阶梯(与基调表对齐,`clamp()` 流体)**

| token | 用途 | 规格 |
|---|---|---|
| `hero` | 英文 Hero 大字 | Cormorant 700,`clamp(56px,8vw,100px)`(基调表 80–100px),行高1.0,字距 −0.01em |
| `h1` | 韩文段落标题 | MaruBuri SemiBold,`clamp(34px,4.5vw,52px)`(基调表 44–52px) |
| `eyebrow` | 小标签 | Inter Medium,12–13px,大写,字距 0.22em,`--subtext` |
| `nav` | 菜单 | Inter Medium,15–16px,大写,字距 0.12em |
| `body` | 正文 | Regular,18–20px,行高 1.7 |
| `stat` | 大数字 | SemiBold,`clamp(44px,6vw,88px)`,海军蓝 |

### 1.3 间距与栅格
- 容器最大宽 1440px,内边距 24→48→80px。段落竖向节奏 `clamp(96px,12vw,180px)`(手机 64–80px)。**留白是亮调奢华的灵魂,绝不挤。**
- 12 栏栅格,24px 间隔;多处刻意破栅格(不对称、叠压)。
- 断点:手机 <768、平板 768–1024、桌面 >1024、宽屏 >1440。
- hero 满幅(100vw),产品格在容器内。尺寸/留白参照 Omega / Montblanc / Porsche。

### 1.4 全局动效语言

```css
:root{
  --ease:        cubic-bezier(.22,.61,.36,1);
  --ease-expo:   cubic-bezier(.16,1,.3,1);
  --dur-hover:   600ms;
  --dur-reveal:  900ms;
  --dur-hero:    1200ms;
}
```

四个**全站统一动作**:
1. **Hover Zoom(品牌招牌交互,源自你的基调表)。** 图片/卡片外层 `overflow:hidden`,hover 时内层图 `scale(1.04)`,`--dur-hover` `--ease`。文字链:酒红下划线从左到右扫入。
2. **滚动揭示。** 元素从 `translateY(28px)`+`opacity:0` 落定到 `0/1`,`--dur-reveal` `--ease-expo`,进入视口约 15% 触发;同组子元素错峰 80–120ms。
3. **亮调层次切换。** 段落间在 `--bg`(象牙)与 `--white`(纯白)之间细微切换,配合**柔和投影渐显**做出"聚光 / 退场"层次——**不做明暗反色,不出现深色背景**。
4. **入场编排。** 每页只做一次有编排的入场(见各页"招牌动作"),其余靠滚动揭示。**绝不满屏碎动效。**
- **`prefers-reduced-motion`:** 关闭漂浮 / 视差 / zoom,只保留瞬时淡入。
- 实现提示:平滑滚动 Lenis;揭示 Framer `whileInView`;滚动驱动 `useScroll/useTransform`;count-up 轻量 hook;SVG 描线 `pathLength`+滚动进度。详见《动画实现要点》。

---

# 1.5 对标网站手法对照表

| 对标 | 它最擅长的手法 | DEAHO 借到哪页 · 怎么用 |
|---|---|---|
| **Omega**(韩文站) | 干净大图陈列、克制留白、"产品网格+传承数字"、**韩英双语排版范本** | HOME 网格/数字/留白尺度;整站双语排版基准 |
| **Montblanc** | Maison 工艺叙事、强排版、品类落地页编辑感 | SPECIALTY 工艺叙事;CHRONICLE 编辑式条目 |
| **Porsche** | 滚动驱动叙事、sticky/钉屏、视差、**配置器** | SPECIALTY 七步钉屏;GOLF 配置器;HOME 四篇章转场 |
| **Rolex** | 极致克制、超大图、**极慢优雅揭示**、成就/荣誉叙事 | LEGACY 克制与荣誉框架;整站"慢"的速度基准 |
| **Patek Philippe** | 传承/永恒的情感叙事、动人文案 | CHRONICLE 传承基调;LEGACY 永恒哲学文案 |
| **Cartier** | 沉浸式产品页、**珠宝微距**、优雅画廊/lightbox | SPECIALTY collection 画廊+微距;NEWS 编辑质感 |

> 反查:HOME←Omega+Porsche · CHRONICLE←Patek+Montblanc · LEGACY←Rolex+Patek · SPECIALTY←Porsche+Montblanc+Cartier · NEWS←Cartier+Omega · GOLF←Porsche+Cartier。
> 一句话:**Omega 给秩序、Porsche 给运动、Rolex 给克制、Patek 给情感、Montblanc 给工艺、Cartier 给珠宝质感**,全部收敛到"明亮的世家"这一个调子下。

---

# 2. 逐页设计

> 每页:**设计概念 → 视觉设计(逐段)→ 动画设计(入场/滚动/Hover/招牌动作)。** 所有背景只在象牙白/纯白间走,无深色场。

---

## 2.1 HOME · 首页

> **设计概念:《晨光 / First Light》。** 在明亮通透的展厅光里,一枚戒指被柔光托起——一口气讲完品牌论证,再送进四大篇章。

### 视觉设计
- **S1 Hero(象牙白满幅,高调)。** 一枚旗舰冠军戒指在明亮空间被柔光托起,下方一道柔和长投影;eyebrow `KOREA'S CHAMPIONSHIP RING AUTHORITY`,大字 `38 YEARS OF CHAMPIONS`(海军蓝),韩文副标 `승리의 순간을, 영원의 형태로.`。图 `home_hero.png`。
- **S2 代表作(纯白聚光段)。** eyebrow `SIGNATURE WORKS` / `대표작`;3–5 枚戒指横向陈列(`home_ring_01..05`,1:1),每卡一行韩文说明,点进 → `/specialty/collection`。
- **S3 数字(象牙白)。** 三组**海军蓝大数字**:`1988 설립` · `38 년의 업력` · `200,000+ 제작된 반지`;底可叠极淡暖金属光纹理 `home_stats_bg.png`(低不透明度,仍保持亮)。
- **S4 四大篇章(纯白/象牙交替)。** 四张大编辑卡(亮图 + 标题,标题用海军蓝压在图较亮处或图下):
  CHRONICLE `우리가 시장을 만들었다` · LEGACY `그래서 신뢰할 수 있다` · SPECIALTY `그래서 우리가 최고다` · NEWS `그리고 지금도 만들고 있다`(`home_pillar_*`,3:4)。
- **S5 GOLF 预告(纯白满幅,高调)。** 大字 `FORM OF THE GAME` + `골프의 구조를 하나의 오브젝트로.`,复用 `golf_hero.png`,CTA → `/golf`。

### 动画设计
- **入场(招牌动作):** 导航淡降(400ms)→ hero 大字**逐词上浮**(每词 `translateY(40→0)+opacity`,错峰 120ms,`--ease-expo`)→ hero 戒指图 `scale(1.06→1.0)` 1600ms,并进入**极缓漂浮**(±6px,6s,yoyo),**投影随之轻微伸缩**强化"被柔光托起";底部下滑提示呼吸。
- **滚动:** S3 数字 count-up(2s,千分位);S4 四卡错峰揭示;象牙↔纯白细微切换。
- **Hover:** 代表作/篇章卡 zoom 1.04,投影同时略加深(更"浮起")。
- **轻视差:** hero 戒指随滚动比背景略慢上移。

---

## 2.2 CHRONICLE · 沿革

> **设计概念:《时间的刻度 / Engraved Timeline》。** 像一份被刻进金属的明亮档案——一条细线时间轴随滚动绘出,里程碑像在亮光中逐一浮现。强调 "FIRST"。

### 视觉设计
- **S1 Hero(象牙白,高调档案)。** eyebrow `EST. 1988`,大字 `THE CHRONICLE` / `역사의 기록물`,副标 `대호의 역사가 곧 한국 우승·임관 반지의 역사입니다.`,图 `chronicle_hero.png`(明亮陈列+前景戒指)。
- **S2 时间轴(象牙白)。** 一条**海军蓝细竖线**为轴(桌面居左偏中),年份用 `stat` 海军蓝刻度;条目桌面左右交替、手机堆叠。6–8 个占位里程碑,"国内首个/首次引入/专利"挂 **FIRST 徽章(酒红)**。图 `chronicle_milestone_01..06`(3:2)。
- **S3 收束句(纯白)。** 居中海军蓝大字 `이 시장은, 우리가 만들었습니다.` / `This market — we built it.` → CTA 去 LEGACY。

### 动画设计
- **招牌动作 —— 时间轴"自我绘制":** 海军蓝竖线是 SVG,`pathLength` 绑滚动进度**随下滑一笔笔画下来**;经过节点时小圆点点亮(scale 0→1 + 酒红描边一闪)。
- **年份浮现:** 进入时从 `opacity:.3 + translateY(12px)` 落定(700ms,`--ease-expo`)。
- **里程碑亮起:** 图初始略降亮度/饱和(轻微),进入后 800ms 恢复——"在亮光中显现"。
- **左右交替进场:** 左条目从 `−40px`、右条目从 `+40px` 滑入 + 淡入。
- **FIRST 徽章:** 进入时轻弹(scale 0.8→1.05→1)。

---

## 2.3 LEGACY · 传承(含 loyalty / credibility / achievement)

> **设计概念:《光的证词 / Testimony in Light》。** 信赖靠**通透的光与冷静的数字**。整页明亮、克制、留白极大;光是弥漫的自然光,不是黑暗中的单束光。

### 视觉设计(index `/legacy`)
- **S1 哲学 Hero(纯白,高调极静)。** 大字 `THE MEANING, IN FORM`(海军蓝);两句哲学**逐行揭示**:
  `우리는 금속을 만들지 않습니다. 순간을 영원으로 만듭니다.` / `승리의 의미를 형태로 남깁니다.`;图 `legacy_hero.png`(戒指沐浴通透自然光)。
- **S2 三支柱(象牙白)。** 三张 `MediaText` 卡 → 子页:LOYALTY `신의` · CREDIBILITY `신뢰` · ACHIEVEMENT `성취`(`legacy_card_*`,4:5)。

**子页 `/legacy/loyalty`** — 长期关系与客户维持。Hero `legacy_loyalty_hero`;数字 유지 고객 비율 `00%`、재의뢰 `00+`。
**子页 `/legacy/credibility`** — 信赖数字 `38 / 200,000+ / 00 협업 / 00%`(海军蓝)+ **合作墙**(浅色占位砖 `legacy_partner_placeholder`,真 logo 后补)。
**子页 `/legacy/achievement`** — 认可/获奖/话题项目;`legacy_achievement_01..04`(3:2)。

### 动画设计
- **招牌动作 —— 光扫文字:** 哲学句用 `clip-path` 从左到右揭示,像一束**柔光缓缓扫过把字"照亮"**(每句 1s,句间 600ms);可叠一条极淡高光沿字滑过。亮场上同样成立,只是更轻柔。
- **数字判决:** count-up(2s),单位落定后延迟 200ms 淡入,"盖章"感。
- **合作墙:** 浅色占位砖棋盘式错峰淡入,整齐如阵列 = 可信。
- 整页滚动偏慢、留白最大,强化"庄重通透"。

---

## 2.4 SPECIALTY · 专长(含 technique / collection)—— 全站最重头

> **设计概念:《工坊的解剖 / Anatomy of Craft》。** "아무나 만들 수 있는 제품이 아니다。" 让用户一路向下=走完一遍制作流程;靠**白底聚光的极致微距**把"不可能量产"砸进心里(用强光与浅景深做戏剧感,而非暗场)。

### 视觉设计(index `/specialty`)
- **S1 Hero(纯白聚光)。** 大字 `THE DIFFERENCE` / `대호는 왜 다른가`,副标 `아무나 만들 수 있는 제품이 아닙니다.`,图 `specialty_hero.png`(白底上戒指肩部+刻字极微距,明亮掠光)。
- **S2 两分支(象牙白)。** TECHNIQUE `공정` / COLLECTION `작품`(`specialty_card_*`,4:5)。

**子页 `/specialty/technique`**
- **S1 Hero** `specialty_technique_hero`(明亮工坊,自然窗光透入)。
- **S2 七步流程**(招牌区):01 DESIGN SKETCH · 02 3D MODELING · 03 CASTING · 04 STONE SETTING · 05 POLISHING · 06 PACKAGING · 07 DELIVERY(`specialty_process_1..7_*`,3:2)。**面板在象牙↔纯白间交替**(不再有暗场)。
- **S3 细节强调(纯白聚光)。** 微距三连:内圈刻字 / 雕刻深度 / 镜面抛光(`specialty_detail_01..03`,1:1);文案:人手制作、无法量产。
- **S4 订制能力(象牙白)。** 高品质订制;冠军戒指把球队故事做进作品(`specialty_bespoke`,4:3)。

**子页 `/specialty/collection`**
- Hero `specialty_collection_hero`;画廊 + 筛选(全部/冠军/任官/订制),8–12 枚 `collection_ring_01..12`(1:1),hover zoom,lightbox。

### 动画设计
- **招牌动作 —— 七步"钉屏推进"(scroll-pinning):** 七步区吸顶固定;左侧大步骤号 `01→07` 跳变,中央微距图**交叉溶解**到下一步(+ 轻微 scale),右侧文案错位滑动。白底亮场下,"聚光"靠光与浅景深,不靠变暗。移动端不钉屏(见第 4 节)。
- **细节三连:** 进入时图 `scale(1.1→1.0)` + 极轻旋转(±1.5°)让光在金属上走一下。
- **Collection 画廊:** 错峰揭示;筛选用 FLIP 平滑重排;lightbox 从原位放大(shared layout)。
- 步骤号用 `stat` 巨字(海军蓝半透明)压在图侧,工序感。

---

## 2.5 NEWS · 动态

> **设计概念:《当下的脉搏 / The Current Pulse》。** 全站最轻快、最"杂志感"的一页(也最亮),证明"现在仍在持续创造"。

### 视觉设计
- **S1 Hero(纯白,通透明快)。** 大字 `NEWS` / `지금, 대호`,图 `news_hero`。
- **S2 Featured / Coming Soon(象牙白)。** 一张大 `MediaText`,eyebrow `COMING SOON`(酒红);图 `news_featured` 用**象牙白半透柔雾**蒙一层(高调地"半隐"),不是暗场。
- **S3 新闻格。** 编辑式网格卡:缩略图 + 分类标签 + 韩文标题 + 日期,6 张 `news_card_01..06`(3:2)。分类:최근 제작 사례 · 프로젝트 스토리 · 언론/피처 · 협업 · 우승반지/귀금속 지식。

### 动画设计
- **招牌动作 —— COMING SOON 微光:** 标签上一道细高光周期性扫过(2.5s);featured 的象牙柔雾在 hover 时**轻微淡开**露出更多内容(亮场版"揭幕")。
- **新闻格:** 卡片错峰揭示;hover **抬升 + zoom**(`translateY(-6px)` + 图 1.04 + 投影加深),比其他页略跳。
- **分类筛选:** chips FLIP 重排;当前 chip 酒红下划线。
- 元信息比标题晚 150ms 淡入。

---

## 2.6 GOLF · 高尔夫饰品线(独立页,版式还原 `GOLF.png`,但改高调亮场)

> **设计概念:《游戏的形态 / Form of the Game》。** 把高尔夫"结构"重解为可订制的高级饰品(球杆造型手镯)。带一点"配置器"的玩味,亮调通透,**不用黑底**。

### 视觉设计(逐段)
- **S1 Hero(纯白满幅,高调)。** eyebrow `PREMIUM CUSTOMIZED GOLF BRACELET`;两支玫瑰金球杆造型手镯在明亮光里悬浮、下方柔和长投影(`golf_hero.png`)。
- **S2 宣言(象牙白)。** 左侧三行大字 `FORM / OF THE / GAME`(海军蓝)+ `골프의 구조를 하나의 오브젝트로 재해석하다.`;另一支手镯 `golf_hero_2.png` 从右边缘叠压入画。
- **S3 选择杆头(纯白)。** 居中 `자신의 시그니처 골프채로` / `클럽 헤드 형태를 원하는 골프채로 선택`;四个白底产品砖:球+T座 / 铁杆 / 推杆 / 木杆(`golf_head_ball/iron/putter/wood`,1:1),可点选。
- **S4 杆身颜色(纯白)。** eyebrow `SHAFT COLOR`;四色卡 BLACK / WHITE / BURGUNDY / NAVY(指**手镯握把颜色**,非背景;`golf_shaft_*`,4:5)+ caption。
- **S5 刻字订制(明亮浅色,不对称叠图)。** 左侧细线+小标签画规格示意(非图片),`이름·날짜·기록을 새깁니다`;右侧两张明亮混凝土质感图叠压:`golf_engrave_studio`(3:4)+ 刻字特写 `golf_engrave_detail`(3:2,刻字后期 P 上去)。
- **S6 实物 & 生活方式(象牙白/纯白,柔和暖光)。** `golf_box`(4:3,浅色/米色皮盒中的手镯,柔和暖光)+ `golf_lifestyle`(4:5,明亮日光下手腕佩戴、海军蓝针织袖口),右侧细线+收束句 `당신의 라운드를 영원히`。

### 动画设计
- **招牌动作 —— 像"配置器":** S3 点选不同杆头时,S1/S2 的 hero 手镯图**交叉溶解切换**;所选项白底砖出现细边框 + 轻微下沉的当前态。S4 颜色卡可切换手镯握把配色(可选增强,先做 hover 放大)。
- **Hero 漂浮 + 投影:** 两支手镯极缓漂浮(±8px,7s,相位错开),**柔和长投影随之伸缩**,亮场下显轻盈;轻视差。
- **宣言叠压图:** `golf_hero_2` 随滚动从右缓推入。
- **杆头/色卡:** 进入错峰揭示;hover zoom 1.04;白底区用更"干脆"的缓动(`--ease`,稍短 450ms)。
- **刻字区:** 左侧示意细线逐条画出;右侧两图分别从上/下滑入叠压。
- **实物/生活方式:** 亮调图做极缓 Ken-Burns(缓慢推近+微平移,10s),收束句最后淡入。(去掉原暗场设定。)

---

# 3. 通用与交付

### 3.1 无障碍 & 质量基线
- 所有图配双语 `alt`;正文在象牙/纯白上过 WCAG AA;`--subtext` 小字 ≥14px。
- 菜单、语言切换、画廊 lightbox、GOLF 选择器全部可键盘操作。
- 尊重 `prefers-reduced-motion`(关漂浮/视差/zoom,留瞬时淡入)。
- Lighthouse:性能 ≥90、无障碍 ≥95;首屏 hero 图与展示字体 preload;其余懒加载;输出 webp/avif。
- SEO:逐页双语 title/meta + `hreflang` ko/en;OG 图用 `home_hero.png`。

### 3.2 给 Codex 的启动话术(连同本文件 + 《动画实现要点》一起粘贴)
> "按这份《DEAHO 设计书(亮调版)》搭建官网。**整站以暖象牙白 `#F8F6F2` 为主基调,绝不使用黑色/近黑背景**;层次靠象牙白↔纯白切换 + 柔和投影 + 大图;海军蓝 `#101D30` 仅作墨色(标题/正文/细线/页脚),酒红 `#7A2230` 仅点睛。技术栈 Next.js(App Router)+ TypeScript + Tailwind + Framer Motion + Lenis + next-intl(ko 默认 / en)。严格实现第 1 节 token、字体(按 locale 切换)与四个全局动作,以及每页第 2 节视觉与**动画编排**(尤其 SPECIALTY 七步钉屏、CHRONICLE 时间轴描线、LEGACY 光扫文字、GOLF 配置器切换)。文案放 `messages/ko.json`、`messages/en.json`。图片按 `/public/images/` 精确文件名引用,缺图渲染带文件名的占位块。移动端优先、AA 无障碍、遵守 prefers-reduced-motion。**不要新增 token 之外的颜色或字体,不要任何深色/黑色背景。** 交付可运行项目 + README。"

### 3.3 已确认 · OH / VULCAN
导航右上 **OH / VULCAN** = 指向其他官网的**外部链接**,目前**网址为空**。实现:
- 渲染为右侧两个文字标记(Inter Medium 大写,字距同主菜单)。
- 各包 `<a>`,`href` 先留空(`#`),加 `aria-disabled` 并略降透明度(`.7`)表示"暂未开放";hover 不做酒红下划线。
- 集中配置 `config.externalLinks = { oh:'', vulcan:'' }`,日后填网址即启用(非空时 `target="_blank" rel="noopener"`,恢复正常态)。
- 移动端进汉堡抽屉底部"其他站点"分区,留空待填。

### 3.4 待你确认(不影响开工)
1. 真实数字:制作反指数(200,000+?)、合作球团/单位数、客户维持率、CHRONICLE 各里程碑的真实年份与 "FIRST" 事件。
2. GOLF 是否要"咨询/下单"入口(v1 默认无电商)。
3. 运动员采访 / 客户体验板块——v1 先不做。

---

# 4. 移动端设计

> 移动端 = 重新编排的同一套亮调。原则:**单列、收紧、触摸友好、去掉一切靠悬停才成立的交互**。复杂动画的技术降级见《DEAHO_动画实现要点.md》第 6 节。

### 4.1 全局总则
- **断点** ≤767;主校准 375–430px;尊重 `env(safe-area-inset-*)`。
- **栅格** 几乎全单列;产品类 2 列(代表作/collection/合作墙可 2–3 列)。
- **间距** 段落 64–80px;容器内边距 20–24px。
- **字号** `clamp()` 下限:hero ~40–48px、h1 ~28–32px、正文 16–17px、eyebrow 11–12px。
- **触摸交互** 无 hover:zoom 改"进入即轻微放大到位"或**点击放大/lightbox**;链接酒红下划线改点击态;热区 ≥44px。
- **性能** 移动端默认关视差/Ken-Burns/漂浮/重 sticky;**触屏建议禁用 Lenis** 用原生滚动;reveal 缩短(600ms/错峰60ms);只用 transform/opacity;首屏图 `priority`,其余懒加载;遵守 prefers-reduced-motion。

### 4.2 导航(移动端)
- 顶栏:左汉堡 / 中 `DAEHO` 字标 / 右当前语言缩写;透明覆盖 hero,下滑变象牙底+细线。
- 点汉堡 → **全屏象牙白抽屉**滑入(300ms):大号菜单项逐项错峰落入;LEGACY/SPECIALTY 点击就地展开二级。
- 抽屉底部"其他站点":KO/EN 切换 + OH / VULCAN(留空待填,降透明度)。
- 打开抽屉锁背景滚动。

### 4.3 逐页移动端要点
- **HOME** hero 竖向满屏亮图;代表作横向 snap carousel 或 2 列;数字竖排三段 count-up;四篇章单列大卡依次揭示;GOLF 预告满幅。
- **CHRONICLE** 时间轴改左侧单列轴线(不左右交替),描线绑原生滚动;年份为小标题;里程碑图满宽 16:9;FIRST 徽章保留。
- **LEGACY** 哲学句仍逐行但简化为淡入+位移;数字竖排 count-up;合作墙 3 列占位砖;三支柱单列卡。
- **SPECIALTY(关键降级)** 七步**放弃钉屏**→七张全幅卡片依次堆叠(大步骤号+微距图+文案,进入即揭示);细节三连竖向单列;collection 纵向 2 列 + lightbox。
- **NEWS** featured 满幅;新闻格单列卡;分类 chips 横向可滑;COMING SOON 微光保留(轻量)。
- **GOLF** 配置器纵向:hero 在上,杆头/颜色做横向 snap 滑动条(每项 ~70% 宽);点选切换 hero 图(交叉溶解);刻字改上下堆叠;实物/生活方式静态大图 + 收束句淡入。

### 4.4 移动端验收清单
- 无任何依赖 hover 的关键信息/操作;主 CTA 与汉堡在拇指区。
- 横竖屏不破版;长韩文标题不溢出。
- 滑动 carousel 有 snap 且首屏能看出"可滑"。
- 低端机 60fps:确认已关视差/Ken-Burns/钉屏。
