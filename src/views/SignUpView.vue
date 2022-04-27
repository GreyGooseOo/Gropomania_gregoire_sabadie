<template>
  <div class="about">
    <h1>Création du compte</h1>
    <label for="name">Nom d'utilisateur</label><br>
    <input type="text" id="name" name="name" required maxlength="30"><br>
    <label for="mail">Adresse email</label><br>
    <input type="text" id="mail" name="mail" required maxlength="30"><br>
    <label for="password">Mot de passe</label><br>
    <input type="text" id="password" name="password" requiredmaxlength="30"><br>
    <label for="confPassword">Confirmer le Mot de passe</label><br>
    <input type="text" id="confPassword" name="confPassword" requiredmaxlength="30"><br>
    <b-input-group
    v-for="size in ['sm','','lg']"
    :key="size"
    :size="size"
    class="mb-3"
    prepend="Label"
  >
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button size="sm" text="Button" variant="success">Button</b-button>
    </b-input-group-append>
  </b-input-group>
  </div>
</template>

<script>
export default {
}
</script>
