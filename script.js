
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

var maxWidth = canvas.width;
var minWidth = 0;
var maxHeight = canvas.height;
var minHeight = 0;

var planchex = 400;
var planchev = 20;
var plancheL = 100;
var plancheH = 10;

var balleRad = 10;
var balleX = canvas.height/2;
var balleY = canvas.width/3;
var bx = 3;
var by = -3;

var lignes = 3;
var colonnes = 6;
var briqueH = 20;
var briqueL = 100;
var espace_brique = 20;

var boucleJeu = setInterval(draw,10);

var briques = [];
  for (l=0; l<lignes;++l){
    briques[l]=[];
    for(c=0; c<colonnes; ++c){
      briques[l][c] = { x: 0, y: 0, status: 1 };
    }
  }


function Balle(){
  /* balle */
  ctx.beginPath();
  ctx.arc(balleX,balleY,balleRad,0,2*Math.PI);
  ctx.fillStyle="red";
  ctx.fill();
  ctx.closePath();  
}

function Planche(){
  /* planche */
  ctx.beginPath();
  ctx.rect(planchex,canvas.height-plancheH,plancheL, plancheH);
  ctx.fillStyle="black";
  ctx.fill();
  ctx.closePath();
}


function Briques(){
  
  for (l = 0 ; l < lignes;++l){
    for(c = 0 ; c < colonnes ; ++c){
      if(briques[l][c].status==1){
        var briqueX = (c*(briqueL + espace_brique));
        var briqueY = (l*(briqueH + espace_brique));
        briques[l][c].x = briqueX;
        briques[l][c].y = briqueY;
        ctx.beginPath();
        ctx.rect(briqueX, briqueY, briqueL, briqueH);
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (l = 0 ; l < lignes;++l){
    for(c = 0 ; c < colonnes ; ++c){
      var b = briques[l][c];
      if(b.status == 1) {
        if(balleX > b.x && balleX < b.x+briqueL && balleY > b.y && balleY < b.y+briqueH) {
          by = -by;
          b.status = 0;
        }
      }
    }
  }
}



/* Planche avec flèches */

document.addEventListener("keydown", function(e){
  if ( e.keyCode==37 && planchex > minWidth){ 
    planchex = planchex - planchev;
  }
  else if ( e.keyCode==39 && planchex < maxWidth - plancheL){ 
    planchex = planchex + planchev;
  }
});



function draw (){
    ctx.clearRect(0,0,canvas.height,canvas.width);
    Balle();
    Planche();
    Briques();
    collisionDetection();
  
    if (balleX + bx > maxWidth - balleRad || balleX + bx < 10){
      bx = -bx;
    }
    if (balleY + by < 10){
      by = -by;
    }
    else if (balleY > maxHeight - balleRad){
      if (balleX > planchex && balleX < planchex + plancheL){
        by = -by;
      }
      else { 
        alert("PERDU !");
        clearInterval(boucleJeu);
      }
    }
    console.log(balleX);
    balleX += bx;
    balleY += by;
  }
  

/*
var images=newImage()
images.src=chemin_de_l_image

function dessineBalle() {
	// dessine la balle
	var dx=x-(images.widht/2)
	var dy=y-(images.height/2)
	ctx.drawImage(images, dx, dy)
}
*/


