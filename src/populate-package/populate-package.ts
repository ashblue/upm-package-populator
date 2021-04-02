import { overwriteJsonFileFields, overwriteFile } from '../file-utility/file-utility';

class PopulatePackage {
  private readonly _replaceFiles = [
    'README.md',
    'CHANGELOG.md',
    'LICENSE.md',
  ];

  private readonly _copyFields = [
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

  constructor(
    private _srcFolder: string,
    private _destFolder: string,
  ) {
  }

  public writeFiles(): void {
    this.overwriteFiles();

    const packageSrc = `${this._srcFolder}/package.json`;
    const destSrc = `${this._destFolder}/package.json`;
    overwriteJsonFileFields(packageSrc, destSrc, this._copyFields);
  }

  private overwriteFiles() {
    this._replaceFiles.forEach((f) => {
      const source = `${this._srcFolder}/${f}`;
      const target = `${this._destFolder}/${f}`;
      overwriteFile(source, target);
    });
  }
}

export default PopulatePackage;
