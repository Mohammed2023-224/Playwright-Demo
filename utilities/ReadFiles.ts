import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

export  function loadAllFilesWithCertainExtensionFromDir(dirPath: string, extension: string) {
const envFiles = fs.readdirSync(dirPath)
    .filter(file => file.includes(`.${extension}`));
  
  for (const envFile of envFiles) {
    const envPath = path.join(dirPath, envFile);
    console.log(`Loading env file: ${envFile}`);
    dotenv.config({ path: envPath });
  }
}