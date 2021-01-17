# LanguageFramework
基于Cocos Creator 2.4.2开发的多语言框架(项目读取资源用到Asset Bundle来读取资源)，支持实时动态修改Sprite、Label、RichText、Font。


## JsonUI

* 作用：通关节点路径给相应的组件动态修改相应的内容。

* Json文件放在resources文件夹下

* 使用需求：

  > 1. Json配置
  > 2. language.json配置
  > 3. 给相应的节点挂上JsonUI脚本并赋予json文件路径(默认根目录为resources)
  > 4. JsonUIManager.Init初始化一下language.json文件(默认路径为resources/language.json)

* 使用方法：首先配置好UI和Json文件,然后在任意start生命周期中JsonUIManager.Init一下即可(不可再onload中，因为JsonSprite、JsonLabel、JsonUI组件要注册事件，不然这几个组件首次切换语言将无效)，可通过JsonUIManager.SwitchLanguage来动态切换语言。

----

## JsonUI配置规则

例子："Info": {

​       	 	"UICompontents": [

​						{

​							"path":"this",

​               			 "uiType": "Image",

​                			"resName": "test"

​						},

​						{

​							"path”:"bg",

​               			 "uiType": "Image",

​							"bundleName”:"resources"

​                			"resName": "test"

​						}

​				]

​			}



1. 对象名称：Info(可修改，不过需要在JsonUI组件中也同时修改)
2. UICompontents为必选项，是一个数组



###### UICompontents说明

* 键值有:path、uiType、bundleName(可选)、resName。

* path:节点路径，已自身为起点开始往下找，this为自身节点。

* uiType:组件类型，现有Label(包含RichText)、Image、Font。

* bundleName:bundle名称(可选项，如果填了将优先使用这个，替代掉了json配置的info.language)。

* resName:资源名称，资源类型为资源名称，字符串类型为language.json的对象。



## language.json说明

* 作用：配置各个语言所用的文本，可通过id获得相应的文本。

* 每个对象对应一个id(这里的id是给UICompontents的resName项用的)，之后的语言是可选的。

* 只能存在一个language.json并且放在resources根目录下，也可以自己到JsonUIManager修改路径。

* 可用JsonLabel组件或JsonUIManager.GetLanguage(id)来获取文本。

* 示例：{

  ​    "languages":[

  ​        {

  ​            "id":"test",

  ​            "cn": "哈哈哈哈哈哈哈哈",

  ​            "en": "hahahahahahaha"

  ​        },

  ​		{

  ​			 "id":"test2",

  ​            "cn": "中文",

  ​            "en": "English"

  ​		}

  ​    ]

  }

