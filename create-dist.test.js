const createDist = require('./create-dist');
const del = require('del');
const fs = require('fs');

describe('CreateDist', () => {
    it('should copy files from the source to the destination', async () => {
        const tmpFolder = 'tmp';
        await del([tmpFolder]);
        const source = `${tmpFolder}/source`;
        const dest = `${tmpFolder}/dest`;

        fs.mkdirSync(tmpFolder);
        fs.mkdirSync(source);
        fs.mkdirSync(dest);

        const files = ['a', 'b', 'package.json'];
        files.forEach(f => {
            fs.writeFileSync(`${source}/${f}`, '{}');
        });

        await createDist(source, dest);

        files.forEach(f => {
            expect(fs.existsSync(`${dest}/${f}`)).toBeTruthy();
        });
    });
});
