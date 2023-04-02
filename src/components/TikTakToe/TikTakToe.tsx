import { useEffect, useState } from 'react'
import styled from 'styled-components'

const X = '✕'
const O = '〇'
const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

type Turn = '✕' | '〇'
type AreaItem = Turn | ''

export const TikTakToe: React.FC = () => {
  const [area, setArea] = useState<AreaItem[]>(new Array(9).fill(''))
  const [turn, setTurn] = useState<Turn>(X)
  const [winner, setWinner] = useState<Turn | undefined>(undefined)

  useEffect(() => {
    const newWinner = getWinner(area)

    setWinner(newWinner)

    if (area.every(x => x !== '') && !newWinner) {
      setArea(new Array(9).fill(''))
    }
  }, [area])

  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number,
  ): void => {
    if (area[idx]) return

    if (winner) return

    setArea(currArea => currArea.map((curr, i) => (i === idx ? turn : curr)))
    setTurn(currTurn => (currTurn === X ? O : X))
  }

  const getWinner = (arr: AreaItem[]): Turn | undefined =>
    winnerCombos
      .map(combo => combo.map(elem => arr[elem]))
      .map(combo =>
        combo[0] !== '' && combo[0] === combo[1] && combo[1] === combo[2]
          ? combo[0]
          : undefined,
      )
      .find(x => typeof x === 'string')

  const handleReset = (): void => {
    setWinner(undefined)
    setArea(new Array(9).fill(''))
  }

  return (
    <TikTakComponent>
      {' '}
      <GameName>Tik-Tak Toe</GameName>{' '}
      <GameWinner>
        {winner === undefined ? 'Play the game!' : null}
        {winner ? (
          <button onClick={handleReset} type='submit'>
            RESTART?
          </button>
        ) : (
          `turn: ${turn}`
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
  justify-content: space-around;
  align-items: center;
  margin-bottom: 14px;
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
  height: 100%;
  background-color: skyblue;
`
