---
title: C# 常用方法
catalog: true
comments: true
tags:
  - C#
abbrlink: 20939
categories: uncategorized
date: 2020-08-24 17:47:58
---

## XML
#### 讀取XML
```csharp
try
{
    XmlDocument xmlDoc = new XmlDocument();
    xmlDoc.Load("Setting.xml");//載入xml檔

    var data = xmlDoc.SelectNodes("Setting");

    foreach (var item in data)
    {
        ServiceName = ((XmlElement)item).GetAttribute("ServiceName");
        ServerName = ((XmlElement)item).GetAttribute("ServerName");
        UserName = ((XmlElement)item).GetAttribute("UserName");
        PassWord = ((XmlElement)item).GetAttribute("PassWord");
        Source = ((XmlElement)item).GetAttribute("SourcePath");
        ServicePath = ((XmlElement)item).GetAttribute("ServicePath");
        ClientPath = ((XmlElement)item).GetAttribute("ClientPath");
        Domain = ((XmlElement)item).GetAttribute("Domain");
        SQLPath = ((XmlElement)item).GetAttribute("SQLPath");
        BackupPath = ((XmlElement)item).GetAttribute("BackupPath");
    }
}
catch (Exception ie)
{
    CreatDefaultSetting();
    ReadRule();
}
```
#### 建立預設XML
```csharp
XElement xElement = new XElement
    (
    new XElement
    ("Setting",
        new XAttribute("ServiceName", "Service1"),
        new XAttribute("ServerName", "Server1"),
        new XAttribute("UserName", "Administrator"),
        new XAttribute("PassWord", "12345"),
        new XAttribute("SourcePath", @".\Source")
    )
    );
XmlWriterSettings settings = new XmlWriterSettings();
settings.Encoding = new UTF8Encoding(false);
settings.Indent = true;
XmlWriter xw = XmlWriter.Create(System.Environment.CurrentDirectory + "\\setting.xml", settings);
xElement.Save(xw);
//寫入檔案
xw.Flush();
xw.Close();
```

---
## 遞迴檢查目錄下所有檔案/目錄
```csharp
public class Recursive2
{
    List<string> FileCollection = new List<string>();
    public Recursive2(string rootPath)
    {
        GetAllFiles(rootPath);
    }

    private void GetAllFiles(string rootPath)
    {
        //取得目錄下所有目錄
        var AllFolder = Directory.GetDirectories(rootPath);
        if (AllFolder.Length > 0)
        {
            foreach (var item in AllFolder)
            {
                GetAllFiles(item);
            }
        }

        var AllFile = Directory.GetFiles(rootPath);
        foreach (var item in AllFile)
            FileCollection.Add(item);
    }

    public List<string> GetAllFile()
    {
        return FileCollection;
    }
}
```