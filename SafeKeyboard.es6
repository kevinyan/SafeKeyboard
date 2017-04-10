/*
*
* @file 安全键盘
* 
*/

/*
ios10+ 双击扩大禁止
http://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
 */ 
document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if(event.scale > 1) {
        event.preventDefault();
    }
}, false);


var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
  var now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

//fastclick
if(window.FastClick){
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
}

// 按钮类
class KeyboardButton {
    constructor(){
        this.index =  0;
    }
    create(v){
        let temp = this.checktype(v);

        return '<span id="keyboard'+ temp.value +'" value="'+ temp.value +'" data-index="' + temp.showindex + '">'+ temp.facevalue +'</span>';
    }
    checktype(v){

        let param ={};

        param.value = v.value;
        param.facevalue = v.facevalue;
        param.showindex = v.showindex;

        return param;
    }
}




// 键盘类
class Keyboard {

    constructor(params){
        this.params = params;
        this.keyamount = 12;
        this.keyamountperline = 3;
        this.inputer = {'value':''};
        if(this.getAttr(this.getInput(),'value') ){
           this.inputer = {'value':this.getAttr(this.getInput(),'value')};
        }
        this.mvvm(this.inputer,'value',this.inputer.value);
        if(this.inputer.value){
            this.getInput().innerHTML = this.inputer.value;
        }
        
        this.showMap=[
            {'value':1,'facevalue':1,'showindex':1},
            {'value':2,'facevalue':2,'showindex':2},
            {'value':3,'facevalue':3,'showindex':3},
            {'value':4,'facevalue':4,'showindex':4},
            {'value':5,'facevalue':5,'showindex':5},
            {'value':6,'facevalue':6,'showindex':6},
            {'value':7,'facevalue':7,'showindex':7},
            {'value':8,'facevalue':8,'showindex':8},
            {'value':9,'facevalue':9,'showindex':9},
            {'value':0,'facevalue':0,'showindex':11},
            {'value':'delete','facevalue':'delete','showindex':12}
        ]

        this.type =this.getAttr(this.getInput(),'type');

        if(this.type){
            if(this.type == 'identity'){
                var tempArr = []
                this.showMap.forEach((ele,idx)=>{
                    tempArr.push(ele)
                    if(idx == 8){
                        tempArr.push({'value':'X','facevalue':'X','showindex':10},)
                    }
                })

                this.showMap = tempArr;
            }
        }
    }
    create(){
    

        this.dealplaceholder();

        
        //create  keyboard
        let dom = document.createElement("div");
        dom.id = 'keyboard';
        dom.setAttribute('class','keyboard');

        let html = ['<ul>'];       
        for (let i = 1; i < this.keyamount+1; i++) {
            if( (i%3) == 1){
                html.push('<div class="keyamountline">')
            }
            html.push('<li id="kholder'+i+'"></li>');

            if( (i%3) == 0){
                html.push('</div>')
            }
        }
        html.push('</ul>');
        dom.innerHTML = html.join('');
    

        // 是否 show
        this.show(dom)


        // render keyboard button
        this.showMap.forEach(v => {
            let btn = new KeyboardButton();
            let btndom = btn.create(v);
            let domholder = this.getDom('#kholder' + v.showindex)
            domholder.innerHTML = btndom;

        })


        // bind evnet
        this.showMap.forEach(v => {
            let domk = this.getDom('#keyboard' + v.value)
            if(domk){
                domk.addEventListener('touchmove',e => {
                    e.preventDefault();
                }, false);

                domk.addEventListener('touchend' ,e => {

                   var k = this.calculate(this.inputer.value , v.value);
                   this.inputer['value'] = k;
                   this.mvvm(this.inputer,'value',k);
                
                },false)
            }
        })

    }
    renderKey(val){
        let keybtn = new KeyboardButton();
        return keybtn.create(val,this.params);        
    }

    getDom(selector){
        return document.querySelector(selector);
    }
    getInput(){
        return this.getDom('#skeyinputer')
    }

    getAttr(dom,key){
        return dom.getAttribute(key);
    }
    setAttr(dom,key,val){
        return dom.setAttribute(key,val);
    }

    calculate(oldval,val){
        let totalval = '';
        let nowvalue = oldval;
        let maxLength = this.getAttr(this.getInput(),'max-length');
        let autofocus = true;
        if(this.getAttr(this.getInput(),'autofocus') && this.getAttr(this.getInput(),'autofocus') !== 'true'){
            autofocus = false;
        }
        if(val === 'delete'){
            totalval = nowvalue.slice(0,nowvalue.length -1);
        }else{
            if(nowvalue.length < parseInt(maxLength,10)){
                totalval =  nowvalue + val;
                if(totalval.length === parseInt(maxLength,10) && autofocus){
                    setTimeout(()=>{
                        this.params.callback();
                        
                    },300);
                }
            }else{
                totalval =  nowvalue ; 
            }

        }

        return totalval;
    }
    show(dom){
        this.getDom('body').appendChild(dom);

        if(this.getAttr(this.getInput(),'autofocus') === 'true'){
            setTimeout(()=>{
                dom.style.bottom = 0;
                this.getInput().classList.add('focus')
                this.getInput().classList.add('active')
            },100)
        }else{
            this.getInput().addEventListener('click',() =>{
                 dom.style.bottom = 0;
            },false)
        }
    }
    hide(){

    }
    renderButton(){

    }

    mvvm(data,key,value){

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: true, // 不能再define
            get: e => {
                // console.log('...........'+value)
                return value;
            },
            set: newVal => {
                // console.log('111111',value,newVal)
                value = newVal;
                this.updatedom();
            }
        });
    }

    updatedom(){
        let dom = this.getInput();
        dom.value = this.inputer.value;
        dom.innerHTML = this.inputer.value;
        this.dealplaceholder()
   
    }

    dealplaceholder(){
        let inp = this.getInput();
        let ph = this.getAttr(inp,'placeholder');
        let vl = this.inputer.value;
        let inpClassList = inp.classList;
        if(ph && !vl){
            inp.innerHTML = ph;
            inp.classList.remove('active');
        }else{
            inp.classList.add('active');
        }
    }
}


var k = new Keyboard({
    callback: ()=>{
        alert('success');
    }
})
k.create();






// import Pubsub from './pubsub.es6'
// let pubsub = new Pubsub();
// pubsub.on('A',function(data){
//  console.log(data)
// })
// pubsub.emit('A','百付宝')
// 
// var k = new Keyboard({
//     type:'number'
// })