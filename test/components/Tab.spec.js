import Tab from '../../src/components/Tab.vue'
import {shallowMount} from '@vue/test-utils'

test('Tab should export a valid component', () => {
    const wrapper = shallowMount(Tab)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });