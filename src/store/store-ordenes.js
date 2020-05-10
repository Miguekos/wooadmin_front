import { axiosInstance } from "boot/axios";
const state = {
  Ordenes: [],
  search: "",
  searchNew: "",
  searchactive: true
};

const mutations = {
  setOrdenes(state, payload) {
    state.Ordenes = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  }
};

const actions = {
  async callOrdenes({ commit }) {
    console.log("Todos los ordenes");
    const response = await axiosInstance.get(`/ordenes/100`);
    console.log("Todos los ordenes");
    commit("setOrdenes", response.data);
    // return response.data;
  },
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
  },
  setSearchNew({ commit }, payload) {
    commit("setSearch", payload);
  }
};

const getters = {
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Ordenes).forEach(function (key) {
        let task = state.Ordenes[key],
          taskNameLowerCase = task.payment_method_title.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Ordenes;
  },
  getOrdenes(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    // console.log("taskFiltered", taskFiltered);
    console.log("state.Ordenes_D", state.Ordenes);
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
    console.log("tasks", tasks);

    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
