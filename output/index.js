// document.getElementById('inputa').innerHTML += '<div class="safekeyboardinputer myinputer" id="skeyinputer" placeholder="请您输入完整的手机号" max-length="11" autofocus="true" value="11" autosubmit="true" pattern=""></div>'

var key = require('SafeKeyboard.es6');
key.create()

// debugger;

document.getElementById('getv').addEventListener('click',function(){
	key.getValue();
})

document.getElementById('hidev').addEventListener('click',function(){
	key.hide();
})

document.getElementById('callv').addEventListener('click',function(){
	key.show();
})

document.getElementById('createv').addEventListener('click',function(){
	key.hide();
	key.show();
	key.rebind();
})



