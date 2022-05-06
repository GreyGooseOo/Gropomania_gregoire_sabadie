<template>
<div>
  <div class="row">
    <h1 class="mb-5 mt-5 d-flex justify-content-center">Créer un compte</h1>
    <div class="col-md-9">
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Nom
        </b-input-group-prepend>
        <b-form-input aria-label="nom" v-model="nom" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyNom || isNomCorrect)}"></b-form-input>
      </b-input-group>
      <p v-if="isTryingToSave && isEmptyNom " class="text-danger"> c'est vide connard !</p>
      <p v-if="isTryingToSave && isNomCorrect" class="text-danger"> plus long connard !</p>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Prénom
        </b-input-group-prepend>
        <b-form-input aria-label="prénom" v-model="prenom" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyPrenom || isPrenomCorrect)}"></b-form-input>
      </b-input-group>
      <p v-if="isTryingToSave && isEmptyPrenom" class="text-danger"> c'est vide connard !</p>
      <p v-if="isTryingToSave && isPrenomCorrect" class="text-danger"> plus long connard !</p>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Pseudo
        </b-input-group-prepend>
        <b-form-input aria-label="pseudo" v-model="login" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyPseudo || isPseudoTooSmall)}"></b-form-input>
      </b-input-group>
      <p v-if="isTryingToSave && isEmptyPseudo" class="text-danger"> c'est vide connard !</p>
      <p v-if="isTryingToSave && isPseudoTooSmall" class="text-danger"> plus long connard !</p>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mail
        </b-input-group-prepend>
        <b-form-input type="email" aria-label="mail" v-model="mail" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyMail || isMailCorrect)}"></b-form-input>
      </b-input-group>
      <p v-if="isTryingToSave && isEmptyMail" class="text-danger"> c'est vide connard !</p>
      <p v-if="isTryingToSave && isMailCorrect" class="text-danger"> c'est pas un mail connard !</p>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mot de passe
        </b-input-group-prepend>
        <b-form-input type="password" aria-label="mdp" class="position-relative" v-model="mdp" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyMdp || isMdpCorrect)}"></b-form-input><br>
        <i class="fas fa-eye position-absolute top-50 end-0 translate-middle" ></i>
      </b-input-group>
      <p v-if="isTryingToSave && isEmptyMdp" class="text-danger"> c'est vide connard !</p>
      <p v-if="isTryingToSave && isMdpCorrect" class="text-danger"> doit contenir au moin une maj et 1 chiffre</p>
      <b-button variant="outline-success" class="d-flex justify-content-center mx-auto" style="width : 50%" @click="tryToSave()">Valider</b-button>
  </div>
  <div class="col-md-3">
    <img alt="Vue logo" :src= "url_photo" class="d-flex justify-content-center mx-auto">
    <b-button variant="outline-primary" class="d-flex justify-content-center mx-auto">Modifier</b-button>
  </div>
  </div>
</div>
  
</template>

<script>
const imageLink = require('../assets/logo.png');
export default {
  data() {
    return {
      nom : "",
      prenom : "",
      login : "gabou",
      mail : "",
      mdp : "",
      url_photo : imageLink,
      isTryingToSave : false
    }
  },
  computed: {
    isEmptyNom(){
      return this.nom.trim() === "" || this.nom === null;
    },
    isNomCorrect(){
      return !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(this.nom);
    },
    isEmptyPrenom(){
      return this.prenom.trim() === "" || this.prenom === null;
    },
    isPrenomCorrect(){
      return !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(this.prenom);
    },
    isEmptyPseudo(){
      return this.login.trim() === "" || this.login === null;
    },
    isPseudoTooSmall(){
      return this.login.trim().length < 3;
    },
    isEmptyMail(){
      return this.mail.trim() === "" || this.mail === null;
    },
    isMailCorrect(){
      return !/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(this.mail);
    },
    isEmptyMdp(){
      return this.mdp.trim() === "" || this.mdp === null;
    },
    isMdpCorrect(){
      return !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(this.mdp);
    },
    isFullOk(){
      return !(this.isEmptyNom && this.isNomCorrect && this.isEmptyPrenom && this.isPrenomCorrect && this.isEmptyPseudo && this.isPseudoTooSmall && this.isEmptyMail && this.isMailCorrect && this.isEmptyMdp && this.isMdpCorrect);
    }
  },
  methods: {
    tryToSave(){
      this.isTryingToSave = true
      if(this.isFullOk){
        console.log("sauvegarde effectué");
      }
    },
    tryToConnect() {
      fetch("http://localhost:3000/api/login")
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
