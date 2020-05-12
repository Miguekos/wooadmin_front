import { axiosInstance } from "boot/axios";
function enviarOlva(arreglo) {
  for (let index = 0; index < arreglo.length; index++) {
    const element = arreglo[index];
    const bodyJsonOlvaa = {
      consignado: "PRUEBA CONSIGNADO TUT LOGIST. ",
      nroDocConsignado: "87654321",
      direccion: "Direccion Consignado Prueba #Nro P001",
      ubigeo: "150141",
      codigoRastreo: "654788122-001",
      observacion: "ROPA DEPORTIVA ARSENAL",
      montoArticulo: 100,
      receptor: "",
      rucSeller: "20600721021",
      ubigeoSeller: "150141",
      seller: "TUT LOGISTIC PERU S.A.C.",
      direccionSeller:
        "CALLE ANDREA DEL SARTO 247 URBANIZACIÓN CALERA DE LAMERCED - SURQUILLO",
      contacto: "VICTOR RICARDO ITURBE CABANILLAS",
      telefono: "013379842 / 989415253",
      codClienteRucDni: "20600721021",
      total: 150,
      formaPago: "PPD",
      tipoEnvi: "10",
      altoEnvio: 5.5,
      anchoEnvio: 20.2,
      largoEnvio: 10.5,
      pesoUnitario: 2.3,
      codContenedor: 19
    };
    console.log(bodyJsonOlvaa);
    actions.mongolva(bodyJsonOlvaa);
  }
}
const state = {
  Ordenes: [],
  search: "",
  searchNew: "",
  searchactive: true,
  getOlva: []
};

const mutations = {
  setOrdenes(state, payload) {
    state.Ordenes = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  getOlva(state, payload) {
    state.getOlva = payload;
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
  async OlvaEnvio({ commit }, payload) {
    console.log("Todos los ordenes");
    console.log(enviarOlva(payload));
    // const response = await axiosInstance.post(`/olva`, enviarOlva(payload));
    console.log("Todos los ordenes");
    // commit("setOrdenes", response.data);
    // return response.data;
  },
  async mongolva(payload) {
    console.log("Todos los mongolva");
    console.log(payload);
    const response = await axiosInstance.post(`/mongolva`, payload);
    console.log("Todos los mongolva");
    // commit("setOrdenes", response.data);
    // return response.data;
  },
  async mongolvaGet({ commit }) {
    console.log("Todos los GET mongolva");
    const response = await axiosInstance.get(`/mongolva`);
    console.log("Todos los GET mongolva");
    commit("getOlva", response.data);
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
  getOlva(state) {
    return state.getOlva;
  },
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Ordenes).forEach(function(key) {
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
    Object.keys(taskFiltered).forEach(function(key) {
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
