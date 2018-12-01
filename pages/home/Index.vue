<template>
    <div>
    <app-content>
     
       <swiper ref="banner">
        <swiper-item v-for="item in bannerList" :key="item.id">
            <img class="banner-img" :src="item.imageurl"/>
        </swiper-item>
    </swiper>
      <ul class="now-playing">
         <li class="item" v-for="item in nowplaying" @click="goplaydata(item)" :key='item.id'>
             <img :src="item.img">
             <div class="item-content">
                 <h4>{{item.name}}</h4>
                 <p>{{item.cinemaCount}}家上映{{item.watchCount}}人购票</p>
                 <span>{{item.grade}}分</span>
             </div>
         </li>
         <div class="tip-warp">
             <p class="tip" @click="gofilmaspage('play')">更多热映电影</p>
         </div>
      </ul>

         <ul class="coming-soon">
             <p class="Title">即将上映</p>
            <li class="item" v-for="item in comingson" @click="gocomingdata(item)" :key='item.id'>
                <img :src="item.img">
                <div class="item-content">
                    <h4>{{item.name}}</h4>
                   <span>{{item.premiereAt | a}}</span>
                    
                </div>
            </li>
            <div class="tip-wrap">
                <p class="tip" @click="gofilmaspage('now')">跟多即将上映的</p>
            </div>
        </ul>

    </app-content>
    <router-view></router-view>
</div>
</template>
<script>
import {gethomebannerdata,getnowplayingdata,getcomingsondata} from '../../server/homeService.js'
import Swiper from '../../common/Swiper.vue'
import SwiperItem from '../../common/SwiperItem.vue'

export default {
    components:{
        Swiper,
        SwiperItem
    },
    data(){
        return {
            bannerList:[],
            nowplaying:[],
            comingson:[]
        }
    },
    methods:{
        gofilmaspage(flag){
            this.$router.push({
                name:'films',
                params:{
                    flag
                }
            })
        },
        goplaydata(item){
            this.$router.push({
                name:'home-deta',
                params:{
                    id:item.id,
                    buy:true
                }
            })
        },
        gocomingdata(item){
            this.$router.push({
                name:'home-deta',
                params:{
                    id:item.id,
                    buy:false
                }
            })
        }
    },
    mounted() {
        gethomebannerdata().then((result)=>{
           // console.log(result)
            this.bannerList = result
             this.$nextTick(()=>{
                // console.log('渲染完成');//才会有多个轮播页面的dom中
                //调用轮播视图执行更新
                this.$refs.banner.updateDOM();
            });
        }),
        getnowplayingdata(1,5).then(({result})=>{
            //console.log(result)
            this.nowplaying=result
        }),
        getcomingsondata(1,5).then(({result})=>{
            this.comingson=result
        })
    }
}
</script>

<style scoped>
 .banner-img{
     width: 100%;
     
 }
 .now-playing,.coming-soon{
     background: #ccc;
     padding: 20px
 }
 .now-playing img,.coming-soon img{
     width: 100%;
 }
 .now-playing .item,.coming-soon .item{
     margin-bottom: 20px;
     background: #fff;
 }
 .item-content{
     padding: 10px;
     font-size: 12px;
     position: relative;
 }
 .item-content h4{
     font-size: 12px;
     font-weight: normal;
    
 }
 .item-content p{
     color: #9a9a9a;
 }

 .item-content span{
     position: absolute;
     right: 12px;
     top: 10px;
     bottom: 0;
     font-size: 18px;
     color: #f78360
 }
 .coming-soon .item-content span{
     font-size: 12px
 }
 .coming-soon{
    position: relative;
}
 .coming-soon .Title{
     position: absolute;
     top: -25px;
     left: 0;
     height: 12px;
     font-size: 12px;
     line-height: 12px;
     padding: 4px;
     background: #a7a7a7;
     color: #eee;
     margin-left: 50%;
     border-radius: 10px;
     transform: translateX(-50%);
 }
 .coming-soon::before{
     content: "";
     display: block;
     width: 100%;
     height: 1px;
     position: absolute;
     background: #a7a7a7;
     top:-16px;
     left: 0;
 }
 .tip{
     margin: 0 auto;
     width: 60%;
     height: 28px;
     border: 1px solid #aaa;
     border-radius: 14px;
     font-size: 12px;
     color: #616161;
     text-align: center;
     line-height: 28px;
     
 }
 .tip-warp{
     padding-bottom: 40px;
 }
</style>