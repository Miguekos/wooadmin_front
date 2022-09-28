import { axiosInstance } from "boot/axios";
const state = {
  authenticated: false,
  role: 1
};

const mutations = {
  setAuth(state, payload) {
    state.authenticated = payload;
  },
  setRole(state, payload) {
    state.role = payload;
  }
};

const actions = {
  async login(payload) {
    const response = await axiosInstance.post(`/users/login`, payload);
    return response.data;
  },
  async recuperar({ commit }, payload) {
    const jsonSend = {
      email: payload
    };
    console.log(jsonSend)
    const response = await axiosInstance.put(`/user/recuperar`, jsonSend);
    return response.data;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
