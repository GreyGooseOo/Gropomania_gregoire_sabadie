<template>
  <div>
    <div class="row">
      <div class="col-md-4 mx-auto">
        <img alt="Vue logo" class="me-4" src="../assets/icon-left-font.svg" />
      </div>
    </div>
    <div class="row">
      <div class="col text-center mb-5">
        <h1>Bienvenue sur votre solution de communication interne</h1>
      </div>
      <div class="col-md-12 d-flex justify-content-around mt-5">
        <router-link to="/signup"
          ><b-button variant="outline-primary"
            >Créer un compte</b-button
          ></router-link
        >
        <router-link to="/login"
          ><b-button variant="outline-primary">Connexion</b-button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  //suppression du localstorage lors du retour a l'acceuil
  mounted: function () {
    localStorage.clear();
  },
};
</script>

<style>
</style>
