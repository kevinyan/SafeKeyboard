class Pubsub {
	constructor(){
		this.handlers = {};
	}

	on(eventType, handler){
        if(!(eventType in this.handlers)) {
           this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
        console.log()
        return this;
    }


    emit(eventType){
       var handlerArgs = Array.prototype.slice.call(arguments,1);
       for(let i = 0; i < this.handlers[eventType].length; i++) {
         this.handlers[eventType][i].apply(this,handlerArgs);
       }
       return this;
    }


	off(eventType, handler){
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--){
                if (currentEvent[i] === handler){
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
}

export default Pubsub





// demo:
// let pubsub = new Pubsub();
// pubsub.on('A', function(data){
//             console.log(1 + data);
//  });
// pubsub.emit('A', 'test');