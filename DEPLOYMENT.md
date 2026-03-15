# 在GitHub上创建和部署该网站的步骤

## 1. 在GitHub上创建仓库

1. **登录GitHub账号**：访问 [GitHub](https://github.com/) 并登录你的账号。

2. **创建新仓库**：
   - 点击右上角的"+"图标，选择"New repository"。
   - 填写仓库名称（例如：`swjtufans-course-platform`）。
   - 选择仓库类型（公开或私有）。
   - 勾选"Initialize this repository with a README"（可选）。
   - 点击"Create repository"按钮。

## 2. 上传项目文件

### 方法一：使用Git命令行

1. **克隆仓库**：
   ```bash
   git clone https://github.com/your-username/swjtufans-course-platform.git
   cd swjtufans-course-platform
   ```

2. **复制项目文件**：将本项目的所有文件复制到克隆的仓库目录中。

3. **提交并推送**：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### 方法二：使用GitHub Desktop

1. **下载并安装GitHub Desktop**：访问 [GitHub Desktop](https://desktop.github.com/) 并安装。

2. **克隆仓库**：在GitHub Desktop中，点击"File" > "Clone repository"，选择你刚创建的仓库。

3. **添加项目文件**：将本项目的所有文件复制到克隆的仓库目录中。

4. **提交并推送**：在GitHub Desktop中，输入提交信息，点击"Commit to main"，然后点击"Push origin"。

## 3. 配置GitHub Pages

1. **进入仓库设置**：在GitHub仓库页面，点击"Settings"选项卡。

2. **设置GitHub Pages**：
   - 滚动到"GitHub Pages"部分。
   - 在"Source"下拉菜单中，选择"main"分支。
   - 在"Folder"下拉菜单中，选择"/(root)"。
   - 点击"Save"按钮。

3. **等待部署**：GitHub Pages会自动构建和部署你的网站。部署完成后，你会在"GitHub Pages"部分看到网站的URL。

## 4. 构建和部署优化

由于本项目使用Vite构建，建议在部署前先构建项目，以获得更好的性能：

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **构建项目**：
   ```bash
   npm run build
   ```

3. **部署构建产物**：
   - 将`dist`目录中的文件上传到GitHub仓库。
   - 或者，使用GitHub Actions自动构建和部署。

## 5. 使用GitHub Actions自动部署

1. **创建GitHub Actions workflow**：
   - 在仓库中创建`.github/workflows`目录。
   - 创建`deploy.yml`文件，内容如下：

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '16'
         - name: Install dependencies
           run: npm install
         - name: Build project
           run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **提交并推送**：将workflow文件提交并推送到GitHub仓库。

3. **触发部署**：当你推送到`main`分支时，GitHub Actions会自动构建和部署你的网站。

## 6. 访问网站

部署完成后，你可以通过GitHub Pages提供的URL访问你的网站。URL格式通常为：`https://your-username.github.io/swjtufans-course-platform/`

## 7. 维护和更新

- 当你对项目进行修改后，只需将修改推送到GitHub仓库，GitHub Pages或GitHub Actions会自动更新网站。
- 如果你添加了新的课程资料，需要重新运行`npm run generate-course-data`生成新的课程数据，然后推送更新。

## 注意事项

- 确保`coursefiles`目录中的文件结构正确，以便`generate-course-data.js`脚本能够正确生成课程数据。
- 如果你使用GitHub Pages的默认部署方式（从`main`分支的根目录部署），确保`index.html`文件在根目录。
- 如果你使用GitHub Actions部署，确保`publish_dir`设置为正确的构建输出目录（本项目为`./dist`）。