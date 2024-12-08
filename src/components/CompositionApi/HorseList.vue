<template>
  <div class="h-full flex flex-col lg:w-3/12 w-full lg:order-1 order-3">
    <div class="flex justify-center py-2 bg-insider-dark-blue">
      <h2 class="text-2xl text-white font-bold">Horse List</h2>
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-800 horse-list">
      <list-table
        :data="horses"
        :columns="columns"
        :sortable="true"
        :default-sort-order="1"
        :default-sort-field="'id'"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import ListTable from './ListTable.vue';

const store = useStore();

const horses = computed(() => store.state.horses);

const columns = computed(() => [
  {field: 'id', header: 'Id'},
  {field: 'name', header: 'Name'},
  {field: 'condition', header: 'Condition'},
  {field: 'color', header: 'Color'},
]);

const generateHorses = () => {
  store.dispatch('generateHorses');
};

const loadHorses = () => {
  if (!horses.value || horses.value.length === 0) {
    generateHorses();
  }
};

onMounted(loadHorses);
</script>
