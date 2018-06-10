<template>
  <div id="app">
<nav class="navbar is-link ">
  <div class="navbar-brand">
    <a class="navbar-item">
    <router-link to="/">RuralOIT</router-link>
      <!-- <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
    </a>
    <div class="navbar-burger burger" data-target="navMenubd-example">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenubd-example" class="navbar-menu">
    <div class="navbar-start">
        <a class="navbar-item">
           <router-link to="/about">Water quality graphs</router-link>
        </a>
         <a class="navbar-item">
           <router-link to="/water">Water Pumps</router-link>
        </a>
    </div>
  </div>
</nav>
     <router-view/>

  </div>
</template>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        console.log(2);
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

export default {
  name: "App"
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
  color: #fff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
