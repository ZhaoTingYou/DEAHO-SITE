import {existsSync} from 'node:fs';
import path from 'node:path';

import Image from 'next/image';

import {PlaceholderImg} from './placeholder-img';

type SafeImageProps = {
  filename: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
};

export function SafeImage({
  filename,
  alt,
  aspect = 'aspect-[4/3]',
  priority = false
}: SafeImageProps) {
  const imagePath = path.join(process.cwd(), 'public', 'images', filename);

  if (!existsSync(imagePath)) {
    return <PlaceholderImg filename={filename} aspect={aspect} />;
  }

  return (
    <div className={`${aspect} relative w-full overflow-hidden bg-white shadow-[0_24px_80px_rgba(16,29,48,0.08)]`}>
      <Image
        src={`/images/${filename}`}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 520px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
