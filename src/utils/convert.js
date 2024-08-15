export function formatDate(dateString) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 +1
  const day = date.getDate()

  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0') // 두 자리로 표시

  // 두 줄로 나눠 출력
  return `${year}년 ${month}월 ${day}일\n${hours}시 ${minutes}분`
}
