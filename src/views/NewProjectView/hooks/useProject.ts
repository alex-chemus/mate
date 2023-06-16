import { ref } from 'vue'
import { useAuthState, useDispatch, useApiState } from '@/utils'
import { fetchActions } from '@/store/constants'
import { FileInfo } from '@/types'

const useProject = ({ uploadImage }: { uploadImage(type: 'avatar' | 'cover'): Promise<number | null> }) => {
  const authState = useAuthState()
  const apiState = useApiState()
  const dispatch = useDispatch()

  const name = ref<string | null>(null)
  const nametag = ref<string | null>(null)
  const themeID = ref<number | null>(null)
  const description = ref<string | null>(null)

  const uploadProject = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (name.value === null || nametag.value === null) return

    body.append('name', name.value)
    body.append('nametag', nametag.value)

    const projectID = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.create/`,
      info: { method: 'POST', body }
    }) as number

    body.delete('name')
    body.delete('nametag')

    const avatarID = await uploadImage('avatar')
    const coverID = await uploadImage('cover')

    body.append('projectID', projectID.toString())

    if (avatarID) body.append('avatar', avatarID.toString())
    if (coverID) body.append('profileCover', coverID.toString())
    if (description.value) body.append('description', description.value)
    if (themeID.value) body.append('themeID', themeID.value.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.setInfo/`,
      info: { method: 'POST', body }
    })
  }

  return {
    name, nametag, themeID, description, uploadProject
  }
}

export default useProject
