const withStoriesDecorator = (component: string, theme: 'light' | 'dark') => {
  return `
    <div style="
      border-radius: 20px;
      padding: 20px;
      background-color: ${theme === 'light' ? '#F5F5F5' : '#292B38'}
    ">
      ${component}
    </div>
  `
}

export default withStoriesDecorator
