var playerRange = 1200;
var stoneStrength = 10;
var woodStrength = 7;
var dirtStrength = 8;
var mineSpeed = 1;
var chopSpeed = 1;
var digSpeed  = 1;

function DESTROY(x, y, byplayer){

    if(byplayer){
        PlayerDestroy(x, y);
    }
    else{
        new AIR(PlaceFormula1(x),PlaceFormula1(y),1,1);
    }
}

function PlayerDestroy( x, y){
    var el = chunklist[Math.floor(x/4800)].array[((Math.floor(x/4800)*16) + Math.floor(x/300))%16][(PlaceFormula1(y)+3900)/300];
    if(Math.abs(el.x - STEVE.x) < playerRange && Math.abs(el.y - STEVE.y) < playerRange && !(el instanceof AIR)){
        var type;
        if(el.type == "stone"){
            el.strength -= mineSpeed;
            type = 0;
        }
        else if(el.type == "wood"){
            el.strength -= chopSpeed;
            type = 1;
        }
        else if(el.type == "dirt"){
            el.strength -= digSpeed;
            type = 2;
        }
        else if(el.type == "sculk"){
            el.strength --;
            type = 3;
        }
        else{
            el.strength--;
            type = 2;
        }
        ReduceDurability();
        

        if(el.strength <= 0){
            lightUpdate(el,true);            
            SearchAt(x,y,true, "sensor");
            // dayLight(Math.floor(el.x/4800))
            el.break();
            // chunklist[el.ChunkNo].lightArray.forEach(el => lightUpdate(el))
            entityArray.forEach(el => el.gravity = true);
            PlaySoundFrom(BreakSounds[type], el.x);
            itemArray.forEach(el => el.gravity = true);

            dayLight(playerChunkNo);
            var la = chunklist[playerChunkNo].lightArray;
            if(chunklist[playerChunkNo-1] != undefined){
                dayLight(-1+playerChunkNo);
                la = la.concat(chunklist[-1+playerChunkNo].lightArray)      
            }
            if(chunklist[playerChunkNo+1] != undefined){
                dayLight(1+playerChunkNo)         ;
                la = la.concat(chunklist[1+playerChunkNo].lightArray)      ;   
            }
            la.forEach(el => lightUpdate(el,true))
            la.forEach(el => lightUpdate(el))
        }
    }

}
sdd =undefined;
function PLACE(PX, PY){
    var r;
    if(craftingUIOpen==false&& Inventory[ss].obj instanceof Block  && !CheckIfEntityBlocking(PX,PY) && Math.abs(PX - STEVE.x) < playerRange && Math.abs(PY - STEVE.y) < playerRange){
        PX = PlaceFormula1(PX);
        PY = PlaceFormula1(PY);
        var selobj = Inventory[ss].obj;
        var newobj;

        newobj = new selobj.constructor(PX, PY, true, false);
        if(newobj.exists){
            PlaySoundFrom(soundPlace, newobj.x)
            Inventory[ss].value --;
            hotbararray[ss].innerHTML = Inventory[ss].value;    
            if(Inventory[ss].value == 0){
                delete Inventory[ss].obj;
                Inventory[ss].obj = new VOID();
                hotbararray[ss].innerHTML = ""; 
                hotbararray[ss].style.backgroundImage = ""; 
            }
            dayLight(playerChunkNo);
            var la = chunklist[playerChunkNo].lightArray;
            if(chunklist[playerChunkNo-1] != undefined){
                dayLight(-1+playerChunkNo);
                la = la.concat(chunklist[-1+playerChunkNo].lightArray)      
            }
            if(chunklist[playerChunkNo+1] != undefined){
                dayLight(1+playerChunkNo)         ;
                la = la.concat(chunklist[1+playerChunkNo].lightArray)      ;   
            }
            la.forEach(el => lightUpdate(el,true))
            la.forEach(el => lightUpdate(el))
            SearchAt(PX,PY,true, "sensor");
            chunklist[newobj.ChunkNo].array[newobj.pos[0]%16][Math.abs(newobj.pos[1]-1)%36].update();
            chunklist[newobj.ChunkNo].array[newobj.pos[0]%16][Math.abs(newobj.pos[1]+1)%36].update();
            chunklist[Math.abs(Math.floor((Math.floor(newobj.x/300)-1)/16))].array[Math.abs(newobj.pos[0]-1)%16][newobj.pos[1]].update();
            chunklist[Math.abs(Math.floor((Math.floor(newobj.x/300)+1)/16))].array[Math.abs(newobj.pos[0]+1)%16][newobj.pos[1]].update();
        }
    }
    else{
        r = TryEat(Inventory[ss].obj, PX,PY);
        
    }
    return r;
}

function PlaceFormula1(coord){
    var a = coord/300;
    a = Math.floor(a);
    a = a * 300;
    return a;
}

function CheckIfEntityBlocking(X, Y){
    X = PlaceFormula1(X)
    Y = PlaceFormula1(Y)
    var returnVal = false;
    for (let i = 0; i < entityArray.length; i++) {
        const ent = entityArray[i];
        var A = (ent.x <= X+300 && ent.x >= X)||(ent.x + ent.width <= X+300 && ent.x + ent.width >= X); 
        var B = (ent.y <= Y+300 && ent.y >= Y)||(ent.y + ent.height <= Y+300 && ent.y + ent.height >= Y) || (Y >= ent.y && Y+300 <= ent.y + ent.height); 
        if(A&&B){
            returnVal =  true;
            i = entityArray.length;
        }
    }
    return returnVal;
}