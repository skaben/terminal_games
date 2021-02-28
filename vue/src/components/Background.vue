<template>

  <div class="screen screen__background" :style=filter>
    <div class="svg-wrapper" :style=imageUrl></div>
    <div class="screen bg-under"></div>

    <audio ref="bgAudio" loop hidden>
      <source :src=audioUrl type="audio/ogg">
    </audio>

  </div>

</template>

<script>
export default {

  // hue, opacity, brightness
  // 190, 85, 120 - red
  // 315, 75, 200 - green

  props: {
    hue: {
      type: Number,
      default: 0
    },
    brightness: {
      type: Number,
      default: 100
    },
    opacity: {
      type: Number,
      default: 100
    }
  },

  computed: {
    imageUrl() {
      return {backgroundImage: `url(${require('../assets/img/bevel.svg')})`};
    },
    audioUrl() {
      return require('../assets/sound/bg.ogg');
    },
    filter() {
      return {
        filter: `hue-rotate(${this.hue}deg) brightness(${this.brightness}%)`,
        opacity: `${this.opacity}%`,
      };
    }
  },

  mounted() {
    this.$refs.bgAudio.play();
  }

}
</script>

<style lang="scss">
  @import '../styles/variables';

  .screen__background, .svg-wrapper{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: -100;
  }

  .bg-under {
    opacity: 0.2;
    background-image:
    radial-gradient(
      ellipse farthest-corner,
      gray,
      black 90%
    );
    animation: pulse 30s linear infinite;
  }


  @keyframes pulse {
    0% { opacity: .3; }
    25% { opacity: .1; }
    50% { opacity: .2; }
    75% { opacity: .1; }
    100% { opacity: .3; }
  }

</style>
