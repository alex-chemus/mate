import { ComputedRef, computed } from 'vue'
import { useTimeUtils } from '@/shared/utils'

const useDate = ({ timestamp }: { timestamp: ComputedRef<number> }) => {
  const { isToday, isYesterday } = useTimeUtils()

  const round = (n: number) => {
    return n.toString().length === 1 ? `0${n}` : n.toString()
  }

  const date = computed(() => {
    const lclDate = new Date(timestamp.value)

    if (isToday(timestamp.value))
      return `Сегодня в ${round(lclDate.getHours())}:${round(lclDate.getMinutes())}`
    /* eslint-disable */
    else if (isYesterday(timestamp.value))
      return `Вчера в ${round(lclDate.getHours())}:${round(lclDate.getMinutes())}`
    /* eslint-enable */

    const time = `${round(lclDate.getHours())}:${round(lclDate.getMinutes())}`
    const date = `${round(lclDate.getDate())}.${round(lclDate.getMonth())}.${lclDate.getFullYear()}`
    return `${time} ${date}`
  })

  return date
}

export default useDate
