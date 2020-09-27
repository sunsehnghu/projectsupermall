<template>
  <div id="app">
    <!-- <div id="tab-bar">
      <div class="tab-bar-item">首页</div>
      <div class="tab-bar-item">分类</div>
      <div class="tab-bar-item">购物车</div>
      <div class="tab-bar-item">我的</div>
    </div> -->
     <!-- <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/首页.png" alt="">
        首页
        </div>
      <div class="tab-bar-item"><img src="../../assets/img/tabbar/首页.png" alt="">分类</div>
      <div class="tab-bar-item"><img src="../../assets/img/tabbar/首页.png" alt="">购物车</div>
      <div class="tab-bar-item"><img src="../../assets/img/tabbar/首页.png" alt="">我的</div> -->
    <tabbar>
       <tabbaritem path="/Home">
        <img  slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img  slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div> 
        </tabbaritem>
       <tabbaritem path="/Category"> 
         <img  slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
         <img  slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div> 
       </tabbaritem>
       <tabbaritem path="/Cart"> 
         <img  slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
         <img  slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div> 
       </tabbaritem>
       <tabbaritem path="/Profile"> 
         <img  slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
         <img  slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div> 
       </tabbaritem>
       </tabbar>
       <!-- <router-view></router-view> -->
      </div>
</template>

<script>
import tabbar from 'components/common/tabbar/TabBar'
import tabbaritem from 'components/common/tabbar/TabBarItem'
export default {
  name: "MainTabBar",
  components:{
       tabbar,
       tabbaritem
  }
}
</script>

<style>
@import  "~assets/css/base.css";
/* #tab-bar{
       display: flex;
       background-color: #f6f6f6;
       position: fixed;
       left: 0;
       right: 0;
       bottom: 0;
       box-shadow: 0px -3px 1px rgba(100,100,100, 0.08);
     }
     .tab-bar-item{
       flex:1;
       text-align: center;
      height: 49px;
     }
     */
       

     
</style>
