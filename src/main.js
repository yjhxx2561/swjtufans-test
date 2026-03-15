import './style.css'
import heroImg from './assets/hero.png'

// 页面状态管理
let currentPage = 'home';
let currentCourse = null;

// 主页面内容
function renderHomePage() {
  return `
    <header>
      <h1>西南交通大学课程资源平台</h1>
      <nav>
        <ul>
          <li><a href="#home" class="nav-link active">首页</a></li>
          <li><a href="#courses" class="nav-link">课程资料</a></li>
        </ul>
      </nav>
    </header>

    <section id="about">
      <h2>学校简介</h2>
      <p>西南交通大学是教育部直属全国重点大学，国家首批"211工程""特色985工程""2011计划"重点建设并设有研究生院的研究型大学，坐落于中国历史文化名城、国家中心城市--成都。</p>
      <p>学校创建于1896年，前身为山海关北洋铁路官学堂，是中国第一所工程高等学府，中国土木工程、矿冶工程、交通工程高等教育的发祥地，"交通大学"最早两大源头之一。</p>
      <p>学校以工见长，形成了工、理、文、管、经、法、艺等多学科协调发展的学科专业体系。设有27个学院（书院、中心），拥有交通运输工程、机械工程2个一级学科国家重点学科，车辆工程、桥梁与隧道工程等10个二级学科国家重点学科。</p>
    </section>

    <section id="features">
      <h2>平台功能</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <h3>课程资料</h3>
          <p>提供各类课程的参考教材、课件、试卷等资料</p>
          <a href="#courses" class="btn">查看资料</a>
        </div>
        <div class="feature-card">
          <h3>考研资源</h3>
          <p>收集整理考研相关的复习资料和真题</p>
          <a href="#courses" class="btn">查看资源</a>
        </div>
        <div class="feature-card">
          <h3>搜索功能</h3>
          <p>快速查找所需的课程资料</p>
          <a href="#courses" class="btn">开始搜索</a>
        </div>
      </div>
    </section>

    <footer>
      <p>© 2026 西南交通大学课程资源平台</p>
    </footer>
  `;
}

// 课程资料页面内容
function renderCoursesPage() {
  return `
    <header>
      <h1>西南交通大学课程资源平台</h1>
      <nav>
        <ul>
          <li><a href="#home" class="nav-link">首页</a></li>
          <li><a href="#courses" class="nav-link active">课程资料</a></li>
        </ul>
      </nav>
    </header>

    <section id="course-search">
      <h2>课程资料</h2>
      <div class="search-container">
        <input type="text" id="search-input" placeholder="搜索课程资料..." />
        <button id="search-btn">搜索</button>
      </div>
    </section>

    <section id="course-materials">
      <div id="course-content">
        <p>加载中...</p>
      </div>
    </section>

    <footer>
      <p>© 2026 西南交通大学课程资源平台</p>
    </footer>
  `;
}

// 课程详情页面内容
function renderCourseDetailPage(courseData) {
  return `
    <header>
      <h1>西南交通大学课程资源平台</h1>
      <nav>
        <ul>
          <li><a href="#home" class="nav-link">首页</a></li>
          <li><a href="#courses" class="nav-link">课程资料</a></li>
          <li><a href="#course-${currentCourse}" class="nav-link active">${getCourseName(currentCourse)}</a></li>
        </ul>
      </nav>
    </header>

    <section id="course-detail">
      <h2>${getCourseName(currentCourse)}</h2>
      <div id="course-files">
        <p>加载中...</p>
      </div>
    </section>

    <footer>
      <p>© 2026 西南交通大学课程资源平台</p>
    </footer>
  `;
}

// 获取课程名称
function getCourseName(coursePath) {
  return coursePath.split('/').pop();
}

// 渲染页面
function renderPage() {
  const app = document.querySelector('#app');
  
  // 检查是否是课程详情页面
  const hash = window.location.hash.substring(1);
  if (hash.startsWith('course-')) {
    currentPage = 'course';
    currentCourse = hash.substring(7); // 移除 'course-' 前缀
    app.innerHTML = renderCourseDetailPage();
    loadCourseDetail();
  } else if (hash === 'courses') {
    currentPage = 'courses';
    currentCourse = null;
    app.innerHTML = renderCoursesPage();
    loadCourseData();
  } else {
    currentPage = 'home';
    currentCourse = null;
    app.innerHTML = renderHomePage();
  }
  
  // 添加导航事件监听
  addNavListeners();
  // 添加搜索事件监听
  if (currentPage === 'courses') {
    addSearchListeners();
  }
}

// 添加导航事件监听
function addNavListeners() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      window.location.hash = target;
    });
  });
}

// 添加搜索事件监听
function addSearchListeners() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    searchCourses(searchTerm);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = searchInput.value.trim().toLowerCase();
      searchCourses(searchTerm);
    }
  });
}

// 加载课程数据
function loadCourseData() {
  import('./course-data.json').then(module => {
    const courseData = module.default;
    renderCourseContent(courseData);
  });
}

// 加载课程详情
function loadCourseDetail() {
  import('./course-data.json').then(module => {
    const courseData = module.default;
    const course = findCourseByPath(courseData, currentCourse);
    if (course) {
      renderCourseFiles(course);
    } else {
      document.getElementById('course-files').innerHTML = '<p>课程不存在</p>';
    }
  });
}

// 根据路径查找课程
function findCourseByPath(data, path) {
  if (data.path === path) {
    return data;
  }
  if (data.type === 'directory') {
    for (const child of data.children) {
      const result = findCourseByPath(child, path);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

// 渲染课程内容
function renderCourseContent(data, level = 0, searchResults = null) {
  const courseContent = document.getElementById('course-content');
  
  if (level === 0) {
    if (searchResults) {
      // 渲染搜索结果
      if (searchResults.length === 0) {
        courseContent.innerHTML = '<p>没有找到匹配的课程资料</p>';
        return;
      }
      
      let html = '<div class="category">\n';
      html += '  <h3>搜索结果</h3>\n';
      html += '  <ul>\n';
      
      searchResults.forEach(result => {
        html += `    <li><a href="coursefiles/${result.path}" target="_blank">${result.name}</a></li>\n`;
      });
      
      html += '  </ul>\n';
      html += '</div>\n';
      courseContent.innerHTML = html;
      return;
    }
    
    // 渲染所有课程资料
    courseContent.innerHTML = data.children.map(child => renderCourseContent(child, level + 1)).join('');
    return;
  }

  if (data.type === 'directory') {
    const hasFiles = data.children.some(child => child.type === 'file');
    const hasDirectories = data.children.some(child => child.type === 'directory');
    
    // 生成文件列表，用于鼠标悬停显示
    const fileList = data.children
      .filter(child => child.type === 'file')
      .map(child => child.name)
      .join(', ');

    let html = `<div class="category">
  <h${Math.min(level + 2, 6)}>
    <a href="#course-${data.path}" class="course-link" title="${fileList || '无文件'}">${data.name}</a>
  </h${Math.min(level + 2, 6)}>
`;

    if (hasDirectories) {
      html += '  <ul>\n';
      data.children.forEach(child => {
        if (child.type === 'directory') {
          // 生成子目录的文件列表
          const childFileList = child.children
            .filter(c => c.type === 'file')
            .map(c => c.name)
            .join(', ');
          html += `    <li>
      <a href="#course-${child.path}" class="course-link" title="${childFileList || '无文件'}">${child.name}</a>
    </li>\n`;
        }
      });
      html += '  </ul>\n';
    }

    html += '</div>\n';
    return html;
  }

  return '';
}

// 渲染课程文件
function renderCourseFiles(course) {
  const courseFiles = document.getElementById('course-files');
  
  let html = '<div class="category">\n';
  html += `  <h3>${course.name}</h3>\n`;
  
  if (course.children.length === 0) {
    html += '  <p>无文件</p>\n';
  } else {
    html += '  <ul>\n';
    course.children.forEach(child => {
      if (child.type === 'file') {
        html += `    <li><a href="coursefiles/${child.path}" target="_blank">${child.name}</a></li>\n`;
      }
    });
    html += '  </ul>\n';
  }
  
  html += '</div>\n';
  courseFiles.innerHTML = html;
}

// 搜索课程
function searchCourses(searchTerm) {
  import('./course-data.json').then(module => {
    const courseData = module.default;
    const searchResults = [];
    
    // 递归搜索文件
    function searchFiles(data) {
      if (data.type === 'file') {
        if (data.name.toLowerCase().includes(searchTerm)) {
          searchResults.push(data);
        }
      } else if (data.type === 'directory') {
        data.children.forEach(child => {
          searchFiles(child);
        });
      }
    }
    
    searchFiles(courseData);
    renderCourseContent(courseData, 0, searchResults);
  });
}

// 初始化页面
renderPage();

// 处理浏览器历史记录
window.addEventListener('hashchange', () => {
  renderPage();
});