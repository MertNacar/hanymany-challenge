import api from "@/api";

const state = {
  years: [],
  makes: [],
  models: [],
};

const getters = {};

const actions = {
  getYears: ({ commit }) => {
    return new Promise((resolve, reject) => {
      api.vehicles
        .getYears()
        .then((years) => {
          commit('setYears', { years })
          resolve('success')
        })
        .catch(() => {
          reject('error')
        });
    })
  },
  getMakes: ({ commit }, { year }) => {
    return new Promise((resolve, reject) => {
      api.vehicles
        .getMakes({ year })
        .then((makes) => {
          commit('setMakes', { makes })
          resolve('success')
        })
        .catch(() => {
          reject('error')
        });
    })
  },
  getModels: ({ commit }, { year, make }) => {
    return new Promise((resolve, reject) => {
      api.vehicles
        .getModels({ year, make })
        .then((models) => {
          commit('setModels', { models })
          resolve('success')
        })
        .catch(() => {
          reject('error')
        });
    })
  },
};

const mutations = {
  setYears: (state, { years }) => {
    state.years = years.map((item) => ({
      value: item,
      text: item,
    }));
  },
  setMakes: (state, { makes }) => {
    state.makes = makes.map((item) => ({
      value: item.name,
      text: item.name,
    }));
  },
  setModels: (state, { models }) => {
    state.models = models.map((item) => ({
      value: item.original_model,
      text: item.original_model,
    }));
  },
  clearMakes: (state) => {
    state.makes = []
  },
  clearModels: (state) => {
    state.models = []
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
