import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/shared/utils'
import Checkbox from '../Checkbox.vue'

export default {
  title: 'Checkbox',
  component: Checkbox
} as Meta<typeof Checkbox>

const LightTemplate: StoryFn<typeof Checkbox> = (args) => ({
  components: { Checkbox },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Checkbox v-bind="args" />
  `, 'light')
})

const DarkTemplate: StoryFn<typeof Checkbox> = (args) => ({
  components: { Checkbox },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Checkbox v-bind="args" />
  `, 'dark')
})

export const LightDefault = LightTemplate.bind({})
LightDefault.args = {
  theme: 'light',
  value: 'Hello World'
}

export const DarkDefault = DarkTemplate.bind({})
DarkDefault.args = {
  theme: 'dark',
  value: 'Hello World'
}

export const Selected = LightTemplate.bind({})
Selected.args = {
  theme: 'light',
  value: 'Hello World',
  selected: true
}
