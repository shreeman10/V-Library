const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // Fix malformed import
  if (content.includes('import import Footer')) {
    content = content.replace('import import Footer', 'import Footer');
    modified = true;
  }
  
  if (content.includes('import Footer from "../src/components/Footer";\n { useState }')) {
    content = content.replace('import Footer from "../src/components/Footer";\n { useState }', 'import { useState }');
    content = `import Footer from "../src/components/Footer";\n` + content;
    modified = true;
  }
  
  // Just a general fix: if `import Footer` broke the line, let's fix it safely
  const regex = /import Footer from "\.\.\/src\/components\/Footer";\n(.*?) {/g;
  content = content.replace(regex, (match, p1) => {
      if (p1.trim() === '') {
          return match;
      }
      return `import Footer from "../src/components/Footer";\nimport {`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed import in ${file}`);
  }
}
