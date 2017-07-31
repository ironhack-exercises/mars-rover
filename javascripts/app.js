// Rover Object Goes Here
// ======================
var rover1 = {
  id: "Rover 1",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  isMyTurn: true
};

var rover2 = {
  id: "Rover 2",
  direction: "N",
  x: 0,
  y: 9,
  travelLog: [],
  isMyTurn: false
};

var rovers = [rover1, rover2];

var grid = [
  [rover1, null, null, "Potato", null, null, null, null, null, rover2],
  [null, "Potato", null, null, null, null, null, null, null, null],
  ["Matt Damon", null, null, null, null, null, null, null, "Potato", null],
  [null, "Potato", null, null, null, null, null, null, null, null],
  [null, null, null, null, "Potato", null, null, null, null, null],
  [null, null, null, "Potato", null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "Potato"],
  ["Potato", null, null, null, null, null, null, null, null, null],
  [null, "Potato", null, null, null, null, null, "Potato", null, null],
  [null, null, null, null, "Potato", null, null, null, null, null]
];

// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  calculateNewDirection(rover.direction, "left", rover);
}

function turnRight(rover){
  console.log("turnRight was called!");
  calculateNewDirection(rover.direction, "right", rover);
}

function moveForward(rover){
  console.log("moveForward was called");
  var hasMoved = makeMovement (rover, "forward");
  registerMovement(rover, hasMoved);
  nextTurn(rover);
}

function moveBackward(rover){
  console.log("moveBackward was called");
  var hasMoved = makeMovement (rover, "backward");
  registerMovement(rover, hasMoved);
  nextTurn(rover);
}

function makeMovement (rover, movement){
  console.log(rover.id + " current position: [" + rover.x + "," + rover.y + "]");
  var hasMoved = true;
  switch (rover.direction) {
    case "N":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x - 1, rover.y, rover);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x + 1, rover.y, rover);
      break;
    case "W":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x, rover.y - 1, rover);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x, rover.y + 1, rover);
      break;
    case "S":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x + 1, rover.y, rover);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x - 1, rover.y, rover);
      break;
    case "E":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x, rover.y + 1, rover);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x, rover.y - 1, rover);
      break;
  }
  return hasMoved;
}

function checkMovement (roverNextX, roverNextY, rover){
  var hasMoved = true;
  if(roverNextX === -1 || roverNextY === -1){
    console.log("Sorry, " + rover.id + " can't go out of boundaries");
    hasMoved = false;
  } else {
    if(grid[roverNextX][roverNextY] === null) {
      // Move rover on the grid
      grid[rover.x][rover.y] = null;
      grid[roverNextX][roverNextY] = rover;
      rover.x = roverNextX;
      rover.y = roverNextY;
    }else{
      if(typeof grid[roverNextX][roverNextY] === "string"){
        console.log("\u26A0 Obstacle found \u26A0 => " + grid[roverNextX][roverNextY]);
        hasMoved = false;
      } else {
        console.log("\u26A0 Obstacle found \u26A0 => " + grid[roverNextX][roverNextY].id);
        hasMoved = false;
      }
    }
  }
  return hasMoved;
}

function registerMovement(rover, hasMoved){
  if (hasMoved) {
    rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
    console.log(rover.id + " is moving to " + rover.direction + ". Next position: [" +
     rover.x + "," + rover.y + "]");
  } else {
     console.log(rover.id + " is not moving to " + rover.direction + ". Stays in: [" +
      rover.x + "," + rover.y + "]");
  }
}

function calculateNewDirection(currentDirection, turnTo, rover){
  switch (currentDirection) {
    case "N":
      if (turnTo === "right") rover.direction = "E";
      else if (turnTo === "left") rover.direction = "W";
      break;
    case "W":
      if (turnTo === "right") rover.direction = "N";
      else if (turnTo === "left") rover.direction = "S";
      break;
    case "S":
      if (turnTo === "right") rover.direction = "W";
      else if (turnTo === "left") rover.direction = "E";
      break;
    case "E":
      if (turnTo === "right") rover.direction = "S";
      else if (turnTo === "left") rover.direction = "N";
      break;
  }
}

function checkRoverWithTurn(){
  var roverWithTurn;
  for (var rover in rovers){
    if (rovers[rover].isMyTurn) roverWithTurn = rovers[rover];
  }
  return roverWithTurn;
}

function nextTurn(currentRover){
  var indexOfCurrentRover = rovers.indexOf(currentRover);
  currentRover.isMyTurn = false;
  if(indexOfCurrentRover === rovers.length - 1)
    rovers[0].isMyTurn = true;
  else
    rovers[indexOfCurrentRover + 1].isMyTurn = true;
}

function execListOfCommands (commands) {
  var rover;
  for (var i=0; i<commands.length; i++){
    rover = checkRoverWithTurn();
    if(rover.travelLog.length === 0)
      rover.travelLog.push("[" + rover.x + "," + rover.y + "]");

    if(commands[i] === "f") moveForward(rover);
    else if (commands[i] === "b") moveBackward(rover);
    else if (commands[i] === "l") turnLeft(rover);
    else if (commands[i] === "r") turnRight(rover);
    else console.log("Command NOT correct, you can only use 'f', 'b', 'r' and 'l'");
  }

  for (var roverX in rovers) {
    printMovements(rovers[roverX]);
  }
}

function printMovements(rover){
  console.log(rover.id + "\'s Travel Log: \n");
  for(var movement in rover.travelLog){
    console.log(rover.travelLog[movement]);
  }
}
