# 快速上手

One Design Angular Component Library 是一个基于最新 Angular 标准的组件库，能够帮助开发者快速构建企业级应用。

## 安装

```bash
$ npm install --save xdesign
```

## 引入组件模块

导入组件所在的模块。

```ts
import { ButtonModule, TableModule } from 'xdesign';

@NgModule({
    // ...
    imports: [ButtonModule, TableModule]
    // ...
})
export class AppModule { }
```

## 使用主题

你可以使用组件库自带的主题，也可以引入其它自定义的主题。

例如在你的全局样式文件中，引入蓝色主题如下：

```css
@import "node_modules/xdesign/css/theme/blue/index.css";
```

另外，如果你的项目支持 LESS，你还可以定制你自己的样式主题。

```less
@import "node_modules/xdesign/less/theme/blue/index.less";

@brand-primary: #f00;
// other variables
```

## 结合 Angular CLI

推荐使用 Angular CLI 脚手架来搭建 Angular 项目。
