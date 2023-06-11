import type { Meta, StoryFn } from '@storybook/vue3'
import Button from '../Button.vue'

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => ({
  components: { Button },
  setup() { return { args } },
  template: `
    <Button v-bind="args">
      Hello World
    </Button>
  `
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  isPrimary: true
}
