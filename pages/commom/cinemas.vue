<template>
    <app-content>
        <img class="img" src="http://static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png">
        <div class="reservations">
           <div class="reservationslist">
               <h3>订座票</h3>
                <span>选好场次及座位，到影院自助机取票</span>
                <p>立即订座</p>
           </div>
        </div>

        <div class="reservations">
           <div class="reservationslist">
               <h3>通兑票</h3>
                <span>有效期内到影院前台兑换影票</span>
                <p class="box">立即订票</p>
           </div>
        </div>
        

        <div class="reservations">
           <div class="reservationslist">
               {{telephones.address}}
              
           </div>
        </div>
        
        <div class="reservations">
           <div class="reservationslist">
              {{phones[0]}}
           </div>
        </div>

       <ul class="listActive">
           <li v-for=" (name,index) in list" :key="index"  
           :class="{active:showflsw ==index}"
           @click="getdetails(index)">{{name.name}}
           </li>
       </ul>


        <ul class="boxlist">
            <li v-for="(item,index) in services" :key="index" v-show="index ==showflsw">
                {{item}}
            </li>
        </ul>
       
    </app-content>
</template>
<script>
import {getcittlist,gettelephones} from '../../server/homeService.js'
export default {
    props:['id','address','name'],
    data(){
         
        let id =this.id, buy=this.buy
        if(typeof this.id !='number'){
            id=Number(this.id)
        }
        //console.log(id)
       let name = this.name
       let address =this.address
        return {
            init :[],
            Fid:id,
            namelist:name,
            addresslist:address,
            telephones:[],
            phones:[],
            list:[
                {name:'取票',type:1},
                {name:'3D',type:2},
                {name:'停车',type:3},
                {name:'优惠',type:4},
                {name:'交通',type:5}
            ],
            services:[],
            showflsw:0,


           initlist:[]
        }
    },
    methods:{
         getdetails(index){
             this.showflsw =index
             
            
        
             
      
    }
    },
    mounted() {
        
       getcittlist().then(result=>{
           this.init=result;
           
       }),
       gettelephones(this.Fid).then(result=>{


           
           this.phones =result.phones
           this.telephones=result
           this.services=result.services
         
           //this.initlist[2] =result.services[1].description
       })
    },
   
}
</script>

<style scoped>
.box{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
}
.img{
    width: 100%;
    display: block
}
.reservations{
    width: 286px;
    height: 90px;
    margin: 15px;
    position: relative;
    border-bottom: 1px #ccc dashed
}
.reservations h3{
    font-weight: normal;
    font-size: 16px;
    padding-top: 10px;
}
.reservations span{
    color: #737373;
    font-size: 12px;
    line-height: 40px;
}
.reservations p{
    position: absolute;
    color: #fff;
    width: 94px;
    height: 34px;
    border-radius: 38px;
    top:0;
    right: 0;
    background: #fe8233;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
}
.reservations .reservationslist{
    margin: 30px;
    font-size: 14px;
}
.reservations .box{
    position: absolute;
    color: #fe8233;
    width: 94px;
    height: 34px;
    border-radius: 38px;
    top:0;
    right: 0;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    background: #fff;
    border: 1px #fe8233 solid
}
.listActive{
    display: flex;
    margin:0 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
.listActive li{
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #737373;
}
.listActive .active{
color: #fe8233
}
.boxlist{
    width: 100%;
    
}
</style>


