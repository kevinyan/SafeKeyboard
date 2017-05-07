增加持续集成 [![Build Status](https://travis-ci.org/kevinyan/SafeKeyboard.png?branch=master)](https://travis-ci.org/kevinyan/SafeKeyboard)

# SafeKeyboard
H5安全键盘

# 应用场景
- 页面中仅有一个输入的地方
- 输入框在页面偏上部位，不被键盘覆盖


# How To Use

1. 资源引用

- requier引用
```
require('SafeKeyboard.js');

```

- 直接引用
``` html    
<script type="text/javascript" src="SafeKeyboard.js"></script>
```

2. 页面中DOM

```
<div class="safekeyboardinputer myinputer" id="skeyinputer"></div>
```
3. 初始化引用
```
key.init();

```


4. Dom Attr 属性表

参数 | value | 说明 | 是否必选
---|--- |--- |--- |
class | safekeyboardinputer | 默认样式 | √
class | myinputer | 自定义样式接口 | ×
id | skeyinputer | 功能控制 | √
type | number / identity / password | 不同功能样式 | ×
placeholder | *** | 默认文案 | × 
value | 123 | 默认值/展示 | ×
max-length | 11 | 最大输入 | ×
autosubmit | true | 搭配max-length使用，自动提交 | ×
autofocus | true | 默认自动聚焦 | ×
pattern | 正则 | 规则 | ×

5. 键盘功能接口
 
参数 | 说明 
---|--- 
show |  键盘显示
hide | 键盘隐藏
getValue | 获取当前值
rebind | 重新绑定


# 实际问题思考
- 单页应用，多个页面每个页面有一个输入框，键盘咋搞？？！！
```
键盘定位是个【单例应用】，一旦创建就不会再次创建，只做隐藏处理

```

- 页面没有输入框
```
只输出结果，不执行绑定input

```


# todo
- 多个输入框
- 键盘与文本流的覆盖关系








# 后期规划 

## 应用场景
- 数字密码 (789465)
- 银行卡 (6214 8301 8552 1452)
- 有效期 (10/23)
- CVV2 (223)
- 身份证(4856457987444565464X)
- 金额 (9.81)

## 关键点
- 键盘类
- 按钮类
- 按钮跟键盘关联
	- 按钮展示顺序
	- 按钮点击回调
	- 按钮与输入框绑定
	- 键盘位置置底
	- 键盘与文本关系

## API

### input 属性：
- type 
- placeholder
- max-length
- autofocus
- value
- pattern [todo]
- autosubmit(max-length)


方法属性:
- callback


方法：
- create
- destroy
- show
- hide

```

## 解决问题
- 图片svg
- meta梳理
- fastclick
- 禁止长按
- 动画、缩放
