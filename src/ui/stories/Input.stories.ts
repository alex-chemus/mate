import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import Input from '../Input.vue'

export default {
  title: 'Input',
  component: Input
} as Meta<typeof Input>

const LightTemplate: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Input v-bind="args" />
  `, 'light')
})

const DarkTemplate: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Input v-bind="args" />
  `, 'dark')
})

const SlotTemplate: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Input v-bind="args">
      Hello World
    </Input
  `, 'light')
})

export const LightDefault = LightTemplate.bind({})
LightDefault.args = {
  theme: 'light'
}

export const DarkDefault = DarkTemplate.bind({})
DarkDefault.args = {
  theme: 'dark'
}

export const WithValue = LightTemplate.bind({})
WithValue.args = {
  theme: 'light',
  value: 'value'
}

export const WithLabel = LightTemplate.bind({})
WithLabel.args = {
  theme: 'light',
  labelText: 'This is label'
}

export const WithPlaceholder = LightTemplate.bind({})
WithPlaceholder.args = {
  theme: 'light',
  placeholder: 'placeholder'
}

export const WithSlot = SlotTemplate.bind({})
WithSlot.args = {
  theme: 'light'
}

export const PasswordType = LightTemplate.bind({})
PasswordType.args = {
  theme: 'light',
  type: 'password'
}
