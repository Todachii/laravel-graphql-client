<template>
  <v-form @submit="postTweet" onsubmit="return false;">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-subheader>Tweet</v-subheader>
        </v-flex>
        <v-flex mb-2>
          <v-sheet class="pa-4" elevation="6">
            <v-list-item avatar>
              <v-list-item-avatar>
                <img
                  :src="'http://localhost:8000/storage/images/' + account.avatar"
                  v-if="account.avatar"
                />
                <v-icon v-else>account_circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-subtitle v-html="account.twitter_id"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-text-field v-model="tweet" :rules="tweetRules" label="tweet" required></v-text-field>
            <v-btn type="submit" color="primary">ツイート</v-btn>
          </v-sheet>
        </v-flex>
        <v-flex xs12>
          <v-sheet class="pa-4" elevation="6">
            <Timeline
              v-bind:timelines="timelines"
              v-bind:account="account"
              v-on:markFavorite="markFavorite"
            />
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { CREATE_TWEET } from "../graphql/mutation";
import { TIMELINE, ACCOUNT } from "../graphql/query";
import Timeline from "../components/Timeline.vue";

export default {
  data: () => ({
    timelines: [],
    account: {},
    tweet: "",
    tweetRules: [(v) => !!v || "required"],
  }),
  components: { Timeline },
  methods: {
    postTweet(e) {
      this.$apollo
        .mutate({
          mutation: CREATE_TWEET,
          variables: {
            tweet: this.tweet,
          },
        })
        .then((data) => {
          this.$apollo.queries.timelines.refetch({
            id: 0,
          });
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
    markFavorite() {
      this.$apollo.queries.timelines.refetch({
        id: 0,
      });
    },
  },
  apollo: {
    timelines: {
      query: TIMELINE,
      loadingKey: "loading",
      variables() {
        return {
          id: 0,
        };
      },
      update(data) {
        return data.Timeline;
      },
    },
    account: {
      query: ACCOUNT,
      loadingKey: "loading",
      update(data) {
        return data.Account;
      },
    },
  },
};
</script>
