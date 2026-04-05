const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const replacements = [
  // Text colors
  { regex: /text-white\/90/g, replacement: 'text-slate-800' },
  { regex: /text-white\/80/g, replacement: 'text-slate-700' },
  { regex: /text-white\/70/g, replacement: 'text-slate-600' },
  { regex: /text-white\/60/g, replacement: 'text-slate-500' },
  { regex: /text-white\/50/g, replacement: 'text-slate-500' },
  { regex: /text-white\/40/g, replacement: 'text-slate-400' },
  { regex: /text-white\/30/g, replacement: 'text-slate-400' },
  { regex: /text-white\/20/g, replacement: 'text-slate-300' },
  { regex: /text-white\/10/g, replacement: 'text-slate-300' },
  { regex: /text-white\b/g, replacement: 'text-slate-800' },
  { regex: /text-amber-200/g, replacement: 'text-amber-600' },
  { regex: /text-emerald-200/g, replacement: 'text-emerald-700' },
  { regex: /text-emerald-300/g, replacement: 'text-emerald-600' },
  { regex: /text-red-200/g, replacement: 'text-red-600' },
  { regex: /text-red-300/g, replacement: 'text-red-600' },
  { regex: /text-red-400/g, replacement: 'text-red-500' },
  
  // Backgrounds
  { regex: /bg-white\/5\b/g, replacement: 'bg-white/80' },
  { regex: /bg-white\/10\b/g, replacement: 'bg-white/90' },
  { regex: /bg-white\/15\b/g, replacement: 'bg-slate-100' },
  { regex: /bg-white\/20\b/g, replacement: 'bg-slate-200' },
  
  // Specific hardcoded background styles for modals and cards
  { regex: /bg-\[#0b1411\]\/85/g, replacement: 'bg-white/90' },
  { regex: /bg-\[#0b1411\]\/80/g, replacement: 'bg-white/90' },
  { regex: /bg-\[#0b1411\]/g, replacement: 'bg-white' },
  { regex: /bg-black\/70/g, replacement: 'bg-slate-900/40' },
  { regex: /bg-black\/60/g, replacement: 'bg-slate-900/40' },
  
  // Borders
  { regex: /border-white\/5\b/g, replacement: 'border-slate-200' },
  { regex: /border-white\/10\b/g, replacement: 'border-slate-300' },
  { regex: /border-white\/15\b/g, replacement: 'border-slate-300' },
  { regex: /border-white\/20\b/g, replacement: 'border-slate-400' },
  
  // Hover & Focus (for input fields and buttons)
  { regex: /hover:bg-white\/5\b/g, replacement: 'hover:bg-slate-100' },
  { regex: /hover:bg-white\/10\b/g, replacement: 'hover:bg-slate-200' },
  { regex: /hover:bg-white\/15\b/g, replacement: 'hover:bg-slate-300' },
  { regex: /hover:text-white\b/g, replacement: 'hover:text-slate-900' },
  
  // Placeholders
  { regex: /placeholder:text-white\/40/g, replacement: 'placeholder:text-slate-400' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

console.log("Starting theme migration...");
processDirectory(srcPath);
console.log("Migration completed.");
