import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store =new Vuex.Store({
    state:{
          cartList:[],
          
    },
    mutations:{
      addCart(state,payload){
          //payload新添加的商品
        let oldProduct =null;
       
        for(let item of state.cartList){
            if(item.iid === payload.iid){
                oldProduct =item
            }
           
        }
        //2.判断oldProduct
        
        if(oldProduct){
            
           oldProduct.count++
        }else{
           payload.count=1
           state.cartList.push(payload)
        }

          
      }
    }
})
//3.挂在Vuex实例
export default store