<template>
  <div>
    <div class="row">
      <b-row class="mt-4">
        <b-img
          thumbnail
          fluid
          :src="photoUrl"
          style="object-fit: cover; width: 64px; height: 64px; padding: 2px"
          alt="Photo profil post"
        ></b-img>
      </b-row>
      <div class="col-md-12 d-flex justify-content-around mt-3">
        <b-button
          variant="outline-primary"
          class="bouton col-md-3"
          @click="modifProfil"
          >Modifier profil</b-button
        >
        <b-button
          variant="outline-primary"
          class="bouton col-md-3"
          @click="deconnexion"
          >Deconnexion</b-button
        >
        <b-button
          variant="outline-primary"
          class="bouton col-md-3"
          v-b-modal.modal-article
          >Créer un article</b-button
        >
        <div>
          <b-modal
            id="modal-article"
            title="Mon nouvel article"
            @ok="creationArticle"
          >
            <b-input-group class="mb-4">
              <b-form-input
                aria-label="titre"
                v-model="titreNouvelArticle"
                placeholder="Titre de l'article (max 250 caratères)"
                maxlength="250"
              ></b-form-input>
            </b-input-group>
            <b-form-textarea
              id="textarea"
              class="mb-4"
              v-model="textNouvelArticle"
              placeholder="Texte de l'article ... max 500 caratères"
              rows="3"
              max-rows="6"
              maxlength="500"
            >
            </b-form-textarea>
            <img
              alt=""
              id="media"
              :src="mediaNouvelArticle"
              class="d-flex justify-content-center mx-auto mb-4"
              style="width: 100px; height: 100px; object-fit: cover"
            />
            <b-form-group label="" label-cols-sm="2" label-size="sm">
              <b-form-file
                id="file-small"
                size="sm"
                placeholder=""
                @change="previewFile"
              ></b-form-file>
            </b-form-group>
          </b-modal>
        </div>
      </div>
      <div class="col-md-5 mt-5 mx-auto">
        <b-input-group size="sm">
          <b-form-input
            v-model="recherche"
            placeholder="Recherche par titre"
          ></b-form-input>
        </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mx-auto">
        <img alt="groupomania logo" src="../assets/icon-above-font.svg" />
      </div>
    </div>
    <topic-component
      v-for="(topic, topicIndex) in tableauTopicsFilter"
      :key="topic.id"
      v-model="tableauTopicsFilter[topicIndex]"
      @article-suppr="supprArticle"
      @modification-affichage="modifAffichage"
      class="mb-5"
      :isAdmin="isAdmin"
    ></topic-component>
  </div>
</template>

<script>
import TopicComponent from "@/components/Topic.vue";

export default {
  name: "DashBoardView",
  data() {
    return {
      photoUrl: "",
      recherche: "",
      titreNouvelArticle: "",
      textNouvelArticle: "",
      mediaNouvelArticle: "",
      tableauTopics: [],
      isAdmin: false,
      interval: null,
    };
  },
  components: {
    TopicComponent,
  },
  computed: {
    tableauTopicsFilter() {
      if (this.recherche != "" && this.recherche != null) {
        return this.tableauTopics.filter((t) =>
          t.titre.toLowerCase().includes(this.recherche.toLowerCase())
        );
      }
      return this.tableauTopics;
    },
  },
  methods: {
    //methode permettant la previsualisation de la photo du post
    previewFile() {
      var that = this;
      const preview = document.getElementById("media");
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          // on convertit l'image en une chaîne de caractères base64
          preview.src = reader.result;
          that.mediaNouvelArticle = preview.src;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    // lors du click sur le bouton modifier profil
    modifProfil() {
      var newUlr = document.location.href.replace("dashboard", "signup");
      document.location.href = newUlr;
    },
    // lors du click sur le bouton deconnexion
    deconnexion() {
      localStorage.clear();
      var newUlr = document.location.href.replace("dashboard", "");
      document.location.href = newUlr;
    },
    //mise a jour de l'affichages des post si ajout, modif ou suppression de posts ou commentaire
    modifAffichage() {
      this.recupererArticles();
    },
    //methode appelant l'api pour créer un post
    creationArticle() {
      if (this.titreNouvelArticle !== "" && this.textNouvelArticle !== "") {
        var that = this;
        var recupToken = JSON.parse(localStorage.getItem("token"));
        fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titre: this.titreNouvelArticle,
            text: this.textNouvelArticle,
            photo_url: this.mediaNouvelArticle,
            token: recupToken,
          }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function (value) {
            alert(value.message);
            location.reload();
            that.titreNouvelArticle = "";
            that.textNouvelArticle = "";
            that.mediaNouvelArticle = "";
          })
          .catch(function (err) {
            alert(err);
          });
      } else {
        alert("Veuillez remplir le champ titre et texte de l'article");
      }
    },
    //methode appelant l'api pour reccuperer l'enssemble des posts et des commentaires pour affichage
    recupererArticles() {
      var that = this;
      var recupToken = JSON.parse(localStorage.getItem("token"));
      fetch("http://localhost:3000/api/posts/getposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recupToken }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (topics) {
          that.tableauTopics = topics;
        })
        .catch(function (err) {
          alert(err);
        });
    },
    //affichage des message ou erreur lors de la suppression d'un article (voir Topic.vue L.143) et suppression dans le tableau d'affichage
    supprArticle(articleId, message, isErr) {
      if (isErr) {
        alert(message);
      } else {
        var index = this.tableauTopics.findIndex((t) => t.topicId == articleId);
        this.tableauTopics.splice(index, 1);
        alert(message);
      }
    },
  },
  mounted: function () {
    // recupération de la photo de profil de l'utilisateur connecté
    var that = this;
    var recupToken = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/auth/getsignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: recupToken }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (value) {
        if (value.profil !== null) {
          that.photoUrl = value.profil.photo_url;
        }
      })
      .catch(function (err) {
        alert(err);
      });

    this.isAdmin = JSON.parse(localStorage.getItem("admin"));
    this.recupererArticles();
    //actualistaion de l'affichage toutes les 5s
    this.interval = setInterval(function () {
      that.recupererArticles();
    }, 5000);
  },
  beforeDestroy: function () {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss">
.bouton {
  color: #cd2704;
  border-color: #cd2704;
  background-color: white;
}
.bouton:hover {
  color: white;
  border-color: #cd2704;
  background-color: #cd2704;
}
</style>
