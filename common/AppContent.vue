<template>
    <div class="content" ref="content">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        recive:Boolean
    },
    methods:{
    refreshDOM(){
        this.myScroll.refresh()
    },
    scrollTo(y){
        if(y>0){
            return
        }
        if(y<this.myScroll.maxScrollY){
            this.myScroll.scrollTo(0,this.myScroll.maxScrollY,200)
            return
        }
        this.myScroll.scrollTo(0,y,200)
    }
    },
    mounted() {
       let myScroll = new IScroll(this.$refs.content,{
                  scrollbars: true, mouseWheel: true,
                  probeType:3
        })
        this.myScroll =myScroll
        //延迟器
        // setInterval(function(){
        //     myScroll.refresh()
        // },1000)
        //滚动钱识别最新的数据
        myScroll.on('beforeScrollStart',()=>{
            myScroll.refresh()
        });
        if(this.recive){
              myScroll.on('scroll',()=>{
                //console.log('正在滚动')
                //当前滚动距离-最大滚动范围
                //console.log(myScroll.y-myScroll.maxScrollY)

                this.$emit('onsroll',myScroll.y-myScroll.maxScrollY)
        })
        }
      
    },
}
</script>

<style scoped>
.content{
    background:#fff;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
