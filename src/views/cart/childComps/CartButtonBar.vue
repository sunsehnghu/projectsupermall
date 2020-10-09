<template>
    <div class="button-bar">
        <div class="check-button">
        <check-button :is-checked="isSelcetAll" @click.native="checkClick"/>        
        </div>
        <span>全选</span>
        <div class="price">
            合计：{{totolPrice}}
        </div>
        <div class="calculate"> 
            <div class="calulate-item" @click="calcClick"> 去计算({{checkLength}})</div>
        </div>
    </div>
</template>
<script>
import CheckButton from 'components/content/Checkbutton/CheckButton'
export default {
    name:"CartButtonBar",
    components:{
        CheckButton
    },
    computed: {
        totolPrice(){
            return '￥'+this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return  preValue+item.price * item.count
            },0).toFixed(2)
        },
         checkLength(){
        return  this.$store.state.cartList.filter(item=>item.checked).length
    },
        isSelcetAll(){
            if(this.$store.state.cartList.length ===0) return false
            //高阶函数
            // return !(this.$store.state.cartList.filter(item=>!item.checked).length)

            //遍历结果
            for(let item of this.$store.state.cartList){
                if(!item.checked){
                    return false
                }
            }
             return true
        }
    },
   methods: {
       checkClick(){
           if(this.isSelcetAll){//全部选中
        //       for(let item of this.$store.state.cartList){
        //           if(item.checked)
        //          return item.checked =false
        //       }
        //    }
        //    else{
        //        for(let item of this.$store.state.cartList){
        //           return item.checked =true
                  
        //       }
        //    }
        // console.log('checkClick');
       this.$store.state.cartList.forEach(item=>item.checked =false)
       }
       else{
           this.$store.state.cartList.forEach(item=>item.checked =true)
       }
   },
   calcClick(){
       if(!this.isSelcetAll){
            this.$toast.show('请选择购买的商品',2000)
            }
   }
   },
}
</script>
<style scoped>

    .button-bar{
        height: 40px;
        background-color: #eee;
        position:relative;
        display: flex;
        font-size: 14px;
        
    }
    .check-button{
        width: 18px;
        height: 18px;
        margin-top: 5px;
        margin-left: 3px;
        
    }
    .button-bar span{
        margin-top: 11px;
        margin-left: 8px;
    }
    .price{
        margin-left: 20px;
        margin-top: 11px;
    }
    .calculate{
        margin-left: auto;
        
        background: red;
        
        width: 100px;
    }
    .calulate-item{
        margin-top: 11px;
        text-align: center;
    }
    
</style>