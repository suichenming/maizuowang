<template>
<div>
<app-content>
   <ul>
       <li class="listcity" v-for="city in citylist" :key="city.name">
         
           <h4 @click="showactive(city.name)">{{city.name}}</h4>
          
           <ul class="area-list" v-if="city.show">
               <li v-for="name in city.data" :key="name.id" @click="gotolist(name)">
                    <h5> {{name.name}}
                    <i class="iconfont icon-arrow-right"></i>
                    </h5>
                    <p class="address">{{name.address}}</p>
                    <span class="labels" v-if="name.labels">可乐爆米花</span>
               </li>
           </ul>
       </li>
   </ul>
</app-content>
<router-view></router-view>
</div>
</template>
<script>
import {getcittlist} from '../../server/homeService'
export default {
    data(){
        return {
            citylist:[]
        }
    },
    methods:{
        showactive(city){
            //console.log(city)
            this.citylist[city].show=!this.citylist[city].show
        },
        gotolist(name){
           this.$router.push({
               name:'cinemas-deta',
               params:{
                   id:name.id,
                   address:name.address,
                   name:name
               }
           })
        }
    },
    mounted() {
        getcittlist().then(item=>{
            this.citylist=item
           // console.log(item)
            
        })
    },
}
</script>

<style scoped>


.listcity h4{
    font-size: 16px;
    font-weight: normal;
      line-height: 40px;
    background: #e1e1e1;
    border-bottom: 1px solid #fff;
    color: #636363;
    padding-left: 10px;
}
.area-list li{
    border-bottom: 1px solid #ccc;
     padding-left: 10px;
}
.area-list h5{
    position: relative;
    font-size: 16px;
    font-weight: normal;
    line-height: 40px;
}
.area-list h5 i{
    position: absolute;
    right: 30px;
}
.area-list .address{
    font-size:  12px;
    color: #ccc;
    width: 200px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
}
.area-list .labels{
    display: inline-block;
    background: #51add0;
    padding:0 5px;
    font-size: 8px;
    color: #fff;
    border-radius: 3px;
    margin-bottom: 15px;
}
</style>
