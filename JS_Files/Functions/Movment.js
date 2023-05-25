var collisionBuffer = STEVE.speed * 1.5;
var bgMoveOffsetX = 8;
var bgMoveOffsetY = 4;
var bgPreOffsetY = 936;
var CollisionDir = 0;
var MoveDir = 0;
var gravity = true;
var onLadder = true;
var GravityDamageIncreament = 0.3;
var arr = [];
var asdfgh = false;


function Move(keypressed){
    
    if(keypressed == 65){
        STEVE.dir = -1;
        playerChunkNo = Math.floor(STEVE.x/4800);   
        x += -STEVE.speed;
        ctx.translate (STEVE.speed, 0);
        STEVE.ANIMATE(-STEVE.speed, 0);
        CollisionDir = 68;
        bg.style.backgroundPositionX =  (-(x /bgMoveOffsetX)-bgPreOffsetY) + "px";
    }
    else if(keypressed == 68){
        STEVE.dir = 1;
        playerChunkNo = Math.floor((STEVE.x+STEVE.width)/4800);   
        x += STEVE.speed;
        ctx.translate (-STEVE.speed, 0);
        STEVE.ANIMATE(STEVE.speed, 0);
        CollisionDir = 65;
        bg.style.backgroundPositionX =  (-(x/bgMoveOffsetX) -bgPreOffsetY)+ "px";
    }
    else if(keypressed == 83 && onLadder){
        y += STEVE.speed;
        ctx.translate (0, -STEVE.speed);
        STEVE.ANIMATE(0, STEVE.speed);
        CollisionDir = 87;
        bg.style.backgroundPositionY =  (-(y /bgMoveOffsetY)-bgPreOffsetY) + "px";
    }
    else if(keypressed == 87 && onLadder){
        y += -STEVE.speed;
        ctx.translate (0, STEVE.speed);
        STEVE.ANIMATE(0, -STEVE.speed);
        CollisionDir = 83;
        bg.style.backgroundPositionY =  (-(y /bgMoveOffsetY)-bgPreOffsetY) + "px";
    }

    if(keypressed == 83 || keypressed == 87 || keypressed == 65|| keypressed == 68){
        if(craftingUIOpen){
            craftingUIOpen=false;
            UpdateHotBar();
            document.getElementsByClassName("overlay")[0].style.display = "";
        }
        STEVE.hunger -= 3;
        gravity=true; 
        if(asdfgh){
            SearchAt(STEVE.x,STEVE.y,false,"sensor");

        }
        asdfgh= !asdfgh;
        // coords = getMousePos(event);
    }
}

function MoveCustom(keypressed, speed){
    if(keypressed == 83){
        y += speed;
        ctx.translate (0, -speed);
        STEVE.ANIMATE(0, speed);
        bg.style.backgroundPositionY =  (-(y /bgMoveOffsetY)-bgPreOffsetY) + "px";
    }
    else if(keypressed == 87){
        y -= speed;
        ctx.translate (0, speed);
        STEVE.ANIMATE(0, -speed);
        bg.style.backgroundPositionY =  (-(y /bgMoveOffsetY)-bgPreOffsetY) + "px";
    }
    else if(keypressed == 65){
        playerChunkNo = Math.floor(STEVE.x/4800);   
        x -= speed;
        ctx.translate (speed, 0);
        STEVE.ANIMATE(-speed, 0);
        bg.style.backgroundPositionX =  (-(x /bgMoveOffsetX)-bgPreOffsetY) + "px";
    }
    else if(keypressed == 68){
        playerChunkNo = Math.floor((STEVE.x+STEVE.width)/4800);   
        x += speed;
        ctx.translate (-speed, 0);
        STEVE.ANIMATE(speed, 0);
        bg.style.backgroundPositionX =  (-(x /bgMoveOffsetX)-bgPreOffsetY) + "px";
    }

}

function collide(dir){
    var returnVal = false;
    onLadder = false;

    arr = chunklist[ playerChunkNo].array[Math.floor(STEVE.x/300)%16];
    for (let i = 0; i < arr.length; i++) {
        returnVal = arr[i].collide(dir);
        if(returnVal){
            i = arr.length;
        }
    }

    if(!returnVal){
        if(chunklist[ playerChunkNo].array[(Math.floor(STEVE.x/300)%16)-16] != undefined) {
            arr = chunklist[ playerChunkNo].array[(Math.floor(STEVE.x/300)%16)-1];
            for (let i = 0; i < arr.length; i++) {
                returnVal = arr[i].collide(dir);
                if(returnVal){
                    i = arr.length;
                }
            }
        }
        else{
            if (chunklist[playerChunkNo+1]) {
                arr = chunklist[ playerChunkNo].array[15].concat(chunklist[ playerChunkNo+1].array[0]);                
            }
            else{
                chunklist[ playerChunkNo].array[0];
            }
            for (let i = 0; i < arr.length; i++) {
                returnVal = arr[i].collide(dir);
                if(returnVal){
                    i = arr.length;
                }
            }
        }
    }

    if(!returnVal){
        if(chunklist[ playerChunkNo].array[(Math.floor(STEVE.x/300)%16)+1] != undefined) {
            arr = chunklist[ playerChunkNo].array[(Math.floor(STEVE.x/300)%16)+1];
            for (let i = 0; i < arr.length; i++) {
                returnVal = arr[i].collide(dir);
                if(returnVal){
                    i = arr.length;
                }
            }
        }
        else{
            if (chunklist[playerChunkNo-1]) {
                arr = chunklist[ playerChunkNo].array[0].concat(chunklist[ playerChunkNo-1].array[15]);                
            }
            else{
                chunklist[ playerChunkNo].array[0];
            }
            for (let i = 0; i < arr.length; i++) {
                returnVal = arr[i].collide(dir);
                if(returnVal){
                    i = arr.length;
                }
            }
        }
    }
    return returnVal;
}

function ApplyGravity(ent){
    if(ent instanceof PLAYER){
        if(gravity == true && !onLadder){
            MoveCustom(83, ent.gravitySpeed);
            var a = collide(87);
            gravity = !a; 
            if(a){
                if(ent.GravityDamageSumUp > GravityDamageIncreament*20){
                    STEVE.health -= Math.floor(ent.GravityDamageSumUp+(GravityDamageIncreament*2));
                    ent.GravityDamageSumUp = 0;
                    PlaySound(soundFall)
                    UpdateHeartBar(Math.floor(STEVE.health/2));
                }
                else{
                    ent.GravityDamageSumUp = 0;
                }
            }
            else{
                ent.GravityDamageSumUp += GravityDamageIncreament;
            }
        }
    }
    else{
        if(ent.gravity || ent.gravitySpeed < 0){
            ent.ANIMATE(0,ent.gravitySpeed);
            var a = ent.collide(0,-1)
            ent.gravity = !a;
            if(a){
                if(ent.GravityDamageSumUp > GravityDamageIncreament*10 &&!(ent instanceof BLAZE)&&!(ent instanceof ENDERMAN)&&!(ent instanceof GOAT) &&!(ent instanceof SPIDER) && !(ent instanceof WARDEN)){
                    ent.hurt(Math.floor(ent.GravityDamageSumUp+(GravityDamageIncreament*2)));
                    ent.GravityDamageSumUp = 0;
                }
                else{
                    ent.GravityDamageSumUp = 0;
                }
            }
            else{
                ent.GravityDamageSumUp += GravityDamageIncreament;
            }
        }

    }
    if(ent.y > TerrainGenerator.depth){
        ent.die();
    }
}

function JUMP(){
    if(!gravity || STEVE.gravitySpeed == gravitySpeed2/4){
        var i;
        gravity = false;
        for (i = 0; i < (6+(300/30))/6 ; i++) {
            window.setTimeout(() => {
                MoveCustom(87, 30*6);
                collide(83);
            },i*5*6);
        }
        window.setTimeout(() => {
            if(STEVE.dir == -1){
                MoveCustom(65, 30);
                collide(68);
            }
            else{
                MoveCustom(68, 30);
                collide(65);
            }
        }, (2+(300/30)) * 5);
        window.setTimeout(() => {
            gravity = true;
        },40);
    }
}

function Teleport(X,Y){
    if(X > STEVE.x){
        MoveCustom(68,(X- STEVE.x));
    }
    if (X < STEVE.x){
        MoveCustom(65, (STEVE.x-X));
    }
    if(Y > STEVE.y){
        MoveCustom(83, (Y - STEVE.y))
    }
    if(Y < STEVE.y){
        MoveCustom(87, (STEVE.y - Y))
    }
    gravity = true;
    playerChunkNo = Math.floor(STEVE.x/4800);
    collide(87);
}