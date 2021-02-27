<template>
  <select
    :disabled="options.length === 0"
    @change="(event) => onChangeDropdown({ event, key: name })"
    :name="name"
  >
    <option value="default">Select...</option>
    <option v-for="(item, i) in options" :key="i" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    onChangeDropdown: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
</style>