# ModLoader 测试Mod编写

## ⚠️请注意：

⭐  本教程系列均要求掌握一定HTML相关技术基础，且需要基本的命令行使用基础，请确保在准备接入ModLoader前掌握这些知识

⭐  本教程是根据[ModLoader仓库](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader)提供的[文档](https://github.com/Lyoko-Jeremie/sugarcube-2-ModLoader/blob/master/README.md)编写的，一切请以ModLoader官方为准

⭐  这是一个进阶功能，强烈建议你的项目在有基本完整内容的**发布版**且**确实需要**扩展功能（如mod和多语言）再考虑接入ModLoader

## 测试Mod可行性
这里提供一个简单的mod示例过程，以供测试modloader，详细的教程以后更新
### 编写mod
1. 选择一个你用于测试的link可到达段落（passage），记住他的段落名（:: Passage）
2. 新建一个mod文件夹，然后新建一个.twee格式的文本文件（**这个文件不能使用中文名字**），将这个段落复制到这个twee里面，适当修改，以形成加载mod前后的差异
3. 编写boot.json
示例：
```
{
    "name": "TesterMod",
    "version": "1.0.0",
    "styleFileList": [],
    "scriptFileList": [],
    "tweeFileList": [
        "Example.twee"
    ],
    "imgFileList": [],
    "additionFile": [
        "readme.txt"
    ],
    "dependenceInfo": [
        {
            "modName": "TweeReplacer",
            "version": ">=1.0.0"
        }
    ]
}
```
4. 编写readme，也就是这个mod的简介描述
5. 选择测试twee文件，boot.json，readme.txt，将他们压缩到一个.zip压缩包里，这就是你的测试mod

### 加载mod
1. 确保使用已注入modloader的HTML
2. 等待加载完成后，打开modloader gui
3. 选择旁加载mod，上传后点击加载
4. 等待输出加载成功信息后回到gui顶部点击重载页面
5. 重载后检查测试passage是否被替换