const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const uiComponentsDir = path.join(projectRoot, 'src', 'components', 'ui');
const srcDir = path.join(projectRoot, 'src');

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function findUsedComponents(files: string[]): Set<string> {
  const usedComponents = new Set<string>();

  files.forEach((file: string) => {
    const content = fs.readFileSync(file, 'utf-8');
    const importRegex = /@\/components\/ui\/(\w+)/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      usedComponents.add(match[1]);
    }
  });

  return usedComponents;
}

function removeUnusedComponents(usedComponents: Set<string>): string[] {
  const removedComponents: string[] = [];
  const uiComponents = fs.readdirSync(uiComponentsDir);

  uiComponents.forEach((component: string) => {
    const componentName = path.parse(component).name;
    if (!usedComponents.has(componentName)) {
      const componentPath = path.join(uiComponentsDir, component);
      fs.unlinkSync(componentPath);
      removedComponents.push(componentName);
    }
  });

  return removedComponents;
}

const allFiles = getAllFiles(srcDir);
const usedComponents = findUsedComponents(allFiles);
const removedComponents = removeUnusedComponents(usedComponents);

console.log('Removed unused components:');
removedComponents.forEach((component: string) => console.log(`- ${component}`));
console.log(`Total removed: ${removedComponents.length}`);