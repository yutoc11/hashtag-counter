<template lang="pug">
v-expansion-panel-content
  template(v-slot:header)
    div minne用
  v-card
    v-card-text
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  v-layout(align-center justify-space-between row fill-height)
    v-btn(small round)
      v-icon(small) delete
    v-btn(small round)
      v-icon(small) edit
    v-btn(small round)
      v-icon(small) file_copy
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
