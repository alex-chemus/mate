export type SettingsTab = 'settings' | 'members'

export type ProjectTab = {
  id: number,
  name: string
}

export type Member = {
  avatar?: string,
  fullName: string,
  textID: string,
  role: 'Владелец' | 'Администратор' | 'Редактор'
}
