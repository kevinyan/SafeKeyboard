# SafeKeyboard
H5安全键盘

# 目前功能

## 应用场景
- 页面单个输入框，自动聚焦
- 


## API

- 基本demo

```
<div class="safekeyboardinputer myinputer" id="skeyinputer" placeholder="请您输入完整的手机号" max-length='11' autofocus="true" value='11' autosubmit="true" pattern=""></div>
```

参数 | value | 说明 
---|--- |--- 
class | safekeyboardinputer | 默认样式
class | myinputer | 自定义样式接口
id | skeyinputer | 功能控制
type | number / identity / password | 不同功能样式
placeholder | *** | 默认文案
value | 123 | 默认值/展示
max-length | 11 | 最大输入
autosubmit | true | 搭配max-length使用，自动提交
autofocus | true | 默认自动聚焦
pattern | 正则 | 规则
















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
