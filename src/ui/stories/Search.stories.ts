import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import Search from '../Search.vue'

export default {
  title: 'Search',
  component: Search,
} as Meta<typeof Search>

const LightTemplate: StoryFn<typeof Search> = (args) => ({
  components: { Search },
  setup() { return { args } },
  template: withStoriesDecorator(`<Search v-bind="args" />`, 'light')
})

const DarkTemplate: StoryFn<typeof Search> = (args) => ({
  components: { Search },
  setup() { return { args } },
  template: withStoriesDecorator(`<Search v-bind="args" />`, 'dark')
})

export const LightDefault = LightTemplate.bind({})
LightDefault.args = {
  theme: 'light',
  placeholder: 'Hello World'
}

export const DarkDefault = DarkTemplate.bind({})
DarkDefault.args = {
  theme: 'dark',
  placeholder: 'Hello World'
}

