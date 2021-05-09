# css 知识

## BFC 理解与运用

1. Block format context,快级格式化上下文
2. 一块独立渲染区域,内部元素的渲染不会影响边界以外的元素
   -BFC 的常见条件
   float 不是 none;position:absolute,fixed;overflow 不是 visible;display:flex,inline-block

## flex 布局

```css
/* 作用自身*/
align-self: center;
flex-wrap: wrap;
flex-direction: row;
```

## line-height 如何继承

```css
/* 会继承 20*2 = 40px;写成百分比是先计算在继承*/
body {
  font-size: 20px;
  line-height: 200%;
}
p: {
  font-size: 16px;
}
```

## rem 是什么?

rem 是一个长度单位

- px,绝对长度单位
- em,相对长度单位,相对于父元素
- rem,相对长度单位，相对于根元素
