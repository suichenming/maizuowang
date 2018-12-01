import axios from 'axios'
import API from '../app'
//请求首页轮播图的数据
export function gethomebannerdata(){
    return new Promise ((resolve,reject)=>{
     axios.get(API.HOME_BANNER_URL,{
            
        })
        .then(res=>{
            //console.log('成功')
           let data = res.data.data.billboards.map(item=>{
                return {
                    id:item.id,
                    imageurl:item.imageUrl
                }
            })
           resolve(data)
        })
        .catch(error=>{
            console.log(error+'请求失败')
        })
    })
}
//请求正在热映的电影
export function getnowplayingdata(page,count){
    return new Promise((resolve,reject)=>{
        axios.get(API.NOW_PLAYING_URL,{
          params:{
            __t:new Date().getTime(),
            page,
            count
          }
        })
        .then(res=>{
            //console.log(res.data.data.films)
            let data =res.data.data.films.map(item=>{
                return {
                  name:item.name,
                  img:item.cover.origin,
                  //多上家上映
                  cinemaCount:item.cinemaCount,
                  //评分
                  grade:item.grade,
                  //多少人购买过了
                  watchCount:item.watchCount,
                  id:item.id,
                  //封面
                  cover:item.poster.origin,
                  //介绍
                  intro:item.intro
                }
            })
            resolve({
                result:data,
                total:res.data.data.page.total,
            })
            //console.log(res.data.data.page.total)
        })
        .catch(error=>{
            console.log(error)
        })
    })
}
//正在上映的电影
export function getcomingsondata(page,count){
    return new Promise((resolve,reject)=>{
        axios.get(API.COMING_SOON_URL,{
            params:{
                __t:new Date().getTime(),
            page,
            count
            }
        })
        .then(res=>{
        //console.log(res.data.data.films)
            let data =res.data.data.films.map(item=>{
                return {
                    name:item.name,
                    img:item.cover.origin,
                    id:item.id,
                    //时间戳
                    premiereAt:item.premiereAt,
                    cover:item.poster.origin,
                    //介绍
                    intro:item.intro
                }
            })
            resolve({
                result:data,
                total:res.data.data.page.total
            })
        })
        .catch(error=>{
            console.log(error)
        })
    })
}


export function gettelephones(id){
    return new Promise((resolve,reject)=>{
        axios.get(`${API.CITYMA_LIST_URL}/${id}`,{
            params:{
                __:new Date().getTime()
            }
        })
        .then(res=>{
            //console.log('请求成功')
       // console.log(res)
            let data =res.data.data.cinema
            let init ={
                //电话
                phones:data.telephones,
                //停车公交3D
                services:data.services,
                address:data.address

            }
            //console.log(data)
            resolve(init)
        })
        .catch(error=>{
            console.log('请求失败')
        })
    })
}

export function getfilmdeta(id){
    return new Promise((resolve,reject)=>{
        axios.get(`${API.FILM_DETAIL_UTL}/${id}`,{
            params:{
                __t:new Date().getTime(),
            }
        })
        .then(res=>{
            //console.log('成功')
            //console.log(res.data.data.film)
            let data = res.data.data.film
            let init ={
                //图片封面
                img:data.cover.origin,
                //导演
                director:data.director,
                //主演
                actors:data.actors,
                //地区语言 
                language:data.language,
                //电影类型
                category:data.category,
                //上映时间
                premiereAt:data.premiereAt,
                //介绍
                synopsis:data.synopsis
            }
            resolve(init)
        })
        .catch(error=>{
            console.log(error)
            console.log('失败')
        })
    })
}



//城市请求的借口



export function getcitylisturl(){
    return new Promise((resolve,reject)=>{
        axios.get(API.CITY_LIST_URL,{
            params:{
                __t:new Date().getTime()
            }
        })
        .then(res=>{
            //console.log('成功')
            let citylist={}
            let city =res.data.data.cities
            city.map(item=>{
                //大写首字母
              let letter =item.pinyin[0]
              if(!citylist[letter]){
                  citylist[letter]=[]
              }
              citylist[letter].push(item)
            })
            //Object.keys给对象枚举属性组成的数组，对面转为数组
            //console.log(Object.keys(citylist))
           var cityarr = Object.keys(citylist).map(key=>{
               //所有的首字母
                //console.log(key)
               return {
                   letter:key,
                   data:citylist[key]
               }
           })
           for(let i= 0;i<cityarr.length;i++){
               
               let min =i;
               
               for(let j=i;j<cityarr.length;j++){
             
                   if(cityarr[j].letter<cityarr[min].letter){
                       min=j
                   }
               }
               let tmp = cityarr[i];
               cityarr[i]=cityarr[min];
               cityarr[min]=tmp
           }
           resolve(cityarr)
        })
        .catch(error=>{
            console.log(error)
            
        })
    })
    
}

//影院地区的接口

export function getcittlist(){
    return new Promise((resolve,reject)=>{
        axios.get(API.CITYMA_LIST_URL)
        .then(res=>{
            //console.log(res)
            let {cinemas} =res.data.data;
            let cinnmactte ={}
            cinemas.map((item)=>{
                //console.log(item)
                let name =item.district.name
                if(!cinnmactte[name]){
                    cinnmactte[name]={
                        data:[],
                        name:name,
                        show:false
                    }
                }
                cinnmactte[name].data.push({
                    id:item.id,
                    name:item.name,
                    //具体位置
                    address:item.address,
                    //判断是否有图标
                    itemTypes:item.itemTypes,
                    //判断是否有小吃
                    labels:item.labels.length>0,
                    //距离
                    geocode:item.geocode
                })
            })
            resolve(cinnmactte)
        })
        .catch(error=>{
            console.log('失败了')
        })
    })
}



