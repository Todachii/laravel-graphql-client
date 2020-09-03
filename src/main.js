import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// apollo本体
import { ApolloClient } from "apollo-client";
// ApolloClientへのオプション
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// vueとの紐付け
import VueApollo from "vue-apollo";

Vue.config.productionTip = false;

// vueでvue-apolloを使用する事の紐付け
Vue.use(VueApollo);
// createHttpLinkでエンドポイントの指定をします
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

// ログイン後にBearerを指定したJWT通信が入るので先に記述します
// 今回はlocalstorageを用いてtokenを保持します
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("vue_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apolloclientの初期化です
// linkとmemoryCacheを有効にします
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// apolloProviderを設定します。
// あとでstoreにエラーを通知しようと思うのでstoreへのコミットを記述します
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler(error) {
    store.commit("error");
  },
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
