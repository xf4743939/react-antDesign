function Promise(executor){

  this.promiseState='pending';
  this.promiseResult = null; 
  this.callBacks = [];

  const self =this;
  try {
    executor(resolve,reject);
  } catch (error) {
    reject(error);
  }
 
  function resolve(data){
    if(self.promiseState !== 'pending') return;
    self.promiseState = 'fulfilled';
    self.promiseResult = data
    self.callBacks.forEach(ele => {
        ele.onResolved(data)
    });
    
  
  }
  function reject(data){
    if(self.promiseState !== 'pending') return;
    self.promiseState = 'failed';
    self.promiseResult = data 
    self.callBacks.forEach(ele => {
        ele.onRejected(data)
    });
    
  }
}
Promise.prototype.then= function(onResolved,onRejected){
  const self = this;
  if(typeof onRejected !== 'function'){
    onRejected = reason =>{
      throw reason
    } 
  }
  return new Promise((resolve,reject)=>{
    function callback(type){
      try { 
        let result = type(self.promiseResult)
        if(result instanceof Promise){
          result.then((v)=>{
            resolve(v)
          },(r)=>{
            reject(r)
          })
        }else{
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }  
    }
    if(this.promiseState === 'fulfilled'){
      callback(onResolved)
     }
     if(this.promiseState === 'failed'){
      callback(onRejected)
     }
     if(this.promiseState === 'pending'){
        this.callBacks.push({
         onResolved:function(){
           callback(onResolved)
         },
         onRejected:function(){
          callback(onRejected)
         }
        })
     }
  })
}

Promise.prototype.catch =function(onRejected){
  return this.then(undefined,onRejected)
}
// Promise.prototype.resolve=function(){

// } 
// Promise.prototype.reject = function(){

// }