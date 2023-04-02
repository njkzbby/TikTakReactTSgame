import { O, X } from 'consts/common'
import { useState } from 'react'
import styled from 'styled-components'
import { Turn } from 'types/common'
import { getWinner } from 'utils/getWinner'

type AreaItem = Turn | ''

export const TikTakToe: React.FC = () => {
  const [area, setArea] = useState<AreaItem[]>(new Array(9).fill(''))
  const [turn, setTurn] = useState<Turn>(X)
  const winner = getWinner(area)
  const isDraw = area.every(x => x) && !winner

  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ): void => {
    if (area[idx]) return

    if (winner) return

    setArea(currArea => currArea.map((curr, i) => (i === idx ? turn : curr)))
    setTurn(currTurn => (currTurn === X ? O : X))
  }

  const handleReset = (): void => {
    setArea(new Array(9).fill(''))
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
      </GameContainer>
    </TikTakComponent>
  )
}

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
  flex-direction: column;
  align-items: center;
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
const GameCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: skyblue;
`
