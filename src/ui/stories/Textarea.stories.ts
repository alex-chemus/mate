import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import Textarea from '../Textarea.vue'

export default {
  title: 'Textarea',
  component: Textarea
} as Meta<typeof Textarea>

const LightTemplate: StoryFn<typeof Textarea> = (args) => ({
  components: { Textarea },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Textarea v-bind="args" />
  `, 'light')
})

const DarkTemplate: StoryFn<typeof Textarea> = (args) => ({
  components: { Textarea },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Textarea v-bind="args" />
  `, 'dark')
})

export const LightDefault = LightTemplate.bind({})
LightDefault.args = {
  theme: 'light'
}

export const DarkDefault = DarkTemplate.bind({})
DarkDefault.args = {
  theme: 'dark'
}

export const WithLabel = LightTemplate.bind({})
WithLabel.args = {
  theme: 'light',
  labelText: 'This is label'
}
