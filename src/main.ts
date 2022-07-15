import {
  Y,
  X,
  START_BLANK_Y,
  START_BLANK_X,
  BLANK_NUMBER,
  INITIAL_STYLES,
  CLEAR_BACKGROUND_COLOR,
} from './const'

const board = [...new Array(Y).keys()].map((y) =>
  [...new Array(X).keys()].map((x) => y * Y + x + 1)
)
board[START_BLANK_Y][START_BLANK_X] = BLANK_NUMBER

const divs = [...new Array(Y)].map((_, y) =>
  [...new Array(X)].map((_, x) => {
    const div = document.createElement('div')
    document.body.append(div)
    Object.assign(div.style, {
      ...INITIAL_STYLES,
      top: `${y * 80}px`,
      left: `${x * 80}px`,
    })
    div.onpointerdown = () => onMove(y, x)
    return div
  })
)

let [ey, ex] = [START_BLANK_Y, START_BLANK_X]

const onMove = (y: number, x: number) => {
  if (Math.abs(ey - y) + Math.abs(ex - x) === 1) {
    board[ey][ex] = board[y][x]
    ;[ey, ex] = [y, x]
    board[y][x] = BLANK_NUMBER
    showBoard()
  }
}

const initBoard = () => {
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      let from = 0
      let to = 0
      do {
        from = Math.trunc(Math.random() * (Y * X - 1))
        to = Math.trunc(Math.random() * (Y * X - 1))
      } while (from === to)
      ;[
        board[Math.trunc(from / Y)][from % Y],
        board[Math.trunc(to / Y)][to % Y],
      ] = [
        board[Math.trunc(to / Y)][to % Y],
        board[Math.trunc(from / Y)][from % Y],
      ]
    }
  }
}

const showBoard = () => {
  let clear = true
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      divs[y][x].textContent = (board[y][x] || '').toString()
      if (y === START_BLANK_Y && x === START_BLANK_X) {
        null
      } else {
        if (board[y][x] !== y * Y + x + 1) {
          clear = false
        }
      }
    }
  }
  if (clear) {
    ex = 999
    divs.map((yDiv) =>
      yDiv.map((xDiv) => (xDiv.style.backgroundColor = CLEAR_BACKGROUND_COLOR))
    )
  }
}

window.onload = () => {
  initBoard()
  showBoard()
}
