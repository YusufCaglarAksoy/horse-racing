import {mount} from '@vue/test-utils';
import {createStore} from 'vuex';
import {describe, it, expect, beforeEach} from 'vitest';
import Hippodrome from '@/components/CompositionApi/Hippodrome.vue';

describe('Hippodrome.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore({
      state: {
        currentLap: {
          name: 'Lap 1',
          distance: 1000,
          horses: [
            {id: 1, color: 'red', position: 100, order: undefined},
            {id: 2, color: 'blue', position: 200, order: 1},
            {id: 3, color: 'green', position: 300, order: 2}
          ]
        }
      },
      getters: {
        currentLap: (state) => state.currentLap
      }
    });

    wrapper = mount(Hippodrome, {
      global: {
        plugins: [store]
      }
    });
  });

  it('renders the component and displays the current lap name and distance', () => {
    expect(wrapper.text()).toContain('Lap 1');
    expect(wrapper.text()).toContain('1000m');
  });

  it('calculates position correctly based on lap distance', () => {
    const getPosition = wrapper.vm.getPosition;
    expect(getPosition(100)).toBe(10);
    expect(getPosition(200)).toBe(20);
    expect(getPosition(300)).toBe(30);
  });

  it('adds the shake class when horse order is undefined and position is set', () => {
    const horse = wrapper.findAll('.fa-horse').at(0);
    expect(horse.classes()).toContain('fa-shake');
  });

  it('does not add the shake class when horse order is defined', () => {
    const horse = wrapper.findAll('.fa-horse').at(1);
    expect(horse.classes()).not.toContain('fa-shake');
  });
});
