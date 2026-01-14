# Playwright 自动化测试项目

基于 [Playwright](https://playwright.dev/) 的 Web 自动化测试项目，集成 GitHub Actions CI/CD 流水线，自动将测试报告部署到 Netlify。

## 📋 项目简介

本项目演示了如何使用 Playwright 进行端到端（E2E）自动化测试，测试目标为 [SauceDemo](https://www.saucedemo.com/) —— 一个专为自动化测试练习设计的电商演示网站。

### 主要功能

- ✅ 自动化登录功能测试
- ✅ GitHub Actions 自动触发测试
- ✅ 测试报告自动部署至 Netlify
- ✅ 支持 Pull Request 自动评论测试结果

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18.x（推荐使用 LTS 版本）
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 安装项目依赖
npm install

# 安装 Playwright 浏览器
npx playwright install
```

### 运行测试

```bash
# 运行所有测试
npm test

# 或直接使用 Playwright 命令
npx playwright test

# 运行测试并打开 HTML 报告
npx playwright test --reporter=html
npx playwright show-report
```

### 其他常用命令

```bash
# 以 UI 模式运行测试（可视化调试）
npx playwright test --ui

# 以有头模式运行测试（显示浏览器窗口）
npx playwright test --headed

# 运行指定的测试文件
npx playwright test tests/saucedemo.spec.ts

# 调试模式运行
npx playwright test --debug
```

## 📁 项目结构

```
playwright-netlify-test/
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions 工作流配置
├── tests/
│   └── saucedemo.spec.ts     # 测试用例文件
├── playwright-report/        # 测试报告输出目录
├── test-results/             # 测试结果目录
├── playwright.config.ts      # Playwright 配置文件
├── package.json              # 项目依赖配置
└── README.md                 # 项目说明文档
```

## 🧪 测试用例说明

### SauceDemo 登录测试 (`saucedemo.spec.ts`)

测试 SauceDemo 网站的标准用户登录流程：

1. **打开网站** - 访问 `https://www.saucedemo.com/`
2. **输入用户名** - 使用标准用户 `standard_user`
3. **输入密码** - 使用密码 `secret_sauce`
4. **点击登录** - 点击登录按钮
5. **验证结果**
   - URL 包含 `inventory.html`
   - 页面显示 "Products" 标题

## ⚙️ 配置说明

### Playwright 配置 (`playwright.config.ts`)

| 配置项 | 说明 |
|--------|------|
| `testDir` | 测试文件目录 (`./tests`) |
| `fullyParallel` | 启用并行测试 |
| `retries` | CI 环境下失败重试 2 次 |
| `reporter` | 使用 HTML 报告格式 |
| `trace` | 首次重试时收集追踪信息 |

当前配置仅启用 Chromium 浏览器，如需测试其他浏览器，可取消 `playwright.config.ts` 中相关配置的注释。

## 🔄 CI/CD 流程

项目使用 GitHub Actions 实现自动化测试和报告部署：

### 触发条件

- 推送到 `main` 或 `master` 分支
- 创建 Pull Request 到 `main` 或 `master` 分支
- 手动触发 (workflow_dispatch)

### 工作流程

1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖 (`npm ci`)
4. 安装 Playwright 浏览器
5. 运行测试
6. 上传报告至 Netlify
7. 备份报告为 GitHub Artifact（保留 30 天）

### 配置 Netlify 部署

需要在 GitHub 仓库设置以下 Secrets：

| Secret 名称 | 说明 |
|-------------|------|
| `NETLIFY_AUTH_TOKEN` | Netlify 个人访问令牌 |
| `NETLIFY_SITE_ID` | Netlify 站点 ID |

#### 获取 Netlify 凭证

1. **NETLIFY_AUTH_TOKEN**
   - 登录 [Netlify](https://app.netlify.com/)
   - 进入 User Settings → Applications → Personal access tokens
   - 创建新令牌

2. **NETLIFY_SITE_ID**
   - 在 Netlify 创建新站点或选择已有站点
   - 进入 Site Settings → General → Site details
   - 复制 Site ID

## 📊 查看测试报告

### 本地查看

运行测试后，执行以下命令打开报告：

```bash
npx playwright show-report
```

### 在线查看

每次 CI 运行后，测试报告会自动部署到 Netlify，可通过以下方式查看：

- **GitHub Actions** - 查看工作流运行日志中的 Netlify 部署链接
- **Pull Request** - 查看自动评论中的报告链接
- **Netlify Dashboard** - 直接访问站点 URL

## 📚 相关资源

- [Playwright 官方文档](https://playwright.dev/docs/intro)
- [Playwright 中文文档](https://playwright.bootcss.com/)
- [SauceDemo 测试网站](https://www.saucedemo.com/)
- [GitHub Actions 文档](https://docs.github.com/cn/actions)
- [Netlify 文档](https://docs.netlify.com/)

## 📝 许可证

本项目采用 ISC 许可证。
