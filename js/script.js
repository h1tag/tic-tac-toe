"use strict";

$(function(){
  $("#dialog").hide();
  $("#select-stone").hide();
  $("#the-game").hide();

  selectPlayer();
  selectStone();
});

// global vars
// player1 is human (when human vs pc)
var player1 = {
id: 0,
stone: "",
turn: 0
};
//player2 is pc (when human vs pc)
var player2 = {
id: 1,
stone: "",
turn: 0
};

var full_cells = [];

// vs pc or human
function selectPlayer() {
  $("#vs-machine").click(function(){
    $("#select-player").hide();
    $("#select-stone").show();
  });
}

// x or o for player1 only
function selectStone() {
  $("#x").click(function(){
    player1.stone = "x";
    player2.stone = "o";
    $("#select-stone").hide();
    $("#the-game").show();
  });

  $("#o").click(function(){
    player1.stone = "o";
    player2.stone = "x";
    $("#select-stone").hide();
    $("#the-game").show();
  });
}

function generalError(){
  alert("Something went wrong.");
  console.log("Error: something went wrong.");
}

function assignTurn(){ // not used
  player1.turn = Math.floor(Math.random() * 2);
  // player1 goes 1st
  if(player1.turn === 0){
    player2.turn = 1;
  }else if(player1.turn === 1){ // player2 goes 1st
    player2.turn = 0;
  }else{
    generalError();
  }
}

function whoIsFirst() {
  if(player1.turn === 0){
    return player1.id;
  }else if(player2.turn === 0){
    return player2.id;
  }else{
    generalError();
  }
}

function showStoneOnClick(clicked_id){ // only for player 1/ human
  if(checkForWin(win_states)){return;}

//  if($("#" + clicked_id).text() === ""){
if(full_cells.indexOf("#" + clicked_id) === -1){
    $("#" + clicked_id).html(player1.stone);
    full_cells.push("#" + clicked_id);
  }else{
    //do nothing
  }
}

function generateRandTile(){
  var random_cell = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  var cell_id = "#c" + random_cell;

  //if($(cell_id).text() === ""){
  if(full_cells.indexOf(cell_id) === -1){
    console.log(cell_id + " right place");
    full_cells.push(cell_id);
    return (cell_id);
  }else{ // generate another random tile
    console.log("not " + cell_id + " generate a random tile again");
    generateRandTile();
  }
}

//we'll need to check for win states, if one of the elements of this array exists in the game table
var win_states = [["c1", "c2", "c3"], ["c4", "c5", "c6"], ["c7", "c8", "c9"],
["c1", "c5", "c9"], ["c3", "c5", "c7"], ["c2", "c5", "c8"], ["c1", "c4", "c7"], ["c3","c6","c9"]];

function pcPlay(){
  if(checkForWin(win_states)){
    console.log("pcplay return");
    return;
  }

  if(checkForTie()) return;

  var cell_id = generateRandTile();
  console.log(full_cells);
  console.log("generated in pc play " + cell_id);
  $(full_cells[full_cells.length-1]).html(player2.stone);

  if(checkForWin(win_states)){
    console.log("pcplay return");
    return;
  }

  if(checkForTie()) return;
}

function checkForWin(arr){ // takes the win_states array
  var cell1_content ="";
  var cell2_content ="";
  var cell3_content ="";
  for(var i = 0; i < arr.length; i++){
      //do they have content and is it for the same stone
    cell1_content = $("#"+arr[i][0]).text();
    cell2_content = $("#"+arr[i][1]).text();
    cell3_content = $("#"+arr[i][2]).text();
  //  console.log("cell1 " + cell3_content);
  //  console.log("cell2 " + cell2_content);
  //  console.log("cell3 " + cell1_content);

    if((cell1_content === cell2_content) && (cell1_content === cell3_content)){
      if(cell1_content !== ""){
        alert(cell1_content + " wins!");
        restartGame();
        return cell1_content; // true
      }
    }
  }
  return ""; //false
}

function checkForTie() {
  if(full_cells.length === 9){
    alert("Tie!!!");
    restartGame();
    return true;
  }else return false;
}

function clearAll(){
  for(var i = 0; i < 9; i++){
    $("#c" + (i+1)).empty();
  }

  full_cells = [];
}

function restartGame(){
  clearAll();

  $("#the-game").hide();

  $("#select-player").show();

  selectPlayer();
  selectStone();
}
