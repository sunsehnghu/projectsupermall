<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="content">
        <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
        <tab-content-category class="tab-content-category" :subcategories="showSubcategory"></tab-content-category>
        </div>
    </div>

    
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'

import{getCategory,getSubcategory,getCategoryDetail} from 'network/category'

export default {
    name:"Category",
    components:{
        NavBar,
        TabMenu,
        TabContentCategory
    },
    data() {
        return {
            categories:[],
            categoryData:{},
            currentIndex:-1,
            
            

        }
    },
    created() {
        //请求分类数据
        this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    // if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
    },
    methods: {
        _getCategory(){
            getCategory().then(res=>{
                console.log(res);
                //获取分类数据
                this.categories =res.data.category.list
                // 2.初始化每个类别的子数据
                for(let i =0;i<this.categories.length;i++){
                    this.categoryData[i]={
                        subcategories:{},
                        //  categoryDetail:{
                        //     'pop':[],
                        //     'new':[],
                        //     'sell':[]
                        //  }
                    
                     }
                }
                //请求第一个分类的数据
                this._getSubcategories(0)
            })
        },
        _getSubcategories(index){
             this.currentIndex=index
             const mailKey=this.categories[index].maitKey;
             getSubcategory(mailKey).then(res=>{
                 console.log(res);
                 this.categoryData[index].subcategories=res.data
                  this.categoryData = {...this.categoryData}
                 



             })

        },
        // _getCategoryDetail(type){
        //         //获取请求的miniWallkey
        //         const minWallkey =this.categories[this.currentIndex].miniWallkey
        //         //2.发送请求，传入miniWallkey和type
        //         getCategoryDetail(miniWallkey,type).then(res=>{
        //              console.log(res);
        //         })

        // },
         /*事件响应相关的方法*/
    selectItem(index){
        this._getSubcategories(index)
    }
    },
   
}
    
</script>
<style scoped>
.category{
    height: 100vh;
}
     .nav-bar{
         background-color: var(--color-tint);
         color: #fff;
         height: 44px;
         position: flex;
         top: 0;
         right: 0;
         left: 0;
         

     }
     .tab-content-category{
         height: 100%;
         flex: 1;
     }
      .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
</style>