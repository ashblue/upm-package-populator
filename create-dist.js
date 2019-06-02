const del = require('del');
const copyDir = require('copy-dir');
const fs = require('fs');
const {zip} = require('zip-a-folder');

const COPY_FILES = [
    'README.md',
    'CHANGELOG.md',
    'LICENSE.md',
];

async function init(unityPackageFolderPath, npmPackageFolderPath, outputFolderPath) {
    await del([outputFolderPath]);

    copyDir.sync(unityPackageFolderPath, outputFolderPath, {});
    crossPopulatePackages(unityPackageFolderPath, npmPackageFolderPath);
    fs.copyFileSync(`${unityPackageFolderPath}/package.json`, `${outputFolderPath}/package.json`);
    copyFiles(npmPackageFolderPath, outputFolderPath);
    await zip(outputFolderPath, `${outputFolderPath}.zip`);

    console.log(`Copied files from ${unityPackageFolderPath} to ${outputFolderPath}`);
}

function copyFiles(root, dest) {
    COPY_FILES.forEach((file) => {
        const path = `${root}/${file}`;
        const output = `${dest}/${file}`;
        if (!fs.existsSync(path)) return;
        if (fs.existsSync(output)) fs.unlinkSync(output);
        fs.copyFileSync(path, output);
    });
}

function crossPopulatePackages(source, root) {
    copyJsonFields(`${root}/package.json`, `${source}/package.json`, [
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
    ]);
}

function copyJsonFields(sourcePath, destPath, fields) {
    const source = JSON.parse(fs.readFileSync(sourcePath).toString());
    const dest = JSON.parse(fs.readFileSync(destPath).toString());

    fields.forEach((field) => {
        if (!source[field]) return;
        dest[field] = source[field];
    });

    fs.writeFileSync(destPath, JSON.stringify(dest, null, 2));
}

module.exports = init;
