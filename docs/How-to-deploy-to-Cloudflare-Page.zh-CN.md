### 如何将项目部署到 Cloudflare Page

1. 登录 Cloudflare 仪表板并选择您的帐户。
2. 选择 Compute(Workers) > 创建 > Pages。
3. 点击 连接到 Git > gemini-next-chat > 开始设置
4. 框架预设 > Next.js > 设置环境变量 > 保持并部署
5. 设置 > 运行时 > 兼容性标志 > 填入 `nodejs_compat` > 保存
6. 部署 > 重新部署

### 设置自定义域名（可选）

由于在部分国家无法正常访问 `pages.dev` 域名，可以通过设置自定义域名来解决这个问题。

1. 选择 Compute(Workers) > 您的项目。
2. 选择 自定义域 > 设置自定义域。
