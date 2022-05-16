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
                <b-row>
                    <b-img thumbnail fluid :src="topic.photo_url" style="object-fit: cover; width : 64px; height : 64px; padding : 2%"></b-img>
                </b-row>
                <h5 class="ms-3">{{ topic.pseudo }}</h5>
                <p class="ms-5 mt-2"> {{ topic.date_creation.split("T")[0].split('-').join('/') }}</p>
                <template v-if="isAdmin || topic.isMyPost">
                    <div>
                        <b-button v-b-modal="'modal-modif-'+ topic.topicId" :id="'btn-modal-modif-'+ topic.topicId" class="ms-5">Modifier</b-button>
                        <b-modal :id="'modal-modif-' + topic.topicId" :title="'Modification de l article ' + topic.topicId" @ok="modifArticle">
                            <b-input-group class="mb-4">
                                <b-form-input aria-label="titre" :id="'titre-modal-modif-' + topic.topicId" v-model="modifTitreArticle" placeholder="Titre de l'article"></b-form-input>
                            </b-input-group>
                            <b-form-textarea :id="'textarea-modal-modif-' + topic.topicId" class="mb-4" v-model="modifTextArticle" placeholder="Text de l'article ..." rows="3" max-rows="6"></b-form-textarea>
                        </b-modal>
                    </div>
                    <div>
                        <b-button v-b-modal="'modal-suppr-'+ topic.topicId"  :id="'btn-modal-suppr-'+ topic.topicId" class="ms-3" variant="danger">Supprimmer</b-button>
                        <b-modal :id="'modal-suppr-' + topic.topicId" :title="'suppression de l article ' + topic.topicId" @ok="supprArticle()">
                            <p class="my-4">Voulez-vous vraiment supprimer cet article</p>
                        </b-modal>
                    </div>
                </template>
            </template>
            <h4 class="mt-0">{{ topic.titre }}</h4>
            <p>{{ topic.article }}</p>
            <div v-for="comment in topic.myComments" :key="comment.commentId" >
                <b-media>
                    <template #aside>
                        <b-row class="ms-5">
                            <b-img thumbnail fluid :src="comment.photo_url" style="object-fit: cover; width : 32px; height : 32px; padding : 2%"></b-img>
                        </b-row>
                        <h6 class="mt-0 ms-3">{{comment.pseudo}}</h6>
                    </template>
                    <p class="mb-4 ms-5">{{ comment.commentaire }} <a href="#" class="ms-2" style="font-size : 12px" v-if="isAdmin || comment.isMyComment" @click="modifCommentaire(comment.commentId)">modifier</a> <a href="#" style="font-size : 12px" v-if="isAdmin || comment.isMyComment" @click="supprCommentaire(comment.commentId)">supprimer</a></p>
                </b-media>
            </div>  
        <b-input-group size="sm">
                <b-form-input v-model="texteCreationCommentaire"></b-form-input>
                <b-input-group-append>
                    <b-button size="sm" text="Button" variant="outline-primary" @click="creationCommentaire">Commentez</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-media>
    </b-card>
</div>
</template>

<script>
export default {
    name : 'TopicComponent',
    model : {
        prop : 'topic',
        event: 'change'
    },
    props: ['topic', 'isAdmin'],
    data(){ return{
        texteCreationCommentaire:"",
        modifTitreArticle: this.topic.titre,
        modifTextArticle: this.topic.article,

        }
    },
    computed: {
    },
    methods : {
        modifArticle(){
        var that = this;
        var recupToken = JSON.parse(localStorage.getItem('token'));
        fetch("http://localhost:3000/api/posts", { method: "PUT",headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({postId : this.topic.topicId ,utilisateur_id: this.topic.utilisateur_id, titre : this.modifTitreArticle, text: this.modifTextArticle, token : recupToken})
                })
            .then (function(res){
                return res.json();
            })
            .then(function(value){
                if(!value.isErr){
                    that.topic.titre = that.modifTitreArticle;
                    that.topic.article = that.modifTextArticle;
                }
                alert(value.message);
            })
            .catch(function(err){
                alert(err)
            })
        },
        supprArticle(){
            var that = this;
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/posts/" + this.topic.topicId, { method: "DELETE",headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({postId : this.topic.topicId, utilisateur_id: this.topic.utilisateur_id, token : recupToken})
            })
            .then (function(res){
                return res.json();
            })
            .then(function(value){
                that.$emit('article-suppr', that.topic.topicId, value.message, value.isErr);

            })
            .catch(function(err){
                alert(err)
            })
        },
        creationCommentaire(){
            var that = this;
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments/", { method: "POST",headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({commentaire : this.texteCreationCommentaire, postId : this.topic.topicId, token : recupToken})
                })
            .then (function(res){
                if(res.ok){
                return res.json();
                }
            })
            .then(function(value){
                alert(value.message);
                that.texteCreationCommentaire ="";
            })
            .catch(function(err){
                alert(err)
            })
        },
        modifCommentaire(comment_id){
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments", { method: "PUT",headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({commentId : comment_id ,utilisateur_id: this.topic.utilisateur_id, commentaire : this.texteCreationCommentaire, token : recupToken})
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
        supprCommentaire(comment_id){
            var recupToken = JSON.parse(localStorage.getItem('token'));
            fetch("http://localhost:3000/api/comments", { method: "DELETE",headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({commentId : comment_id ,utilisateur_id: this.topic.utilisateur_id, token : recupToken})
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
    },
    mounted: function() {
    },
    watch : {
        'topic.titre'(){
            this.modifTitreArticle = this.topic.titre;
        },
        'topic.article'(){
            this.modifTextArticle = this.topic.article;
        }
    }
}
</script>

<style>
</style>