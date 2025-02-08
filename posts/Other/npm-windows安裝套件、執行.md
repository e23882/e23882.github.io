---
title: npm windows安裝套件、執行
catalog: true
comments: true
tags:
  - npm
  - yarn
  - hexo
abbrlink: 743
categories: uncategorized
date: 2024-11-26 10:15:36
---

# npm windows安裝套件、執行


以yarn為範例 : 
``` cmd
yarn install

'yarn' 不是內部或外部命令、可執行的程式或批次檔。
```

移除套件
```
npm uninstall -g yarn
```

安裝
```
npm install --global yarn
```

安裝完還是找不到 : 沒有設定環境變數
```
yarn install

'yarn' 不是內部或外部命令、可執行的程式或批次檔。
```


找出yarn安裝在windows上的路徑
```
npm list -g yarn
C:\Users\YangLe\AppData\Roaming\npm
```

用找到路徑下的yarn安裝依賴
```
C:\Users\YangLe\AppData\Roaming\npm\yarn install
```
