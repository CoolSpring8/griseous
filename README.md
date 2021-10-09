# Griseous

An alternative frontend for Zhejiang University CC98 Forum.

## 特性

- 侧边 Drawer 打开帖子，避免浏览体验被切换标签页或后退操作打断
- 设计选择：新帖页面与搜索页面分页，帖子页面无限滚动
- 可屏蔽关键词、特定用户的帖子内容、特定用户的头像（Work In Progress）
- 另一种界面风格

## Inspired & Influenced by

### [Mew Online](https://mew.fun/)

Mew 在社区形态与交互界面上做出的许多创新是引发我写这个项目的直接原因，比如：

- IM App 式样的“话题讨论”（在线聊天室）
- 点击“想法”（帖子）后打开侧边 Drawer 展示
- “话题”（标签）的切换和置顶帖的处理
- 桌面端非传统的多栏式布局，每栏均可独立滚动
- 每个“节点”（版块）和“话题”（标签）都有相对应的图片

目前来说我不是它的深度用户，只浮于表面稍微体验了几次。有些特性对我来说不那么方便，因此出于实用考虑，也由于这个项目的性质所限，没有选择做完全的仿制。

### [V2EX](https://v2ex.com/)

参考了首页的新帖界面等经典的设计。

### [LeetCode](https://leetcode.com/)

借鉴了[题库](https://leetcode.com/problemset/all/)页面的布局。

### [Tail-Kit](https://www.tailwind-kit.com/)

学习了基于 Tailwind CSS 设计原语的典型界面风格。

## 技术栈

- [React](https://github.com/facebook/react) 及相关生态
  - [React Router](https://github.com/remix-run/react-router)
  - [React Query](https://github.com/tannerlinsley/react-query)
  - [zustand](https://github.com/pmndrs/zustand)
  - [react-use](https://github.com/streamich/react-use)
  - [react-oidc-context](https://github.com/pamapa/react-oidc-context)
  - [react-infinite-scroll-hook](https://github.com/onderonur/react-infinite-scroll-hook)
  - [React Hook Form](https://github.com/react-hook-form/react-hook-form)
  - [react-markdown](https://github.com/remarkjs/react-markdown)
  - [classnames](https://github.com/JedWatson/classnames)
- 杂项
  - [ky](https://github.com/sindresorhus/ky)
  - [BBob](https://github.com/JiLiZART/BBob)
  - [Immer](https://github.com/immerjs/immer)
- 样式
  - [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
  - [Material-UI](https://github.com/mui-org/material-ui)
  - [Headless UI](https://github.com/tailwindlabs/headlessui)
  - [heroicons](https://github.com/tailwindlabs/heroicons)
- 工具与规范
  - [Vite](https://github.com/vitejs/vite)
  - [pnpm](https://github.com/pnpm/pnpm)
  - [ESLint](https://github.com/eslint/eslint)
    - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
    - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
  - [Prettier](https://github.com/prettier/prettier)
  - [husky](https://github.com/typicode/husky)
  - [lint-staged](https://github.com/okonet/lint-staged)
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - [Rollup Plugin Visualizer](https://github.com/btd/rollup-plugin-visualizer)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## TODO

见 [Projects](https://github.com/CoolSpring8/griseous/projects)。

## LICENSE

MIT
