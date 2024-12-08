import {mount} from '@vue/test-utils';
import {createStore} from 'vuex';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import HorseList from '@/components/CompositionApi/HorseList.vue';

describe('HorseList.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore({
      state: {
        horses: [
          {id: 1, name: 'Thunder', condition: 'Healthy', color: 'Red'},
          {id: 2, name: 'Storm', condition: 'Injured', color: 'Blue'},
        ],
      },
      actions: {
        generateHorses: vi.fn(),
      },
      getters: {
        horses: (state) => state.horses,
      },
    });

    wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders the Horse List title', () => {
    expect(wrapper.text()).toContain('Horse List');
  });


  it('calls generateHorses when the horses list is empty', async () => {
    store.state.horses = [];
    const generateHorsesMock = vi.fn();
    store.dispatch = generateHorsesMock;

    await wrapper.vm.loadHorses();

    expect(generateHorsesMock).toHaveBeenCalledTimes(1);
  });

  it('does not call generateHorses when the horses list is not empty', async () => {
    const generateHorsesMock = vi.fn();
    store.dispatch = generateHorsesMock;

    await wrapper.vm.loadHorses();

    expect(generateHorsesMock).not.toHaveBeenCalled();
  });

  it('correctly sorts the table by the default field and order', () => {
    const firstHorseRow = wrapper.findAll('tr')[1];
    expect(firstHorseRow.text()).toContain('Thunder');
  });
});
