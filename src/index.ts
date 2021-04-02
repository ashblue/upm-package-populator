import PopulatePackage from './populate-package/populate-package';
/* istanbul ignore file */

// eslint-disable-next-line import/prefer-default-export
export const populatePackage = (srcFolder: string, targetFolder: string): void => {
  const populator = new PopulatePackage(srcFolder, targetFolder);
  populator.writeFiles();
  console.log(`Files from ${srcFolder} successfully overwrote files at ${targetFolder}`);
};
