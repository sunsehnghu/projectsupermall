<template>
    <div class="tab-bar-item" @click="itemclick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
        <!-- <img src="../../assets/img/tabbar/首页.png" alt="">
        <div>首页</div>              -->
    </div>
</template>
<script>
export default {
    name:"tabbaritem",
    data() {
        return {
            // isActive: true
        }
    },
    computed: {//动态决定当点击为活跃的时候选择true的状态
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1
        },
        activeStyle(){
            return this.isActive ? {color: this.activeColor} :{}
        }
    },
    props:{
       path: String,
       activeColor:{
           type:String,
           default:'red'
       }
        
    },
    methods: {
        itemclick(){
       this.$router.replace(this.path).catch(()=>{})//catch抛出报错
        },
     
    },
}
</script>
<style >
    .tab-bar-item{
       flex:1;
       text-align: center;
      height: 49px;
      font-size: 14px;
     }
     .tab-bar-item img{
              width: 24px;
              height: 24px;
              margin-top: 3px;
              vertical-align: middle;
     }
    
</style>