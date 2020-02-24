import * as path from 'path';
import * as fs from 'fs';

export function writeFileSyncRecursive(filename: string, content: string, charset: string): void {
  const folders = filename.split(path.sep).slice(0, -1);
  if (folders.length) {
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath;
    })
  }
  fs.writeFileSync(filename, content, charset);
}
