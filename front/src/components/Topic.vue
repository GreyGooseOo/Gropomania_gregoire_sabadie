<template>
<div>
    <div class="row">
        <h1>{{ titreTopic }}</h1>
        <p> {{ textTopic }}</p>
    </div>
<!-- liste de reponses -->
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
    </div>
</div>
</template>

<script>

export default {
    name : 'TopicComponent',
    props: {
    },
    data(){ return{
        titreTopic :"titre",
        textTopic : "blalbalblalblalblala",
        comentaireTopic : ["blabla","blabla2"],
        commentaire : ""
        }
        
    },

    
}
</script>

<style>
</style>