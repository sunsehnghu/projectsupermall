import {debounce} from './utils'
export const itemListenerMixin={
    mounted() {
        const refresh =debounce( this.$refs.scroll.refresh)
        this.itemImgListener=()=>{
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener
            //    refresh()
        )
       console.log('我是混入中的内容');
    },
}