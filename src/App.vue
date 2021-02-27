<template>
  <div>
    <h1>What car are you shipping?</h1>
    <h4>Select vehicle year, make and model</h4>
    <div>
      <Dropdown
        name="year"
        :options="years"
        :onChangeDropdown="handleChangeDropdown"
      />
      <Dropdown
        name="make"
        :options="makes"
        :onChangeDropdown="handleChangeDropdown"
      />
      <Dropdown
        name="model"
        :options="models"
        :onChangeDropdown="handleChangeDropdown"
      />
    </div>
    <div v-if="err">Unexpected error occured.</div>
  </div>
</template>

<script>
import api from "@/api";
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: "App",
  components: {
    Dropdown,
  },
  data() {
    return {
      years: [],
      makes: [],
      models: [],
      vehicle: {
        year: null,
        make: null,
        model: null,
      },
      err: false,
    };
  },
  created() {
    this.initializeApp();
  },
  methods: {
    initializeApp() {
      this.err = false;
      api.vehicles
        .getYears()
        .then((data) => {
          this.years = data.map((item) => ({
            value: item,
            text: item,
          }));
        })
        .catch(() => {
          this.err = true;
        });
    },
    handleChangeDropdown({ event, key }) {
      this.vehicle = { ...this.vehicle, [key]: event.target.value };
    },
  },
  watch: {
    "vehicle.year": {
      handler: function (newVal) {
        if (newVal) {
          this.err = false;
          api.vehicles
            .getMakes({ year: newVal })
            .then((data) => {
              this.makes = data.map((item) => ({
                value: item.name,
                text: item.name,
              }));
            })
            .catch(() => {
              this.err = true;
            });
        }
      },
      immediate: true,
    },
    "vehicle.make": {
      handler: function (newVal) {
        if (newVal) {
          const { year } = this.vehicle;
          this.err = false;
          api.vehicles
            .getModels({ year, make: newVal })
            .then((data) => {
              this.models = data.map((item) => ({
                value: item.original_model,
                text: item.original_model,
              }));
            })
            .catch(() => {
              this.err = true;
            });
        }
      },
      immediate: true,
    },
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
</style>
