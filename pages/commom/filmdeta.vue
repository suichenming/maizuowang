<template>
    <app-content class="page">
        <div class="poster">
        <img :src="init.img">
        </div>

        <h3 class="tip">影片简介</h3>
        <p class="info">导演：{{init.director}}</p>
        <p class="info">主演：
            <span  v-for="item in name" :key="item.name">{{item.name}} | </span>
            </p>
        <p class="info" >地区语言：{{init.language}}</p>
        <p class="info">类型：{{init.category}}</p>
        <p class="info">上映日期：{{init.premiereAt | a('date')}}</p>
        <p class="info">{{init.synopsis}}</p>


        <div v-if="this.buy" class="ticket">立即购票</div>
    </app-content>
</template>
<script>
import {getfilmdeta} from '../../server/homeService.js'
export default {
    props:['id','buy'],
    data(){
        let id =this.id, buy=this.buy
        if(typeof this.id !='number'){
            id=Number(this.id)
        }
       if(typeof this.buy !='Boolean'){
           buy=this.buy =='true'?true:false
       }
        return {
            filmID :id,
            filmBuy:buy,
            init:{},
            name:[]
        }
    },
    mounted() {
        getfilmdeta(this.filmID).then(result=>{
            //console.log(result)
            this.init =result
            this.name=this.init.actors
            let obj = this.init.actors.map(item=>{
                //console.log(item)
            })
            //console.log(this.init.actors)
        })
    },
}

</script>


<style scoped>
.page{
    background: #EBEBEB
}
.poster img{
    width: 100%;
}
.tip{
    margin: 20px 0;
    font-size: 16px;
    font-weight: normal;
    border-left: 15px solid rgb(228, 200, 156);
    padding-left: 5px;
}
.info{
    font-size: 12px;
    padding: 8px 10px
}
.ticket{
    font-size: 14px;
    color:#fff;
    width: 156px;
    height: 36px;
    background: #fe8233;
    line-height: 36px;
    border-radius: 18px;
    text-align: center;
    margin: 0 auto;
    
    
}
</style>
