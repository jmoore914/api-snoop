import CustomTextInput from '../../src/components/CustomTextInput.vue'
import {shallowMount} from '@vue/test-utils'

test('CustomTextInput should export a valid component', () => {
    const wrapper = shallowMount(CustomTextInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });