# 大数据展示项目

[预览](https://www.github.io/***)

基于vue-cli编写开发

## 目录结构

整个项目的目录结构如下，具体包含内容后续会进行详细介绍和解释

    ├── public                     // 公共资源，第三方,不打包资源
    ├── src                        // 源代码
    │   ├── api                    // 所有请求相关资源
    │   ├── assets                 // 静态资源，会打包的资源
    │   ├── common                 // 通用配置，工具，mixins
    │   ├── components             // 全局公用组件
    │   ├── mock                   // mock server 数据
    │   ├── plugin                 // 自定义插件，注入指令，全局mixin
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store 
    │   ├── views                  // views 视图显示（错误页面，布局，登录）
    │   ├── App.vue                // 入口页面
    │   └── main.js                // 入口文件 加载组件 初始化等
    ├── .eslintrc.js               // eslint 配置项
    ├── .gitignore                 // git 忽略项
    ├── babel.config.js            // babel 配置项
    ├── vue.config.js              // vue-cli3集成配置项
    └── package.json               // package.json
    
    
## 安装

```bash
# 克隆项目
git clone https://github.com/***.git

# 安装依赖
yarn install

# 本地开发 启动项目
yarn run serve
# OR vue ui 图形化界面启动
vue ui
```

## Vue项目中的文件/文件夹命名规范

文件或文件夹的命名遵循以下原则：


- index.js 或者 index.vue，统一使用小写字母开头的(kebab-case)命名规范
- 属于组件或类的，统一使用大写字母开头的(PascalCase)命名规范
- 其他非组件或类的，统一使用小写字母开头的(kebab-case)命名规范

### 文件夹命名规范

**属于components文件夹下的子文件夹，使用大写字母开头的PascalBase风格**
1. 全局通用的组件放在 /src/components下
2. 其他业务页面中的组件，放在各自页面下的 ./components文件夹下
3. 每个components文件夹下最多只有一层文件夹，且文件夹名称为组件的名称，文件夹下必须有index.vue或index.js，其他.vue文件统一大写开头（Pascal case），components下的子文件夹名称统一大写开头（PascalCase）

**其他文件夹统一使用kebab-case的风格**

**全局公共组件：/src/components示例**
```
  - [components]
    - [Breadcrumb]
      - index.vue
    - [Hamburger]
      - index.vue
    - [SvgIcon]
      - index.vue
```
**业务页面内部封装的组件：以 /src/views/layout/components示例**
```
-[src]
  - [views]
    - [layout]
      - [components]
        - [Sidebar]
          - index.vue
          - Item.vue
          - SidebarItem.vue
        - AppMain.vue
        - index.js
        - Navbar.vue`
```
index.js 中导出组件方式如下：

```javascript
export { default as AppMain } from './AppMain'
export { default as Navbar } from './Navbar'
export { default as Sidebar } from './Sidebar'
```

```
    看index.js中最后一行代码，不难发现，为什么components下的子文件夹要使用PascalCase命名：
    
    export { default as Sidebar } from './sidebar' // 使用kebab-case命名的文件夹
    export { default as Sidebar } from './Sidebar' // 使用 PascalCase命名的文件夹
    对于组件的导出/导入，我们一般都是使用大写字母开头的PascalCase风格，
    以区别于.vue组件内部的其他camelCase声明的变量，
    [Sidebar]作为【侧边栏组件】的一个整体被导出，文件夹的命名也采用PascalCase，
    有利于index.js中export时的前后统一，避免很多情况下不注意区分大小写
```

### 文件命名规范

#### *.js文件命名规范

1. 属于类的.js文件，除index.js外，使用PascalBase风格
2. 其他类型的.js文件，使用kebab-case风格
3. 属于Api的，统一加上Api后缀

#### *.vue文件命名规范

1. 除index.vue之外，其他.vue文件统一用PascalBase风格


总结一下：

**文件夹：**
1. 属于components文件夹下的子文件夹，使用大写字母开头的PascalBase风格，且最多一层
2. 其他文件夹统一使用kebab-case的风格
3. 如组件包含私有的组件、指令、mixin等则需要设置一个和组件名相同的文件夹，并将组件设置为index.vue，私有组件放置于当前文件夹

**文件：**

1. 除index.vue之外，其他.vue文件统一用PascalBase风格
2. 属于类/组件的.js文件，除index.js外，使用PascalBase风格
2. 其他类型的.js文件，使用kebab-case风格
3. 属于Api的，统一加上Api后缀

**style样式文件：**
1. 统一使用kebab-case风格命名
2. 内部类也统一用-连字符

## 数据结构
系统概况 数据格式：
```json
{
    "code": 0, 
    "data": {
        "label": "this is mock value"
    } 
}
```
