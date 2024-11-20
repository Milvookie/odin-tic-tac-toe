// const readline = require('readline-sync');

function getPlayers() {
    //create players
    const player1 = 'Player One'
    const player2 = 'Player Two'
    const players = [
        { name: player1, token: 'X' },
        { name: player2, token: 'O' }
    ]

    //who's turn is it
    let currentPlayer = players[0]

    //get player turn
    const getPlayer = () => { return currentPlayer }

    //switch player turn
    const switchPlayer = () => {
        // console.log(`Current player is: ${getPlayer().name}`);

        if (currentPlayer.name == player1) {
            currentPlayer = players[1]

        } else {
            currentPlayer = players[0]
        }
    }

    return { getPlayer, switchPlayer }
}

//CELLS
const cell = (position) => {
    const pos = position
    let value = null

    const setValue = (token) => {
        value = token
    }

    const getValue = () => value

    const getPos = () => position

    return { setValue, getValue, getPos }
}

function gameboard() {
    //create board
    const board = []
    const rows = 3
    const cols = 3

    const getBoard = () => board;

    const printBoard = () => {
        return `
        ${board[0][0].getValue()} ${board[0][1].getValue()} ${board[0][2].getValue()}\n
        ${board[1][0].getValue()} ${board[1][1].getValue()} ${board[1][2].getValue()}\n
        ${board[2][0].getValue()} ${board[2][1].getValue()} ${board[2][2].getValue()}`
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].setValue(null)
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        board[i] = []

        for (let j = 0; j < cols; j++) {
            board[i].push(cell({ i, j }));
        }
    }

    return { getBoard, printBoard, resetBoard }

}

function getMove() {

    function getAIMove(board) {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        let move = { row, col }
        if (board[move.row][move.col].getValue()) {
        move = getAIMove(board)
        console.log('RECURSION');
        }
        return move
    }

    return { getAIMove}

}

const UI = () => {
    const grid = document.querySelector('.grid-container');
    const resetButton = document.getElementById('reset-game')

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {
            let element = document.createElement('div')
            element.setAttribute('data-row', i)
            element.setAttribute('data-col', j)
            element.className = 'cell'
            element.textContent = cell({ i, j }).getValue()
            // element.textContent = cell().getValue()
            grid.appendChild(element)
        }
    }

    const findCell = (position) => {
        const row = position.row
        const col = position.col
        let element = document.querySelector(`[data-row='${row}'][data-col='${col}']`)
        return element
    }

    const setTextContent = (position, value) => {
        const cell = findCell(position)
        cell.textContent = value
    }

    return { findCell, setTextContent, resetButton }

}

const displayUI = () => {
    const boardUI = document.querySelector('.grid-container')

    for (let i = 0; i < 3; i++) {
        // const element = board[i];
        // console.log(element);

        for (let j = 0; j < 3; j++) {
            let element = document.createElement('div')
            element.setAttribute('data-row', i)
            element.setAttribute('data-col', j)
            element.className = 'cell'
            element.textContent = cell({ i, j }).getValue()
            // element.textContent = cell().getValue()
            boardUI.appendChild(element)
            element.addEventListener('click', (e) => {
                const row = parseInt(e.target.getAttribute('data-row'))
                const col = parseInt(e.target.getAttribute('data-col'))
                e.target.textContent = cell({ row, col }).getValue()

                console.log('clicketi');
                // displayCellText(e.target, {row, col})
                return { row, col }

            })
        }
    }

    const findCell = (position) => {
        const row = position.row
        const col = position.col
        let element = document.querySelector(`[data-row='${row}'][data-col='${col}']`)
        return element
    }

    const displayCellText = (cellPos) => {
        const row = cellPos.row
        const col = cellPos.col
        let el = findCell(cellPos)
        console.log(cell({ row, col }).getValue());

        el.textContent = cell({ row, col }).getValue()
    }

    return { displayCellText, findCell }
}

function checkForEndGame(board) {

    const checkForWinner = () => {
        // const board = getBoard()
        let winner = false;

        //reverse matrix so it's easier to check for a winner
        let [row] = board
        const reverseBoard = row.map((value, column) => board.map(row => row[column]))

        const diagonal = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]]
        for (let i = 0; i < diagonal.length; i++) {
            const [a, b, c] = diagonal[i]
            if ((a.getValue()) && ((a.getValue() == b.getValue()) && (b.getValue() == c.getValue()))) {
                console.log('DIAGONAL ' + i + ' WINNER');
                winner = true
                return winner
            }
        }

        for (let i = 0; i < board.length; i++) {
            const [a, b, c] = board[i] //row
            const [d, e, f] = reverseBoard[i] //column

            if ((a.getValue()) && ((a.getValue() == b.getValue()) && (b.getValue() == c.getValue()))) {
                console.log('ROW ' + i + ' WINNER');
                winner = true
                return winner
            }

            if ((d.getValue()) && ((d.getValue() == e.getValue()) && (e.getValue() == f.getValue()))) {
                console.log('COL ' + i + ' WINNER');
                winner = true
                return winner
            }
        }

        return winner
    }

    const isDraw = () => {
        let draw = true;
        board.forEach((row) => {
            // console.log(row);
            for (const value of row) {
                if (!value.getValue()) {
                    draw = false
                }
            }
        })
        return draw
    }

    return { checkForWinner, isDraw }
}

function playRound() {


}

function initGame() {
    const _board = gameboard()
    const _players = getPlayers()
    const _dom = UI()
    const _results = checkForEndGame(_board.getBoard())
    const _move = getMove()
    let count = 0


    const endGame = () => {
        if (_results.isDraw() || _results.checkForWinner()) {
            return true
        } else return false
    }

    const grid = document.querySelector('.grid-container');
    grid.addEventListener('click', (e) => {
        const row = parseInt(e.target.getAttribute('data-row'))
        const col = parseInt(e.target.getAttribute('data-col'))
        if (_players.getPlayer().name == 'Player One') {
            playRound({ row, col })
        }
    })

    function playRound(move) {
        ++count

        _board.getBoard()[move.row][move.col].setValue(_players.getPlayer().token)
        _players.switchPlayer()
        _dom.setTextContent(move, _board.getBoard()[move.row][move.col].getValue())

        _results.isDraw()
        _results.checkForWinner()
        
        console.log('end game ? ' + endGame());

        if (_players.getPlayer().name == 'Player Two' && !endGame()) {
            let aiMove = _move.getAIMove(_board.getBoard())

            playRound(aiMove)
        }

    }

    console.log(_board.printBoard());


}

initGame()

// gameboard()
