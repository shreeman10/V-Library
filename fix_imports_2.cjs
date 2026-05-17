const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // Find lines that start with `{ ... } from "..."` and prepend `import `
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('{ ') || lines[i].startsWith('{')) {
      if (lines[i].includes('} from "') || lines[i].includes('} from \'')) {
        lines[i] = 'import ' + lines[i];
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Fixed missing import keyword in ${file}`);
  }
}
