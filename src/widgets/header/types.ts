// временный тип, с появлением api переделаю
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

export type AccountInfo = {
  firstName: string,
  lastName: string,
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  email: string
}

export type Tab = 'profile' | 'search-vacancies' | null
