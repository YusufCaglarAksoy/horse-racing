import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import ListTable from '@/components/CompositionApi/ListTable.vue';
import LapList from '@/components/CompositionApi/LapList.vue';

describe('LapList.vue', () => {
  let wrapper;

  const itemsMock = [
    {id: 1, name: 'Lap 1', distance: 1000, type1: [{id: 1, name: 'Horse 1', color: 'Red'}]},
    {id: 2, name: 'Lap 2', distance: 2000, type1: [{id: 2, name: 'Horse 2', color: 'Blue'}]},
  ];

  const columnsMock = [
    {field: 'id', header: 'Id'},
    {field: 'name', header: 'Name'},
    {field: 'color', header: 'Color'},
  ];

  beforeEach(() => {
    wrapper = mount(LapList, {
      props: {
        title: 'Test Title',
        items: itemsMock,
        type: 'type1',
      },
      global: {
        components: {
          ListTable,
        },
      },
    });
  });

  it('renders the title correctly', () => {
    expect(wrapper.text()).toContain('Test Title');
  });

  it('renders the correct number of item blocks', () => {
    const itemBlocks = wrapper.findAll('.item-block');
    expect(itemBlocks).toHaveLength(itemsMock.length);
  });

  it('renders each item name and distance correctly', () => {
    const itemBlocks = wrapper.findAll('.item-block');
    itemBlocks.forEach((block, index) => {
      expect(block.text()).toContain(itemsMock[index].name);
      expect(block.text()).toContain(`${itemsMock[index].distance}m`);
    });
  });

  it('passes the correct data to the ListTable component', () => {
    const listTableComponents = wrapper.findAllComponents(ListTable);
    listTableComponents.forEach((listTable, index) => {
      const tableData = listTable.props('data');
      expect(tableData).toEqual(itemsMock[index].type1);
    });
  });

  it('correctly passes columns to ListTable', () => {
    const listTableComponents = wrapper.findAllComponents(ListTable);
    listTableComponents.forEach((listTable) => {
      const tableColumns = listTable.props('columns');
      expect(tableColumns).toEqual(columnsMock);
    });
  });
});
