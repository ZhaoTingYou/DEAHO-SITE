import {existsSync} from 'node:fs';
import path from 'node:path';

export function imageExists(filename: string) {
  return existsSync(path.join(process.cwd(), 'public', 'images', filename));
}
