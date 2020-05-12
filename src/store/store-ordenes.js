import { axiosInstance } from "boot/axios";
function enviarOlva(arreglo) {
  const array = JSON.parse(arreglo)
  // console.log("arreglo", arreglo);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log(element);
    const bodyJsonOlvaa = {
      // consignado: "PRUEBA CONSIGNADO TUT LOGIST. ",
      consignado: `${element.billing.first_name} ${element.billing.last_name}`,
      nroDocConsignado: element.billing.company,
      direccion: element.billing.address_1,
      ubigeo: "150141",
      codigoRastreo: element.id,
      observacion: element.line_items[0].name,
      montoArticulo: element.line_items[0].price,
      receptor: "",
      rucSeller: "20603349742",
      ubigeoSeller: "150126",
      seller: "HAP SELLERS S.A.C.",
      direccionSeller:
        "BSF Almacenes del Perú. Panamericana Sur Km 38 - Punta Hermosa, Lima",
      contacto: "Luis Cardenas",
      telefono: "999121731",
      codClienteRucDni: "06664989",
      total: 0,
      formaPago: "PPD",
      tipoEnvi: "10",
      altoEnvio: 0.0,
      anchoEnvio: 0.0,
      largoEnvio: 0.0,
      pesoUnitario: 0.0,
      codContenedor: 2
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
