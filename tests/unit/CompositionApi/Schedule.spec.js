import {mount} from '@vue/test-utils';
import {describe, it, expect, vi} from 'vitest';
import {createStore} from 'vuex';
import Schedule from '@/components/CompositionApi/Schedule.vue';
import LapList from '@/components/CompositionApi/LapList.vue';

describe('Schedule.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore({
      state: {
        laps: [
          {id: 1, name: 'Lap 1'},
          {id: 2, name: 'Lap 2'},
        ],
        results: [
          {id: 1, name: 'Result 1'},
          {id: 2, name: 'Result 2'},
        ],
      },
    });

    wrapper = mount(Schedule, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders two LapList components with correct props', () => {
    const lapLists = wrapper.findAllComponents(LapList);
    expect(lapLists.length).toBe(2);

    const lapList1 = lapLists[0];
    expect(lapList1.props('title')).toBe('Program');
    expect(lapList1.props('items')).toEqual([
      {id: 1, name: 'Lap 1'},
      {id: 2, name: 'Lap 2'},
    ]);
    expect(lapList1.props('type')).toBe('horses');

    const lapList2 = lapLists[1];
    expect(lapList2.props('title')).toBe('Result');
    expect(lapList2.props('items')).toEqual([
      {id: 1, name: 'Result 1'},
      {id: 2, name: 'Result 2'},
    ]);
    expect(lapList2.props('type')).toBe('result');
  });
});
