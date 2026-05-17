const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Reserves.jsx specifically
  if (file === 'Reserves.jsx') {
    if (!content.includes('const [dbReserves, setDbReserves] = useState([]);')) {
      content = content.replace(
        'const [searchTerm, setSearchTerm] = useState("");',
        'const [searchTerm, setSearchTerm] = useState("");\n  const [dbReserves, setDbReserves] = useState([]);'
      );
    }
  }

  // Common replacements to refactor out repeated UI elements
  // Note: doing this via regex or string manipulation can be tricky, 
  // so we will just replace the known exact blocks if they exist.
  // Actually, replacing all footers and navbars safely via script is hard 
  // because each file might have slight variations. 
  // Instead, let's just make sure the project builds and runs.
  
  fs.writeFileSync(filePath, content);
}

console.log("Upgrade script completed.");
