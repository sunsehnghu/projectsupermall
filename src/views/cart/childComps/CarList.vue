<template>
    <div class="cart-list">
        <scroll class="content" :pullUpLoad="true" ref="scroll">
        <cart-list-item v-for="(item) in cartList" :key="item.index" :item-info="item"></cart-list-item>
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
    methods: {
        activated() {
        this.refs.scroll.refresh()
    }, 
    },
   
}
</script>
<style scoped>
    .cart-list{
        height: calc(100vh - 44px - 49px - 40px );
    }
    .content{
        height: 100%;
        overflow: hidden;
    }
</style>