AppSendr 封装
====

本人一直用[AppSendr](https://www.appsendr.com)做小范围的测试包发布，简单、方便、快捷。点下图标，上传`ipa`，
然后生成一个短链接，发给你需要的人，他们点开就可以直接安装测试了。它后端存储用的是亚马逊的云服务，不知道是
不是`GFW`的原因，最近不好使了，手机上点开链接无法安装了。于是就有了此 Repo。

## 说明

[AppSendr](https://www.appsendr.com)生成的短链接为 `http://ota.io/xxxxxx`，后面是一个六位的**ID**，记下**ID**
，然后访问`http://ipa.avosapps.com/xxxxxx` 就好了！

## 服务支持

[AVOSCloud](https://cn.avoscloud.com)（万象云）
