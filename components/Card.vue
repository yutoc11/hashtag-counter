<template lang="pug">
  .column
    .card
      header.card-header
        p.card-header-title.has-text-grey {{title}}
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
