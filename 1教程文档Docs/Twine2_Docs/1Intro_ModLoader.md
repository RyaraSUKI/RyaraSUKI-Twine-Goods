# ModLoader 简介

## ⚠️请注意：

⭐  本教程系列均要求掌握一定HTML相关技术基础，且需要基本的命令行使用基础，请确保在准备接入ModLoader前掌握这些知识

⭐  本教程是根据[ModLoader仓库](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader)提供的[文档](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/blob/master/README.md)编写的，一切请以ModLoader官方为准

⭐  这是一个进阶功能，强烈建议你的项目在有基本完整内容的**发布版**且**确实需要**扩展功能（如mod和多语言）再考虑接入ModLoader

## 什么是ModLoader?

SugarCube2 ModLoader是一个适用于方糖的模组加载管理框架，由[Lyoko-Jeremie](https://github.com/Lyoko-Jeremie)及该仓库的[贡献者们](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/graphs/contributors)共同创作。

通过ModLoader，可以实现的功能包括注入Mod以替换段落、增加或替换js脚本/css样式、通过i18n实现多语言等。

添加ModLoader，无疑为你的Twine项目增加了无限的可能，比如创造一个可自由扩展的mod社区，为你的项目实现多语言，为你的项目实现外置资源包加载以缩短文件加载时间和美化扩展……

甚至在完成一个大版本发布后，一些小内容的修改补充或漏洞的修复都可以直接通过发布mod包来进行补丁式的更新。

下面是ModLoader文档的定义：

> 此项目是为 SugarCube-2 引擎编写的Mod加载器，初衷是为 [DoL] 设计一个支持Mod加载和管理的Mod框架，支持加载本地Mod、远程Mod、旁加载Mod（从IndexDB中加载）。<br>
本项目的目的是为了方便制作Mod以及加载Mod，同时也为了方便制作Mod的开发者，提供了一些API来方便读取和修改游戏数据。

现在，通过ModLoader提供的jQuery启动方法修改最新版SugarCube2的注入点，我们使得这个强大的框架可以在所有以SugarCube2为故事格式的项目上运行。

⭐  通用版故事格式2.37.3版本的[发布地址](https://github.com/RyaraSUKI/sugarcube-2-modloader-orig/releases/tag/v2.37.3-modloader)

## 接下来的步骤
（2025.4.11）Ryara写了一个脚本简化注入过程，可以让人人都为自己的Twine SugarCube2项目添加ModLoader框架，希望有一天，Twine社区可以因为这个强大的框架，而变得更加繁荣~
详见"快速给项目接入ModLoader"

或者，在学习了命令行使用基础的情况下，请移步下一个教程，学习如何亲自为你的方糖项目接入ModLoader吧！