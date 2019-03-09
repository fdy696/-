#### 一 Git安装
下载Git，链接如下：https://git-scm.com/download/win

下载完毕，打开安装，按照安装流程一步一步执行，选择默认操作执行，直至该安装完成。

#### 二  github托管项目代码
2.1配置Git
鼠标右键，打开Git Bash应用，界面显示如下图所示。

![git bash](https://img-blog.csdn.net/20161103204657777)

a)  先输入ssh-keygen–t rsa –C “邮箱地址”,注意ssh-keygen之间是没有空格的,其他的之间是有空格的。


b)  回车之后,会出现一行,让你输入一个保存密钥的地方,括号里面是它默认的位置，这里会让你输入几次内容，都不用输入，直接回车就可以了。
![](https://img-blog.csdn.net/20161103204750140)

c) 回车之后,这样密钥就生成了,可以打开id_rsa.pub（上面一步可以看出创建的路径）来查看,里面的所有内容就是这个密钥,一会需要使用的时候,就直接全选复制就可以了。用记事本打开如下图所示。

![](https://img-blog.csdn.net/20161103204841188)

d) 现在转到github网站，注册账号，创建一个仓库后，配置一下ssh key,点击箭头指示的三角图标，选择Settings，然后点击左侧的SSH Keys，之后点击右侧的Add SSH Key，这样就会出现添加SSH Key的界面，在Title这一栏填一个名字。之后打开刚才生成的那个文件id_rsa.pub，全选复制里面的内容到Key这一栏中，点击Add Key按钮完成操作，这时你填的邮箱会收到一封确认的邮件。
![](https://img-blog.csdn.net/20161103205155982)


e) 验证一下是否设置成功,在git bash下输入如下命令，流程图如下图所示：

f) 现在配置一下用户名和邮箱：

git config --global user.name “用户名”

git config --global user.email “邮箱”



 

 

 