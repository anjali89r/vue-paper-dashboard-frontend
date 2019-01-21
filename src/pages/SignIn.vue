<template>
   <div class="wrapper">
      <div class="container-fluid">
         <div class="row">
            <div class="col-sm-12 col-md-4 signin-drawer">
               <div class="signin-drawer-content">
                  <img class="logo-image" src="../assets/img/logo.svg" width="150px" alt="logo"/>
                  <p>Automatically personalize your website &amp; email to each visitor.</p>
               </div>
            </div>
            <div class="col-sm-12 col-md-8 signin-form">
               <div class="account-signup">
                  <span>Don't have an account? <a href="#">Sign up</a></span>
               </div>
               <div class="form-section">
                  <span class="leaf"><img src="../assets/img/plants-left.svg" width="80px" alt="leaf"/></span>
                  <h3>Sign in to DataCue</h3>
                  <form @submit.prevent="signIn">
                     <div class="form-group">
                        <label for="userEmail">Email</label>
                        <input type="email" v-model.trim="form.email" class="form-control" id="userEmail" aria-describedby="emailHelp" required placeholder="Enter email">

                     </div>
                     <div class="form-group">
                        <label for="userPassword">Password</label>
                        <span class="field-icon toggle-password desktop" @click="showPw"><i class="fa fa-fw fa-eye"></i> Show password</span>
                        <input type="password" v-model="form.password" class="form-control" id="userPassword" placeholder="Password" required>
                        <span class="field-icon toggle-password mobile" @click="showPw"><i class="fa fa-fw fa-eye"></i> Show password</span>
                     </div>
                     <button type="submit" class="btn btn-sm btn-warning textcase">Login</button>
                     <span class="leaf right-leaf"><img src="../assets/img/plants-right.svg" width="80px" alt="leaf"/></span>
                  </form>
                  <div class="alert alert-danger" role="alert" v-if="logError">
                        Invalid username or password.
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   data() {
      return {
         form: {
            email: null,
            password: null
         }
      }
   },
   computed: {
      ...mapGetters([
    'logError'
  ])
   },
   methods: {
      showPw() {
         const passwordField = document.querySelector('#userPassword')
         if (passwordField.getAttribute('type') === 'password') passwordField.setAttribute('type', 'text')
         else passwordField.setAttribute('type', 'password')
      },
      signIn() {
         let email = this.form.email
        let password = this.form.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
   }

}
</script>

<style scoped>
.field-icon {
  float: right;
  cursor: pointer;
}
.alert-danger{
   margin-top: 15px;
}
.signin-drawer {
   background-image: url(../assets/img/squares-background.f3e57415.svg);

   display: flex;
   align-items: center;
   padding: 0;
   height: 100%;
}
.account-signup{
   text-align: center;
}
.right-leaf{
   float: right;
}
@media (max-width: 767px) {
   .leaf {
      display: none;
   }

}
@media (min-width: 768px) {
   .form-section>h3{
      margin:-30px 0 10px;
   }
   .signin-drawer{
      height: 100vh;
      background-position: 50%;
      background-size: cover;
   }
   .signin-drawer-content{
      padding: 1em;
   }
   .account-signup{
   text-align: right;
}
}

.signin-drawer-content{
   padding: 2em;
   text-align: center;
   width: 100%;
}
.logo-image{
   padding-bottom: 2em;
}
.signin-drawer-content>p{
   font-size: 14px;
}
.signin-form{
   padding: 8vw;
}

.account-signup>span>a{
   color: orange;
}
.form-section>h3{
   text-align: center;
   border-bottom: 1px solid #ccc;
}
.form-control {
   background-color: #fbf8f8;
}
.textcase{
   text-transform: none;
}
@media (max-width: 462px) {
   .desktop {
      display: none;
   }
}
@media (min-width: 463px){
   .mobile {
      display: none
   }
}

</style>
