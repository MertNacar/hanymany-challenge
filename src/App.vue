<template>
  <div class="d-flex flex-column justify-center align-center mt-6">
    <h1>What car are you shipping?</h1>
    <h4>Select vehicle year, make and model</h4>
    <div class="mt-6">
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
      Object.assign(vehicle, { [key]: event.target.value });
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

<style lang="scss">
$primary: rgb(173, 88, 88);
$bg-primary: rgb(68, 62, 62);

html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  background-color: $bg-primary;
}

h1,
h4 {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.mt-6 {
  margin-top: 3rem;
}

select {
  color: white;
  width: 250px;
  padding: 1rem;
  margin: 0.5rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 2px solid $primary;
  background-color: $bg-primary;
}

input:focus,
select:focus,
button:focus {
  box-shadow: 0 0 2pt 1pt $primary;
  outline: none;
}

input::placeholder,
select::placeholder,
button::placeholder {
  opacity: 0.8;
  color: white;
}

.d-flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.flex-column {
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.justify-center {
  -webkit-justify-content: center;
  justify-content: center;
}

.align-center {
  -webkit-box-align: center;
  align-items: center;
}

.err-text {
  color: red;
}
</style>
