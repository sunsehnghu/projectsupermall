<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        
       <cart-list></cart-list>
       
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CarList'



import {mapGetters} from 'vuex'
export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        
    },
    computed: {
        ...mapGetters(['cartLength']),
        // cartLength(){
        //     return this.$store.getters.cartLength
        // }
    },
}
</script>
<style scoped>
     
     .nav-bar{
         background-color: var(--color-tint);
         color: #fff;
         font-weight: 700;
         height: 44px;
     }
     
</style>