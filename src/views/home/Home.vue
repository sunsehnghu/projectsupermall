<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <tab-control class="tab-control"    :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        ref="tabControl1" v-show="isTabFixed"/>
        <scroll class="content" ref="scroll" 
        :probe-type="3" @scroll="contentScroll" 
        :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view/>
        <tab-control class="tab-control"    :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        ref="tabControl2"/>
        <goods-list :goods="goods[currentType].list"></goods-list>
       </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
   
   import  HomeSwiper from './childComps/HomeSwiper'
   import RecommendView from './childComps/RecommendView'
   import FeatureView from './childComps/FeatureView'

   import NavBar from 'components/common/navbar/NavBar'
   import TabControl from 'components/content/tabControl/TabControl'
   import GoodsList from 'components/content/goods/GoodsList'
   import Scroll from 'components/common/scroll/Scroll'
   import BackTop from 'components/content/backTop/BackTop'

   import {getHomeMultidata,getHomeGoods} from 'network/home'

   import {debounce} from '../../common/utils'
  
export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            // result:null
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
            itemImgListener:null

        }
    },
    //设置首页位置的保持
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,100)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        //1.保存Y值
        this.saveY = this.$refs.scroll.getCurrentY()
        //2.取消全局事件的监听
        this.$bus.$off('itemImagLoad',this.itemImgListener)
    },
    created() {
        //1.请求多个数据
        this.getHomeMultidata()
        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
        //3.赋值
        
        
    },
    mounted() {

        const refresh =debounce( this.$refs.scroll.refresh)
        //3.监听item中图片加载完成
        this.itemImgListener=()=>{
              refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener
            
            //  this.$refs.scroll.refresh()
            // refresh()
        )
        //2.获取tabcontrol的offsettop
        //所有的组件都有一个$el属性，用来获取组件的元素
        // console.log(this.$refs.TabControl.$el.offsetTop); 
    },
    methods: {
       
         //*事件监听的相关方法
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop'
                    break
                case 1:
                    this.currentType='new'
                    break
                case 2:
                    this.currentType='sell'
                    break
            }
            this.$refs.tabControl1.currentIndex =index;
            this.$refs.tabControl2.currentIndex =index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
            //判断Backtop是否显示
            this.isShowBackTop=(-position.y)>1000
            //2.判断tabcontrol是否吸顶（position：fixed）
            this.isTabFixed=(-position.y)>this.tabOffsetTop
        },
        loadMore(){
            this.getHomeGoods(this.currentType)

            this.$refs.scroll.scroll.refresh()//加载完之后刷新一次 从新计算高度
        },
        swiperImageLoad(){
             this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop 
        },
        
        //* 网络请求相关的方法
        
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
            // console.log(res);
            // this.result=res;
            this.banners=res.data.banner.list,
            this.recommends=res.data.recommend.list
        })
        },
        getHomeGoods(type){
            const page =this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page +=1
                    // 完成了上拉加载更多
              this.$refs.scroll.finishPullUp()
        })
        }
    },
}
</script>
<style scoped>
     #home{
         padding-top:44px ;
         height: 100vh;
         position: relative;
     }
    .home-nav{
        background-color: var(--color-tint);
        color:#fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        
    }
    /* .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
        
    } */
    /* .content{
        height: calc(100% - 93px);
        
        overflow: hidden;
        margin-top: 70px;
        
    } */
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
</style>