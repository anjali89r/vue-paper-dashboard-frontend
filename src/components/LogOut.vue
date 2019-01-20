<template>
   <li class="nav-item" v-if="isLoggedIn">
      <a @click="logout" class="nav-link" >
         <i class="ti-back-right"></i>

          Logout

      </a>
   </li>
</template>

<script>
export default {
   computed : {
      isLoggedIn() {
      return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/signin')
        })
      }
      }
    }

</script>

<style scoped>
   .nav-item {
      cursor: pointer!important;
   }
</style>
