import type { Meta, StoryFn } from '@storybook/vue3'
import AuthButton from '../AuthButton.vue'

export default {
  title: 'Auth Button',
  component: AuthButton,
} as Meta<typeof AuthButton>

const Template: StoryFn<typeof AuthButton> = (args) => ({
  components: { AuthButton },
  setup() { return { args } },
  template: `
    <AuthButton v-bind="args">
      Hello World
    </AuthButton>
  `
})

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  primary: true
}

export const Centered = Template.bind({})
Centered.args = {
  centered: true
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  withIcon: true
}

export const TextAccent = Template.bind({})
TextAccent.args = {
  textAccent: true
}
