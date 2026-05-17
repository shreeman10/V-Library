const fs = require('fs');
let content = fs.readFileSync('pages/Login.jsx', 'utf8');
content = content.replace('React from "react";', 'import React from "react";');
fs.writeFileSync('pages/Login.jsx', content);
console.log("Fixed Login.jsx");
