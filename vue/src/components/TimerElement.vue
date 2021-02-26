<template>
  <div class="timer">
    <div class="timer__main">{{time}}</div>
  </div>
</template>

<script>
import eventBus from '../event-bus';

export default {

  data() {
    return {
      time: ''
    }
  },

  props: {
    timer: {
      type: Number,
      default: 0
    },
    onEnd: {
      type: String,
      default: 'stop'
    }
  },

  methods: {
    start() {
      this.counter = setInterval(() => {
        if (this.timer > 0) {
          this.time = `${--this.timer}`;
        } else {
          this.stop();
        }
      }, 1000);
    },

    stop() {
      this.time = '';
      clearInterval(this.counter);
      eventBus.$emit('timer', this.onEnd)
    }
  }

}
</script>
