const readline = require('readline-sync');

function players() {
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

function gameboard() {
    //create board
    const board = []
    const rows = 3
    const cols = 3
    let countRound = 0

    const getBoard = () => board;

    const printBoard = () => {
        return `
        ${board[0][0].getValue()} ${board[0][1].getValue()} ${board[0][2].getValue()}\n
        ${board[1][0].getValue()} ${board[1][1].getValue()} ${board[1][2].getValue()}\n
        ${board[2][0].getValue()} ${board[2][1].getValue()} ${board[2][2].getValue()}`
    }

    const resetGame = () => {
        let question = readline.question('Wanna reset game?');
        if (question == 'yes') {
            resetBoard()
        } else return
    }

    const resetBoard = () => {

        for (let i = 0; i < board.length; i++) {
            console.log('reset');


            for (let j = 0; j < cols; j++) {
                console.log(board[i][j].setValue(null));

            }
        }
    }

    //PLAYERS

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

    //CELLS
    const cell = () => {
        let value = null

        const setValue = (token) => {
            value = token
        }

        const getValue = () => value

        return { setValue, getValue }
    }

    //PLAY ROUND

    //get move
    const getMove = () => {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        const move = { row, col }
        if (board[move.row][move.col].getValue()) {
            // move = getPlayerMove()
            console.log('RECURSION');

            getMove()
        }
        return move
    }

    const getPlayerMove = () => {
        let playerMove = readline.question('What\'s your move?');
        const inputToMove = playerMove.split('')

        const row = inputToMove[0] == 'a' ? 0 : inputToMove[0] == 'b' ? 1 : 2
        const col = inputToMove[1] == 'a' ? 0 : inputToMove[1] == 'b' ? 1 : 2
        const move = { row, col }

        return move
    }

    const checkForWinner = () => {
        const board = getBoard()
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
            }
        }

        for (let i = 0; i < board.length; i++) {
            const [a, b, c] = board[i] //row
            const [d, e, f] = reverseBoard[i] //column

            if ((a.getValue()) && ((a.getValue() == b.getValue()) && (b.getValue() == c.getValue()))) {
                console.log('ROW ' + i + ' WINNER');
                winner = true
                return
            }

            if ((d.getValue()) && ((d.getValue() == e.getValue()) && (e.getValue() == f.getValue()))) {
                console.log('COL ' + i + ' WINNER');
                winner = true
                return
            }
        }

        return winner
    }

    //access cell
    const playRound = () => {
        // const move = getMove()
        // let move = getPlayerMove()
        let move = getMove()
        console.log('move to, value of cell');
        console.log(move);
        console.log(board[move.row][move.col].getValue());

        if (board[move.row][move.col].getValue()) {
            // move = getPlayerMove()
            move = getMove()
        } else {
            const player = getPlayer()

            board[move.row][move.col].setValue(player.token)
            switchPlayer()
            countRound++;
            checkForWinner()
            console.log(printBoard());
        }
    }


    for (let i = 0; i < rows; i++) {
        board[i] = []

        for (let j = 0; j < cols; j++) {
            board[i].push(cell());
        }
    }

    const isDraw = () => {
        let draw;
        const board = getBoard()
        board.forEach((row) => {
            // console.log(row);
            for (const value of row) {
                if (!value.getValue()) {
                    draw = true
                }
            }
        })
        return draw
    }

    const checkEndGame = () => {
        let isEmpty;
        const board = getBoard()
        board.forEach((row) => {
            // console.log(row);
            for (const value of row) {
                if (!value.getValue()) {
                    isEmpty = true
                }
            }
        })
        return isEmpty
    }

    const game = () => {
        while (checkEndGame() && !checkForWinner()) {
            playRound()
            // resetGame()
        }
        console.log('count is ' + countRound);
        console.log('end of game');

    }


    game()

}

gameboard()
