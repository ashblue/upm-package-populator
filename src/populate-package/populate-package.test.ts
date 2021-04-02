import * as fileUtility from '../file-utility/file-utility';
import PopulatePackage from './populate-package';

describe('populatePackage function', () => {
  const tmpFolder = 'tmp';
  const srcFolder = `${tmpFolder}/source`;
  const destFolder = `${tmpFolder}/dest`;

  const setup = () => {
    const populatePackage = new PopulatePackage(srcFolder, destFolder);

    jest.spyOn(fileUtility, 'overwriteFile').mockImplementation();
    jest.spyOn(fileUtility, 'overwriteJsonFileFields').mockImplementation();

    return {
      populatePackage,
    };
  };

  it('should call fileUtility.overwriteFile for the markdown files', () => {
    const targetFiles = [
      'README.md',
      'CHANGELOG.md',
      'LICENSE.md',
    ];

    const { populatePackage } = setup();
    populatePackage.writeFiles();

    targetFiles.forEach((file) => {
      const source = `${srcFolder}/${file}`;
      const target = `${destFolder}/${file}`;
      expect(fileUtility.overwriteFile).toHaveBeenCalledWith(source, target);
    });
  });

  it('should call fileUtility.overwriteJsonFileFields with the package.json fields', () => {
    const fileSrcPath = `${srcFolder}/package.json`;
    const fileTargetPath = `${destFolder}/package.json`;
    const copyFields = [
      'name',
      'displayName',
      'description',
      'version',
      'unity',
      'repository',
      'license',
      'bugs',
      'homepage',
      'keywords',
      'author',
    ];

    const { populatePackage } = setup();
    populatePackage.writeFiles();

    expect(fileUtility.overwriteJsonFileFields)
      .toHaveBeenCalledWith(fileSrcPath, fileTargetPath, copyFields);
  });
});
