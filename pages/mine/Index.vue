<template>
<div class="box">
<div class="login">
    <input type="text" placeholder="输入手机号码" ref="val" value="">
    <div class="border-top"></div>
     <input type="text" placeholder="输入验证码">
      <p class="p">{{list}}</p>
     <div class="border-bottom"></div>
     <button class="btn" @click="btn()">登入
        
     </button>
     
</div>

</div>


</template>

<script>
export default {
    data(){
        return {
            list:''
        }
    },
    methods:{
        btn(){
        let value =this.$refs.val.value 
        if(value==""){
            this.list ='手机不能为空'
          console.log(this.list)
        }
        }
    }
}
</script>


<style scoped>
.box{
    width: 100%;
    height: 100%;
    background: #f6f6f6
}
    .login{
        width: 258px;
        height: 197px;
        position: absolute;
        top: 100px;
        left: 31px;
        
    }
    input{
        width: 100%;
        border: none;
        margin: 20px 15px;
        background: #f6f6f6;
        outline:none
    }
    .border-top{
        position: absolute;
        width: 100%;
        height: 12px;
        border:1px solid #cccc;
        border-width: 0 1px 1px 1px;
        top:28px
    }
    .border-bottom{
         position: absolute;
        width: 100%;
        height: 12px;
        border:1px solid #cccc;
        border-width: 0 1px 1px 1px;
        top:88px
    }
    .btn{
        background: #fe8233;
        width: 168px;
        padding: 8px 12px;
        border: none;
        color: #fff;
        border-radius: 36px;
        margin: 30px 40px;
        outline:none
    }
    .p{
        position: absolute;
        font-size: 12px;
        color:#fe8233
    }
</style>
