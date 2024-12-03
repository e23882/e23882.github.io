---
title: 常用Git
catalog: true
tags:
  - git
abbrlink: b1bb7951
categories: uncategorized
date: 2020-07-02 17:01:15
subtitle:
header-img:
---
# 基本指令
### 1.init － 建立版本庫
```git
git init
```
***
### 2.add － 加入目前資料夾所有檔案到git
```git
git add .
```
***
### 3.commit － 提交
```git
git commit -m "commit message"
```
***
### 4.remote － 設定git remote位置(git server)

#### 4.1 設定
```git
git remote add origin https://github.com/e23882/test.git
```

#### 4.2 查詢
```git
git remote -v
```

#### 4.3 刪除
```git
git remote remove RemoteName
```
#### 4.4 同一個RemoteName可以設定多個GitRemote位置(一次push三個位置)
```git
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation1
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation2
git remote set-url RemoteName --push --add \\123.1.1.1\GitLocation3
```
***
### 5.Pull

git pull GitRemoteURL BranchName
```git
git pull original master
```
***
### 6.Push － 推送

指令 : git push -u <RemoteName> <BranchName>
```git
git push -u original master
```
git amend後以最新的版本蓋掉舊的commit
```git
git push -f 
```
***

### 7.stash
#### 7.1將目前異動的檔案存入暫存
```git
git stash
```
#### 7.2列出暫存的東西
```git
git stash list
```
#### 7.3清除
```git
git stash clear
```
#### 7.4套用git stash中的項目
```git
git stash apply
```

### 8.git flow
![gitflow](常用git/git.png)

### 9.Log － 查看紀錄
#### 9.1 看所有本地git紀錄
```git
git log 
```

#### 9.2 看指定數量本地git紀錄
指令 : git log -n <數量>
```git
git log -n 2
```

#### 9.3 輸出log
指令 : git log -n 1 > [AbsolutePath]

```git
git log -n 1 > "D:\NeverRemove.txt"
```

#### 9.4 一行顯示commit log 
```git
git log --oneline
```
***
### 10.checkout － 切換branch

#### 10.1 切換分支(Branch)
指令: git checkout [BranchName]
```git
git checkout LeoDerBranch
```

#### 10.2 建立並切換分支 : git checkout -b [BranchName]
```git
git checkout -b LeoDerBranch    
```
***
### 11.branch
 建立分支

#### 11.1 建立分支
```git
git branch LeoDerBranch
```
#### 11.2 刪除branch
```git
git branch -d feat/LeaderBoard
```

***
### 12.rm － 移除版控上檔案
```git
git rm -r -n --cached ./folder
git rm -r --cached ./folder
```
***
### 13.reset － 復原
#### 13.1 hard
會把目前專案目錄都復原到某個版本
本地git回復到最新版本(目前本地最新的)
```git
git reset --hard HEAD
```
本地git復原到git remote最新版本
```git
git pull GitRemoteURL
```

本地git回復到上一個版本(原本的那個版本就不見了)
```git
git reset --hard HEAD~
```
回復到前n個版本(n之後的版本都不見了)
```git
git reset --hard HEAD~n
```

#### 13.2 soft
跟hard一樣，但是本地專案的檔案不會跟著復原，只有版控有變更而已
***
***

### 14.tag
```git
建立tag branch
git checkout -b stage/1.20
增加tag
git tag stage/1.20.1
推到repo
git push --tag
```
***
***
### 15 rebase
```git
有點像merge,但不會有一個git merge的節點
git rebase branchName
rebase完如果有衝突要解決
解決完
git rebase --continue
或是取消rebase
git rebase --abort

解完衝突並且繼續後要把rebase完的程式推上去repo
git push -f
```
#### 15.1 rebase -i
可以修改commit的內容跟檔案
```git
選擇要改哪一個
git rebase -i HEAD~26
要改的pick 改 reword後儲存

vi
  移除多列 : ctrl+v 按上下左右選取多列 d移除
  寫入多列 : ctrl+v 按上下左右選取多列 I插入
  復原 : u
  貼上內容 : p貼上
  
git rebase --force
```





# 常用組合用法
### 顯示出某日區間所有異動檔案清單(會重複)
```git
git log --no-merges --pretty=format:\"%an_%ae|%s|%ad\" --name-only --since='2020/3/1' --until '2020/3/30' -- *.cs *.sql *.xaml > logs.txt
```

### 建立專案第一次初始化git、commit、push
```git
初始化
git add . 
看那些檔案加入commit
git status
復原加入commit的檔案
git reset HEAD FileName
git reset HEAD FolderName
提交
git commit -m "commit message"
設定GitRemote位置
git remote add original gitServerLocation
Push
git push -u original master
```

### PR準備要合併到A Branch發生衝突被擋住
```git
1.切換到branch
git checkout currentBranch

2.抓要merge的branch最新的程式
git fetch origin
or
git checkout mergedBranchName
git pull
git checkout currentBranch

3.rebase
git rebase origin/main
or 
git rebase mergedBranchName

4.解衝突
vs code + gitlens 好用
解衝突完
git rebase --continue

5.把解完衝突的程式推到PR
git push -f 
```
