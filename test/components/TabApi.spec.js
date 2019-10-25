import TabApi from '../../src/components/TabApi.vue'
import {shallowMount} from '@vue/test-utils'

test('TabApi should export a valid component', () => {
    const wrapper = shallowMount(TabApi)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });