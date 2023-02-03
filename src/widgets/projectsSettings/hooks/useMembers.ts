import { ref, computed } from 'vue'
import { Member } from '../types'

const useMembers = () => {
  const allMembers = ref<Member[]>([
    {
      fullName: 'Александр ЧЧемус I',
      textID: 'AlexanderChemuzzz',
      role: 'Владелец'
    },
    {
      fullName: 'Александр Чемус II',
      textID: 'AlexanderChemussss',
      role: 'Редактор'
    },
  ])

  const searchedMembers = ref<Member[]>(allMembers.value)

  const sortedMembers = computed(() => {
    return [
      ...searchedMembers.value.filter((m) => m.role === 'Владелец'),
      ...searchedMembers.value.filter((m) => m.role === 'Администратор'),
      ...searchedMembers.value.filter((m) => m.role === 'Редактор')
    ]
  })

  const onSearch = (searchString: string) => {
    searchedMembers.value = allMembers.value.filter((m) => {
      return m.fullName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase().trim())
        || m.textID.toLocaleLowerCase().includes(searchString.toLocaleLowerCase().trim())
    })
  }

  return { allMembers, sortedMembers, onSearch }
}

export default useMembers
