<template>
<div>
<!-- liste de reponses 
    <div class="row">
    <p v-for="comment in comentaireTopic" :key="comment"> {{ comment }}</p>
    </div>
    <div class="row">
        <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Commenter
        </b-input-group-prepend>
        <b-form-input aria-label="comment" v-model="commentaire" type="text"></b-form-input>
      </b-input-group>
    </div>-->
    <b-card>
        <b-media>
            <template #aside>
                <b-img blank blank-color="#ccc" width="64" alt="photo profil" style="object-fit: cover;"></b-img>
                <h4 class="ms-3" style="max-width : 50%; overflow: hidden;">{{ topic.titre }}</h4>
                <p class="ms-5 mt-2"> {{ topic.date_creation.split("T")[0].split('-').join('/') }}</p>
                <div v-if="true">
                    <b-button v-b-modal.modal-modif- class="ms-5">Modifier</b-button><!-- Es ce qu'on peu faire du dynamique ?-->
                    <b-modal :id="'modal-modif-' + topic.topicId" title="Modification de l'article" @ok="modifArticle">
                        <b-input-group class="mb-4">
                            <b-form-input aria-label="titre" v-model="modifTitreArticle" placeholder="Titre de l'article"></b-form-input>
                        </b-input-group>
                        <b-form-textarea id="textarea" class="mb-4" v-model="modifTextArticle" placeholder="Text de l'article ..." rows="3" max-rows="6"></b-form-textarea>
                    </b-modal>
                </div>
                <div v-if="true"><!-- modif v-if-->
                    <b-button v-b-modal.modal-suppr class="ms-3" variant="danger">Supprimmer</b-button>
                    <b-modal :id="'modal-suppr-' + topic.topicId" title="suppression de l'article" @ok="supprArticle"><!-- modif id-->
                        <p class="my-4">Voulez-vous vraiment supprimer cet article</p>
                    </b-modal>
                </div>
            </template>
            <h5 class="mt-0">{{ topic.pseudo }}</h5>
            <p>{{ topic.article }}</p>
        <b-media>
            <template #aside>
            <b-img blank blank-color="#ccc" width="32" alt="photo profil" class="ms-5"></b-img>
            <h6 class="mt-0 ms-2">Pseudo Commentaire</h6>
            </template>
            <p class="mb-4 ms-5">text commentaire</p>
            <b-input-group size="sm">
                <b-form-input v-model="texteCreationCommentaire"></b-form-input>
                <b-input-group-append>
                    <b-button size="sm" text="Button" variant="outline-primary" @click="creationCommentaire">Commentez</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-media>
        </b-media>
    </b-card>
</div>
</template>

<script>
//JE RECUP PAS MON TOPIC ID ::::::::§§§§§§§§§§§!!!!!!!!!!!!!!!!!
export default {
    name : 'TopicComponent',
    model : {
        prop : 'topic',
        event: 'change'
    },
    props: ['topic'],
    data(){ return{
        texteCreationCommentaire:"",
        modifTitreArticle: "",
        modifTextArticle: "",
        }
    },
    methods : {
        modifArticle(){
        var recupToken = JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:3000/api/posts", { method: "PUT",headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({postId : this.topic.topicId ,utilisateur_id: this.topic.utilisateur_id, titre : this.modifTitreArticle, text: this.modifTextArticle, token : recupToken})
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
        supprArticle(){
        var recupToken = JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:3000/api/posts/" + this.topic.topicId, { method: "DELETE",headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({postId : this.topic.topicId ,utilisateur_id: this.topic.utilisateur_id, token : recupToken})
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
        creationCommentaire(){
            console.log(this.topic.topicId)
            console.log(this.topic_id)

            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments", { method: "POST",headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({commentaire : this.texteCreationCommentaire, postId : this.topic.topicId, token : recupToken})
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
        modifCommentaire(){
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments", { method: "PUT",headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({commentId : this.topic.topicId ,utilisateur_id: this.topic.utilisateur_id, commentaire : this.texteCreationCommentaire, token : recupToken})
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
        supprCommentaire(){
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments/" + this.topic.commentId, { method: "DELETE",headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({commentId : this.topic.topicId ,utilisateur_id: this.topic.utilisateur_id, token : recupToken})
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

    }  
}
</script>

<style>
</style>