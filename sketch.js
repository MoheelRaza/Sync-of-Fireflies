//Jot down the idea
  /*
  The rules : a cylinder that gets filled, and then kaboom - a flash
  if sees a flash in the nearby object, increass the water in the cylinder by some amount... go on and on and then ka boom
  
  //Variables that neet to be defined : 
    - interval for getting filled up
    - intensity by which to increase the volume
    - randomness of the initial stages
    - The kaboom?
      - Explosion?, Colour change?, Size increment, Colour intensity of red? violet or what?
      
      -Not in a grid, rather in a moving fashion... affected by every other, inverse square law... great.. right? let's get into it!
      
  */
//Nomenclature
  /*
    Volume = 0 to 1, represents the amount by which the tube is filled
    Peak = at 1, the go off time
  */


//General Variables
let canvasSize = 550;
let General = { 
  width : 600,
  height :600,
};
let framerate = 60;
let t = 0;

//Generate along the grid
let gridGenerateAllow = false;
if(gridGenerateAllow === true){
 flyGen.num = round(sqrt(flyGen.num)) * round(sqrt(flyGen.num));
}



function setup() {
  frameRate(framerate);
  createCanvas(General.width, General.height);
  
  //Generate Fly INstances
 function generateFliesRandom(){
   if(flyGen.num > flyGen.maxNum){flyGen.num =
     flyGen.maxNum - 20}
  while(flyInstance.length < flyGen.num){
    //while(flyInstance.length < flyGen.num){
    var posAmp = createVector(random(flyGen.rad, width- flyGen.rad), random( flyGen.rad, height -  flyGen.rad));
    
    //Assume no overlap
    var overlap = false;
    for(var j = 0; j < flyInstance.length; j++){
      var d = p5.Vector.dist(posAmp, flyInstance[j].pos);
      
      if(d < 2*flyGen.rad){
        overlap = true;
        break;
      }
    }
    if(!overlap){
     flyInstance.push(new Flies(posAmp.x, posAmp.y, 0, 0, random(1), random(50), random(50))); 
    }
    

    }
  }
  if(!gridGenerateAllow){
  generateFliesRandom();
  }
  
  function generateFliesGrid(){
    let gridGenerate = {
  separation : General.width/sqrt(flyGen.num),
  num : sqrt(flyGen.num),
  //xStart : (sepx * 1/2)
};
    
    //Call them along the grid
    for(var i = 0; i < gridGenerate.num; i++){
      for(var j = 0; j < gridGenerate.num; j++){
        
         flyInstance.push(new Flies((i + 1/2)*gridGenerate.separation , (j + 0.5)*gridGenerate.separation, 0, 0, random(1), random(50), random(5.0))); 
      
    }
    }
    
    
    
  }
  if(gridGenerateAllow){
    generateFliesGrid();
  }
  
  
}

function draw() {
  background(0);
  
  
  //call all the methods on the Flies
  for(var n = 0; n < flyGen.num; n ++){
    flyInstance[n].draw();
    flyInstance[n].move();
    flyInstance[n].checkEdges();
    flyInstance[n].glow();
    //flyInstance[n].bandwagon(n);
    
   
   
    //Rebound is taking up a lot of memory... maybe couldn't work with that... then, don't move either?
  }
  
  //Display Time
  function displayTime (){
  t += 1/framerate;
  var timeInSec = round(t);
  fill('black');
  rect(15, 10, 120, 25);
  fill('white');
  textSize(20);
  //This is getting awful and whatever
  text(timeInSec +" Seconds", 20, 30);
  }
  displayTime();
  
 
  
}