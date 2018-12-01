<template>
   <header class="app-header">
       <span class="iconfont icon-menu menu" @click="shouNavActive()"></span>
       <h1 class="title">{{$store.state.homename}}</h1>
       <span class="city" @click="gocity()">
           <!-- {{city}} -->
           {{$store.state.cityname}}
           <i class="iconfont icon-arrow-down"></i>
       </span>
       <span class="iconfont icon-user user"></span>
   </header>
</template>

    <script>
     //import Vuex from 'vuex'
    export default {
    //    computed:Vuex.mapState({
    //         city:'cityname'
    //     }),
        methods:{
            shouNavActive(){
                //关联与AppNav里面的事件
             this.$pubsub.$emit('show-nav');
            },
        gocity(){
            this.$router.push({name:'city'})
        }
        }
    }
    </script>
    


<style>
.app-header{
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    background: #282828;
    color: #999999;
    line-height: 50px;
}
.icon-menu{
    width: 50px;
    text-align: center;
    font-size: 20px;
    border-right: 1px solid #222;
    box-shadow: 1px 0 1px #363636;
}
.title{
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    font-style: normal;
    flex: 1
}
.city, .user{
    font-size: 12px;
    width: 50px;
    text-align: center
    
}
</style>
