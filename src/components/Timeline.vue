<template>
  <v-list two-line>
    <template v-for="(timeline, index) in timelines">
      <v-list-item :key="index" avatar>
        <v-list-item-avatar>
          <v-img
            v-if="timeline.tweet.account.avatar"
            :src="'http://localhost:8000/storage/images/' + timeline.tweet.account.avatar"
          ></v-img>
          <v-icon v-else>none</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <div
            v-text="timeline.originalFavorite ? timeline.originalFavorite.account.name + 'さんがいいねしました' : ''"
          ></div>
          <v-list-item-subtitle v-html="timeline.tweet.account.twitter_id"></v-list-item-subtitle>
          <v-list-item-title v-html="timeline.tweet.content"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            v-if="!timeline.favorite"
            @click="()=>markFavorite(timeline.tweet.id, timeline.id)"
            text
            icon
            color="blue-grey lighten-4"
          >
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn
            v-else
            @click="()=>unMarkFavorite(timeline.tweet.id, timeline.id)"
            text
            icon
            color="pink"
          >
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider :key="index+'_divider'"></v-divider>
    </template>
  </v-list>
</template>


<script>
import { MARK_FAVORITE, UN_MARK_FAVORITE } from "../graphql/mutation";

export default {
  props: {
    timelines: Array,
    account: {
      avatar: null,
      name: "",
      twitter_id: "",
    },
  },
  methods: {
    markFavorite(tweetId, timelineId) {
      this.$apollo
        .mutate({
          mutation: MARK_FAVORITE,
          variables: {
            tweet_id: parseInt(tweetId, 10),
            timeline_id: parseInt(timelineId, 10),
          },
        })
        .then((data) => {
          this.$emit("markFavorite");
        });
    },
    unMarkFavorite(tweetId, timelineId) {
      this.$apollo
        .mutate({
          mutation: UN_MARK_FAVORITE,
          variables: {
            tweet_id: parseInt(tweetId, 10),
            timeline_id: parseInt(timelineId, 10),
          },
        })
        .then((data) => {
          this.$emit("markFavorite");
        });
    },
  },
};
</script>
