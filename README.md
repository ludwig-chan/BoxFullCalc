# BoxFullCalc

一个使用 Vue 3 + TypeScript + Vite 构建的现代化 Web 应用程序。

## 特性

- ⚡️ **Vue 3** - 最新的 Vue.js 框架，支持 Composition API
- 🛠️ **TypeScript** - 提供完整的类型安全
- 📦 **Vite** - 极速的开发服务器和构建工具
- 🛣️ **Vue Router** - 官方路由解决方案
- 🗄️ **Pinia** - 现代化的状态管理
- 💅 **CSS** - 现代化的样式设计
- 🔧 **ESLint + Prettier** - 代码质量和格式化工具

## 项目结构

```
BoxFullCalc/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目配置
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint 检查
- `npm run format` - 格式化代码

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **代码规范**: ESLint + Prettier

## 浏览器支持

支持现代浏览器，包括：
- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88

## 许可证

MIT
