import type { Meta, StoryFn } from '@storybook/vue3'
import { withStoriesDecorator } from '@/shared/utils'
import Badge from '../Badge.vue'

export default {
  title: 'Badge',
  component: Badge
} as Meta<typeof Badge>

const LightTemplate: StoryFn<typeof Badge> = (args) => ({
  components: { Badge },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Badge v-bind="args">
      <template #content>
        Hello World
      </template>
    </Badge>
  `, 'light')
})

const ButtonTemplate: StoryFn<typeof Badge> = (args) => ({
  components: { Badge },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Badge v-bind="args">
      <template #content>
        Hello World
      </template>
      <template #button>
        <div style="width: 15px; height: 15px; background: red;" />
      </template>
    </Badge>
  `, 'light')
})

const DarkTemplate: StoryFn<typeof Badge> = (args) => ({
  components: { Badge },
  setup() { return { args } },
  template: withStoriesDecorator(`
    <Badge v-bind="args">
      <template #content>
        Hello World
      </template>
    </Badge>
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

export const WithBorderColor = LightTemplate.bind({})
WithBorderColor.args = {
  theme: 'light',
  borderColor: '#0077FF'
}

export const WithButton = ButtonTemplate.bind({})
WithButton.args = {
  theme: 'light'
}
