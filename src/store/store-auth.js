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
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.post(`/users/login`, payload);
    // console.log(response.data);
    // commit("setClientes", response.data);
    return response.data;
  },
  async recuperar({ commit }, payload) {
    // console.log("Login");
    // console.log(payload);
    const jsonSend = {
      email: payload
    };
    console.log(jsonSend)
    const response = await axiosInstance.put(`/user/recuperar`, jsonSend);
    // console.log(response.data);
    // commit("setClientes", response.data);
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
