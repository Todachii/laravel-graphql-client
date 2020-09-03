<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-sheet class="pa-4" elevation="6">
            <template v-for="(account, index) in accounts">
              <v-list-item :key="index" avatar>
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

                <v-list-item-action>
                  <v-btn
                    v-if="!account.is_following_account"
                    :data-account-id="account.id"
                    @click="followAccount"
                    color="primary"
                  >フォローする</v-btn>
                  <v-btn
                    v-else
                    :data-account-id="account.id"
                    @click="unFollowAccount"
                    color="primary"
                  >アンフォローする</v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="index+'_divider'"></v-divider>
            </template>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { ACCOUNTS } from "../graphql/query";
import { FOLLOW_ACCOUNT, UN_FOLLOW_ACCOUNT } from "../graphql/mutation";

export default {
  data: () => ({
    valid: false,
    accounts: {},
  }),
  methods: {
    followAccount(e) {
      this.$apollo
        .mutate({
          mutation: FOLLOW_ACCOUNT,
          variables: {
            id: parseInt(e.currentTarget.getAttribute("data-account-id"), 10),
          },
        })
        .then((data) => {
          this.$apollo.queries.accounts.refetch({
            count: 10,
            page: 1,
          });
        });
    },
    unFollowAccount(e) {
      this.$apollo
        .mutate({
          mutation: UN_FOLLOW_ACCOUNT,
          variables: {
            id: parseInt(e.currentTarget.getAttribute("data-account-id"), 10),
          },
        })
        .then((data) => {
          this.$apollo.queries.accounts.refetch({
            count: 10,
            page: 1,
          });
        });
    },
  },
  apollo: {
    accounts: {
      query: ACCOUNTS,
      loadingKey: "loading",
      variables() {
        return {
          count: 10,
          page: 1,
        };
      },
      update(data) {
        return data.Accounts.data;
      },
    },
  },
};
</script>
