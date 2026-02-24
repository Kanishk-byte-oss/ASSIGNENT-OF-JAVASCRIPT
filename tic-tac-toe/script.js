let divs = document.querySelectorAll('.parent-div div');

let turn = 0;
let player1moves = [];
let player2moves = [];

let winningmoves = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

function checkWinner() {

    for (let pattern of winningmoves) {

        let p1win = pattern.every(num => player1moves.includes(num));
        let p2win = pattern.every(num => player2moves.includes(num));

        if (p1win) {
            alert("Player 1 Wins 🎉");
            return;
        }

        if (p2win) {
            alert("Player 2 Wins 🎉");
            return;
        }
    }

    // Draw check
    if (player1moves.length + player2moves.length === 9) {
        alert("It's a Draw 🤝");
    }
}

divs.forEach((d, index) => {

    d.addEventListener('click', () => {

        // Stop overwriting
        if (d.innerText !== '') return;

        if (turn === 0) {
            d.innerText = 'X';
            player1moves.push(index + 1);
            turn = 1;
        } 
        else {
            d.innerText = 'O';
            player2moves.push(index + 1);
            turn = 0;
        }

        checkWinner();
    });

});