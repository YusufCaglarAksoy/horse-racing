<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th v-for="col in columns"
          :key="col.field"
          class="px-4 py-2 cursor-pointer"
          @click="toggleSort(col.field)">
        {{ col.header }}
        <i v-if="sortable" :class="getSortIconClass(col.field)"></i>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="horse in sortedData"
        :key="horse.id"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td v-for="col in columns"
          :key="col.field"
          class="px-4 py-2">
        <template v-if="col.field === 'color'">
          <span class="w-4 h-4 block rounded-full border border-white" :style="{ background: horse.color }"></span>
        </template>
        <template v-else>
          {{ horse[col.field] || " - " }}
        </template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  columns: {type: Array, required: true},
  sortable: {type: Boolean, default: false},
  data: {type: Array, required: true},
  defaultSortField: {type: String, default: null},
  defaultSortOrder: {type: Number, default: -1},
});

const sortField = ref(props.defaultSortField);
const sortOrder = ref(props.defaultSortOrder);

const sortedData = computed(() => {
  if (!props.sortable || !sortField.value) {
    return props.data;
  }
  return [...props.data].sort((a, b) => {
    const aValue = a[sortField.value] || '';
    const bValue = b[sortField.value] || '';

    if (aValue < bValue) return sortOrder.value === -1 ? 1 : -1;
    if (aValue > bValue) return sortOrder.value === -1 ? -1 : 1;
    return 0;
  });
});

const toggleSort = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === -1 ? 1 : -1;
  } else {
    sortField.value = field;
    sortOrder.value = -1;
  }
};

const getSortIconClass = (field) => {
  if (sortField.value !== field) return 'hidden transition-all fa-solid fa-lg';
  return sortOrder.value === -1
    ? 'fa-arrow-up-wide-short transition-all fa-solid fa-lg'
    : 'fa-arrow-down-short-wide transition-all fa-solid fa-lg';
};
</script>
