<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
        <scroll class="content" :pullUpLoad="true" ref="scroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment"   :comment-info="commentInfo"></detail-comment-info>
        <goods-list  ref="recommend"  :goods="recommends"/>
        </scroll>

        
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import {getDetail ,Goods, Shop,GoodsParam,getRecommend} from '../../network/detail'
import {debounce} from '../../common/utils.js'
import {itemListenerMixin} from '../../common/mixin'
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList
    },
    mixins:[itemListenerMixin],
    data() {
        return {
            iid: null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],

            itemImgListener:null

        }
    },
    created() {
        //1.保存传入的iid
        this.iid =this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            console.log(res);
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
        //5.获取商品参数的信息
        this.paramInfo =new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //取出评论信息
         if(data.rate.cRate !== 0){
             this.commentInfo =data.rate.list[0]
         }
      
        })
       //3.取出推荐数据
       getRecommend().then(res=>{
           this.recommends =res.data.list
          
       })
       
    },
    mounted() {
      //home中没有改  可以参考 这里新引进了混合函数itemListenerMixin
       
    },
     destroyed(){
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
      updated() {
          this.themeTopYs =[]
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
          

      },
    methods: {
        titleClick(index){
             this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        }
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