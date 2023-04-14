import { O, X } from 'consts/common'
import { useMemo, useState } from 'react'
import { Turn } from 'types/common'
import { getWinner } from 'utils/getWinner'

import {
  GameArea,
  GameCell,
  GameContainer,
  GameHistory,
  GameName,
  GameWinner,
  HistoryStepButton,
  TikTakComponent,
} from './TikTakToe.styles'

type AreaItem = Turn | ''

export const TikTakToe: React.FC = () => {
  const [area, setArea] = useState<AreaItem[]>(new Array(9).fill(''))
  const [turn, setTurn] = useState<Turn>(X)
  const [history, setHistory] = useState<AreaItem[][]>([])

  const winner = useMemo(() => getWinner(area), [area])
  const isDraw = useMemo(() => area.every(x => x) && !winner, [area, winner])
  const getTurnsCount = (arr: AreaItem[]): number => arr.filter(Boolean).length

  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ): void => {
    if (area[idx]) return

    if (winner) return

    const updatedArea = area.map((curr, i) => (i === idx ? turn : curr))

    setArea(updatedArea)

    setTurn(getTurnsCount(updatedArea) % 2 === 0 ? X : O)

    setHistory([...history.slice(0, getTurnsCount(area)), updatedArea])
  }

  const handleReset = (): void => {
    setArea(new Array(9).fill(''))
    setHistory([])
    setTurn(X)
  }
  const historyStep = (arr: AreaItem[]): void => {
    setArea(arr)
    setTurn(getTurnsCount(arr) % 2 === 0 ? X : O)
  }

  return (
    <TikTakComponent>
      <GameName>Tik-Tak Toe</GameName>
      <GameWinner>
        {winner && `winner: ${winner}`}
        {isDraw && 'DRAW!'}
        {winner || isDraw ? (
          <button onClick={handleReset} type='submit'>
            RESTART?
          </button>
        ) : (
          `Turn: ${turn}`
        )}
      </GameWinner>
      <GameContainer>
        <GameArea>
          {area.map((x, idx) => (
            <GameCell onClick={e => handleMouseEvent(e, idx)}>{x}</GameCell>
          ))}
        </GameArea>
        <GameHistory>
          History:
          <HistoryStepButton
            onClick={() => historyStep(Array<AreaItem>(9).fill(''))}
          >
            Go to game start
          </HistoryStepButton>
          {history.map((x, idx) => (
            <HistoryStepButton
              key={getTurnsCount(x)}
              onClick={() => historyStep(x)}
            >
              Go to move #{idx + 1}
            </HistoryStepButton>
          ))}
        </GameHistory>
      </GameContainer>
    </TikTakComponent>
  )
}
