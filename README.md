# UPM Package Populator

A helper library to cross populate nested Unity packages in a project with NPM data.

Installation

```bash
npm i -D upm-package-populator
```

Example usage
```javascript
const createDist = require('upm-package-populator');

createDist(
    // Nested Unity package location
    'Assets/FluidBehaviorTree', 
    
    // Root folder
    '.', 
    
    // Where the files will be output. Dumps a zip with the folder name
    'dist');
```
