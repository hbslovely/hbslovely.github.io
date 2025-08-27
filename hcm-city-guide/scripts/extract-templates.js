const fs = require('fs');
const path = require('path');

function extractTemplateAndStyles(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, '.ts');

  // Extract template
  const templateMatch = content.match(/template:\s*`([\s\S]*?)`/);
  if (templateMatch) {
    const template = templateMatch[1].trim();
    fs.writeFileSync(path.join(dir, `${baseName}.html`), template);
  }

  // Extract styles
  const stylesMatch = content.match(/styles:\s*\[\s*`([\s\S]*?)`\s*\]/);
  if (stylesMatch) {
    const styles = stylesMatch[1].trim();
    fs.writeFileSync(path.join(dir, `${baseName}.scss`), styles);
  }

  // Update component file
  if (templateMatch || stylesMatch) {
    let updatedContent = content;
    if (templateMatch) {
      updatedContent = updatedContent.replace(/template:\s*`[\s\S]*?`,/, `templateUrl: './${baseName}.html',`);
    }
    if (stylesMatch) {
      updatedContent = updatedContent.replace(/styles:\s*\[\s*`[\s\S]*?`\s*\]/, `styleUrls: ['./${baseName}.scss']`);
    }
    fs.writeFileSync(filePath, updatedContent);
  }
}

function findComponentFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findComponentFiles(filePath);
    } else if (file.endsWith('.component.ts')) {
      extractTemplateAndStyles(filePath);
    }
  });
}

// Start from src/app directory
findComponentFiles(path.join(__dirname, '../src/app')); 