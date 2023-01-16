export type Notice = {
  // что сделал (подписался, запрос на проект, присоединился к проекту)
  type: 'subscribed' | 'joined' | 'request'
  // человек, просто имя
  person: string,
  personAvatar?: string,
  // объект оповещения (юзер или его проект)
  subject: string
  subjectUrl: string,
  date: string
}
