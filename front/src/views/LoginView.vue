<template>
  <div>
    <div class="row">
      <b-button variant="outline-primary" class="col-md-1 mx-auto" @click="retourHome">Retour</b-button>
      <h1 class="mb-5 mt-5 d-flex justify-content-center">Connexion</h1>
      <div class="col-md-5 mx-auto">
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Pseudo</b-input-group-prepend>
          <b-form-input aria-label="pseudo" v-model="login"></b-form-input>
        </b-input-group>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Mot de passe</b-input-group-prepend>
          <b-form-input :type="typePassword" aria-label="mdp" class="position-relative" v-model="mdp"></b-form-input><br>
          <i class="fas fa-eye position-absolute top-50 end-0 translate-middle" @click="afficherMdp()" style="z-index : 99;"></i>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="erreurLog !== null">
            {{erreurLog}}
        </div>
        <b-button variant="outline-success" class="d-flex justify-content-center mx-auto mb-4" @click="tryToConnect">Valider</b-button>
        <b-button variant="outline-primary" class="d-flex justify-content-center mx-auto" @click="goToSignup">Créer un compte</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      login : "",
      mdp : "",
      erreurLog : null,
      typePassword : "password"

    }
  },
  methods: {
    //fonction permettant afficher ou de cacher le mot de passe
     afficherMdp(){
      if(this.typePassword === "password"){
        this.typePassword = "text";
      }else{
        this.typePassword = "password";
      }
      
    },
    //lors de l'appui du bouton créer compte renvoi sur la page de signup
    goToSignup(){
      var newUlr = document.location.href.replace('login','signup');
      document.location.href = newUlr;
    },
    //bouton retour
    retourHome(){
      var newUlr = document.location.href.replace('login','');
      document.location.href = newUlr;
    },
    //methode permettant la connexion a son compte
    tryToConnect() {
      this.erreurLog = null;
      let that = this
      fetch("http://localhost:3000/api/auth/login", { method: "POST",headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pseudo: this.login, mdp: this.mdp})
      })
      .then (function(res){
        return  res.json();      
      })
      .then (function(value){
        //implantation dans le local storage du token d'authentification et d'un boolean représentant la fonction d'admin
        localStorage.setItem('admin', value.admin);
        if(value.token.length > 0 ){
          localStorage.setItem('token', JSON.stringify(value.token));
          var newUlr = document.location.href.replace('login','dashboard');
          document.location.href = newUlr;
        }else{
          that.erreurLog = value.err;
        }
      })
      .catch(function(err){
        alert(err)
      })
    }
  },
}
</script>
