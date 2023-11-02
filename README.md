# 项目相关运行命令说明

### 安装项目中的依赖
```
npm install 或者 cnpm install
```

### 可视化项目打包，可复制dist文件，部署到nginx服务器上

```
npm run build
```

### 可视化项目运行

```
npm run dev
```

### 项目运行(npm run dev)异常处理方法

```
1. 出现error  in ./src/styles/style.scss异常，请执行安装node-sass
npm install node-sass

2.安装node-sass后，运行项目提示错误：”Syntax Error: Error: Node Sass version x.x.x is incompatible with ^x.x.x“
按照以下步骤操作：
2.1.卸载旧版node-sass
npm uninstall node-sass

2.2.安装 sass依赖
npm i -D sass 或者 cnpm i -D sass
```