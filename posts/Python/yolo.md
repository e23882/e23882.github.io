---
title: yolo
catalog: true
comments: true
tags:
  - python
  - yolo
abbrlink: 65067
categories: uncategorized
date: 2020-08-11 17:47:50
---
## 參考來源
我是參考這篇文章 [[機器學習 ML NOTE]YOLO!!!如何簡單使用YOLO訓練出自己的物件偵測!!! (Windows+Anaconda)](https://medium.com/%E9%9B%9E%E9%9B%9E%E8%88%87%E5%85%94%E5%85%94%E7%9A%84%E5%B7%A5%E7%A8%8B%E4%B8%96%E7%95%8C/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92-ml-note-yolo-%E5%88%A9%E7%94%A8%E5%BD%B1%E5%83%8F%E8%BE%A8%E8%AD%98%E5%81%9A%E7%89%A9%E4%BB%B6%E5%81%B5%E6%B8%AC-object-detection-%E7%9A%84%E6%8A%80%E8%A1%93-3ad34a4cac70)


## 遇到問題
### Tensorflow
tensorflow目前只支援到python3.7，python3.7還只能裝版本2.0.0以下的tensorflow，因為tensorflow 2.0.0 開始移除了一個 tensorflow.contrib 函數庫
#### 檢查目前使用版本
```python
pip --version
# pip 20.1.1 from c:\users\UserName\appdata\local\programs\python\python37\lib\site-packages\pip (python 3.7)
# 如果不是3.7可以把環境變數的python、pip改成3.7的路徑
```

因為要用python3.7所以
#### 檢查是不是已經裝了tensorflow
```python
pip list 
# Package        Version
# -------------------------
# gast           0.3.3
# pip            20.1.1
# tensorflow     1.14.0
# ..........
```
#### 如果不小心裝了比較高版本的tensorflow，要先移除掉再重裝比較舊的版本
```python
pip uninstall tensorflow
pip install tensorflow==1.14.0
```

---
## 執行
如果.\darkflow\sample_img\下有一個out的資料夾，裡面有標記圖片中的物件的話就是成功了
### 用訓練好的模型辨識圖片
```python
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe flow --model cfg/yolo.cfg --load bin/yolov2.weights --imgdir sample_img/
```
### 用訓練好的模型辨識攝影機
```python
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe  flow --model cfg/yolo.cfg --load bin/yolov2.weights --demo camera --saveVideo
```

---
## 標記資料
### 準備環境(labelimg)
```python
git clone https://github.com/tzutalin/labelImg
cd lableimg

pip install resources
pip install requests
pip install staty
pip install lxml

python lableimg.py
```
### 可能會遇到的問題 : No module named 'libs.resources'
```python 
# 執行下面指令，再把產生出來的resources.py複製到專案的.\labelImg\libs下
pyrcc5 -o resources.py resources.qrc
```

### 可能會遇到的問題 : pyrcc5 not found
```python
# 執行'pyrcc5 -o ...'時可能會發生這個例外，原因是因為沒有把pyrcc5加到環境變數裡面
# 可以把對應目錄下的程式家到環境變數'pyrcc5'裡面
C:\Users\UserName\AppData\Local\Programs\Python\Python37\Scripts\pyrcc5.exe

# 或是就直接用pyrcc5.exe執行
C:\Users\UserName\AppData\Local\Programs\Python\Python37\Scripts\pyrcc5.exe -o resources.py resources.qrc
```
環境都準備好就可以開始用labelimg標記資料
```python
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe D:\Backup\UserName\Desktop\Workspace\labelImg\labelImg.py
```

---
## 修改訓練相關設定
### config
config我是跟作者一樣用tiny-yolo.cfg : .\darkflow\cfg\tiny-yolo.cfg，裡面有幾個地方要照自己標記的資料去修改
#### convolutional
tiny-yolo.cfg裡應該只會有一行########這樣的東西，把####下的第二個[convolutional]中的filters改成 : 5*(5 + 標記資料時的label數量)<br>
ex : 我標記3個label，所以filter要改成 : 40 ( 5 * (5 + 3))
#### classes
把####下的[region]中的classes改成標記資料時的label數量

### label.txt
把內容改成標記資料時的label

### coco.names
把內容改成標記資料時的label

---
## 開始訓練
```python 
# python flow --model [modelPath] --train --dataset [Labeling Image Path] --annotation [LabelImageResultPath]

C:\Users\UserName\AppData\Local\Programs\Python\Python37\python flow --model cfg/tiny-yolo.cfg --train --dataset D:\Backup\UserName\Desktop\image\traindata --annotation D:\Backup\UserName\Desktop\Workspace\labelImg\leodata
```
### 從某個階段繼續訓練
```python
# python flow --model [model.cfg] --load -1 --train --dataset [image path] --annotation [annotation path]
# -1是default的最後一個check point
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python flow --model cfg/tiny-yolo.cfg --load -1 --train --dataset D:\Backup\UserName\Desktop\image\traindata --annotation D:\Backup\UserName\Desktop\Workspace\labelImg\leodata
```

---
## 一些參數(待確認)
### Batch (.\darkflow\darkflow\defaults.py)
self.define('batch', 16, 'batch size')
batch_size越大，訓練速度越快但是可能會用很多記憶體(單次epoch=(全部訓練樣本/batchsize)/iteration=1)
batch_size太小可能會underfitting

### epoch (.\darkflow\darkflow\defaults.py)
self.define('epoch', 1000, 'number of epoch')
epoch：1個epoch等於使用訓練集中的全部樣本訓練一次，一個完整資料集通過神經網路一次並返回稱為一次epoch