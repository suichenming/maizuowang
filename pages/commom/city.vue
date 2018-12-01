<template>
    <app-content class="citylist" ref="content">
        <h5>GPS定位你所在城市</h5>
        <p>深圳</p>
        <h5>热门城市</h5>
        <ul class="commi">
            <li>北京</li>
            <li>上海</li>
            <li>深圳</li>
            <li>广州</li>
        </ul>
        <h5>按字母排序</h5>
        <ul class="cityitem">
            <li v-for="(city,index) in cityList"
                @click="skip(index)"
             :key="index">{{city.letter}}</li>
        </ul>


       <div v-for="city in cityList" :key="city.letter" ref="citydom">
          <h3 class="solt"> {{city.letter}}</h3>
          <ul class="citiobj">
              <li v-for="cityobj in city.data" :key="cityobj.id"
               @click="selecity(cityobj)">
                  {{cityobj.name}}
              </li>
          </ul>
       </div>
    </app-content>
</template>
<script>
import {getcitylisturl} from '../../server/homeService.js'

export default {
    data(){
        return {
            cityList:[]
        }
    },
    methods:{
        skip(index){
            //console.log(this.$refs)
            //console.log(index)
            let top = this.$refs.citydom[index].offsetTop
            //console.log(this.$refs.citydom[index].offsetTop)
            this.$refs.content.scrollTo(top*(-1))
        },
        selecity(city){
            //修改全局状态
            this.$store.dispatch('changeLocating',city.name)
            //返回首页
            this.$router.push('/')
        }
    },
    mounted() {
        getcitylisturl().then(result=>{
                //console.log(result)
                this.cityList=result
                
        })
    },
}
</script>
<style scoped>
.citylist{
    width: 100%;
   
}
.citylist h5{
    font-size: 14px;
    font-weight: normal;
    padding-left: 15px;
    line-height: 40px;
    background: #ebebeb;
}
.citylist p{
    padding-left: 18px;
    color: #e2941a;
    line-height: 46px;
    font-size: 16px;
}
.commi{
    width: 100%;
    display: flex
}
.commi li{
     flex: 1;
    font-size: 16px;
    text-align: center;
    line-height: 46px;
    color: #838383;
}
.cityitem{
    width: 100%;
}
.cityitem li{
    display: inline-block;
    width: 25%;
     font-size: 16px;
    text-align: center;
    line-height: 46px;
    color: #838383;
    border-bottom: #ebebeb 1px solid;
}
.solt{
     font-size: 14px;
    font-weight: normal;
    padding-left: 15px;
    line-height: 40px;
    background: #ebebeb;
}
.citiobj{
width: 100%;
}
.citiobj li{
  display: inline-block;
    width: 25%;
     font-size: 16px;
    text-align: center;
    line-height: 46px;
    color: #838383;
    border-bottom: #ebebeb 1px solid;
}
</style>
