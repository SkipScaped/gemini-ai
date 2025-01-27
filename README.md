<div align="center">
<h1>Gemini Next- Chat</h1>

![GitHub deployments](https://img.shields.io/github/deployments/SkipScaped/gemini-ai/Production)
![GitHub Release](https://img.shields.io/github/v/release/u14app/gemini-next-chat)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/xiangfa/talk-with-gemini/latest)
![Docker Pulls](https://img.shields.io/docker/pulls/xiangfa/talk-with-gemini)
![GitHub License](https://img.shields.io/github/license/u14app/gemini-next-chat)

Deploy your private Gemini application for free with one click, supporting Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro and Gemini Pro Vision models.

**English** · [简体中文](./README.zh-CN.md)

[![Vercel](https://img.shields.io/badge/Vercel-111111?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fu14app%2Fgemini-next-chat&project-name=gemini-next-chat&env=GEMINI_API_KEY&env=ACCESS_PASSWORD&repository-name=gemini-next-chat)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F69652?style=flat&logo=cloudflare&logoColor=white)](#deploy-to-cloudflare)

[![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Next](https://img.shields.io/badge/Next.js-111111?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-111111?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)




[web-url]: https://gemini-secure-ai.vercel.appp
[Web-image]: https://img.shields.io/badge/Web-PWA-orange?logo=microsoftedge


![cover](./public/screenshots/screenshots.png)

Simple interface, supports image recognition and voice conversation

![Gemini](./public/screenshots/pc-screenshot-1.png)

Supports Gemini 1.5 and Gemini 2.0 multimodal models

![Support plugins](./public/screenshots/pc-screenshot-3.jpg)

Support plugins, with built-in Web search, Web reader, Arxiv search, Weather and other practical plugins

![Tray app](./docs/images/trayapp.png)

A cross-platform application client that supports a permanent menu bar, doubling your work efficiency

</div>

> Note: If you encounter problems during the use of the project, you can check the known problems and solutions of [FAQ](#FAQ).



## Features

- **Deploy for free with one-click** on Vercel in under 1 minute
- Provides a very small (~4MB) cross-platform client (Windows/MacOS/Linux), can stay in the menu bar to improve office efficiency
- Supports multi-modal models and can understand images, videos, audios and some text documents
- Talk mode: Let you talk directly to Gemini
- Visual recognition allows Gemini to understand the content of the picture
- Assistant market with hundreds of selected system instruction
- Support plugins, with built-in Web search, Web reader, Arxiv search, Weather and other practical plugins
- Conversation list, so you can keep track of important conversations or discuss different topics with Gemini
- Artifact support, allowing you to modify the conversation content more elegantly
- Full Markdown support: KaTex formulas, code highlighting, and more
- Automatically compress contextual chat records to save Tokens while supporting very long conversations
- Privacy and security, all data is saved locally in the user's browser
- Support PWA, can run as an application
- Well-designed UI, responsive design, supports dark mode
- Extremely fast first screen loading speed, supporting streaming response
- Static deployment supports deployment on any website service that supports static pages, such as Github Page, Cloudflare, Vercel, etc.
- Multi-language support: English、简体中文、繁体中文、日本語、한국어、Español、Deutsch、Français、Português、Русский and العربية

## Roadmap

- [x] Reconstruct the topic square and introduce Prompt list
- [x] Use tauri to package desktop applications
- [x] Implementation based on functionCall plug-in
- [x] Support conversation list
- [x] Support conversation export features
- [ ] Enable Multimodal Live API

## Get Started

1. Get [Gemini API Key](https://aistudio.google.com/app/apikey)
2. One-click deployment of the project, you can choose to deploy to Vercel or Cloudflare

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fu14app%2Fgemini-next-chat&project-name=gemini-next-chat&env=GEMINI_API_KEY&env=ACCESS_PASSWORD&repository-name=gemini-next-chat)

3. Start using

### Deploy to Cloudflare

Currently the project supports deployment to Cloudflare, but you need to follow [How to deploy to Cloudflare Page](./docs/How-to-deploy-to-Cloudflare-Page.md) to do it.

### Updating Code

If you want to update instantly, you can check out the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to synchronize a forked project with upstream code.

You can star or watch this project or follow author to get release notifications in time.

## Environment Variables

#### `GEMINI_API_KEY` (optional)

Your Gemini api key. If you need to `enable` the server api, this is required.

#### `GEMINI_API_BASE_URL` (optional)

> Default: `https://generativelanguage.googleapis.com`

> Examples: `http://your-gemini-proxy.com`

Override Gemini api request base url. **To avoid server-side proxy url leaks, links in front-end pages will not be overwritten. **

#### `NEXT_PUBLIC_GEMINI_MODEL_LIST` (optional)

Custom model list, default: all.

#### `NEXT_PUBLIC_UPLOAD_LIMIT` (optional)

File upload size limit. There is no file size limit by default.

#### `ACCESS_PASSWORD` (optional)

Access password.

#### `HEAD_SCRIPTS` (optional)

Injected script code can be used for statistics or error tracking.

#### `EXPORT_BASE_PATH` (optional)

Only used to set the page base path in [static deployment](#static-deployment) mode.

### Access Password

This project provides limited access control. Please add an environment variable named `ACCESS_PASSWORD` on the vercel environment variables page.

After adding or modifying this environment variable, please redeploy the project for the changes to take effect.

### Custom model list

This project supports custom model lists. Please add an environment variable named `NEXT_PUBLIC_GEMINI_MODEL_LIST` in the `.env` file or environment variables page.

The default model list is represented by `all`, and multiple models are separated by `,`.

If you need to add a new model, please directly write the model name `all,new-model-name`, or use the `+` symbol plus the model name to add, that is, `all,+new-model-name`.

If you want to remove a model from the model list, use the `-` symbol followed by the model name to indicate removal, i.e. `all,-existing-model-name`. If you want to remove the default model list, you can use `-all`.

If you want to set a default model, you can use the `@` symbol plus the model name to indicate the default model, that is, `all,@default-model-name`.

## Development

If you have not installed pnpm

```shell
npm install -g pnpm
```

```shell
# 1. install nodejs and yarn first
# 2. config local variables, please change `.env.example` to `.env` or `.env.local`
# 3. run
pnpm install
pnpm dev
```

### Requirements

NodeJS >= 18, Docker >= 20

## Deployment

### Docker (Recommended)

> The Docker version needs to be 20 or above, otherwise it will prompt that the image cannot be found.

> ⚠️ Note: Most of the time, the docker version will lag behind the latest version by 1 to 2 days, so the "update exists" prompt will continue to appear after deployment, which is normal.

```shell
docker pull xiangfa/talk-with-gemini:latest

docker run -d --name talk-with-gemini -p 5481:3000 xiangfa/talk-with-gemini
```

You can also specify additional environment variables:

```shell
docker run -d --name talk-with-gemini \
   -p 5481:3000 \
   -e GEMINI_API_KEY=AIzaSy... \
   -e ACCESS_PASSWORD=your-password \
   xiangfa/talk-with-gemini
```

If you need to specify other environment variables, please add `-e key=value` to the above command to specify it.

Deploy using `docker-compose.yml`:

```shell
version: '3.9'
services:
   talk-with-gemini:
      image: xiangfa/talk-with-gemini
      container_name: talk-with-gemini
      environment:
         - GEMINI_API_KEY=AIzaSy...
         - ACCESS_PASSWORD=your-password
      ports:
         - 5481:3000
```

### Static Deployment

You can also build a static page version directly, and then upload all files in the `out` directory to any website service that supports static pages, such as Github Page, Cloudflare, Vercel, etc..

```shell
pnpm build:export
```

If you deploy the project in a subdirectory and encounter resource loading failures when accessing, please add `EXPORT_BASE_PATH=/path/project` in the `.env` file or variable setting page.

## Acknowledgments

### Technology Stack

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwindcss](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Inspiration

- [Lobe Chat](https://github.com/lobehub/lobe-chat)
- [ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
- [Open Canvas](https://github.com/langchain-ai/open-canvas)

## FAQ

#### Solution for “User location is not supported for the API use”

1. Use Cloudflare AI Gateway to forward APIs. Currently, Cloudflare AI Gateway already supports Google Vertex AI related APIs. For how to use it, please refer to [How to Use Cloudflare AI Gateway](./docs/Use-Cloudflare-AI-Gateway.md). This solution is fast and stable, and is **recommended**.

2. Use Cloudflare Worker for API proxy forwarding. For detailed settings, please refer to [How to Use Cloudflare Worker Proxy API](./docs/How-to-deploy-the-Cloudflare-Worker-api-proxy.md). Note that this solution may not work properly in some cases.

#### Why can’t I upload common documents such as doc, excel, and ppt?

Currently, the two kind models `Gemini 1.5` and `Gemini 2.0` support most images, audios, videos and some text files. For details. For other document types, we will try to use [LangChain.js](https://js.langchain.com/v0.2/docs/introduction/) later.

## LICENSE

[MIT](https://www.apache.org/licenses/LICENSE-2.0)

## By SkipScaped powered and based on thanks to <a href="https://github.com/u14app/">u14app's projects code and repos</a>
