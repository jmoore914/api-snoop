import TabBar from '../../src/components/TabBar.vue'
import {shallowMount} from '@vue/test-utils'

test('TabBar should export a valid component', () => {
    const wrapper = shallowMount(TabBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });