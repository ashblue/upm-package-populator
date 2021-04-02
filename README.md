# UPM Package Populator

A helper library to cross populate nested Unity package details such as README.md, CHANGELOG.md, package.json, and more.

## Getting Started

```bash
npm install upm-package-populator
```

Example usage

```javascript
const { populatePackage } = require('upm-package-populator');

populatePackage(
  // The folder to copy files from
  './src',
  
  // Where to overwrite files
  './target',
);
```

## Development

### Making Commits

To make a commit you must use Commitizen. To do so use the following to trigger the commit wizard.

```
npm run commit
```

### Testing The Package Locally

In this package's root run the following to link the package locally to NPM's node module directory.

```bash
npm link
```

Navigate to the root of the project you want to test the package in. Then run this. It will build a link to the local project on your mahcine.

```bash
npm link upm-package-populator
```

It's a good idea to unlink a package when you're done. **Navigate back to this project's root folder** and run the following to unlink. This should clean out any local reference data, which prevents any conflicts with packages.

```bash
npm unlink upm-package-populator
```
