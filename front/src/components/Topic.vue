<template>
  <div>
    <b-card>
      <b-media>
        <template #aside>
          <b-row>
            <b-img
              thumbnail
              fluid
              :src="topic.photo_url"
              style="object-fit: cover; width: 64px; height: 64px; padding: 2px"
              alt="Photo profil compte"
            ></b-img>
          </b-row>
          <h5 class="ms-3">{{ topic.pseudo }}</h5>
          <p class="ms-5 mt-2">
            {{ topic.date_creation.split("T")[0].split("-").join("/") }}
          </p>
          <template v-if="isAdmin || topic.isMyPost">
            <div class="d-flex flex-wrap">
              <div>
                <b-button
                  v-b-modal="'modal-modif-' + topic.topicId"
                  :id="'btn-modal-modif-' + topic.topicId"
                  class="ms-5"
                  >Modifier</b-button
                >
                <b-modal
                  :id="'modal-modif-' + topic.topicId"
                  :title="'Modification de l article ' + topic.topicId"
                  @ok="modifArticle"
                >
                  <b-input-group class="mb-4">
                    <b-form-input
                      aria-label="titre"
                      :id="'titre-modal-modif-' + topic.topicId"
                      v-model="modifTitreArticle"
                      placeholder="Titre de l'article (max 250 caratères)"
                      maxlength="250"
                    ></b-form-input>
                  </b-input-group>
                  <b-form-textarea
                    :id="'textarea-modal-modif-' + topic.topicId"
                    class="mb-4"
                    v-model="modifTextArticle"
                    placeholder="Text de l'article ... max 500 caratères"
                    rows="3"
                    max-rows="6"
                    maxlength="500"
                  >
                  </b-form-textarea>
                  <img
                    alt=""
                    :src="topic.media_url"
                    class="d-flex justify-content-center mx-auto mb-4"
                    style="width: 100px; height: 100px; object-fit: cover"
                    :id="'media-modal-modif-' + topic.topicId"
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
              <div>
                <b-button
                  v-b-modal="'modal-suppr-' + topic.topicId"
                  :id="'btn-modal-suppr-' + topic.topicId"
                  class="ms-3"
                  variant="danger"
                  >Supprimmer</b-button
                >
                <b-modal
                  :id="'modal-suppr-' + topic.topicId"
                  :title="'suppression de l article ' + topic.topicId"
                  @ok="supprArticle()"
                >
                  <p class="my-4">Voulez-vous vraiment supprimer cet article</p>
                </b-modal>
              </div>
            </div>
          </template>
        </template>
        <h4 class="mt-0">{{ topic.titre }}</h4>
        <p>{{ topic.article }}</p>
        <div
          class="embed-responsive embed-responsive-16by9 mb-4 ms-3"
          v-if="topic.media_url != '' && topic.media_url != null"
        >
          <b-img
            thumbnail
            fluid
            :src="topic.media_url"
            style="object-fit: cover; width: 300px; height: 300px; padding: 2px"
            :alt="'Photo de post n°' + topic.topicId"
          ></b-img>
        </div>
        <div v-for="comment in topic.myComments" :key="comment.commentId">
          <b-media>
            <template #aside>
              <b-row class="ms-5">
                <b-img
                  thumbnail
                  fluid
                  :src="comment.photo_url"
                  style="
                    object-fit: cover;
                    width: 32px;
                    height: 32px;
                    padding: 2px;
                  "
                  alt="photo profil commentaire"
                ></b-img>
              </b-row>
              <h6 class="mt-0 ms-3">{{ comment.pseudo }}</h6>
            </template>
            <p class="ms-5">
              {{ comment.commentaire }}
              <template v-if="isAdmin || comment.isMyComment">
                <b-button
                  style="font-size: 10px; padding: 3px"
                  v-b-modal="
                    'modal-suppr-' + topic.topicId + '-' + comment.commentId
                  "
                  :id="
                    'btn-modal-suppr-' + topic.topicId + '-' + comment.commentId
                  "
                  class="ms-3"
                  variant="danger"
                  >supprimmer</b-button
                >

                <b-button
                  style="font-size: 10px; padding: 3px"
                  @click="openModalModif(comment)"
                  :id="
                    'btn-modal-modif-' + topic.topicId + '-' + comment.commentId
                  "
                  class="ms-3"
                  >modifier</b-button
                >
              </template>
              <b-modal
                :id="'modal-suppr-' + topic.topicId + '-' + comment.commentId"
                :title="
                  'suppression de commentaire ' +
                  topic.topicId +
                  '-' +
                  comment.commentId
                "
                @ok="
                  supprCommentaire(comment.commentId, comment.utilisateur_id)
                "
              >
                <span class="my-4"
                  >Voulez-vous vraiment supprimer ce commentaire</span
                >
              </b-modal>
            </p>
          </b-media>
        </div>
        <b-modal
          :ref="'modal-modif-comment-' + topic.topicId"
          :id="'modal-modif-comment-' + topic.topicId"
          :title="'Modification de commentaire ' + topic.topicId"
          @ok="modifCommentaire()"
        >
          <b-form-textarea
            :id="'textarea-modal-modif-comment-' + topic.topicId"
            class="mb-4"
            v-model="modifCom"
            placeholder="Texte du commentaire (max 250 caratères)"
            rows="3"
            max-rows="6"
            maxlength="250"
          ></b-form-textarea>
        </b-modal>
        <b-input-group size="sm">
          <b-form-input
            v-model="texteCreationCommentaire"
            placeholder="max 250 caratères"
            maxlength="250"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="sm"
              text="Button"
              variant="outline-primary"
              class="bouton"
              @click="creationCommentaire"
              >Commentez</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-media>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "TopicComponent",
  model: {
    prop: "topic",
    event: "change",
  },
  props: ["topic", "isAdmin"],
  data() {
    return {
      texteCreationCommentaire: "",
      modifCom: "",
      idModifCom: null,
      utilisateurIdModifCom: null,
      modifTitreArticle: this.topic.titre,
      modifTextArticle: this.topic.article,
      modifMediaArticle: this.topic.media_url,
    };
  },
  computed: {},
  methods: {
    //appel du modal pour la modif du commentaire
    openModalModif(comment) {
      this.modifCom = comment.commentaire;
      this.idModifCom = comment.commentId;
      this.utilisateurIdModifCom = comment.utilisateur_id;
      this.$refs["modal-modif-comment-" + comment.topic_id].show();
    },
    //methode appelant l'api pour modifier un post
    modifArticle() {
      if (this.modifTextArticle !== "" && this.modifTitreArticle !== "") {
        var that = this;
        var recupToken = JSON.parse(localStorage.getItem("token"));
        fetch("http://localhost:3000/api/posts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: this.topic.topicId,
            utilisateur_id: this.topic.utilisateur_id,
            titre: this.modifTitreArticle,
            text: this.modifTextArticle,
            photo_url: this.modifMediaArticle,
            token: recupToken,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (value) {
            if (!value.isErr) {
              that.$emit("modification-affichage");
              that.modifMediaArticle = that.topic.media_url;
            }
            alert(value.message);
          })
          .catch(function (err) {
            alert(err);
          });
      } else {
        alert("Veuillez remplir le champ titre et texte de l'article");
      }
    },
    //methode permettant la previsualisation de la photo du post
    previewFile() {
      var that = this;

      const preview = document.getElementById(
        `media-modal-modif-${this.topic.topicId}`
      );
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          // on convertit l'image en une chaîne de caractères base64
          preview.src = reader.result;
          that.modifMediaArticle = preview.src;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    //methode appelant l'api pour supprimer un post
    supprArticle() {
      var that = this;
      var recupToken = JSON.parse(localStorage.getItem("token"));
      fetch("http://localhost:3000/api/posts/" + this.topic.topicId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: this.topic.topicId,
          utilisateur_id: this.topic.utilisateur_id,
          token: recupToken,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (value) {
          that.$emit(
            "article-suppr",
            that.topic.topicId,
            value.message,
            value.isErr
          );
        })
        .catch(function (err) {
          alert(err);
        });
    },
    //methode appelant l'api pour creer un commentaire
    creationCommentaire() {
      if (this.texteCreationCommentaire !== "") {
        var that = this;
        var recupToken = JSON.parse(localStorage.getItem("token"));
        fetch("http://localhost:3000/api/comments/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentaire: this.texteCreationCommentaire,
            postId: this.topic.topicId,
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
            that.texteCreationCommentaire = "";
            that.$emit("modification-affichage");
          })
          .catch(function (err) {
            alert(err);
          });
      } else {
        alert("Veuillez remplir le champ commentaire");
      }
    },
    //methode appelant l'api pour modifier un commentaire
    modifCommentaire() {
      if (this.modifCom !== "") {
        var that = this;
        var recupToken = JSON.parse(localStorage.getItem("token"));
        fetch("http://localhost:3000/api/comments/" + this.idModifCom, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentId: this.idModifCom,
            utilisateur_id: this.utilisateurIdModifCom,
            commentaire: this.modifCom,
            token: recupToken,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (value) {
            alert(value.message);
            that.$emit("modification-affichage");
          })
          .catch(function (err) {
            alert(err);
          });
      } else {
        alert("Veuillez remplir le champ commentaire");
      }
    },
    //methode appelant l'api pour supprimer un commentaire
    supprCommentaire(comment_id, comment_utilisateur_id) {
      var that = this;
      var recupToken = JSON.parse(localStorage.getItem("token"));
      fetch("http://localhost:3000/api/comments/delete/" + comment_id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId: comment_id,
          utilisateur_id: comment_utilisateur_id,
          token: recupToken,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (value) {
          alert(value.message);
          that.$emit("modification-affichage");
        })
        .catch(function (err) {
          alert(err);
        });
    },
  },
  mounted: function () {},
  watch: {
    "topic.titre"() {
      this.modifTitreArticle = this.topic.titre;
    },
    "topic.article"() {
      this.modifTextArticle = this.topic.article;
    },
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