import styled from 'styled-components'

export const HistoryStepButton = styled.div`
  cursor: pointer;
  text-align: center;
  width: 200px;
  padding: 5px;
  background-color: white;
  border: solid aqua;
  border-radius: 10px;
  transition: transform 500ms, background-color 1s;

  :hover {
    transform: scale(1.05);
    background-color: #bbd0ff;
  }
`

export const TikTakComponent = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #d7bedb;
`
export const GameName = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #24242e;
  font-size: 40px;
  margin-bottom: 14px;
`
export const GameWinner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  justify-content: center;
  flex-direction: column;
`
export const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const GameArea = styled.div`
  width: 500px;
  align-items: center;
  grid-template-columns: 160px 160px 160px;
  grid-template-rows: 160px 160px 160px;
  gap: 10px;
  font-size: 40px;
  text-align: center;

  display: grid;
`
export const GameHistory = styled.div`
  width: 300px;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 300px;
  gap: 8px;
`

export const GameCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: skyblue;
`
