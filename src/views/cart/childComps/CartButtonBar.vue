<template>
    <div class="button-bar">
        <div class="check-button">
        <check-button/>        
        </div>
        <span>全选</span>
        <div class="price">
            合计：{{totolPrice}}
        </div>
        <div class="calculate"> 
             去计算：{{checkLength}}
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
        margin-top: 11px;
        background: red;
        height: 50px;
        width: 100px;
    }
</style>