<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" :pullUpLoad="true">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        </scroll>

        
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import Scroll from 'components/common/scroll/Scroll'
import {getDetail ,Goods, Shop} from '../../network/detail'
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo
    },
    data() {
        return {
            iid: null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{}
        }
    },
    created() {
        //1.保存传入的iid
        this.iid =this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // console.log(res);
            //1.获取顶部的图片轮播数据
            const data =res.result
            this.topImages =res.result.itemInfo.topImages
             //2.获取商品信息
        this.goods =new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        //3.创建我们的店铺信息
        this.shop =new Shop(res.result.shopInfo)
        //4.获取商品详细信息
        this.detailInfo =data.detailInfo
        
        })
       

       
    },
}
</script>
<style scoped>
    #detail{
        position: relative;
        z-index:99;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>