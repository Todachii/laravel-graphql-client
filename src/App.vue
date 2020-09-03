<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Twitter Like App</span>
        <span class="font-weight-light">| sample App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <!-- ここがrouterで切り替わる場所 -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data() {
    return {
      //
    };
  },
};
</script>
