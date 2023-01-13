import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import Logo from '../Logo.vue'

export default {
  title: 'Logo',
  component: Logo,
} as Meta<typeof Logo>

const Template: StoryFn<typeof Logo> = (args) => ({
  components: { Logo },
  setup() { return { args } },
  template: withStoriesDecorator(`<Logo v-bind="args" />`, 'light')
})

export const Default = Template.bind({})
