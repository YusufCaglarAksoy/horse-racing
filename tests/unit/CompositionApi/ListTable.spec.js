import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import ListTable from '@/components/CompositionApi/ListTable.vue';

describe('ListTable.vue', () => {
  let wrapper;

  const columnsMock = [
    {field: 'id', header: 'Id'},
    {field: 'name', header: 'Name'},
    {field: 'color', header: 'Color'},
  ];

  const dataMock = [
    {id: 1, name: 'Horse 1', color: 'red'},
    {id: 2, name: 'Horse 2', color: 'blue'},
    {id: 3, name: 'Horse 3', color: 'green'},
  ];

  beforeEach(() => {
    wrapper = mount(ListTable, {
      props: {
        columns: columnsMock,
        data: dataMock,
        sortable: true,
        defaultSortField: 'name',
        defaultSortOrder: -1,
      },
    });
  });

  it('renders the table correctly with the given columns', () => {
    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(columnsMock.length);

    columnsMock.forEach((column, index) => {
      expect(headers[index].text()).toBe(column.header);
    });
  });

  it('toggles sorting order when a column header is clicked', async () => {
    const firstHeader = wrapper.find('th');
    await firstHeader.trigger('click');

    const firstRowCells = wrapper.findAll('tr')[1].findAll('td');
    const firstRowDataAfterSort = firstRowCells[1].text();

    await firstHeader.trigger('click');
    const firstRowDataAfterSortToggled = wrapper.findAll('tr')[1].findAll('td')[1].text();

    expect(firstRowDataAfterSort).not.toBe(firstRowDataAfterSortToggled);
  });

  it('does not sort when sortable is false', async () => {
    await wrapper.setProps({sortable: false});

    const firstHeader = wrapper.find('th');
    await firstHeader.trigger('click');

    const firstRowCells = wrapper.findAll('tr')[1].findAll('td');
    expect(firstRowCells[1].text()).toBe(dataMock[0].name);
  });
});
