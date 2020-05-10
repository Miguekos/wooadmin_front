<template>
  <div class="q-pa-md">
    <q-input square outlined v-model="keyword" label="Square outlined" />
    {{ category }}
    <q-select
      square
      outlined
      v-model="category"
      :options="carbs"
      label="Square outlined"
    />
    <q-select
      square
      outlined
      v-model="sodium"
      :options="sodiums"
      label="Square outlined"
    />
    <!-- <select v-model="category">
      <option value="0">Search by category</option>
      <option v-for="cat in carbs" :value="cat">{{ cat.name }}</option>
    </select> -->
    <q-table
      title="Treats"
      :data="filteredByAll"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      carbs: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      list: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ],
      lista: [
        { name: "asd", category: 1 },
        { name: "zxc", category: 1 },
        { name: "qwe", category: 1 },
        { name: "qqq", category: 2 },
        { name: "www", category: 2 },
        { name: "eee", category: 2 },
        { name: "rrr", category: 2 },
        { name: "ttt", category: 2 },
        { name: "ert", category: 1 },
        { name: "wer", category: 2 },
        { name: "sdf", category: 1 },
        { name: "dfg", category: 2 },
        { name: "xcv", category: 1 }
      ],
      keyword: "",
      category: null,
      sodium: null,
      sodiums: []
    };
  },
  methods: {
    getByKeyword(list, keyword) {
      const search = keyword.trim();
      if (!search.length) return list;
      return list.filter(item => item.name.indexOf(search) > -1);
    },
    getByCategory(list, carbs) {
      if (!carbs) return list;
      let asd = [];
      asd = list.filter(item => item.carbs === carbs);
      return asd;
    },
    getBySodi(list, sodium) {
      if (!sodium) return list;
      return list.filter(item => item.sodium === sodium);
    }
  },
  computed: {
    filteredByAll() {
      //   return this.getByCategory(
      //     this.getByKeyword(this.list, this.keyword),
      //     this.category,
      //   );
      const keyw = this.getByKeyword(this.list, this.keyword);
      const cte = this.getByCategory(keyw, this.category);
      const sodi = this.getBySodi(cte, this.sodium);
      return sodi;
    }
    // filteredByKeyword() {
    //   return this.getByKeyword(this.list, this.keyword);
    // },
    // filteredByCategory() {
    //   return this.getByCategory(this.list, this.carbs);
    // },
    // filteredBySodi() {
    //   return this.getBySodi(this.list, this.sodium);
    // }
  },
  created() {
    const array = this.list;
    this.carbs = [];
    this.sodiums = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      //   console.log(element.carbs);
      this.carbs.push(element.carbs);
      this.sodiums.push(element.sodium);
    }
  }
};
</script>
