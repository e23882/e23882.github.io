---
title: .net framework 注入依賴
catalog: true
comments: true
tags:
  - C#
  - DI
  - .net framework
abbrlink: 33124
categories: uncategorized
date: 2021-01-15 17:59:30
---

## 在 . Net framework 實現注入依賴

### 函數庫
在開發.net core專案的時候，如果要使用注入依賴的話可以透過nuget 安裝 Microsoft.Extensions.DependencyInjection
但是.net framework卻沒有官方的注入依賴容器的函數庫可以用，我們可以用第三方的函數庫－ninject

![Ninject](ninject.PNG)

### DI Container
#### 指定介面、方法
透過DI容器取得注入依賴，在透過DI容器取得注入依賴的實例，實現依賴反轉原則
```csharp
using Ninject;
using System;

namespace ConsoleApp2
{
   class Program
    {
        public static void Main(string[] args)
        {
            IKernel Container = new StandardKernel();
            Container.Bind<IAnimal>().To<Bird>();
            IAnimal instance = Container.Get<Bird>();
            instance.Bark();
            Console.ReadLine();
        }

        public interface IAnimal
        {
            string Name { get; set; }
            void Bark();
        }

        public class Bird : IAnimal
        {
            public string Name { get; set; }
            public void Bark()
            {
                Console.WriteLine($"{Name} : joo");
            }
        }
    }
}
```

#### 透過容器注入物件之間的依賴
如果沒有透過容器注入依賴的話，就要在主程式裡面new 兩個物件的實例，還要把Dog物件的實例丟到Leo物件裡面當做建構子的參數，如果今天物件數量很多或是參數很多的時候，就會不好維護
```csharp
using System;

namespace ConsoleApp2
{
    class Program
    {
        public static void Main(string[] args)
        {
            Leo me = new Leo(new Dog());
            me.ShowMyPet();
        }
    }
    public class Leo
    {
        Dog _dog;
        public Leo(Dog dog)
        {
            _dog = dog;
        }

        public void ShowMyPet()
        {
            _dog.Bark();
        }
    }

    public class Dog
    {
        public void Bark()
        {
            Console.WriteLine("woof");
        }
    }
}
```

如果透過容器注入依賴的話只要把需要的物件(Dog)注入到容器裡面，取得需要的物件(Leo)時，產生Leo物件實例的時候，Leo物件實例會去容器裡面找自己建構子需要的物件存不存在，存在的話自動把他取出來，但是如果不存在的話會發生例外
```csharp
using Ninject;
using System;

namespace ConsoleApp2
{
   class Program
    {
        static void Main(string[] args)
        {
            IKernel container = new StandardKernel();
            container.Bind<IAnimal>().To<Dog>();
            container.Bind<IPeople>().To<Leo>();
            //從DI容器中取出Leo物件實例，Leo物件實例自動在DI容器中找到需要的Dog物件
            IPeople peopleInstance = container.Get<Leo>();
            peopleInstance.ShowMyPet();
            Console.ReadLine();
        }
    }
    public interface IAnimal
    {
        void Bark();
    }

    public class Dog : IAnimal
    {
        public void Bark()
        {
            Console.WriteLine("woof");
        }
    }

    public interface IPeople
    {
        string Name { get; set; }
        void ShowMyPet();
    }

    public class Leo : IPeople
    {
        IAnimal _pet;

        public Leo(IAnimal pet)
        {
            _pet = pet;
        }

        public string Name { get; set; }

        public void ShowMyPet()
        {
            _pet.Bark();
        }
    }
}
```

#### Multi Injection
Leo類別建構子參數是IAnimal陣列，只要把Leo類別需要的IAnimal跟對應的類別注入到DI容器中，在產生Leo類別實例的時候，就會自動把所有DI容器理符合條件的東西都產生出來
```csharp
using Ninject;
using System;

namespace ConsoleApp2
{
   class Program
    {
        static void Main(string[] args)
        {
            IKernel container = new StandardKernel();
            container.Bind<IAnimal>().To<Dog>();
            container.Bind<IAnimal>().To<Cat>();
            IPeople peopleInstance = container.Get<Leo>();
            peopleInstance.ShowAllPet();
            Console.ReadLine();
        }
    }

    public interface IAnimal
    {
        void Barking();
    }

    public class Dog : IAnimal
    {
        public void Barking()
        {
            Console.WriteLine("Dog barking");
        }
    }

    public class Cat : IAnimal
    {
        public void Barking()
        {
            Console.WriteLine("Cat barking");
        }
    }

    public interface IPeople
    {
        void ShowAllPet();
    }

    public class Leo: IPeople
    {
        IAnimal[] _allAnimal;
        public Leo(IAnimal[] allAnimal)
        {
            _allAnimal = allAnimal;
        }

        public void ShowAllPet()
        {
            foreach (var item in _allAnimal)
                item.Barking();
        }
    }
}
```


### 注入容器時設定屬性值
偶爾在產生物件實例的時候會希望可以先設定好某些屬性值，這時候可以使用 WithPropertyValue()方法

這邊要注意一定要Bind物件 to self才能正常產生物件實例不然從容器Get物件實例的時候會發生例外
```csharp
class Program
{
    static void Main(string[] args)
    {
        IKernel container = new StandardKernel();
        container.Bind<Dog>().ToSelf()
                 .WithPropertyValue("Name", "coffee")
                 .WithPropertyValue("Age", 2)

        Dog instance = container.Get<Dog>();
        Console.ReadLine();
    }
}
```
有設定屬性值當然也有設定建構子參數，這時候可以使用 WithConstructorArgument()方法

一樣要注意Bind物件to Self避免產生實力時發生例外
```csharp
class Program
{
    static void Main(string[] args)
    {
        IKernel container = new StandardKernel();
        container.Bind<Dog>().ToSelf()
                 .WithConstructorArgument("Name", "coffee")
                 .WithConstructorArgument("Age", 2);

        Dog instance = container.Get<Dog>();
        Console.ReadLine();
    }
}
```

### 幫注入容器中的物件命名
在某些情況下會在DI容器中注入好幾個一模一樣的類別，可能只有某個屬性值不一樣而已，這時候可以使用DI容器的Named()方法

```csharp
class Program
{
    static void Main(string[] args)
    {
        IKernel container = new StandardKernel();
        container.Bind<Dog>().Named("coffee")
                 .WithConstructorArgument("Age", 1);

        container.Bind<Dog>().Named("lulu")
                 .WithConstructorArgument("Age", 2);

        Dog coffeeInstance = container.Get<Dog>("coffee");
        Dog luluInstance = container.Get<Dog>("lulu");

        Console.ReadLine();
    }
}
```