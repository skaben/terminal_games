<template>
  <div class="navbar">
    <div class="navbar__main">
      <span v-for="(item, index) in data" :key="index">
        <a :href=item.link :tabindex=index>{{item.text}}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          'link': '/back',
          'text': 'back'
        }
      ]
    }
  },
}
</script>

<style lang="scss">

</style>
