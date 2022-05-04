<template>
<div>
  <div class="row">
    <h1 class="mb-5 mt-5 d-flex justify-content-center">Créer un compte</h1>
    <div class="col-md-9">
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Nom
        </b-input-group-prepend>
        <b-form-input aria-label="nom"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Prénom
        </b-input-group-prepend>
        <b-form-input aria-label="prénom"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Pseudo
        </b-input-group-prepend>
        <b-form-input aria-label="pseudo"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mail
        </b-input-group-prepend>
        <b-form-input type="email" aria-label="mail"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mot de passe
        </b-input-group-prepend>
        <b-form-input type="password" aria-label="mdp" class="position-relative"></b-form-input><br>
        <i class="fas fa-eye position-absolute top-50 end-0 translate-middle" ></i>
      </b-input-group>
      <b-button variant="outline-success" class="d-flex justify-content-center mx-auto">Valider</b-button>
  </div>
  <div class="col-md-3">
    <img alt="Vue logo" src="../assets/logo.png" class="d-flex justify-content-center mx-auto">
    <b-button variant="outline-primary" class="d-flex justify-content-center mx-auto">Modifier</b-button>
  </div>
  </div>
</div>
  
</template>

<script>
export default {
}
</script>
