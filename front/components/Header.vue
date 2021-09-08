<template>
<div>
  <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
    <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
    <p>{{ $auth.user }}</p>
  </div>
  <nav>
    <nuxt-link to="/login">Login</nuxt-link>
    <nuxt-link to="/register">register</nuxt-link>
  </nav>
  <div v-if="$auth.loggedIn">
    <button @click="logout()">Logout</button>
  </div>
</div>
</template>


<script>
export default {
  methods:{
    logout(){
      confirm("本当にログアウトしますか？")
      this.$auth.logout()
    }
  }
}
</script>
