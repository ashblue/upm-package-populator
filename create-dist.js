const del = require('del');
const copyDir = require('copy-dir');
const fs = require('fs');
const {zip} = require('zip-a-folder');

const COPY_FILES = [
    'README.md',
    'CHANGELOG.md',
    'LICENSE.md',
];

async function init(source, dest) {
    await del([dest]);

    copyDir.sync(source, dest, {});
    crossPopulatePackages(source);
    fs.copyFileSync(`${source}/package.json`, `${dest}/package.json`);
    copyFiles(dest);
    await zip(dest, `${dest}.zip`);

    console.log(`Copied files from ${source} to ${dest}`);
}

function copyFiles(dest) {
    COPY_FILES.forEach((file) => {
        const output = `${dest}/${file}`;
        if (!fs.existsSync(file)) return;
        if (fs.existsSync(output)) fs.unlinkSync(output);
        fs.copyFileSync(file, output);
    });
}

function crossPopulatePackages(source) {
    copyJsonFields('package.json', `${source}/package.json`, [
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
