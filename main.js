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

    for (let i = 0; i < rows; i++) {
        board[i] = []

        for (let j = 0; j < cols; j++) {
            board[i].push(cell());
        }
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

    //link ui and code
}

//GAME
function Game() {
    let board = gameboard()
    let players = getPlayers()


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
