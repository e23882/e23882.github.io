---
title: 常用Git
catalog: true
date: 2020-07-02 17:01:15
subtitle:
header-img:
tags:
- git
---

##### 建立版本庫
```git
git init
```


##### 加入目前資料夾所有檔案到git
```git
git add .
```


##### commit
```git
git commit -m "first version commit"
```

##### 加入gitserver位置
```git
git remote add origin https://github.com/e23882/test.git
```

##### push到master
```git
git push -u origin master
```

##### 移除版控上檔案
```git
git rm -r -n --cached ./folder
git rm -r --cached ./folder
```

##### 顯示出某日區間所有異動檔案清單(會重複)
```git
git log --no-merges --pretty=format:\"%an_%ae|%s|%ad\" --name-only --since='2020/3/1' --until '2020/3/30' -- *.cs *.sql *.xaml > logs.txt
```

##### 一次push到多個遠端儲存庫
```git
push
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation1
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation2
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation3

查詢
git remote -v

刪除
git remote remove RemoteName
```
