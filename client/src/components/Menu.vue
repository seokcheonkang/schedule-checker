<script setup>
// setActive[
let active = 'nav-link';
function setActive() {
  active = 'nav-link active';
}
// setActive]
</script>

<template>
  <div class="navbar navbar-expand-lg navbar-dark bg-dark overflow-hidden">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" :class="active" @click="setActive">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" :class="active" @click="setActive">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/board" :class="active" @click="setActive">Board</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
