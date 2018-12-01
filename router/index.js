import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/home/Index.vue'
import Films from '../pages/films/Index.vue'
import Cinemas from '../pages/cinemas/Index.vue'
import Shops from '../pages/shops/Index.vue'
import Mine from '../pages/mine/Index.vue'
import Cards from '../pages/cards/Index.vue'
import filmdeta from '../pages/commom/filmdeta.vue'
import City from '../pages/commom/city.vue'
import Cinemaslist from '../pages/commom/cinemas.vue'
const routes =[
    {
        name :'home',
        path:'/home',
        alias:'/',
        component:Home,
        children:[
            {
                name:'home-deta',
                path:'deta/:id/:buy',
                component:filmdeta,
                props:true
            }
        ]
    },{
        name :'films',
        path:'/films',
        props:true,
        component:Films,
        children:[
            {
                name:'film-deta',
                path:'deta/:id/:buy',
                component:filmdeta,
                props:true
            }
        ]
    },{
        name:'cinemas',
        path:'/cinemas',
        component:Cinemas,
        children:[
            {
            name:'cinemas-deta',
            path:'deta/:id',
            component:Cinemaslist,
            props:true
        }
    ]
    },{
        name :'shops',
        path:'/shops',
        component:Shops
    },{
        name :'mine',
        path:'/mine',
        component:Mine
    },{
        name :'cards',
        path:'/cards',
        component:Cards
    },{
        name:'city',
        path:'/city',
        component:City
    },
    
    {
        path:'**',
        redirect:'./home'
    }
]



export default new Router({
    routes
})