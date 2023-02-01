import { TextStyle, BoxStyle } from './drawing.js';
import { Board } from './board.js';


const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let textStyle = new TextStyle(context, "black", "25px serif");
let boxStyle = new BoxStyle(context, "white", "green");
let gameBoard = new Board(6, 6, 40, textStyle, boxStyle);

gameBoard.draw(context);
