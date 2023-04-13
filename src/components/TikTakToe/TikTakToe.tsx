import { O, X } from 'consts/common'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Turn } from 'types/common'
import { getWinner } from 'utils/getWinner'

type AreaItem = Turn | ''

export const TikTakToe: React.FC = () => {
  const [area, setArea] = useState<AreaItem[]>(new Array(9).fill(''))
  const [turn, setTurn] = useState<Turn>(X)
  const [history, setHistory] = useState<AreaItem[][]>([])

  const winner = useMemo(() => getWinner(area), [area])
  const isDraw = useMemo(() => area.every(x => x) && !winner, [area, winner])

  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ): void => {
    if (area[idx]) return

    if (winner) return

    const updatedArea = area.map((curr, i) => (i === idx ? turn : curr))

    setArea(updatedArea)

    setTurn(updatedArea.filter(Boolean).length % 2 === 0 ? X : O)

    setHistory([...history.slice(0, area.filter(Boolean).length), updatedArea])
  }

  const handleReset = (): void => {
    setArea(new Array(9).fill(''))
    setHistory([])
    setTurn(X)
  }
  const historyStep = (arr: AreaItem[]): void => {
    setArea(arr)
    setTurn(arr.filter(Boolean).length % 2 === 0 ? X : O)
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
              key={x.filter(Boolean).length}
              onClick={() => historyStep(x)}
            >
              Go to move # {idx + 1}
            </HistoryStepButton>
          ))}
        </GameHistory>
      </GameContainer>
    </TikTakComponent>
  )
}

const HistoryStepButton = styled.div`
  cursor: pointer;
  text-align: center;
  width: 200px;
  padding: 5px;
  background-color: white;
  border: solid aqua;
  border-radius: 10px;
  transition: transform 500ms, background-color 1s;

  :hover {
    transform: scale(1.2);
    background-color: #bbd0ff;
  }
`

const TikTakComponent = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #d7bedb;
`
const GameName = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #24242e;
  font-size: 40px;
  margin-bottom: 14px;
`
const GameWinner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  justify-content: center;
  flex-direction: column;
`
const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const GameArea = styled.div`
  width: 500px;
  align-items: center;
  grid-template-columns: 160px 160px 160px;
  grid-template-rows: 160px 160px 160px;
  gap: 10px;
  font-size: 40px;
  text-align: center;

  display: grid;
`
const GameHistory = styled.div`
  width: 300px;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 300px;
  gap: 8px;
`

const GameCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: skyblue;
`
