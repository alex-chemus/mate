import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/shared/utils'
import RadioButton from '../RadioButton.vue'

export default {
  title: 'RadioButton',
  component: RadioButton
} as Meta<typeof RadioButton>

const LightTemplate: StoryFn<typeof RadioButton> = (args) => ({
  components: { RadioButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <RadioButton v-bind="args" />
  `, 'light')
})

const DarkTemplate: StoryFn<typeof RadioButton> = (args) => ({
  components: { RadioButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <RadioButton v-bind="args" />
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
