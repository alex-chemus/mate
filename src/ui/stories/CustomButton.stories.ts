import type { Meta, StoryFn } from '@storybook/vue3'
import CustomButton from '../CustomButton.vue'

export default {
  title: 'CustomButton',
  component: CustomButton,
} as Meta<typeof CustomButton>

const Template: StoryFn<typeof CustomButton> = (args) => ({
  components: { CustomButton },
  setup() { return { args } },
  template: `
    <CustomButton v-bind="args">
      Hello World
    </CustomButton>
  `
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  isPrimary: true
}
