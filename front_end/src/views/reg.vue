<template>
  <div class="home">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="loginBox">
      <h1 class="tittle">注册</h1>
      <br>
      <br>
      <br>
      <div>用户名</div>
      <br>
      <cube-input v-model="value01" :placeholder="'请输入'"></cube-input>
      <br>
      <div>密码</div>
      <br>
      <cube-input v-model="value02" :placeholder="'请输入'"></cube-input>
      <br>
      <div>重复密码</div>
      <br>
      <cube-input v-model="value02" :placeholder="'请输入'"></cube-input>
    </div>
    <div>
      <cube-button class="loginBtn" :inline="true">注册</cube-button>
    </div>
    <br>

    <div>
      <a class="regBtn" href="/">登陆</a>
    </div>
  </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        data() {
            return {
                value01: '',
                value02: '',
            }
        },
        created(){
            console.log(1);
        }
    }
</script>

<style>
  .loginBox {
    margin: 0 auto;
    width: 300px;
  }

  .tittle {
    text-align: center;
    font-size: 20px
  }

  .loginBtn {
    float: right;
    margin-right: 40px;
    margin-top: 10px;
  }

  .regBtn {
    background-color: #333;
    display: inline-block;
    width: 50px;
    height: 20px;
    color: white;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    margin-left: 40px;
  }
</style>
