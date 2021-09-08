<template>
<div>
  <div>
  <h1>ログインユーザ</h1>
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input 
      v-model="user.password"
      name="password"
      type="password" 
      >
    </div>
    <button type="submit">ログイン</button>
    {{errorMsg}}
  </form>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          email:'',
          password:''
        },
        errorMsg:""
      }
    },
    methods:{
      loginUser(){
        this.$auth.loginWith('local',{data:this.user})
        .then(res => {
          console.log("成功")
          console.log(res.body)
        })
        .catch((err) => {
          console.log(err)
          this.errorMsg = "error"
        })
      },
    }
  }
</script>

<style lang="sass">

</style>