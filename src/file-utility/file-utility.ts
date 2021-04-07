import fs, { existsSync } from 'fs';

export const overwriteFile = (fileSrcPath: string, fileTargetPath: string): void => {
  if (!existsSync(fileSrcPath)) return;
  const content = fs.readFileSync(fileSrcPath);
  fs.writeFileSync(fileTargetPath, content);
};

export const overwriteJsonFileFields = (
  fileSrcPath: string,
  fileTargetPath: string,
  copyFields: string[],
): void => {
  const srcContent = fs.readFileSync(fileSrcPath).toString();
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const srcJson: { [key: string]: any } = JSON.parse(srcContent);

  const targetContent = fs.readFileSync(fileTargetPath).toString();
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const targetJson: { [key: string]: any } = JSON.parse(targetContent);

  copyFields.forEach((field) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    targetJson[field] = srcJson[field];
  });

  fs.writeFileSync(fileTargetPath, JSON.stringify(targetJson, null, 2));
};
