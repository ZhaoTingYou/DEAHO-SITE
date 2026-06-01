type PlaceholderImgProps = {
  filename: string;
  aspect?: string;
};

export function PlaceholderImg({filename, aspect = 'aspect-[4/3]'}: PlaceholderImgProps) {
  return (
    <div
      className={`${aspect} flex w-full items-center justify-center border border-hairline bg-white p-6 text-center font-body text-sm font-medium tracking-[0.12em] text-subtext shadow-[0_24px_80px_rgba(16,29,48,0.08)]`}
      role="img"
      aria-label={filename}
    >
      {filename}
    </div>
  );
}
