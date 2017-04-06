/*
*
* @file 安全键盘
* 
*/
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
        this.inputer='' ;
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
    }
    create(){
        
        //create  keyboard
        let dom = document.createElement("div");
        dom.id = 'keyboard';
        dom.setAttribute('class','keyboard');

        let html = ['<ul>'];       
        for (let i = 1; i < this.keyamount+1; i++) {
            html.push('<li id="kholder'+i+'"></li>');

        }
        html.push('</ul>');
        dom.innerHTML = html.join('');
    

        // 是否 show
        this.show(dom)
     

        // render keyboard button
        this.showMap.forEach(v => {
            let btn = new KeyboardButton();
            let btndom = btn.create(v);
            let domholder = document.getElementById('kholder'+v.showindex);
            domholder.innerHTML = btndom;

        })


        // bind evnet
        this.showMap.forEach(v => {
            let domk = document.getElementById('keyboard'+v.value);
            if(domk){
                domk.addEventListener('click' ,e => this.delete(v.value) ,false)
            }
        })

    }
    renderKey(val){
        let keybtn = new KeyboardButton();
        return keybtn.create(val,this.params);        
    }
    delete(val){
        if(val === 'delete'){
            this.inputer = this.inputer.slice(0,this.inputer.length -1);
        }else{
            this.inputer +=  ''+val;
        }
        console.log(this.inputer)
    }
    show(dom){
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(dom);
    }
    hide(){

    }
    renderButton(){

    }
}



var k = new Keyboard({
    type:'number'
})
k.create();






// import Pubsub from './pubsub.es6'
// let pubsub = new Pubsub();
// pubsub.on('A',function(data){
//  console.log(data)
// })
// pubsub.emit('A','百付宝')