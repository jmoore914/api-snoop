import ModalLastResponse from '../../src/components/ModalLastResponse.vue'
import {shallowMount} from '@vue/test-utils'

test('ModalLastResponse should export a valid component', () => {
    const wrapper = shallowMount(ModalLastResponse)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });