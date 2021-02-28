<template>
  <div class="textbar">
    <div class="textbar__main"><span>{{message}}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  }
}
</script>
