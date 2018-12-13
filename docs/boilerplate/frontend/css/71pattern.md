# The 7-1 Pattern



### CSS文件架构：7-1模式

来源 : [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)

样式相关文件夹命名及**引用顺序**

1. abstracts/

   辅助工具文件夹，包括全局变量、函数、混合宏、占位符等

   - _variables.scss
   - _mixins.scss
   - _functions.scss
   - _placeholders.scss

2. vendors/

   第三方项目文件夹，存放一些外部库/框架，例如jQueryUI,Bootstrap等。

   antd的样式css文件也可以放在这里。

3. base/

   定义一些HTML元素公认的标准样式。html,body,li,a等等

4. layout/

   布局文件，例如grid、header、footer、sidebar、navigation等

5. components/

   具体组件的样式定义，例如各种自定义组件等

6. pages/

   页面特别样式，例如主页一般与其他页面不同

7. themes/

   主题样式文件，方便统一替换整站主题

- main.scss

  全局唯一文件名不带下划线\_的scss文件。其他scss全部以下划线\_开头.

  本文件中只@import文件，不定义具体的样式。

```
七个文件夹中，可以添加_all.scss文件，用来@import该文件夹中所有的文件。
main.scss文件中，只需要@import各文件夹中的_all.scss文件即可。
```



