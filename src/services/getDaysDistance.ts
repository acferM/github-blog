export function getDaysDistance(date: Date) {
  const today = new Date()

  const timeDifference = Math.abs(today.getTime() - date.getTime())

  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

  return daysDifference
}
