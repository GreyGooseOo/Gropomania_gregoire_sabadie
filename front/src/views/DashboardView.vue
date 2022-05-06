<template>
<div>
    <div class="row">
        <div class="col-md-12 d-flex justify-content-around mt-5">
            <b-button variant="outline-primary" class="col-md-3"><router-link to="/signup">Modifier profil</router-link></b-button>
            <b-button variant="outline-primary" class="col-md-3"><router-link to="/">Deconnexion</router-link></b-button>
        </div>
    </div>
  <div class="row">
   <div class="col-md-4 mx-auto">
     <img alt="Vue logo" src="../assets/icon-left-font.svg">
   </div>
 </div>
<topic-component msg="test"></topic-component>
</div>
</template>

<script>
import TopicComponent from '@/components/Topic.vue';

export default {
    name : 'DashBoardView',
  components: {
    TopicComponent
  }
}
</script>

<style>
</style>
