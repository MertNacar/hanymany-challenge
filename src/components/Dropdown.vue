<template>
  <select
    :name="name"
    :disabled="vehicles[name].length === 0"
    @change="(event) => onChangeDropdown({ event, key: objKey })"
  >
    <option value="default">Select...</option>
    <option v-for="(item, i) in vehicles[name]" :key="i" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Dropdown",
  props: {
    name: {
      type: String,
      required: true,
    },
    objKey: {
      type: String,
      required: true,
    },
    onChangeDropdown: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    return {
      vehicles: computed(() => store.state.vehicles),
    };
  },
};
</script>

<style>
</style>