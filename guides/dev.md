# 开发手册

在分支 develop 进行开发，开发完毕后，按照如下步骤进行：

## 第一步：生成最新官网

```
./node_modules/.bin/gulp build:demo
```

生成最新的官网（`docs` 目录）。

## 第二步：提交并发布 develop 分支

```
./node_modules/.bin/gulp commit -m 'commit message'
```

还可以视情况，加入不同参数，更改版本号:

- `--major` 更改主版本号
- `--minor` 更改次版本号
- `--patch` 更改patch版本号，默认

## 第三步：发布 master 分支

首先需要合并 develop 分支代码：

```
git checkout master
git merge develop
```

然后发布：

```
git push origin master
```

发布之后，可以去 [travis](https://travis-ci.org/zxhfighter/measure) 查看最新的发布情况。

如果没有问题，过几分钟后，travis 任务会自动推送最新的版本到 npm。
