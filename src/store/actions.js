import {ADD_COUNTER,ADD_TO_CART} from './mutation-type'
export default{
    addCart(context,payload){
        //payload新添加的商品
        //查找商品中是否有该商品
      let oldProduct =null;
     
      for(let item of context.state.cartList){
          if(item.iid === payload.iid){
              oldProduct =item
          }
         
      }
      //2.判断oldProduct
      
      if(oldProduct){
          
        //  oldProduct.count++
        context.commit(ADD_COUNTER,oldProduct)
      }else{
         payload.count=1
         context.commit(ADD_TO_CART,payload)
      }

        
    }
}