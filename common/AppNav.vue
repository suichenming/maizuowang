<template>
    <div class="app-nav">
        
        <transition name="fade">
        <div class="cover" v-show="showNav"></div>
        </transition>
        <div class="cover-page" v-show="showNav" @click="tabActive()"></div>

         <transition name="slide">
        <nav class="nav" v-show="showNav">
            <li class="nav-item" v-for="(val,index) in navList" :key="index" @click="changepageactive(val)">
                {{val.title}}
                
            </li>
        </nav>
         </transition>


    </div>
</template>


<script>
export default {
    data(){
        return {
            showNav:false,
            navList :[
                {title: '首页', path:'/home'},
                {title: '影片', path:'/films'},
                {title: '影院', path:'/cinemas'},
                {title: '商城', path:'/shops'},
                {title: '我的', path:'/mine'},
                {title: '卖座卡', path:'/cards'}
            ]
        }
    },
    methods:{
        tabActive(){
            this.showNav = false
        },
        changepageactive(val){
           this.$router.push(val.path)
           this.showNav=false
           this.$store.state.homename = val.title
            if(this.$store.state.homename=="首页"){
                this.$store.state.homename="卖座电影"
            }
           console.log(this.$store.state.homename)
        }
     
    },
     mounted(){
         //监听Appheader.vue里面的show-nav
          this.$pubsub.$on('show-nav', ()=>{
            this.showNav = true;
        });
      }
}
</script>


<style scoped>
    .app-nav{
        width: 100%;
        height: 100%;
    }
    .cover{
        width: 100%;
        position: absolute;
        top:50px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5)
    }
    .cover-page{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
    }
    .nav{
        width: 70%;
        position:absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        background: #282828
    }
    .nav-item{
        color: #999;
        line-height: 50px;
        padding: 0 16px;
        border-bottom: 1px solid #333;
        font-size: 14px;
    }
    @keyframes fadeIn{
        0%{opacity: 0}
        100%{opacity: 1}
    }
    @keyframes fadeout{
        0%{opacity: 1}
        100%{opacity:0}
    }
    .fade-enter-active{
        animation: fadeIn 300ms
    }
    .fade-leave-active{
        animation: fadeout 300ms
    }
    @keyframes slidein{
        0%{transform: translateX(-100%)}
        100%{transform: translateX(0%)}
    }
    @keyframes slideout{
        0%{transform:translateX(0)}
        100%{transform: translateX(-100%)}
    }
    .slide-enter-active{
        animation: slidein 300ms
    }
    .slide-leave-active{
        animation:slideout 300ms
    }
</style>
