let flyGen = {
  num :1000,
  rad :2,
  velMax : 1,
  noiseInc :0.01,
  
  //the glow matter
  volInc : 0.01,
  volInf : 0.015,
  radInc : 1.2,
  residue : 0.2,
  radInf :58,
  
  //Inactive Colour
  inactiveCol : [60, 10, 35, 35],
};
 
flyGen.maxNum = (General.width/flyGen.rad*2)*(General.height/flyGen.rad*2);

let flyInstance = [];
let Flies = function(x,y, vx, vy,volume, n1, n2){
  this.pos = createVector(x,y);
  this.vel = createVector(vx, vy);
  this.vol = volume;
  this.rad = flyGen.rad;
  this.noiseIndex = createVector(n1, n2);
  this.colorApp = color(flyGen.inactiveCol[0], flyGen.inactiveCol[1], flyGen.inactiveCol[2]);
  this.active = false;
  
  
};
//Methods on fireflies
  
//display
Flies.prototype.draw = function(){
    colorMode(HSB);
    fill(this.colorApp);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad*2);
  };

//Move according to perlin Noise
Flies.prototype.move = function(){
  //The velocity according to noise
   this.vel.x = map(noise(this.noiseIndex.x),0,1,-1*flyGen.velMax, flyGen.velMax);
   this.vel.y =map(noise(this.noiseIndex.y),0,1,-1*flyGen.velMax, flyGen.velMax);
  //Increase NoiseIndex vallue
  this.noiseIndex.x += flyGen.noiseInc;
  this.noiseIndex.y += flyGen.noiseInc;
  
  //Move it, add to the position
  this.pos.add(this.vel);
  
};

//Check edges
Flies.prototype.checkEdges = function(){
  if(this.pos.x   > width){
     this.pos.x = 0;
  }
  if(this.pos.x < 0){
     this.pos.x = width;
  }
  if(this.pos.y < 0){
    this.pos.y = height;
  }
  if(this.pos.y > height){
   this.pos. y = 0;
  }
};

//Rebound (Call it later today)
Flies.prototype.rebound = function(){
  for(var i = 0; i < flyGen.num; i ++){
    for( var j = 0; j < flyGen.num; j ++){
      if(j !== i){
       
        var d = p5.Vector.dist(flyInstance[i].pos, flyInstance[j].pos);
        
        if(d < 2* flyGen.rad)
        {
          //Calculate the original velocity of the object 
          var veliMag = flyInstance[i].vel.mag();
          flyInstance[i].vel = p5.Vector.sub(flyInstance[i].pos, flyInstance[j].pos);
          flyInstance[i].vel.normalize();
          flyInstance[i].vel.mult(veliMag);
          
          
          
        }
      
      }
      
      
    }
  }
};

//Glow
Flies.prototype.glow = function(){
  this.vol += flyGen.volInc;
  
  
  if(this.vol > 1){
    this.colorApp = color(60, 100, 100);
    this.rad = flyGen.rad *flyGen.radInc;
    this.vol = 0;
    this.active = true;
    this.bandwagon();
  }
  if(this.vol > flyGen.residue){
    this.rad = flyGen.rad;
    this.colorApp = flyGen.inactiveCol;
    this.active = false;
    
  }  
};

//Be affected by the nearbies
Flies.prototype.bandwagon = function(j){
  for( var i = 0; i < flyGen.num ; i++){

   if(flyInstance[i].active === false && this.active === true && i !== j){
      
      //Calculate distance
      var d = p5.Vector.dist(this.pos, flyInstance[i].pos);
     if( d < flyGen.radInf){
      flyInstance[i].vol += flyGen.volInf  ;
     }
     
    }
  }
};

