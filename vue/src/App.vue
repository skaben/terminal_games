<template>
  <div class="content">
    <div class="content__header">
      <text-bar :message='`theheader`'></text-bar>
    </div>
    <div class="content__main" data-element="main">
      <loading-mech></loading-mech>
    </div>
    <div class="content__footer" data-element="footer">
      <text-bar :message='`thefooter`'></text-bar>
    </div>
  </div>
</template>

<script>
import LoadingMech from './components/LoadingMech.vue';
import TextBar from './components/TextBar.vue';

export default {
  name: 'terminal',

  components: {
    TextBar,
    LoadingMech,
  }
}

</script>

<style lang="scss">
.textbar {
  display: flex;
}

.textbar div:nth-child(1) {
  flex-grow: 1;
}

.content__footer {
  position: absolute;
  bottom: 5vh;
  width: 50vw;
}

</style>
