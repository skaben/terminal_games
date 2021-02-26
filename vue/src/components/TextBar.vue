<template>
  <div class="textbar">
    <div class="textbar__main">{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'terminal vt40k'
    },
  }
}
</script>
