import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
const state ={
    cityname:null,
    homename:'卖座电影'
}
const mutations ={
    modify(state,value){
        state.cityname =value
    },
    name(state,value){
        state.homename=value
    }
}
const actions ={
    getlocationg(context){
        //获取app使用的地址
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                console.log('获取成功')
                let longtitude =position.coords.longtitude
                let latitude =position.coords.latitude
                //请求后台
                axios.get('/api/getcityname',{
                    params:{
                        longtitude,
                        latitude
                    }
                }).then(res=>{
                    //得到城市位置 然后赋值给全局状态
                    let city= res.data.cityname;
                    context.commit('modify',city)
                })
            },
            (error)=>{
                console.log('获取失败')
            }
        )

        //模拟数据  假装请求成功
        let longtitude ='114'
        let latitude ='22'
       //请求成功
        let city= '深圳';
        //赋值
            context.commit('modify',city)
    },
    changeLocating(context,params){
        context.commit('modify',params)
       
    },
    changename(homename){

    }
}

//创建仓库
const store =new Vuex.Store({
    state,
    actions,
    mutations
})
export default store