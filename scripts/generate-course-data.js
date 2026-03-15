import fs from 'fs';
import path from 'path';

const courseFilesDir = path.join(process.cwd(), 'coursefiles');
const outputFile = path.join(process.cwd(), 'src', 'course-data.json');

function traverseDirectory(dir, relativePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result = {
    name: path.basename(dir),
    path: relativePath,
    type: 'directory',
    children: []
  };

  items.forEach(item => {
    const itemPath = path.join(dir, item.name);
    const itemRelativePath = path.join(relativePath, item.name).replace(/\\/g, '/');

    if (item.isDirectory()) {
      result.children.push(traverseDirectory(itemPath, itemRelativePath));
    } else {
      result.children.push({
        name: item.name,
        path: itemRelativePath,
        type: 'file'
      });
    }
  });

  return result;
}

function generateCourseData() {
  try {
    const courseData = traverseDirectory(courseFilesDir);
    fs.writeFileSync(outputFile, JSON.stringify(courseData, null, 2));
    console.log('Course data generated successfully!');
  } catch (error) {
    console.error('Error generating course data:', error);
  }
}

generateCourseData();