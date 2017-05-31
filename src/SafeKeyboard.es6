/*
 *
 * @file 安全键盘
 *
 */

/*
ios10+ 双击扩大禁止
http://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
 */
document.addEventListener( 'touchmove', function ( event ) {
	event = event.originalEvent || event;
	if ( event.scale > 1 ) {
		event.preventDefault();
	}
}, false );


var lastTouchEnd = 0;
document.documentElement.addEventListener( 'touchend', function ( event ) {
	var now = Date.now();
	if ( now - lastTouchEnd <= 300 ) {
		event.preventDefault();
	}
	lastTouchEnd = now;
}, false );

// fastclick
if ( window.FastClick ) {
	if ( 'addEventListener' in document ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			FastClick.attach( document.body );
		}, false );
	}
}

var event = document.createEvent( 'Event' );
event.initEvent( 'build', true, true );


// 按钮类
class KeyboardButton {
	constructor() {
		this.index = 0;
	}
	create( v ) {
		let temp = this.checktype( v );
		if ( temp.show ) {
			return '<span id="keyboard' + temp.value + '" value="' + temp.value + '" data-index="' + temp.showindex + '">' + temp.facevalue + '</span>';
		}

		return '';
	}
	checktype( v ) {
		let param = {};
		param.value = v.value;
		param.facevalue = v.facevalue;
		param.showindex = v.showindex;
		param.show = v.show;
		return param;
	}
}




// 键盘类
class Keyboard {

	constructor( params ) {
		this.params = params;
		this.keyamount = 12;
		this.keyamountperline = 3;
		this.inputer = {
			'value': ''
		};
		this.type = '';
		this.maxLength = 999;
		this.autosubmit = false;


		this.showMap = [ {
				'value': 1,
				'facevalue': 1,
				'showindex': 1,
				'show': true
			},
			{
				'value': 2,
				'facevalue': 2,
				'showindex': 2,
				'show': true
			},
			{
				'value': 3,
				'facevalue': 3,
				'showindex': 3,
				'show': true
			},
			{
				'value': 4,
				'facevalue': 4,
				'showindex': 4,
				'show': true
			},
			{
				'value': 5,
				'facevalue': 5,
				'showindex': 5,
				'show': true
			},
			{
				'value': 6,
				'facevalue': 6,
				'showindex': 6,
				'show': true
			},
			{
				'value': 7,
				'facevalue': 7,
				'showindex': 7,
				'show': true
			},
			{
				'value': 8,
				'facevalue': 8,
				'showindex': 8,
				'show': true
			},
			{
				'value': 9,
				'facevalue': 9,
				'showindex': 9,
				'show': true
			},
			{
				'value': 'X',
				'facevalue': 'X',
				'showindex': 10,
				'show': false
			},
			{
				'value': 0,
				'facevalue': 0,
				'showindex': 11,
				'show': true
			},
			{
				'value': 'delete',
				'facevalue': 'delete',
				'showindex': 12,
				'show': true
			}
		];



		this.checkInputAttr();





	}
	checkInputAttr() {
		if ( this.checkInputExist() ) {
			this.inputer.value = '';
			if ( this.getAttr( this.getInput(), 'value' ) ) {
				this.inputer = {
					'value': this.getAttr( this.getInput(), 'value' )
				};
			}
			if ( this.getAttr( this.getInput(), 'autosubmit' ) && this.getAttr( this.getInput(), 'autosubmit' ) !== 'true' ) {
				this.autosubmit = true;
			}
			this.getInput().innerHTML = this.inputer.value || '';
			this.type = this.getAttr( this.getInput(), 'type' ) || '';
			this.maxLength = this.getAttr( this.getInput(), 'max-length' ) || 999;

			if ( this.type && this.type == 'identity' ) {
				this.showMap.forEach( ( ele, idx ) => {
					if ( ele.value == 'X' ) {
						ele.show = true;
					}
				} )
			} else {
				this.showMap.forEach( ( ele, idx ) => {
					if ( ele.value == 'X' ) {
						ele.show = false;
					}
				} )
			}

		} else {
			if ( document.querySelector( '.myinput' ) ) {
				// this.type = '';
				// this.inputer = {'value':''};
				// this.autosubmit = false;
				// this.maxLength = 999;
				// this.showMap.forEach((ele,idx)=>{
				//     if(ele.value == 'X'){
				//         ele.show = false;
				//     }
				// })
			} else {
				this.type = '';
				this.inputer.value = '';
				this.maxLength = 9999;
				if ( this.type && this.type == 'identity' ) {
					this.showMap.forEach( ( ele, idx ) => {
						if ( ele.value == 'X' ) {
							ele.show = true;
						}
					} )
				} else {
					this.showMap.forEach( ( ele, idx ) => {
						if ( ele.value == 'X' ) {
							ele.show = false;
						}
					} )
				}

				if ( this.getDom( '#keyboard' ) ) {
					this.show();
				}
			}
		}

		this.mvvm( this.inputer, 'value', this.inputer.value );
	}

	checkInputExist() {
		if ( document.getElementById( 'skeyinputer' ) ) {
			return true
		} else {
			return false
		}
	}
	create() {

		//create  keyboard
		let dom = document.createElement( "div" );
		dom.id = 'keyboard';
		dom.setAttribute( 'class', 'keyboard' );

		let html = [ '<ul>' ];
		for ( let i = 1; i < this.keyamount + 1; i++ ) {
			if ( ( i % 3 ) == 1 ) {
				html.push( '<div class="keyamountline">' )
			}
			html.push( '<li id="kholder' + i + '"></li>' );

			if ( ( i % 3 ) == 0 ) {
				html.push( '</div>' )
			}
		}
		html.push( '</ul>' );
		dom.innerHTML = html.join( '' );

		// ceateKeyboarddom
		this.getDom( 'body' ).appendChild( dom );


		// 给input绑定事件
		this.bindinpudom();


		// render keyboard button
		this.renderButton();




	}

	renderButton() {
		this.showMap.forEach( v => {
			let btn = new KeyboardButton();
			let btndom = btn.create( v );
			let domholder = this.getDom( '#kholder' + v.showindex )
			domholder.innerHTML = btndom;
		} )


		// bind evnet
		this.showMap.forEach( v => {
			let domk = this.getDom( '#keyboard' + v.value )
			if ( domk ) {
				domk.addEventListener( 'touchmove', e => {
					e.preventDefault();
				}, false );

				domk.addEventListener( 'touchend', e => {
					var k = this.calculate( this.inputer.value, v.value );
					this.inputer[ 'value' ] = k;
					// this.mvvm(this.inputer,'value',k);

				} )
			}
		} )
	}

	destory() {
		document.getElementById( 'keyboard' ).parentNode.removeChild( document.getElementById( 'keyboard' ) )
	}

	bindinpudom() {
		if ( this.checkInputExist() ) {

			// 是否 show
			this.getInput().addEventListener( 'click', () => {
				this.show();
			}, false )
			// 自动聚焦功能
			if ( this.getAttr( this.getInput(), 'autofocus' ) === 'true' ) {
				this.show()
			}

		}
	}
	offbinddom() {
		if ( this.checkInputExist() ) {
			this.getInput().removeEventListener( 'click', () => {
				console.log( 'remove' )
			} )
		}
	}
	renderKey( val ) {
		let keybtn = new KeyboardButton();
		return keybtn.create( val, this.params );
	}

	getDom( selector ) {
		return document.querySelector( selector );
	}
	getInput() {
		return this.getDom( '#skeyinputer' )

	}

	getAttr( dom, key ) {
		return dom.getAttribute( key );
	}
	setAttr( dom, key, val ) {
		return dom.setAttribute( key, val );
	}

	calculate( oldval, val ) {
		let totalval = '';
		let nowvalue = oldval;

		if ( val === 'delete' ) {
			totalval = nowvalue.slice( 0, nowvalue.length - 1 );
		} else {
			if ( nowvalue.length < parseInt( this.maxLength, 10 ) ) {
				totalval = nowvalue + val;
				if ( totalval.length === parseInt( this.maxLength, 10 ) && this.autosubmit ) {
					setTimeout( () => {
						this.callback();
					}, 300 );
				}
			} else {
				totalval = nowvalue;
			}

		}

		return totalval;
	}
	show() {
		let dom = this.getDom( '#keyboard' );
		setTimeout( () => {
			// dom.style.bottom = 0;
			dom.style.webkitTransform = 'scale(.5, .5) translate3d(-50%, 50%,0)';
			dom.style.transform = 'scale(.5, .5) translate3d(-50%, 50%,0)';

			if ( this.checkInputExist() ) {
				// 处理placeholder
				this.dealplaceholder();
				this.getInput().classList.add( 'focus' )
				if ( this.getInput.value ) {
					this.getInput().classList.add( 'active' )
				}
			}
		}, 100 )

	}
	hide() {
		let dom = this.getDom( '#keyboard' );
		if ( dom ) {
			setTimeout( () => {
				// dom.style.bottom = '-50%';
				dom.style.webkitTransform = 'scale(.5, .5) translate3d(-50%, 300%,0)';
				dom.style.transform = 'scale(.5, .5) translate3d(-50%, 300%,0)';
				if ( this.checkInputExist() ) {
					this.getInput().classList.remove( 'focus' )
				}
			}, 100 )
		}
	}


	mvvm( data, key, value ) {
		Object.defineProperty( data, key, {
			enumerable: true, // 可枚举
			configurable: true, // 不能再define
			get: e => {
				// console.log('...........'+value)
				return value;
			},
			set: newVal => {
				value = newVal;
				// console.log('~~~~~~~~~'+value)
				this.updatedom();
			}
		} );
	}

	updatedom() {
		let dom = this.getInput();
		if ( dom ) {
			dom.value = this.inputer.value;
			dom.innerHTML = this.inputer.value;
			this.dealplaceholder();

		} else {
			// this.dispatchEvent({type:'ck', message:this.inputer.value});
		}
		event.inputer = this.inputer.value;
		document.dispatchEvent( event );
	}

	dealplaceholder() {
		let inp = this.getInput();
		let ph = this.getAttr( inp, 'placeholder' );
		let vl = this.inputer.value;
		let inpClassList = inp.classList;
		if ( ph && !vl ) {
			inp.innerHTML = ph;
			inp.classList.remove( 'active' );
		} else {
			inp.classList.add( 'active' );
		}
	}
	callback() {
		console.log( 'i am callback' );
	}
	getValue() {
		return this.inputer.value;
	}
	clearValue() {
		this.inputer.value = '';
	}


	rebind( time ) {
		var time = time || 0;
		setTimeout( () => {
			this.checkInputAttr();
			this.renderButton();
			this.offbinddom();
			this.bindinpudom();
		}, time )
	}

}


// let inputs = document.querySelectorAll('input');
// inputs.forEach((ele,idx)=>{
//     ele.addEventListener('focus',()=>{
//         console.log(ele.getBoundingClientRect())
//     })
// })


// Object.assign( Keyboard.prototype, EventDispatcher.prototype );

var key;

var getKeyboard = function () {
	if ( key ) {
		return key
	} else {
		key = new Keyboard();
		key.create();
		return key;
	}

}
module.exports = getKeyboard;

// if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(function() {
//         return key;
//     });
// } else if (typeof module !== 'undefined' && module.exports) {
//     module.exports = key;
// } else {
//     window.Keyboard = key;
// }
