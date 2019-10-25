---
to: test/components/<%= name %>.spec.js
unless_exists: true
---
import <%= name %> from '../../src/components/<%= name %>.vue'
import {shallowMount} from '@vue/test-utils'

test('<%= name %> should export a valid component', () => {
    const wrapper = shallowMount(<%= name %>)
    expect(wrapper.isVueInstance()).toBeTruthy()
    });