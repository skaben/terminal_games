<template>

  <div>
    <div class="screen screen__content"
         v-bind:class="{'glitched': isGlitched}">
      <div class="content">
        <div class="content__header">
          <text-bar :message='`theheader`'></text-bar>
        </div>
        <div class="content__main">
          <loading-mech></loading-mech>
        </div>
        <div class="content__footer">
          <text-bar :message='`thefooter`'></text-bar>
        </div>
      </div>
    </div>
    <!-- <div class="screen screen__effects">
      <div class="screen__effects-stripe"></div>
    </div> -->
    <background
      :hue=320
      :brightness=180
      :opacity=50
    ></background>

    <audio ref="powerOnSound" preload hidden>
      <source :src=powerOnSound type="audio/ogg">
    </audio>

  </div>

</template>

<script>
import Background from './components/Background.vue';
import LoadingMech from './components/LoadingMech.vue';
import TextBar from './components/TextBar.vue';

export default {
  name: 'terminal',

  data() {
    return {
      isGlitched: false
    }
  },

  components: {
    TextBar,
    LoadingMech,
    Background,
  },

  computed: {
    bevel() {
      return {
        backgroundImage: `url(${require('./assets/img/bevel.svg')})`
      };
    },
    powerOnSound() {
      return this.getAudio('turnon');
    },
  },

  mounted() {
    this.distort();
    this.$refs.powerOnSound.play();
  },

  methods: {
    distort() {
      const delay = Math.floor(Math.random() + 1 * 15 * 500);
      setTimeout(() => this.setGlitched(), delay);
      setTimeout(() => this.distort(), delay);
    },
    setGlitched() {
      this.isGlitched = true;
      setTimeout(() => this.isGlitched = false, 1500);
    },
    getAudio(name) {
      return require(`./assets/sound/${name}.ogg`);
    },
  }
}

</script>

<style lang="scss">
@import './styles/fonts';
@import './styles/main';
@import './styles/glitch';

.textbar {
  display: flex;
}

.textbar div:nth-child(1) {
  flex-grow: 1;
}

.screen__content {
  overflow: hidden;
}

.content__header {
  margin-top: .75rem;
}

.content__footer {
  position: absolute;
  bottom: 5vh;
  width: 50vw;
}

</style>
