# AnyPhoto

[English Readme👉](https://github.com/weirui88888/anyphoto/blob/main/README.md)

AnyPhoto是一个基于[node-canvas](https://github.com/Automattic/node-canvas)的绘图工具，允许您在任何地方生成漂亮的图片。

## Playground

您可以在[playground](https://www.anyphoto.space/playground)中快速体验它。（此可视化playground正在不断改进，建议您在本地安装以获得更好的体验）

## 示例

更多示例可在[examples](https://github.com/weirui88888/anyphoto/tree/main/examples)中查看。

![demo1](https://static.anyphoto.space/blog/demo1-new.png)
![demo2](https://static.anyphoto.space/blog/demo5.png)

## 安装

默认情况下，将下载适用于macOS、Linux和Windows的二进制文件。这是由核心包[node-canvas](https://github.com/Automattic/node-canvas)引起的。

首次安装需要编译，所以可能需要较长时间。如果在安装过程中遇到问题，请在安装之前查看[install wiki](https://github.com/Automattic/node-canvas/wiki)并找到相应的解决方案。

```shell
npm install anyphoto -g
```

您也可以使用`npx`来使用它。

## 使用方式

预计支持4个命令，目前已支持其中2个核心命令。

### Init

生成一个配置文件，然后您可以在配置文件中进行修改。此命令支持在任何目录中创建配置文件。

```shell
anyphoto init
```

更多配置项可在[configuration](https://www.anyphoto.space/configuration)中查看。（由于时间和精力问题，该文档正在不断改进）

### Generate

执行此命令后，将基于之前生成和修改的配置文件生成一张图片。

```shell
anyphoto generate
```

**此命令支持传递参数和几个核心选项。您可以在执行此命令时传递它们。命令行中传递的参数和选项将覆盖配置文件中相应的配置项。**

您可以执行`anyphoto generate --help`来查看它们。

### Github（规划中）

生成图片后，您可以执行此命令将图片上传到GitHub。

### Show（规划中）

未来将支持预设模板。执行此命令后，您可以查看当前可用的模板，并查看指定模板的示例图像。

## TODO

- [ ] 支持更多的预设模板
- [ ] 完善文档
- [ ] 支持更加“聪明”的去对内容进行换行
- [ ] 支持背景图片

## 联系方式

如果您对此项目感兴趣或在使用过程中遇到任何问题，可以通过微信**XdzD8b**与我进行交流
