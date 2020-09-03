<template>
  <v-form @submit="login" onsubmit="return false;">
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="pass" :rules="passRules" :counter="10" label="password" required></v-text-field>
          <v-btn color="primary" type="submit">login</v-btn>
          <router-link to="/signup">
            <v-btn text>signup</v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { LOGIN } from "../graphql/mutation";
import store from "../store/index";

export default {
  name: "Login",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    pass: "",
    passRules: [
      (v) => !!v || "id is required",
      (v) => v.length >= 6 || "Passwoed must be more than 6 characters",
    ],
  }),
  methods: {
    login(e) {
      // mutation
      this.$apollo
        .mutate({
          // GraphQL
          mutation: LOGIN,
          // Variables
          variables: {
            email: this.email,
            password: this.pass,
          },
        })
        .then((data) => {
          // Sucess
          console.log(data);
          const token = localStorage.setItem(
            "vue_token",
            data.data.Login.access_token
          );
          store.commit("logined");
          this.$router.push("/");
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
  },
};
</script>
