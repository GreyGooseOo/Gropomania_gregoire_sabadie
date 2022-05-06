<template>
  <div>
    <div class="row">
      <h1 class="mb-5 mt-5 d-flex justify-content-center">Connexion</h1>
      <div class="col-md-5 mx-auto">
        <b-input-group class="mb-4">
        <b-input-group-prepend is-text>
          Pseudo
        </b-input-group-prepend>
        <b-form-input aria-label="pseudo" v-model="login"></b-form-input>
        </b-input-group>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>
            Mot de passe
          </b-input-group-prepend>
          <b-form-input type="password" aria-label="mdp" class="position-relative" v-model="mdp"></b-form-input><br>
          <i class="fas fa-eye position-absolute top-50 end-0 translate-middle" ></i>
        </b-input-group>
        <b-button variant="outline-success" class="d-flex justify-content-center mx-auto" @click="tryToConnect">Valider</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login : "gabou",
      mdp : null
    }
  },
  methods: {
    tryToConnect() {
      fetch("http://localhost:3000/api/auth/login", { method: "POST",
            headers: {
                'Content-Type': 'application/json'
             }})
      .then (function(res){
        console.log("pantoufle");
          if(res.ok){
              return  res.json();        
          }
      })
      .catch(function(err){
        alert(err)
      })
      }
    },
    mounted() {
      
    }
}
</script>
