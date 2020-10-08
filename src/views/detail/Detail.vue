<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" :pullUpLoad="true" ref="scroll" @scroll="contentScroll">
            
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment"   :comment-info="commentInfo"></detail-comment-info>
        <goods-list  ref="recommend"  :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
         <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
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
        DetailBottomBar,
        GoodsList,
        BackTop
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
            getThemeTopY:null,
            itemImgListener:null,
            currentIndex:0,
            isShowBackTop:false,

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
       //4.给getThemeTopY赋值(对给this.themetopys赋值的操作进行防抖)
       this.getThemeTopY =debounce(()=>{
                 this.themeTopYs =[]
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
       },200)

       
       
    },
    mounted() {
      //home中没有改  可以参考 这里新引进了混合函数itemListenerMixin
       
    },
     destroyed(){
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
    

      
    methods: {
        detailImageLoad(){
           this.refresh()
           this.getThemeTopY()
        //     this.themeTopYs =[]
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        },
        titleClick(index){
             this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
            //.获取y值
              const positionY = -position.y
              //2.poistion中的y与主题中的进行对比
              //[0,3000,6000,9000]
              //poistion 在0与3000之间 index为0 3000-6000 index为 3 以此类推
              for(let i =0;i<this.themeTopYs.length;i++){
                  if( this.currentIndex!=i && i<this.themeTopYs.length-1 && positionY>=this.themeTopYs[i] &&positionY<this.themeTopYs[i+1]){
                      this.currentIndex =i
                      this.$refs.nav.currentIndex = this.currentIndex
                  }
                  else if(this.currentIndex!=i && i == this.themeTopYs.length-1 && positionY>=this.themeTopYs[i]){
                      this.currentIndex=i
                      this.$refs.nav.currentIndex = this.currentIndex
                  }
              }
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
            //判断Backtop是否显示
            this.isShowBackTop=(-position.y)>1000
           
        }, 
         addToCart(){
             //1.获取购物车展示的信息
             const product ={}
              
             product.image=this.topImages[0]
             product.title=this.goods.title
             product.desc =this.goods.desc
             product.price=this.goods.realPrice
             product.iid =this.iid
             
             
            
             //2.将商品添加到购物车中
            //  this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
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
        height: calc(100% - 44px - 49px);
    }
</style>