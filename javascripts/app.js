// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["[0,0]"]
};

var grid = [
  [null, "Potato", null, "Potato", null, null, null, null, null, null],
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
  calculateNewDirection(rover.direction, "left");
}

function turnRight(rover){
  console.log("turnRight was called!");
  calculateNewDirection(rover.direction, "right");
}

function moveForward(rover){
  console.log("moveForward was called");
  var hasMoved = makeMovement (rover.direction, "forward");
  registerMovement(rover, hasMoved);
}

function moveBackward(rover){
  console.log("moveBackward was called");
  var hasMoved = makeMovement (rover.direction, "backward");
  registerMovement(rover, hasMoved);
}

function makeMovement (currentDirection, movement){
  console.log("Rover current position: [" + rover.x + "," + rover.y + "]");
  var hasMoved = true;
  switch (currentDirection) {
    case "N":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x - 1, rover.y);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x + 1, rover.y);
      break;
    case "W":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x, rover.y - 1);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x, rover.y + 1);
      break;
    case "S":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x + 1, rover.y);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x - 1, rover.y);
      break;
    case "E":
      if (movement === "forward")
        hasMoved = checkMovement(rover.x, rover.y + 1);
      if (movement === "backward")
        hasMoved = checkMovement(rover.x, rover.y - 1);
      break;
  }
  return hasMoved;
}

function checkMovement (roverNextX, roverNextY){
  var hasMoved = true;
  if(roverNextX === -1 || roverNextY === -1){
    console.log("Sorry, Rover can't go out of boundaries");
    hasMoved = false;
  } else {
    if(grid[roverNextX][roverNextY] === null) {
      rover.x = roverNextX;
      rover.y = roverNextY;
    }else{
      console.log("\u26A0 Obstacle found \u26A0 => " + grid[roverNextX][roverNextY]);
      hasMoved = false;
    }
  }
  return hasMoved;
}

function registerMovement(rover, hasMoved){
  if (hasMoved) {
    rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
    console.log("Rover is moving to " + rover.direction + ". Next position: [" +
     rover.x + "," + rover.y + "]");
  } else {
     console.log("Rover is not moving to " + rover.direction + ". Stays in: [" +
      rover.x + "," + rover.y + "]");
  }
}

function calculateNewDirection(currentDirection, turnTo){
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

function execListOfCommands (commands) {
  for (var i=0; i<commands.length; i++){
    switch (commands[i]) {
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      default:
        console.log("Command NOT correct, you can only use 'f', 'b', 'r' and 'l'");
        break;
    }
  }

  printMovements();
}

function printMovements(){
  console.log("Travel Log: \n");
  for(var movement in rover.travelLog){
    console.log(rover.travelLog[movement]);
  }
}
