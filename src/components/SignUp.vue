<template>
  <section class="hero  is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Sign In</h3>
                    <p class="subtitle has-text-grey">Please Sign In to proceed.</p>
                    <div class="box">
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium"  v-model="email" type="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="password" type="password" placeholder="Your Password">
                                </div>
                            </div>


                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium"  v-model="username" type="username" placeholder="Your username">
                                </div>
                            </div>

                            <button class="button  is-block is-info is-medium is-fullwidth" v-on:click="signUp">Sign Up</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../"><router-link to="/login">or login</router-link></a> &nbsp;·&nbsp;
                       
                    </p>
                </div>
            </div>
        </div>
    </section>


</template>

<script>
import firebase from "firebase";

export default {
  name: "signUp",
  data: function() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            var currentUser = firebase.auth().currentUser;
            currentUser.updateProfile({
              displayName: this.username
            });
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>

.hero.is-fullheight {

  min-height: 0;
}

p {
  display: block;
  margin-top: 20px;
}
</style>


