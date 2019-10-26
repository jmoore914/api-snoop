import TabBarName from '../../src/components/TabBarName.vue'
import {shallowMount} from '@vue/test-utils'

test('TabBarName should export a valid component', () => {
    const wrapper = shallowMount(TabBarName)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });