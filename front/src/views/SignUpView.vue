<template>
  <div>
    <div class="row">
      <b-button variant="outline-primary" class="col-md-1 d-flex justify-content-center" @click="retourDashboard()">Retour</b-button>
      <h1 class="mb-5 mt-5 d-flex justify-content-center" v-if="isModifying">Modifer profil</h1>
      <h1 class="mb-5 mt-5 d-flex justify-content-center" v-else>Créer un compte</h1>
      <div class="col-md-9">
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Nom</b-input-group-prepend>
          <b-form-input aria-label="nom" v-model="nom" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyNom || isNomCorrect)}"></b-form-input>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isEmptyNom ">Champ non remplit</div>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isNomCorrect ">Nom non valide</div>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Prénom</b-input-group-prepend>
          <b-form-input aria-label="prénom" v-model="prenom" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyPrenom || isPrenomCorrect)}"></b-form-input>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isEmptyPrenom ">Champ non remplit</div>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isPrenomCorrect ">Prénom non valide</div>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Pseudo</b-input-group-prepend>
          <b-form-input aria-label="pseudo" v-model="login" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyPseudo || isPseudoTooSmall)}"></b-form-input>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isEmptyPseudo ">Champ non remplit</div>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isPseudoTooSmall ">Pesudo trop court</div>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Mail</b-input-group-prepend>
          <b-form-input type="email" aria-label="mail" v-model="mail" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyMail || isMailCorrect)}"></b-form-input>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isEmptyMail ">Champ non remplit</div>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isMailCorrect ">E-mail incorrect</div>
        <b-input-group class="mb-4">
          <b-input-group-prepend is-text>Mot de passe</b-input-group-prepend>
          <b-form-input :type="typePassword" aria-label="mdp" class="position-relative" v-model="mdp" v-bind:class="{ 'is-invalid': isTryingToSave && (isEmptyMdp || isMdpCorrect)}"></b-form-input><br>
          <i class="fas fa-eye position-absolute top-50 end-0 translate-middle" @click="afficherMdp()" style="z-index : 99;"></i>
        </b-input-group>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isEmptyMdp ">Champ non remplit</div>
        <div class="alert alert-danger" role="alert" v-if="isTryingToSave && isMdpCorrect ">Le mot de passe doit contenir 10 charactère avec au moins 1 majuscule et 1 chiffre</div>
        <b-button variant="outline-success" class="d-flex justify-content-center mx-auto mb-4" style="width : 50%" @click="tryToSave()">Valider</b-button>
        <b-button variant="outline-danger" class="d-flex justify-content-center mx-auto" style="width : 50%" v-if="isModifying" @click="tryToDelete()">Supprimer le compte</b-button>
      </div>
      <div class="col-md-3">
        <img alt="photo profil" :src="photoUrl" class="d-flex justify-content-center mx-auto mb-4" style="width : 200px; height : 200px; object-fit: cover;">
        <b-form-group label="" label-cols-sm="2" label-size="sm">
          <b-form-file id="file-small" size="sm" @change="previewFile"></b-form-file>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      nom : "",
      prenom : "",
      login : "",
      mail : "",
      mdp : "",
      photoUrl:"http://localhost:3000/images/icon.png",
      isTryingToSave : false,
      isModifying : false,
      typePassword : "password"
    }
  },
  computed: {
    //toutes les verification de la bonne conformité des valeur remplit dans le formulaire
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
    //methode permettant la previsualisation de la photo de profil
    previewFile() {
      var that = this;
      const preview = document.querySelector('img');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // on convertit l'image en une chaîne de caractères base64
        preview.src = reader.result;
        that.photoUrl = preview.src;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    //fonction permettant afficher ou de cacher le mot de passe
    afficherMdp(){
      if(this.typePassword === "password"){
        this.typePassword = "text";
      }else{
        this.typePassword = "password";
      }
      
    },
    //bouton retour
    retourDashboard(){
      var retour = "";
      if(this.isModifying){
        retour = 'dashboard'
      }
      var newUlr = document.location.href.replace('signup',retour);
      document.location.href = newUlr;
    },
    //methode permettant la création d'un nouvel utilisateur
    tryToSave(){
      this.isTryingToSave = true;
      if(this.isFullOk){
        var recupToken = JSON.parse(localStorage.getItem('token'));
        var that = this
        fetch("http://localhost:3000/api/auth/signup", { method: "POST",headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nom : this.nom, prenom : this.prenom, pseudo: this.login,email : this.mail, mdp: this.mdp,photo_url : this.photoUrl, token : recupToken})
        })
        .then (function(res){
          if(res.ok && !that.isModifying){
            var newUlr = document.location.href.replace('signup','login');
            document.location.href = newUlr;
          }
          return res.json();
        })
        .then(function(value){
          alert(value.message);
        })
        .catch(function(err){
          alert(err)
        })
      }
    },
    //methode permettant la suppréssion d'un utilisateur
    tryToDelete(){
      var recupToken = JSON.parse(localStorage.getItem('token'));
      fetch("http://localhost:3000/api/auth/delete", { method: "DELETE",headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token : recupToken, photo_url : this.photoUrl})
      })
      .then (function(res){
        if(res.ok){
          //une foi l'utilisateur enregistrer renvoi vers la page de login
          var newUlr = document.location.href.replace('signup','');
          localStorage.clear();
          document.location.href = newUlr;
        }
        return res.json();
      })
      .then(function(value){
        alert(value.message);
      })
      .catch(function(err){
        alert(err)
      })
    }
  },
  mounted: function() {
    //récupération des données utilisateurs pour afficher les information pour la Modification de profil
    var recupToken = localStorage.getItem('token')
    if (recupToken){
      var that = this;
      var token = JSON.parse(recupToken);
      fetch("http://localhost:3000/api/auth/getsignup", { method: "POST", headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token: token})
      })
      .then (function(res){
          return  res.json();      
      })
      .then (function(value){
        if(value.profil!== null){
          that.isModifying = true;
          that.nom = value.profil.nom;
          that.prenom = value.profil.prenom;
          that.login = value.profil.pseudo;
          that.mail = value.profil.email;
          that.photoUrl = value.profil.photo_url;
        }
      })
      .catch(function(err){
        alert(err)
      })
    }
  }
}
</script>
