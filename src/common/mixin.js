import {debounce} from './utils'
export const itemListenerMixin={
    data() {
        return {
            refresh:null
        }
    },
    mounted() {
        this.refresh =debounce( this.$refs.scroll.refresh)
        this.itemImgListener=()=>{
            this.refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener
            //    refresh()
        )
    //    console.log('我是混入中的内容');
    },
}