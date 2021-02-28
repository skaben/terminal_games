<template>

  <div class="application">
    <loading-view></loading-view>
  </div>

</template>

<script>
import LoadingView from './components/LoadingView.vue';

export default {
  name: 'terminal',

  components: {
    LoadingView,
  },

}

</script>

<style lang="scss">
@import './styles/main';
</style>
