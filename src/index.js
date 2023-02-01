import { TextStyle, BoxStyle, Pen } from './drawing.js';
import { Board } from './board.js';


const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let textStyle = new TextStyle(context, "black", "25px serif");
let boxStyle = new BoxStyle(context, "white", "green");
let gameBoard = new Board(new Pen(textStyle, boxStyle), 6, 7, 40);

gameBoard.draw();
