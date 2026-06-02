export default function Loading() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-container text-primary">
      <div className="space-y-5 text-center">
        <p className="font-heading text-[42px] font-semibold tracking-[0.18em]">DAEHO</p>
        <div className="mx-auto h-px w-32 overflow-hidden bg-hairline">
          <div className="h-full w-16 animate-[news-rule-draw_1.2s_ease-in-out_infinite] bg-accent" />
        </div>
      </div>
    </main>
  );
}
