const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // 1. Replace hardcoded Footer with <Footer /> component
  const footerRegex = /<footer[\s\S]*?<\/footer>/;
  if (footerRegex.test(content) && file !== 'Footer.jsx') {
    content = content.replace(footerRegex, '<Footer />');
    
    // Add import if not present
    if (!content.includes('import Footer from')) {
      content = content.replace(
        /(import.*?;?\s*)+/, 
        match => `${match}import Footer from "../src/components/Footer";\n`
      );
    }
    modified = true;
  }

  // 2. Replace hardcoded Navbar with <Navbar /> component (if it's the exact massive div)
  // Let's use a heuristic: if we find <div className="navbar... and it's huge, we replace it.
  const navbarRegex = /<div className="navbar[\s\S]*?<\/div>\s*<\/div>\s*<\!-- Mobile Menu -->[\s\S]*?<\/div>\s*}\s*| <div className="navbar[\s\S]*?<\/div>[\s\S]*?{menuOpen && \([\s\S]*?<\/div>\s*\)/;
  // This is too risky and complex for regex. I'll just do the Footer.

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated footer in ${file}`);
  }
}

console.log("Footer refactor completed.");
