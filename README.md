# xdesign

[TOC]

## start

```bash
$ npm install
```

## dev

```bash
$ npm run dev
```

### Compose a component

Component code are in `src/component`.

You can use `gulp generate:component` to quickly scafford a component.

```bash
$ gulp generate:component --name your-component
```

A `your-component` folder will be created in `src/component`, and the contents are:

```bash
.
├── index.ts
├── public.api.ts
├── your-component.config.ts
├── your-component.html
├── your-component.less
├── your-component.module.ts
└── your-component.ts
```

and it will add your component entry to `src/component/index.ts`.

### Write a demo for your component

You can then write a demo to test your component in `src/demo`.

A scafford tool will be provided soon.

## build


### build component

to build your component:

```bash
$ npm run build
```

### build dev demo app

to build your demo app with aot:

```bash
$ npm run build:demo:aot
```

## lint

to lint your code:

```bash
$ npm run lint
```

## docs

to generate api docs and guide docs:

```bash
$ npm run docs
```

api docs will be in `docs/dist`.

guide docs will be in `docs/dist/guides`;

## test

todo.

## e2e

todo.

## publish

todo.

## ci

todo.


