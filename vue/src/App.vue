<template>

  <div class="application">
    <loading-view></loading-view>
  </div>

</template>

<script>
import axios from 'axios';
import store from './store.js';

import LoadingView from './components/LoadingView.vue';

const API_URL = 'http://127.0.0.1:5000/api';


export default {
  name: 'terminal',

  components: {
    LoadingView,
  },

  created() {
    store.data = {};
    this.getData(`${API_URL}/main`, store.data);
  },

  methods: {
    getData(source, target) {
      axios
        .get(source)
        .then(response => {
          if (response.data.error) { throw response.data.error };
          if (target) { target = response.data };
        })
        .catch (errorMessage => {
          console.error(errorMessage);
        })
    }
  }


}

</script>

<style lang="scss">
@import './styles/main';
</style>
