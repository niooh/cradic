import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export async function saveFile(filename: string, content: string): Promise<void> {
  const filepath = resolve(process.cwd(), filename);
  await writeFile(filepath, content, 'utf-8');
  console.log(`Saved to ${filepath}`);
}