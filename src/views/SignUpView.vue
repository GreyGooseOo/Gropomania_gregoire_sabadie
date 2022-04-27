<template>
<div>
  <div class="row">
    <div class="col-md-9">
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Nom
        </b-input-group-prepend>
        <b-form-input aria-label="nom"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Prénom
        </b-input-group-prepend>
        <b-form-input aria-label="prénom"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Pseudo
        </b-input-group-prepend>
        <b-form-input aria-label="pseudo"></b-form-input>
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mail
        </b-input-group-prepend>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      </b-input-group>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          Mot de passe
        </b-input-group-prepend>
        <b-form-input type="password" aria-label="mdp"></b-form-input>
      </b-input-group>
  </div>
  <div class="col-md-3">
    photo
  </div>
  </div>
</div>
  
</template>

<script>
export default {
}
</script>
