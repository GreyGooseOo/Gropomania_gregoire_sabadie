<template>
<div>
  <div class="row">
   <div class="col-md-4 mx-auto">
     <img alt="Vue logo" src="../assets/icon-left-font.svg">
   </div>
 </div>
 <div class="row">
   <div class="col text-center mb-5">
     <h1>Bienvenue sur votre solution de communication interne</h1>
   </div>
   <div class="col-md-12 d-flex justify-content-around mt-5">
    <router-link to="/signup" class="col-md-3 mx-auto"><b-button variant="outline-primary">Créer un compte</b-button></router-link>
    <router-link to="/login" class="col-md-3"><b-button variant="outline-primary" >Connexion</b-button></router-link>
   </div>
 </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  mounted: function() {
    localStorage.clear();
  }
}
</script>

<style>
</style>
