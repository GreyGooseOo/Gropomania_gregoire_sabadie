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
    <b-button variant="outline-primary" class="col-md-3"><router-link to="/signup">Créer un compte</router-link></b-button>
    <b-button variant="outline-primary" class="col-md-3"><router-link to="/login">Connexion</router-link></b-button>
   </div>
 </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style>
</style>
