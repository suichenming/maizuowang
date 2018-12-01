<template>
<app-content id="films" :recive="true" @onsroll="contentscroll" ref="content">
    <nav class="nav">
        <li class="nav-item" :class="{active:showflag=='play'}" @click="navacive('play')">正在热映</li>
         <li class="nav-item" :class="{active:showflag == 'now'}" @click="navacive('now')">即将上映</li>
    </nav>
    <ul v-show="showflag=='play'" class="play-content">
        <li v-for="item in playing" :key="item.id" class="play-item" @click="goto(item)">
            <img :src="item.cover">
            <div class="wrap">
                <h4>{{item.name}}</h4>
                <p class="intro">{{item.intro}}</p>
                <p class="cinemaCount">
                    <span>{{item.cinemaCount}}家影院上映</span>
                    <em>{{item.watchCount}}人购票</em>
                </p>
                <p class="grade">{{item.grade}}</p>
            </div>
        </li>
    </ul>
    <ul v-show="showflag=='now'">
         <li v-for="item in nowplay" :key="item.id" class="play-item" @click="gotolist(item)">
            <img :src="item.cover">
            <div class="wrap">
                <h4>{{item.name}}</h4>
                <p class="intro">{{item.intro}}</p>
                <p class="cinemaCount">
                    <span>{{item.premiereAt | a('date')}}家影院上映</span>
                    <em>{{item.premiereAt | a('week')}}</em>
                </p>
                <p class="grade">{{item.grade}}</p>
            </div>
        </li>
    </ul>
</app-content>
</template>
<script>
import {getnowplayingdata,getcomingsondata} from '../../server/homeService.js'
export default {
        props:{
        flag:String
    },
    data(){
        return {
            showflag:this.flag || 'play',
            playing:[],
            nowplay:[],
            playpage:1,
            nowing:1,
            count:7,
            isrequest:false,
            canrequestplay:true
        }
    },
    watch:{
    flag(newval){
      this.showflag =newval || 'play'
      this.getinitdata()
    }
    },
    methods:{
        navacive(flag){
        this.showflag =flag
        this.getinitdata()
        },
        goto(item){
            this.$router.push({
                name:'home-deta',
                params:{
                    id:item.id,
                    buy:true
                }
            })

        },
        gotolist(item){
                this.$router.push({
                name:'home-deta',
                params:{
                    id:item.id,
                    buy:false
                }
            })
        },
        //封装请求正在热映的电影
        getplaying(){
             getnowplayingdata(this.playpage,this.count).then(({result,total})=>{
            this.playing =this.playing.concat(result)
            this.$nextTick(()=>{
                this.$refs.content.refreshDOM()
                this.isrequest=false
                
               if(this.playpage>=total){
                   this.canrequestplay=false
               }

            })
        })
        },
        //封装即将上映的电影
        getnowing(){
            getcomingsondata(this.nowing,this.count).then(({result,total})=>{
                this.nowplay=this.nowplay.concat(result)
                this.$nextTick(()=>{
                    this.$refs.content.refreshDOM()
                    this.isrequest=false
                    if(this.nowing>=total){
                        this.canrequestplay=false
                    }
                })
        })
        },
        getinitdata(){
             if(this.showflag=='play' && this.playing.length == 0){
                this.getplaying()
                }
                if(this.showflag == 'now' && this.nowplay.length == 0){
                this.getnowing()
                }
                },
        contentscroll(y){
            //console.log('监听到了',y)
            if(y<100 && (!this.isrequest)){
                if(this.showflag == 'play' && this.canrequestplay){
                    this.playpage+=1
                    this.isrequest=true
                    this.getplaying()
                }
                


                if(this.showflag == 'now' && this.canrequestplay){
                    this.nowing+=1
                    this.isrequest = true
                    this.getnowing()
                }

                // this.showflag == 'now'
            }
        }

    },
    mounted() {
        //调用上面封装的
       this.getinitdata()
       
        
    },
}
</script>

<style scoped>
#films{
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
}
    .nav{
        display: flex
    }
    .nav .nav-item{
        flex: 1;
        line-height:45px;
        text-align: center;
        color: #6a6a6a;
    }
    .nav .nav-item.active{
        color: #fe6e00;
        border-bottom: 3px solid #fe6e00
    }
    .wrap{
        position: relative;
        width: 70%
    }
    .play-item{
        display: flex;
        padding: 20px 0;
        color: #8e8e8e;
        border-bottom: 1px dashed #ccc
    }
    .play-item img{
        width: 60px;
        height: 82px;
       
        margin-right: 15px;
    }
    .play-item h4{
        font-size: 12px;
        font-weight: normal;
        color: #000;
         width: 120px;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis
    }
    .play-item .cinemaCount{
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 12px;
        color:#ffb375 ;
    }
    .play-item .cinemaCount em{
        font-style: normal
    }
    .play-item .intro{
        font-size: 12px;
        line-height: 50px
    }
    .play-item .grade{
        position: absolute;
        right: 0;
        top:0; 
        font-size: 12px;
        color:#fc7103;
    }
</style>
