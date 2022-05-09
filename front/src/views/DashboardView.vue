<template>
<div>
    <div class="row">
        <div class="col-md-12 d-flex justify-content-around mt-5">
            <b-button variant="outline-primary" class="col-md-3"><router-link to="/signup">Modifier profil</router-link></b-button>
            <b-button variant="outline-primary" class="col-md-3" @click="deconnexion"><router-link to="/">Deconnexion</router-link></b-button>
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
    </div>
  <div class="row">
   <div class="col-md-4 mx-auto">
     <img alt="groupomania logo" src="../assets/icon-left-font.svg">
   </div>
 </div>
<topic-component v-for="(topic,topicIndex) in tableauTopics" :key="topic.id" v-model="tableauTopics[topicIndex]" class="mb-5"></topic-component>
</div>
</template>

<script>
import TopicComponent from '@/components/Topic.vue';

export default {
  name : 'DashBoardView',
  data(){
    return {
      titreNouvelArticle : "",
      textNouvelArticle : "",
      tableauTopics : []
    }
  },
  components: {
    TopicComponent
  },
  methods : {
    deconnexion(){
      localStorage.clear();
    },
    creationArticle(){
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
      .then (function(topics){
          that.tableauTopics = topics;
      })
      .catch(function(err){
      alert(err)
      })
      }
    },

  mounted: function() {
    this.recupererArticles();
  }
}
</script>

<style>
</style>
