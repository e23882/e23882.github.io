```csharp
<TextBlock Text="{Binding Item1}">
    <TextBlock.InputBindings>
        <MouseBinding Command="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}, Path=DataContext.ChooseItem1StringCommand}" MouseAction="LeftDoubleClick" />
    </TextBlock.InputBindings>
</TextBlock>
```