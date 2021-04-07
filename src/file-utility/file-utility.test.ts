import del from 'del';
import * as fs from 'fs';
import { nanoid } from 'nanoid';
import { overwriteFile, overwriteJsonFileFields } from './file-utility';

describe('fileUtility functions', () => {
  const tmpFolder = 'tmp';

  const setup = async () => {
    await del([tmpFolder]);

    fs.mkdirSync(tmpFolder);
  };

  describe('overwriteFile function', () => {
    it('should overwrite the target with the source', async () => {
      const srcPath = `${tmpFolder}/a.md`;
      const srcContent = nanoid();

      const targetPath = `${tmpFolder}/b.md`;
      const targetContent = nanoid();

      await setup();
      fs.writeFileSync(srcPath, srcContent);
      fs.writeFileSync(targetPath, targetContent);

      overwriteFile(srcPath, targetPath);
      const newTargetContent = fs.readFileSync(targetPath).toString();

      expect(newTargetContent).toEqual(srcContent);
    });

    it('should not crash if the file does not exist', async () => {
      const srcPath = `${tmpFolder}/a.md`;
      const targetPath = `${tmpFolder}/b.md`;

      await setup();

      overwriteFile(srcPath, targetPath);
    });

    it('should write the file if the file destination does not exist', async () => {
      const srcPath = `${tmpFolder}/a.md`;
      const srcContent = nanoid();

      const targetPath = `${tmpFolder}/b.md`;

      await setup();
      fs.writeFileSync(srcPath, srcContent);

      overwriteFile(srcPath, targetPath);
      const newTargetContent = fs.readFileSync(targetPath).toString();

      expect(newTargetContent).toEqual(srcContent);
    });
  });

  describe('overwriteJsonFileFields function', () => {
    it('should replace a json field in the file', async () => {
      const copyFields = ['a'];

      const srcPath = `${tmpFolder}/a.json`;
      const srcContent = JSON.stringify({ a: 'a' });

      const targetPath = `${tmpFolder}/b.json`;
      const targetContent = JSON.stringify({ a: 'b' });

      await setup();
      fs.writeFileSync(srcPath, srcContent);
      fs.writeFileSync(targetPath, targetContent);

      overwriteJsonFileFields(srcPath, targetPath, copyFields);
      const newTargetObj: { a: string } = JSON.parse(fs.readFileSync(targetPath).toString());

      expect(newTargetObj.a).toEqual('a');
    });

    it('should not remove existing fields', async () => {
      const copyFields = ['a'];

      const srcPath = `${tmpFolder}/a.json`;
      const srcContent = JSON.stringify({ a: 'a' });

      const targetPath = `${tmpFolder}/b.json`;
      const targetContent = JSON.stringify({ a: 'b', b: 'c' });

      await setup();
      fs.writeFileSync(srcPath, srcContent);
      fs.writeFileSync(targetPath, targetContent);

      overwriteJsonFileFields(srcPath, targetPath, copyFields);
      const newTargetObj: { b: string } = JSON.parse(fs.readFileSync(targetPath).toString());

      expect(newTargetObj.b).toEqual('c');
    });
  });
});
