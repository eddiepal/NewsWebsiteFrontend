<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/me.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Eddies News Website</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/authors"><i class="fa fa-list" style="padding: 5px"> Manage Authors</i></b-nav-item>
          <b-nav-item to="/articles"><i class="fa fa-list" style="padding: 5px"> Manage Articles</i></b-nav-item>
          <b-nav-item to="/createarticle"><i class="fa fa-money" style="padding: 5px"> Create Article</i></b-nav-item>
          <b-nav-item to="/map"><i class="fa fa-globe" style="padding: 5px"> Map</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/signup"><i class="fa fa-info" style="padding: 5px"> Sign Up</i></b-nav-item>
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!--<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .VueTables__sortable {
    cursor: pointer;
  }

</style>-->

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 20px;
   //background: url("./assets/homerbgyellow.png") repeat center top;
    background-color: lightpink;

  }
  .VueTables__sortable {
    cursor: pointer;
  }
</style>
