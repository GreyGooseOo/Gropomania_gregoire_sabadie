<template>
<div class="container">
  <div class="row text-center">
    <nav>
      <router-link to="/">Acceuil</router-link> |
      <router-link to="/signup">Créer un compte</router-link> |
      <router-link to="/login">Connexion</router-link>
    </nav>
  </div>
  <router-view/>
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
