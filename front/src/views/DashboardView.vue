<template>
<div>
    <div class="row">
      <b-row class="mt-4">
        <b-img thumbnail fluid :src="photoUrl" style="object-fit: cover; width : 64px; height : 64px; padding : 2px"></b-img>
      </b-row>
      <div class="col-md-12 d-flex justify-content-around mt-3">    
        <b-button variant="outline-primary" class="col-md-3" @click="modifProfil">Modifier profil</b-button>
        <b-button variant="outline-primary" class="col-md-3" @click="deconnexion">Deconnexion</b-button>
        <b-button variant="outline-primary" class="col-md-3" v-b-modal.modal-article>Créer un article</b-button>
        <div>
          <b-modal id="modal-article" title="Mon nouvel article" @ok="creationArticle">
            <b-input-group class="mb-4">
              <b-form-input aria-label="titre" v-model="titreNouvelArticle" placeholder="Titre de l'article"></b-form-input>
            </b-input-group>
            <b-form-textarea id="textarea" class="mb-4" v-model="textNouvelArticle" placeholder="Text de l'article ..." rows="3" max-rows="6"></b-form-textarea>
          </b-modal>
        </div>
      </div>
      <div class="col-md-5 mt-5 mx-auto">
        <b-input-group size="sm">
        <b-form-input v-model="recherche"></b-form-input>
        <b-input-group-append>
            <b-button size="sm" text="Button" variant="outline-primary" @click="modifAffichage">Rechercher</b-button>
        </b-input-group-append>
      </b-input-group>
      </div>
    </div>
  <div class="row">
   <div class="col-md-4 mx-auto">
     <img alt="groupomania logo" src="../assets/icon-left-font.svg">
   </div>
 </div>
<topic-component v-for="(topic,topicIndex) in tableauTopics" :key="topic.id" v-model="tableauTopics[topicIndex]"
 @article-suppr="supprArticle"  @modification-affichage="modifAffichage" class="mb-5" :isAdmin="isAdmin"></topic-component>
</div>
</template>

<script>
import TopicComponent from '@/components/Topic.vue';

export default {
  name : 'DashBoardView',
  data(){
    return {
      photoUrl : "",
      recherche : "",
      titreNouvelArticle : "",
      textNouvelArticle : "",
      tableauTopics : [],
      isAdmin : false
    }
  },
  components: {
    TopicComponent
  },
  methods : {
    modifProfil(){
      var newUlr = document.location.href.replace('dashboard','signup');
      document.location.href = newUlr;
    },
    deconnexion(){
      localStorage.clear();
      var newUlr = document.location.href.replace('dashboard','');
      document.location.href = newUlr;
    },
    modifAffichage(){
      this.recupererArticles();
    },
    creationArticle(){
      var that = this; 
      var recupToken = JSON.parse(localStorage.getItem('token'));
      fetch("http://localhost:3000/api/posts", { method: "POST",headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({titre : this.titreNouvelArticle, text: this.textNouvelArticle, token : recupToken})
      })
      .then (function(res){
        if(res.ok){
          return res.json();
        }
      })
      .then(function(value){
        alert(value.message);
        that.recupererArticles();
        that.titreNouvelArticle = "";
        that.textNouvelArticle = "";

      })
      .catch(function(err){
        alert(err)
      })
    },
    recupererArticles(){
      var that = this
      var recupToken = JSON.parse(localStorage.getItem('token'));
      fetch("http://localhost:3000/api/posts/getposts" , { method: "POST",headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token : recupToken})
      })
      .then (function(res){
        if(res.ok){
            return  res.json();        
        }
      })
      .then (function(topics)  {
        that.tableauTopics = topics;
      })
      .catch(function(err){
      alert(err)
      })
    },
    supprArticle(articleId, message,isErr){
      if(isErr){
        alert(message);
      }else{
        var index = this.tableauTopics.findIndex(t => t.topicId == articleId);
        this.tableauTopics.splice(index,1);
        this.$bvToast.toast(message, {
        title: `Suppression`,
        toaster: 'b-toaster-top-right',
        solid: true,
        appendToast: false,
        variant : 'Danger',
        noAutoHide:true
      });
      }
    }
  },

  mounted: function() {
    var that = this;
    var recupToken = JSON.parse(localStorage.getItem('token'));
    fetch("http://localhost:3000/api/auth/getsignup", { method: "POST", headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token: recupToken})})
      .then (function(res){
          return  res.json();      
      })
      .then (function(value){
        if(value.profil!== null){
          that.photoUrl = value.profil.photo_url;
        }
      })
      .catch(function(err){
        alert(err)
      })
    this.isAdmin = JSON.parse(localStorage.getItem('admin'));
    this.recupererArticles();
  }
}
</script>

<style>
</style>
