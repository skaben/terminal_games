<template>
  <div class="screen">
    <div class="content" v-bind:class="{'distort': isGlitched}">

      <div class="content__header">
        <text-bar :message=headerMessage></text-bar>
      </div>

      <div class="content__main">
        <loading-mech :speed=30></loading-mech>
      </div>

      <div class="content__footer">
        <text-bar :message=footerMessage></text-bar>
      </div>

      <audio ref="powerOnSound" preload hidden>
        <source :src=powerOnSound type="audio/ogg">
      </audio>

    </div>
    <background
      :hue=315
      :opacity=75
      :brightness=200
    ></background>
  </div>

</template>

<script>
import Background from './Background.vue';
import LoadingMech from './LoadingMech.vue';
import TextBar from './TextBar.vue';

export default {
  name: 'loadingView',

  components: {
    TextBar,
    LoadingMech,
    Background,
  },

  data() {
    return {
      isGlitched: false
    }
  },

  props: {
    headerMessage: String,
    footerMessage: String
  },

  mounted() {
    this.distort();
    this.$refs.powerOnSound.play();
  },

  methods: {
    distort() {
      const delay = Math.floor(Math.random() + 1 * 20 * 1000);
      setTimeout(() => this.setGlitched(), delay);
      setTimeout(() => this.distort(), delay);
    },
    setGlitched() {
      this.isGlitched = true;
      setTimeout(() => this.isGlitched = false, 1500);
    },
    // TODO: separate to helpers
    getAudio(name) {
      return require(`../assets/sound/${name}.ogg`);
    },
  },

  computed: {
    bevel() {
      return {
        backgroundImage: `url(${require('../assets/img/bevel.svg')})`
      };
    },
    powerOnSound() {
      return this.getAudio('turnon');
    },
  },
}

</script>

<style lang="scss" scoped>
@import '../styles/distort';

.textbar {
  display: flex;
}

.textbar div:nth-child(1) {
  flex-grow: 1;
}

.content {
  height: 100%;
  padding: 0 2.25rem;
  display: flex;
  flex-direction: column;
}

.content__header {
  padding-top: 2rem;
  flex-shrink: 0;
}

.content__main {
  flex: 1 0 auto;
}

.content__footer {
  padding-bottom: 2rem;
  flex-shrink: 0;
}

</style>
