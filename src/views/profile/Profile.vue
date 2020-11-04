<template>
    <div>
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <div class="top-bar">
               <img src="~assets/img/profile/timg.jpg" alt="">
               <div class="phone"><img src="~assets/img/profile/phone.svg" alt=""></div>
               <ul class="title">
                   <li>登录/注册</li>
                   <li>暂无绑定的手机号</li>
               </ul>
               <div class="right">
                   <span>></span>
               </div>
         </div>           
               <div class="jifen">
                    <div class="_left">
                        <!-- <span>0.00元</span><br>
                        <span>我的余额</span> -->
                        <ul>
                            <li><span>0.00</span>元</li>
                            <li>我的余额</li>
                        </ul>
                    </div>
                    <div class="_center">
                        <!-- <span>0个</span><br>
                        <span>我的优惠</span> -->
                        <ul>
                            <li><span>0</span>个</li>
                            <li>我的优惠</li>
                        </ul>
                    </div>
                    <div class="_right">
                        <!-- <span>0分</span><br>
                        <span>我的积分</span> -->
                        <ul>
                            <li><span>0</span>个</li>
                            <li>我的积分</li>
                        </ul>
                    </div>
               </div>
               <div class="button">
                  <div class="one">
                      <img src="~assets/img/profile/message.svg" alt="">
                     <span>我的消息</span> 
                  </div>
                  <div class="two">
                      <img src="~assets/img/profile/pointer.svg" alt="">
                     <span>积分商城</span> 
                  </div>
                  <div class="three">
                      <img src="~assets/img/profile/vip.svg" alt="">
                     <span>会员卡</span> 
                  </div>
                  <div class="four">
                      <img src="~assets/img/profile/cart.svg" alt="">
                     <span>会员卡</span> 
                  </div>
                  <div class="five">
                      <img src="~assets/img/profile/shopping.svg" alt="">
                     <span>下载购物app</span> 
                  </div>
               </div>
    </div>
</template>
<script>
   import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"Profile",
    components:{
        NavBar
    }
}
</script>
<style scoped>
    .nav-bar{
        background-color: #FC5C76;
        color: #ffff;
        box-sizing: border-box;

    }
    .top-bar{
        height: 100px;
        width: 100%;
        background-color: #F85F78;
        display: flex;
      
        
    }
    .top-bar img{
        height: 65px;
        margin-top:17px;
        margin-left: 23px;
        border-radius: 50%;
    }
    .phone img{
        width: 20px;
        height: 15px;
        margin-top: 48px;
    }
    .title{
        list-style:none;
        margin-top: 30px;
        color: #ffff;
        font-size: 15px;
        
    }
   .right{
       margin-left: 100px;
       line-height: 100px;
       color: #fff;
       font-size: 20px;
   }
   .jifen{
       height: 100px;
       width: 100%;
       display: flex;
       /* box-shadow: 2px 2px 15px  #EEECEC; */
       border-bottom: 10px solid #EEECEC;
   }
   ._left{
       flex: 1;
       text-align: center;
       margin-top: 35px;
       
   }
   ._left span{
       color: #F85F78;
   }
   
   ._center{
       flex: 1;
       margin-top: 35px;
       text-align: center;  
   }
   ._center span{
       color: #F85F78;
   }
   ._center ul li{
       list-style: none;
   }
   ._right{
       flex: 1;
       list-style: none;
       margin-top: 35px;
       text-align: center;
   }
   ._right span{
       color: #F85F78;
   }
   ._right ul li{
       list-style: none;
   }
   .one{
       height: 40px;
       width: 100%;
       border-bottom: 2px solid #EEECEC;
       display: flex;
       
   }
   .one img{
       height: 20px;
       width: 20px;
       margin-left: 15px;
       margin-top: 10px;
       
       
   }
   .one span{
       margin-left: 10px;
       margin-top: 12px;
   }
   .two{
       height: 40px;
       width: 100%;
       box-sizing: border-box;
       display: flex;
       border-bottom: 2px solid #EEECEC;
       
   }
   .two img{
       height: 20px;
       width: 20px;
       margin-left: 15px;
       margin-top: 10px;
       
       
   }
   .two span{
       margin-left: 10px;
       margin-top: 12px;
   }
    .three{
       height: 40px;
       width: 100%;
       box-sizing: border-box;
       display: flex;
       border-bottom: 2px solid #EEECEC;
       
   }
   .three img{
       height: 20px;
       width: 20px;
       margin-left: 15px;
       margin-top: 10px;
       
       
   }
   .three span{
       margin-left: 10px;
       margin-top: 12px;
   }
   .four{
       height: 40px;
       width: 100%;
       box-sizing: border-box;
       display: flex;
       border-bottom: 2px solid #EEECEC;
       
   }
   .four img{
       height: 20px;
       width: 20px;
       margin-left: 15px;
       margin-top: 10px;
       
       
   }
   .four span{
       margin-left: 10px;
       margin-top: 12px;
   }
   .five{
       height: 40px;
       width: 100%;
       box-sizing: border-box;
       display: flex;
       border-bottom: 2px solid #EEECEC;
       
   }
   .five img{
       height: 20px;
       width: 20px;
       margin-left: 15px;
       margin-top: 10px;
       
       
   }
   .five span{
       margin-left: 10px;
       margin-top: 12px;
   }
   
</style>