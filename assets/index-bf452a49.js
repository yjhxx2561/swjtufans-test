(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(n){if(n.ep)return;n.ep=!0;const t=r(n);fetch(n.href,t)}})();const _="modulepreload",$=function(e){return"/"+e},v={},d=function(i,r,s){if(!r||r.length===0)return i();const n=document.getElementsByTagName("link");return Promise.all(r.map(t=>{if(t=$(t),t in v)return;v[t]=!0;const o=t.endsWith(".css"),c=o?'[rel="stylesheet"]':"";if(!!s)for(let u=n.length-1;u>=0;u--){const h=n[u];if(h.href===t&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${c}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":_,o||(l.as="script",l.crossOrigin=""),l.href=t,document.head.appendChild(l),o)return new Promise((u,h)=>{l.addEventListener("load",u),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>i()).catch(t=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=t,window.dispatchEvent(o),!o.defaultPrevented)throw t})};let f="home",a=null;function b(){return`
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
  `}function k(){return`
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
  `}function C(e){return`
    <header>
      <h1>西南交通大学课程资源平台</h1>
      <nav>
        <ul>
          <li><a href="#home" class="nav-link">首页</a></li>
          <li><a href="#courses" class="nav-link">课程资料</a></li>
          <li><a href="#course-${a}" class="nav-link active">${y(a)}</a></li>
        </ul>
      </nav>
    </header>

    <section id="course-detail">
      <h2>${y(a)}</h2>
      <div id="course-files">
        <p>加载中...</p>
      </div>
    </section>

    <footer>
      <p>© 2026 西南交通大学课程资源平台</p>
    </footer>
  `}function y(e){return e.split("/").pop()}function L(){const e=document.querySelector("#app"),i=window.location.hash.substring(1);i.startsWith("course-")?(f="course",a=i.substring(7),e.innerHTML=C(),D()):i==="courses"?(f="courses",a=null,e.innerHTML=k(),T()):(f="home",a=null,e.innerHTML=b()),P(),f==="courses"&&w()}function P(){document.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",r=>{r.preventDefault();const s=i.getAttribute("href").substring(1);window.location.hash=s})})}function w(){const e=document.getElementById("search-input");document.getElementById("search-btn").addEventListener("click",()=>{const r=e.value.trim().toLowerCase();g(r)}),e.addEventListener("keypress",r=>{if(r.key==="Enter"){const s=e.value.trim().toLowerCase();g(s)}})}function T(){d(()=>import("./course-data-d70906e6.js"),[]).then(e=>{const i=e.default;p(i)})}function D(){d(()=>import("./course-data-d70906e6.js"),[]).then(e=>{const i=e.default,r=E(i,a);r?B(r):document.getElementById("course-files").innerHTML="<p>课程不存在</p>"})}function E(e,i){if(e.path===i)return e;if(e.type==="directory")for(const r of e.children){const s=E(r,i);if(s)return s}return null}function p(e,i=0,r=null){const s=document.getElementById("course-content");if(i===0){if(r){if(r.length===0){s.innerHTML="<p>没有找到匹配的课程资料</p>";return}let n=`<div class="category">
`;n+=`  <h3>搜索结果</h3>
`,n+=`  <ul>
`,r.forEach(t=>{n+=`    <li><a href="coursefiles/${t.path}" target="_blank">${t.name}</a></li>
`}),n+=`  </ul>
`,n+=`</div>
`,s.innerHTML=n;return}s.innerHTML=e.children.map(n=>p(n,i+1)).join("");return}if(e.type==="directory"){e.children.some(c=>c.type==="file");const n=e.children.some(c=>c.type==="directory"),t=e.children.filter(c=>c.type==="file").map(c=>c.name).join(", ");let o=`<div class="category">
  <h${Math.min(i+2,6)}>
    <a href="#course-${e.path}" class="course-link" title="${t||"无文件"}">${e.name}</a>
  </h${Math.min(i+2,6)}>
`;return n&&(o+=`  <ul>
`,e.children.forEach(c=>{if(c.type==="directory"){const m=c.children.filter(l=>l.type==="file").map(l=>l.name).join(", ");o+=`    <li>
      <a href="#course-${c.path}" class="course-link" title="${m||"无文件"}">${c.name}</a>
    </li>
`}}),o+=`  </ul>
`),o+=`</div>
`,o}return""}function B(e){const i=document.getElementById("course-files");let r=`<div class="category">
`;r+=`  <h3>${e.name}</h3>
`,e.children.length===0?r+=`  <p>无文件</p>
`:(r+=`  <ul>
`,e.children.forEach(s=>{s.type==="file"&&(r+=`    <li><a href="coursefiles/${s.path}" target="_blank">${s.name}</a></li>
`)}),r+=`  </ul>
`),r+=`</div>
`,i.innerHTML=r}function g(e){d(()=>import("./course-data-d70906e6.js"),[]).then(i=>{const r=i.default,s=[];function n(t){t.type==="file"?t.name.toLowerCase().includes(e)&&s.push(t):t.type==="directory"&&t.children.forEach(o=>{n(o)})}n(r),p(r,0,s)})}L();window.addEventListener("hashchange",()=>{L()});
