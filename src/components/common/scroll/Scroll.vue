<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    data() {
        return {
            scroll:null,
            
        }
        
    },
    props:{
       probeType:{
           type:Number,
           default:0
       },
       pullUpLoad:{
           type:Boolean,
           default:false
       }
    },
    mounted() {
        //创建bscroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            click:true,
            
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        this.scroll.refresh()
        //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)
        })
        this.scroll.refresh()
        //3.监听上拉事件
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
        
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            
           this.scroll && this.scroll.refresh()
        },
        getCurrentY(){
            return this.scroll.y ? this.scroll.y : 0
        }
    },
    
}
</script>
<style scoped>
    
</style>