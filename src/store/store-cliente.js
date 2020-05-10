import { axiosInstance } from "boot/axios";
const state = {
  Clientes: [],
  ClienteOne: "",
  search: ""
};

const mutations = {
  setClientes(state, payload) {
    state.Clientes = payload;
  },
  setClienteOne(state, payload) {
    state.ClienteOne = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  }
};

const actions = {
  async callCliente({ commit }) {
    console.log("callCliente");
    const response = await axiosInstance.get(`/clientes`);
    commit("setClientes", response.data);
    // return response.data;
  },
  async callClienteOne({ commit }, payload) {
    console.log("callClienteOne");
    const response = await axiosInstance.get(`/cliente/${payload}`);
    commit("setClienteOne", response.data);
    // return response.data;
  },
  async addCliente({ commit }, payload) {
    console.log("addCliente");
    console.log(payload);
    const response = await axiosInstance.post(`/cliente/add`, payload);
    console.log(response);
    // commit("setClientes", response.data);
    return response.data;
  },
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
  }
};

const getters = {
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Clientes).forEach(function (key) {
        let task = state.Clientes[key],
          taskNameLowerCase = task.id.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Clientes;
  },
  getClientes(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    console.log("taskFiltered", taskFiltered);
    console.log("state.Clientes", state.Clientes);
    // return state.Clientes;
    // let tasks = {};
    Object.keys(taskFiltered).forEach(function (key) {
      let task = taskFiltered[key];
      // console.log(task);
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    // return taskFiltered;
    return tasks;
  },
  getClienteOne(state) {
    console.log(state.ClienteOne);
    return state.ClienteOne;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
