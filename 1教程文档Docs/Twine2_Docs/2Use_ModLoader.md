# ModLoader 的应用
## ⚠️请注意：

⭐  本教程系列均要求掌握一定HTML相关技术基础，且需要基本的命令行使用基础，请确保在准备接入ModLoader前掌握这些知识

⭐  本教程是根据[ModLoader仓库](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader)提供的[文档](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/blob/master/README.md)编写的，一切请以ModLoader官方为准

⭐  这是一个进阶功能，强烈建议你的项目在有基本完整内容的**发布版**且**确实需要**扩展功能（如mod和多语言）再考虑接入ModLoader

## 环境准备
1. 在工作路径打开命令行工具
2. 准备NodeJs环境，从 [NodeJs官网](https://nodejs.org) 下载NodeJs并安装，
3. 在命令行运行 `corepack enable` 来启用包管理器支持
4. 完成环境配置

## **获得使用修改版方糖编译后的HTML文件**

⭐  通用版故事格式2.37.3版本的[发布地址](https://github.com/RyaraSUKI/sugarcube-2-modloader/releases/tag/v2.37.3-modloader)

### **使用Twine2软件发布原版HTML**

请参考德牧老师在[这篇教程](https://www.yuque.com/u45355763/twine/mfgmss44dmv1uyme)里最后部分的替换故事格式方法，将下载后的文件放在Twine2软件里面，并把你的方糖项目改成使用这个格式后发布HTML文件

### **使用TweeGo编译原版html**

TweeGo是Twine引擎网页游戏的命令行编译工具，可以将分散的文件编译成html

如果有命令行及web开发基础，强烈推荐使用这个工具进行开发

以下提供使用TweeGo的编译说明（以Linux为例）：
1. 前往[tweego官方网站](https://www.motoslave.net/tweego/)或[tweego的仓库](https://github.com/tmedwards/tweego)下载最新版 tweego，注意选择自己系统的版本
2. 把下载后的修改版方糖故事格式全部文件放置/替换在
```
项目文件夹/tweego/storyformats/sugarcube-2/
```
3. 编译HTML文件，-o 为发布编译，-t 为调试模式编译，具体参数参见[tweego文档](https://www.motoslave.net/tweego/docs/)
- 注意，一般情况下，只需编译twee及js,css文件即可，否则连同图片字体等资源文件一起编译将导致html容量剧增！
示例命令：
```
tweego -o 项目文件夹/你的游戏/twee,js,css文件所在的文件夹
```
### **注入Modloader**

> 请随时查阅由ModLoadet提供的[文档](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader) 

注入前，请确保HTML原文件使用了[修改版的SugarCube2格式](https://github.com/RyaraSUKI/sugarcube-2-modloader/releases/tag/v2.37.3-modloader)编译

下面提供注入Modloader的步骤（以Linux为例）：

1. 请根据[环境准备](##环境准备)自行配置好 **NodeJs环境** 
2. 随后，请从ModLoader/actions下载预编译版ModLoader并解压到你的项目的文件夹里：[ModLoader/actions](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/actions)
3. 解压后，把**你的HTML文件**复制到
```
项目文件夹/ModLoader_Package/
```

3. 由于基于原版SugarCube2的网页并不具备某些ModLoader为DoL定制的功能，故需要修改modList.json，去除某些内置组件，这里提供一份保留最低限度Twee/js/css替换基础功能的组合：
```
[
  "mod/ModLoaderGui/ModLoaderGui.mod.zip",
  "mod/ConflictChecker/ConflictChecker.mod.zip",
  "mod/ModSubUiAngularJs/ModSubUiAngularJs.mod.zip",
  "mod/TweeReplacerLinker/TweeReplacerLinker.mod.zip",
  "mod/TweeReplacer/TweeReplacer.mod.zip",
  "mod/I18nTweeReplacer/I18nTweeReplacer.mod.zip",
  "mod/I18nTweeList/I18nTweeList.mod.zip",
  "mod/I18nScriptList/I18nScriptList.mod.zip",
  "mod/ReplacePatch/ReplacePatcher.mod.zip",
  "mod/TweePrefixPostfixAddon/TweePrefixPostfixAddon.mod.zip",
  "mod/Diff3WayMerge/Diff3WayMerge.mod.zip",
  "mod/SweetAlert2Mod/SweetAlert2Mod.mod.zip",
]
```
4. 运行node命令编译mod版HTML，例如
```
node dist-insertTools/insert2html.js 你的项目.html modList.json dist-BeforeSC2/BeforeSC2.js
```
5. 恭喜！mod版HTML编译成功！现在可以进行测试了！

## ⚠️补充说明

⭐  成功后，后续的修改请不要直接导入Modloader的html，Twine2软件将会报错，请直接使用你的原项目文件修改更新，待新版发布时再次根据这个流程重新注入一次ModLoader，因此你必须为自己规划一个合理的开发流程，确保在发布之前完成了所有更新目标并修复了~~必须修复的~~致命漏洞