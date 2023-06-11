import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import MoreButton from '../MoreButton.vue'

export default {
  title: 'MoreButton',
  component: MoreButton,
} as Meta<typeof MoreButton>

const LightTemplate: StoryFn<typeof MoreButton> = (args) => ({
  components: { MoreButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <MoreButton v-bind="args">
      Hello World
    </MoreButton>
  `, 'light')
})

const DarkTemplate: StoryFn<typeof MoreButton> = (args) => ({
  components: { MoreButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <MoreButton v-bind="args">
      Hello World
    </MoreButton>
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
