<template>
<div class="sign-up">
    <p>Create a new account</p>
    <input type="text" class="input" v-model="email" placeholder="Email"><br>
    <input type="password" class="input" v-model="password" placeholder="Password"><br>
    <input type="text" class="input" v-model="username" placeholder="username"> <br>
    <button v-on:click="signUp" class="button is-link">Sign Up</button>
    <p>or go back to <router-link to="/login">login</router-link></p>
</div>
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
.sign-up {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p {
  display: block;
  margin-top: 20px;
}
</style>


