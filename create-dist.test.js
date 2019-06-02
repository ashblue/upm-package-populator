const createDist = require('./create-dist');
const del = require('del');
const fs = require('fs');

function writeFiles(files, outputPath, contents) {
    files.forEach(f => {
        fs.writeFileSync(`${outputPath}/${f}`, contents);
    });
}

describe('CreateDist', () => {
    const tmpFolder = 'tmp';
    const source = `${tmpFolder}/source`;
    const dest = `${tmpFolder}/dest`;
    const root = `${tmpFolder}/root`;

    const rootPackage = {
        name: 'lorem ipsum',
    };

    beforeEach(async () => {
        await del([tmpFolder]);

        fs.mkdirSync(tmpFolder);
        fs.mkdirSync(source);
        fs.mkdirSync(dest);
        fs.mkdirSync(root);

        fs.writeFileSync(`${root}/package.json`, JSON.stringify(rootPackage));

        const unityFiles = ['package.json'];
        writeFiles(unityFiles, source, '{}');
    });

    it('should copy files from the Unity package folder to the destination', async () => {
        const files = ['a', 'b'];
        writeFiles(files, source, '{}');

        await createDist(source, root, dest);

        files.forEach(f => {
            expect(fs.existsSync(`${dest}/${f}`)).toBeTruthy();
        });
    });

    it('should copy properties from the NPM package.json to the destination', async () => {
        await createDist(source, root, dest);
        const newPackage = JSON.parse(fs.readFileSync(`${dest}/package.json`));

        expect(newPackage.name).toEqual(rootPackage.name);
    });

    it('should copy expected files from the NPM package folder', async () => {
        const npmFiles = [
            'README.md',
            'CHANGELOG.md',
            'LICENSE.md',
        ];
        writeFiles(npmFiles, root, 'Lorem Ipsum');

        await createDist(source, root, dest);

        npmFiles.forEach(f => {
            expect(fs.existsSync(`${dest}/${f}`)).toBeTruthy();
        });
    });

    it('should dump a zip file in the root', async () => {
        await createDist(source, root, dest);

        expect(fs.existsSync(`${dest}.zip`)).toBeTruthy();
    });
});
