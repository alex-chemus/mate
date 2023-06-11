import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/utils'
import SaveButton from '../SaveButton.vue'

export default {
  title: 'SaveButton',
  component: SaveButton,
} as Meta<typeof SaveButton>

const LightTemplate: StoryFn<typeof SaveButton> = (args) => ({
  components: { SaveButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <SaveButton v-bind="args">
      Hello World
    </SaveButton>
  `, 'light')
})

const DarkTemplate: StoryFn<typeof SaveButton> = (args) => ({
  components: { SaveButton },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <SaveButton v-bind="args">
      Hello World
    </SaveButton>
  `, 'dark')
})

export const Light = LightTemplate.bind({})
Light.args = {
  theme: 'light'
}

export const Dark = DarkTemplate.bind({})
Dark.args = {
  theme: 'dark'
}
