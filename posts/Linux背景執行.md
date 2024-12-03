---
title: Linux背景執行
catalog: true
comments: true
abbrlink: 52235
categories: uncategorized
date: 2021-01-07 15:45:31
tags:
- Linux
---
# Linux背景執行程式
如果SSH到Linux，這樣畫面會卡住沒辦法做別的事
```batch
python xxx.py
```
只要指令後面加一個 '&'，他就不會卡在那邊
```batch
python xxx.py &
```

可以用'jobs'查詢目前在執行的動作有那些
```batch
jobs
```

使用fg切換目前的環境
```batch
fg %1
```

使用kill停止環境
```batch
kill jobsID
```
