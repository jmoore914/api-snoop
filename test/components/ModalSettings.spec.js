import ModalSettings from '../../src/components/ModalSettings.vue'
import {shallowMount} from '@vue/test-utils'

test('ModalSettings should export a valid component', () => {
    const wrapper = shallowMount(ModalSettings)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });