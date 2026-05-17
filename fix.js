const fs = require('fs');
let content = fs.readFileSync('pages/Reserves.jsx', 'utf8');

// Fix dbReserves
content = content.replace(
  'const [searchTerm, setSearchTerm] = useState("");',
  'const [searchTerm, setSearchTerm] = useState("");\n  const [dbReserves, setDbReserves] = useState([]);'
);

fs.writeFileSync('pages/Reserves.jsx', content);
console.log("Fixed Reserves.jsx");
