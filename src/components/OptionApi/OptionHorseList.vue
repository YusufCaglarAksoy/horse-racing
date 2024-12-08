<template>
  <div class="h-full flex flex-col lg:w-3/12 w-full lg:order-1 order-3">
    <div class="flex justify-center py-2 bg-insider-dark-blue">
      <h2 class="text-2xl text-white font-bold">Horse List</h2>
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-800">
      <option-list-table
        :data="horses"
        :columns="columns"
        :sortable="true"
        :default-sort-order="1"
        :default-sort-field="'id'"
      />
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapState} from "vuex";
import OptionListTable from "@/components/OptionApi/OptionListTable.vue";

export default defineComponent({
  components: {OptionListTable},
  computed: {
    ...mapState(["horses"]),
    columns() {
      return [
        {field: "id", header: "Id"},
        {field: "name", header: "Name"},
        {field: "condition", header: "Condition"},
        {field: "color", header: "Color"},
      ];
    },
  },
  created() {
    this.loadHorses();
  },
  methods: {
    ...mapActions(["generateHorses"]),
    loadHorses() {
      if (!this.horses || this.horses.length === 0) {
        this.generateHorses();
      }
    },
  },
});
</script>
