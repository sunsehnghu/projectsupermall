<template>
    <div class="cart-list">
        <scroll class="content" :pullUpLoad="true">
        <cart-list-item v-for="(item) in cartList" :key="item.index" :product="item"></cart-list-item>
        </scroll>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CarListItem'
export default {
    name:"CartList",
    components:{
         Scroll,
         CartListItem
    },
    computed: {
        
        ...mapGetters(['cartList'])
    },
}
</script>
<style scoped>
    .cart-list{
        height: calc(100% - 44px - 49px);
    }
    .content{
        height: 100vh;
        overflow: hidden;
    }
</style>