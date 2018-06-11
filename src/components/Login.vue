<template>
    <section class="hero  is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
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
                            <button class="button  is-block is-info is-medium is-fullwidth" v-on:click="signIn">Login</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../"><router-link to="/sign-up">or Sign up</router-link></a> &nbsp;·&nbsp;
                       
                    </p>
                </div>
            </div>
        </div>
    </section>


</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
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
  margin-top: 40px;
  font-size: 13px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>


