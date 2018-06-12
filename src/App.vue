<template>
  <div id="app">
    <nav class="navbar is-link ">
      <div class="navbar-brand">
        <a class="navbar-item" href="/" @click="showNav = false">
            <router-link to="/">RuralOIT</router-link>
        </a>
        <!--
    Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
        <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <!--
    Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-start">
           <a class="navbar-item" @click="showNav = false">
           <router-link to="/about" >Water quality graphs</router-link>
        </a>
         <a class="navbar-item"  @click="showNav = false">
           <router-link to="/water">Water Pumps</router-link>
        </a>
        </div>
      </div>
    </nav>
     <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showNav: false
    };
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.navbar a {
  color: #34495e;
}



#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
