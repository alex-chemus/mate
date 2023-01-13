import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import Loader from '../Loader.vue'

export default {
  title: 'Loader',
  component: Loader,
} as Meta<typeof Loader>

const LightTemplate: StoryFn<typeof Loader> = (args) => ({
  components: { Loader },
  setup() { return { args } },
  template: withStoriesDecorator(`<Loader v-bind="args" />`, 'light')
})

const DarkTemplate: StoryFn<typeof Loader> = (args) => ({
  components: { Loader },
  setup() { return { args } },
  template: withStoriesDecorator(`<Loader v-bind="args" />`, 'dark')
})

export const LightDefault = LightTemplate.bind({})
LightDefault.args = {
  theme: 'light'
}

export const DarkDefault = DarkTemplate.bind({})
DarkDefault.args = {
  theme: 'dark'
}

export const CustomSize = LightTemplate.bind({})
CustomSize.args = {
  theme: 'light',
  size: 100
}
