const useTimeUtils = () => {
  const dayOfYear = (date: Date) =>
    Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);

  const isLeap = (date: Date) => date.getFullYear() % 4 === 0

  const isToday = (timestamp: number) => {
    const currentDate = new Date()
    const date = new Date(timestamp)

    return dayOfYear(currentDate) === dayOfYear(date)
  }

  const isYesterday = (timestamp: number) => {
    const currentDate = new Date()
    const date = new Date(timestamp)

    return dayOfYear(currentDate) === dayOfYear(date) - 1
      || (dayOfYear(currentDate) === 1 && dayOfYear(date) === 365 && !isLeap(date))
      || (dayOfYear(currentDate) === 1 && dayOfYear(date) === 366 && isLeap(date))
  }

  return { isToday, isYesterday }
}

export default useTimeUtils
