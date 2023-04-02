import { winnerCombos } from 'consts/common'
import { Turn } from 'types/common'

export const getWinner = (arr: (Turn | '')[]): Turn | '' => {
  return arr[
    (winnerCombos.find(
      ([a, b, c]) => arr[a] && arr[a] === arr[b] && arr[b] === arr[c],
    ) ?? [])[0]
  ]
}
