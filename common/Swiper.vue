<template>
    <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
       <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
 </div>
</template>


<script>
   export default {
        methods: {
        updateDOM(){
            // console.log('调用了更新');
            this.swiper.update();
            this.swiper.reLoop();
            //切换回第一页
            this.swiper.slideTo(1, 0);
            this.swiper.startAutoplay();
        }
    },
       mounted(){
            this.swiper = new Swiper(this.$refs.swiper, {
                loop: true,
                autoplay:1200,
                pagination: '.swiper-pagination',
            }) 
       }
   }
</script>