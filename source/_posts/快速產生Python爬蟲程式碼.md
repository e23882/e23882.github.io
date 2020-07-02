---
title: 快速產生Python爬蟲程式碼
catalog: true
date: 2020-07-02 16:12:09
subtitle:
header-img:
tags:
- Python
---
#### 透過Chrome Dev Tools執行結果轉換成Python程式碼
##### Chrome Dev Tools
準備好要爬的網頁跟表單相關資料後再開啟dev tools切換到NetWork tab再送出請求，避免訊息過多

找到回應正確response的request，按右鍵Copy as curl(cmd)
##### curl to Python Code
把複製的code貼上去就能拿到python的程式碼了，不用自己在那邊找header、cookies找半天，再調整成自己要的東西，可以省一些時間不用打header跟參數打這麼久最後發現參數打錯字...
https://curl.trillworks.com/
