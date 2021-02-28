<template>
  <div>
    <h1>What car are you shipping?</h1>
    <h4>Select vehicle year, make and model</h4>
    <div>
      <Dropdown
        name="years"
        objKey="year"
        :onChangeDropdown="handleChangeDropdown"
      />
      <Dropdown
        name="makes"
        objKey="make"
        :onChangeDropdown="handleChangeDropdown"
      />
      <Dropdown
        name="models"
        objKey="model"
        :onChangeDropdown="handleChangeDropdown"
      />
    </div>
    <div class="err-text" v-if="err">Unexpected error occured.</div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: "App",
  components: {
    Dropdown,
  },
  setup() {
    const store = useStore();
    let vehicle = reactive({
      year: null,
      make: null,
      model: null,
    });
    let err = ref(false);

    store.dispatch("vehicles/getYears");

    const handleChangeDropdown = ({ event, key }) => {
      Object.assign(vehicle, { ...vehicle, [key]: event.target.value });
    };

    watch(
      [() => vehicle.year, () => vehicle.make],
      ([year, make], [oldYears, oldMakes]) => {
        if (year && year !== oldYears) {
          store.commit("vehicles/clearMakes");
          store.commit("vehicles/clearModels");
          store.dispatch("vehicles/getMakes", { year }).catch(() => {
            err.value = true;
          });
        } else if (make && make !== oldMakes) {
          const { year } = vehicle;
          store.commit("vehicles/clearModels");
          store
            .dispatch("vehicles/getModels", {
              year,
              make,
            })
            .catch(() => {
              err.value = true;
            });
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      err,
      (newErr) => {
        if (newErr) {
          setTimeout(() => {
            err.value = false;
          }, 3000);
        }
      },
      { immediate: true }
    );

    return {
      vehicle,
      err,
      handleChangeDropdown,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1,
h4 {
  padding: 1rem;
}

select {
  padding: 0.5rem;
  margin: 1rem;
}

.err-text {
  color: red;
}
</style>
