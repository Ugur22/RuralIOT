<template>
  <div class="hello">
     <button id="logout" v-if="user" v-on:click="logout">Logout</button>
      <div class="box">
          <form id="signup-form"  @submit.prevent="processForm">
        <!-- title -->
        <div class="field">
          <label class="label">Title</label>
           <div class="control">
          <input type="text" class="input" name="title" v-model="title" placeholder="title" required>
           </div>
        </div>
        <!-- story -->
        <div class="field">
          <label class="label">story</label>
          <div class="control">
          <textarea  name="text" class="textarea" v-model="text"  resi required placeholder="Write your story.."></textarea>
          </div>
        </div>

            <!-- img url -->
        <div class="field">
          <label class="label">Image url</label>
          <div class="control">
          <input type="text" class="input" name="imgurl" v-model="imgurl" placeholder="image url" required>
          </div>
        </div>
     

        <!-- submit button -->
        <div class="field has-text-right">
          <button type="submit" class="button is-danger">
            Create Story            
          </button>
        </div>
          </form>
      </div>

        <div class='columns'>
    <div class='column is-4' v-for="item in stories"  :key="item.id" >
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="item.imgurl" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{item.title | truncate}}</p>
            </div>
          </div>

          <div class="content">
            {{item.text | truncate}}
            <a href="#">Read more</a>
            <br>
            <b>{{item.date}}</b> <br>
            <b>{{item.user}}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "../../js/database/firebase";
var storyRef = db.ref("stories");
var currentDate = new Date();
var stories = [];
var length = 100;
var lengthTitle = 35;
var dots = "...";

storyRef.on("child_added", function(snapshot) {
  var data = snapshot.val();
  stories.push(data);
});

export default {
  name: "home",
  data() {
    return {
      user: firebase.auth().currentUser.email,
      title: "",
      text: "",
      imgurl: "",
      stories
    };
  },

  filters: {
    truncate: function(value) {
      if (!value) return "";
      return value.length < 80
        ? value.substring(0, 35).concat("...")
        : value.substring(0, 100).concat("...");
    }
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    processForm: function() {
      let newMeasurementref = storyRef.push();
      console.log(firebase.auth().currentUser);
      newMeasurementref.set({
        title: this.title,
        text: this.text,
        user:firebase.auth().currentUser.displayName,
        imgurl: this.imgurl,
        date: currentDate.toString().slice(4, 15)
      });
      this.text = "";
      this.title = "";
      this.imgurl = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

#logout {
  float: right;
}

textarea {
  resize: none;
}

@media screen and (min-width: 769px) {
  .columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  .card {
    height: 573px;
  }

  .column.is-4 {
    width: 100%;
  }
}

@media screen and (max-width: 1200px) {
  .columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

.hello {
  margin-top: 10px;
}

.columns {
  margin: 10px;
}

label.label {
  float: left;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
