// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["[0,0]"]
};
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
  console.log("Rover current position: [" + rover.x + "," + rover.y + "]");

  if(rover.direction === "N") rover.y --;
  if(rover.direction === "W") rover.x --;
  if(rover.direction === "S") rover.y ++;
  if(rover.direction === "E") rover.x ++;

  var hasMoved = true;
  if(rover.x===-1 || rover.y ===-1){
    console.log("Sorry, Rover can't go out of boundaries");
    hasMoved = false;
    if (rover.x===-1) rover.x ++;
    if (rover.y===-1) rover.y ++;
  }

  rover.travelLog.push("[" + rover.x + "," + rover.y + "]");

  if (hasMoved) {
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
      if (turnTo === "left") rover.direction = "W";
      break;
    case "W":
      if (turnTo === "right") rover.direction = "N";
      if (turnTo === "left") rover.direction = "S";
      break;
    case "S":
      if (turnTo === "right") rover.direction = "W";
      if (turnTo === "left") rover.direction = "E";
      break;
    case "E":
      if (turnTo === "right") rover.direction = "S";
      if (turnTo === "left") rover.direction = "N";
      break;
  }
}

function execListOfCommands (commands) {
  for (var i=0; i<commands.length; i++){
    if (commands[i] !== "f" && commands[i] !== "r" && commands[i] !== "l")
      console.log("Command NOT correct, you can only use 'f', 'r' and 'l'");
    else {
      if (commands[i] === "f") moveForward(rover);
      if (commands[i] === "r") turnRight(rover);
      if (commands[i] === "l") turnLeft(rover);
    }
  }

  printMovements();
}

function printMovements(){
  console.log("Travel Log: \n");
  for(var move in rover.travelLog){
    console.log(rover.travelLog[move]);
  }
}
