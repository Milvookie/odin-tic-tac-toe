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

const cell = () => {
    let value = null
    const setValue = (token) => {
        value = token
    }
    const getValue = () => value

    return { setValue, getValue }
}


//GAMEBOARD
function gameboard() {
    const board = []
    const rows = 3
    const cols = 3

    for (let i = 0; i < 9; i++) {
        board.push(cell())
    }

    const getBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            console.log('reset');
            for (let j = 0; j < cols; j++) {
                board[i][j].setValue(null)
            }
        }
    }

    return { getBoard, resetBoard }
}

function displayUI() {
    //get cells
    const cells = document.querySelectorAll('.cell')
    //link ui and code
    return Array.from(cells)
}

displayUI()

//GAME
function Game() {
    let board = gameboard()
    let players = getPlayers()
    let cells = displayUI()

    // const [[a,b,c], [d,e,f], [g,h,i]] = cells

    // console.log(cells);
    // console.log(board.getBoard());
    
    for (let i = 0; i < cells.length; i++) {
        let element = cells[i]
        console.log(board.getBoard()[i].getValue());
        const text = document.createElement('p')
        text.textContent = board.getBoard()[i].getValue()
        element.appendChild(text)
    }

    function playRound() {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        const move = { row, col }
        board.updateBoard(move, 'X')
    }

    function updateBoard() {
        return board.getBoard()
    }


    return { playRound, updateBoard }

}

Game()

// const gameboard = Gameboard()


