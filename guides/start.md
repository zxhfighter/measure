# 快速上手

One Design Angular Component Library 是一个基于最新 Angular 标准的组件库，能够帮助开发者快速构建企业级应用。

## 安装

```bash
$ npm install --save xdesign
```

## 引入组件模块

首先，导入组件所在的模块。

```typescript
import { ButtonModule, TableModule } from 'xdesign';

@NgModule({
    // ...
    imports: [ButtonModule, TableModule]
    // ...
})
export class AppModule { }
```

然后，在模板中引用相关组件。

```html
<button nb-button>Hello, XDesign</button>
```

最后，组件的样式（主题）代码需要额外引入，接下来说明。

## 使用主题

你可以使用组件库自带的主题。

默认主题所在位置：

```css
@import "node_modules/xdesign/asset/css/index.css";

// less version
@import "node_modules/xdesign/asset/less/index.less";
```

除了默认主题，也可以引入其它内置的主题。例如在你的全局样式文件中，引入蓝色主题如下：

```css
@import "node_modules/xdesign/asset/css/theme/blue/index.css";

// less version
@import "node_modules/xdesign/asset/css/theme/blue/index.less";
```

另外，如果你的项目支持 LESS，你还可以定制你自己的样式主题。

```less
@import "node_modules/xdesign/asset/less/index.less";

@brand-primary: #f00;
// other variables
```

## 结合 Angular CLI

推荐使用 Angular CLI 脚手架来搭建 Angular 项目。

第一步，使用 Angular CLI 创建一个项目。

```bash
$ ng new lego --skip-tests=true --style=less --prefix=lego
```

第二步，安装组件库：

```bash
$ npm install --save xdesign
```

第三步，引入组件库模块，修改 `src/app/app.module.ts` 如下:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'xdesign';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

修改 `src/app/app.component.html` 如下：

```html
<button nb-button>Hello, XDesign.</button>
```

第四步，配置主题样式，修改 `.angular-cli.json`，修改 `apps[0].styles` 如下：

```json
{
    "apps": [
        "styles": [
            "styles.less",
            "../node_modules/xdesign/asset/less/index.less"
        ]
    ]
}
```

第五步，启动引用。
