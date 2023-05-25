'use strict';
const canvas = document.getElementById("canvas");
const bg = document.getElementById("bg");
const Sky = document.getElementById("SkyBodies");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var x = 0;
var y = 0;
var SpawnPoint = [canvas.width/2, canvas.height/2 - 300];

var daytime = 0;
var day = 1;

var tier = 0;
const params = new URLSearchParams(window.location.search);

var fontSize= 150;
var cursedText = ["∴","^","~","¢","=","⚍","╎","#","¡","ᔑ","ᓭ","<","⎓","⊣","⍑","⋮","ꖌ","ꖎ","⨅","{","ᓵ","⍊","ʖ","}","ᒲ","§",";"," "," "," "];
var alphabet =   ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," "];
var cursedNum = 0;
var cursedLetter = "";
var inCooldown = false;
var classArray = [];
var classNameArray = [];
var numOfItem = 0;
var angerRaid = false;
var raid = [];

if(params.get("seed")){
    var seed = GetNum(params.get("seed"));
    var seed2 =GetNum( params.get("seed"));
    console.log(seed);
    if(seed == 195318520){
        window.setTimeout(function(){
            give(ENCHANTEDGOLDBLOCK,7);
            UpdateHotBar();
        },5000);
    }
}
else{
    var seed = 0;
    var seed2 = 0;//Math.floor(Math.random()*(2**32));
}
const modulus = 2 ** 32;
const a = 1664525;
const c = 1013904223;


ctx.font = fontSize + "px PixelFont";
ctx.fillStyle = "white";


function getRandom() {
  var returnVal = seed / modulus;
  seed = (a * seed + c) % modulus;
  return returnVal;
}

function getRandomForTerrainGen() {
    var returnVal = seed2 / modulus;
    seed2 = (a * seed2 + c) % modulus;
    return returnVal;
}

function init(){
    console.log("Welcome to the js console...  Explore the possiblities and the secrets")
    for (let i = 0; i < noOfSlots; i++) {
        new SLOTS(new VOID(), 0)
    }

    for (let i = 1; i < maxStatAmount; i++) {
        hotbararray.push(document.getElementById(i));
    }

    for (let i = 0; i < 9; i++) {
        new CRAFTINGSLOTS();
    }
    UpdateHotBar();
    GENERATECHUNK();
    tryChunkGen();
    UpdateFoodBar(10);
    UpdateHeartBar(STEVE.health/2);
    HotBarSlotClicked(0);
    Move(83,0);
    Move(68,0);
    onLadder =true;
    Inventory[30].obj = new IHELMET();
    Inventory[31].obj = new IPANTS();
    Inventory[32].obj = new IBOOTS();
    Inventory[33].obj = new ARROW();
    Inventory[34].obj = new SHIELD();
    Inventory[14].obj = new APPLE();
    Inventory[15].obj = new APPLE();
    Inventory[30].value = 1;
    Inventory[31].value = 1;
    Inventory[32].value = 1;
    Inventory[33].value = 64;
    Inventory[34].value = 1;
    Inventory[14].value = 1;
    Inventory[15].value = 1;
    give(ISWORD);
    give(DSWORD);
    give(IPICKAXE);
    give(IAXE);
    give(ISHOVEL);
    give(BRICKS,64);
    give(CHEST,64);
    UpdateArmourBar(2);
    while(chunklist.length < 11){
        GENERATECHUNK();
    }
    new DEEPDARK(10*4800,0).Spawn();
    console.log(chunklist.length);
}

function keyPressed(event){

    var keypressed = event.keyCode;
    if(keypressed==69){
        if(craftingUIOpen){
            document.getElementsByClassName("overlay")[0].style.display = "";
        }
        else{
            document.getElementsByClassName("overlay")[0].style.display = "none";
        }
        INVENTORYUI(event.keyCode);
        UpdateArmourBar();
    }
    else if(keypressed >= 49 && keypressed <= 57){
        HotBarSlotClicked(keypressed - 49);
    }
    else if(keypressed == 32 && craftingUIOpen==false){
        JUMP();
    }
    else if(keypressed == 16){
        STEVE.sneaking = !STEVE.sneaking;
        if(STEVE.sneaking){
            STEVE.image = imagePlayerSneaking
            STEVE.speedBackup = STEVE.speed;
            STEVE.speed/=3;
        }
        else{
            STEVE.image = imagePlayer
            STEVE.speed = STEVE.speedBackup;
        }
    }
    else if(keypressed == 81&& !craftingUIOpen){
        if(Inventory[ss].obj.constructor.name != "VOID"){
            var d = 0;
            if(Inventory[ss].value > numOfItem){
                d = numOfItem;
            }else{
                d = Inventory[ss].value
            }
            new CUSTOMITEM(d,true,STEVE.x+(STEVE.dir*200) +(STEVE.width*((STEVE.dir+1)/2)),STEVE.y,Inventory[ss].obj)
            Inventory[ss].value-=d;
            if(Inventory[ss].value <= 0){
                Inventory[ss].obj = new VOID();
            }
            UpdateHotBar();
            numOfItem = 0;
        }
    }
    else if(keypressed == 79&& event.ctrlKey == true){
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            readFile(input)
            let files =   Array.from(input.files);
            console.log(files);
        };
        input.click();
    }
    else if(keypressed == 83&& event.ctrlKey == true){
        save();
    }
    if(craftingUIOpen == false){
        UIName = "CRAFT";
    }
    itemArray.forEach(el => el.collect());
    MoveDir = 0;
}

function keyHeld(event){
    MoveDir = event;
    if(event == 81&& numOfItem<64){
        numOfItem++;
    }
}

function getMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var xCoord = ((event.clientX  - rect.left) / (rect.right - rect.left) * canvas.width);
    var yCoord = ((event.clientY  - rect.top) / (rect.bottom  - rect.top) * canvas.height);
    return{
        x:(Math.floor(xCoord) + x),
        y:(Math.floor(yCoord) + y)
    }
}

function save(){
    var fileArray = [];
    var biomeArray=[];
    var extraData = [];
    var entData = [];
    var itemData = [];
    chunklist.forEach(chunk=>{
        var arr = [];
        chunk.array.forEach(x=>{
            var arr2 = []
            x.forEach(b=>{
                arr2.push(b.constructor.name);
                if(b instanceof LIQUIDS){
                    extraData.push(b.dir);
                }
                else if(b.array != undefined){
                    var slot = [];
                    b.array.forEach(el=>{
                        slot.push([el.obj.constructor.name, el.value,el.obj.durability]);
                    })
                    extraData.push(slot);
                }   
            })
            arr.push(arr2)
        })
        fileArray.push(arr);
    })
    var slot = [];
    Inventory.forEach(el=>{
        slot.push([el.obj.constructor.name, el.value,el.obj.durability]);
    })
    extraData.push(slot);
    chunklist.forEach(el=>{
        biomeArray.push(el.biome.constructor.name);
    })
    entityArray.forEach(e =>{
        var arr = [];
        arr.push(e.constructor.name,e.x,e.y,e.health);
        entData.push(arr);
    })
    itemArray.forEach(e =>{
        var arr = [];
        arr.push(e.obj.constructor.name,e.x,e.y,e.amount,e.obj.durability);
        itemData.push(arr);
    })
    var blob = new Blob([JSON.stringify([fileArray , biomeArray, seed, seed2, extraData, STEVE.health,STEVE.hunger, entData,itemData,daytime,day ])], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "MineBuild.world");
}

function readFile(input){
    var fr=new FileReader();
    var txtArr = "";
    var edi = 0;
    fr.readAsText(input.files[0]);
    fr.onload=function(){
        try {
            txtArr = fr.result;
            var ReadArrays = (JSON.parse(txtArr));
            biomePos = ReadArrays[1]
            chunklist = [];
            for (let i = 0; i < ReadArrays[0].length; i++) {
                GENERATECHUNK(true);
                ReadArrays[0][i].forEach((x,ind)=>{
                    var array = [];
                    x.forEach((b,y)=>{
                        var block;
                        classNameArray.forEach((el,index)=>{
                            if(el == b){
                                block = new classArray[index]((ind*300)+(i*4800),(y*300)-3900,true,true);
                                if(block instanceof LIQUIDS){
                                    block = new classArray[index]((ind*300)+(i*4800),(y*300)-3900,true,true,ReadArrays[4][edi]);
                                    edi++;
                                }
                                else if(block.array != undefined){
                                    var arrayList = ReadArrays[4][edi];
                                    classNameArray.forEach((elem,index2)=>{
                                        arrayList.forEach((ele,index3)=>{
                                            if(ele[0]==elem&&ele[0]!="VOID"){
                                                block.array[index3].obj = new classArray[index2]();
                                                block.array[index3].value = ele[1];
                                                block.array[index3].obj.durability = ele[2];
                                            }
                                        })
                                    })
                                    edi++;  
                                }
                            }
                        })
                        if(block == undefined){
                            block = new AIR((x*300)+(i*4800),(y*300)-3900,true,true);
                        }
                        array.push(block);
                    })
                    chunklist[i].array[ind] =(array);
                })
            }
            for (let i = 0; i < ReadArrays[4][ReadArrays[4].length-1].length; i++) {
                const el = ReadArrays[4][ReadArrays[4].length-1][i];
                classNameArray.forEach((n,ind) =>{
                    if(n == el[0]){
                        var slot = Inventory[i];
                        slot.obj = new classArray[ind]();
                        slot.value = el[1];
                        slot.obj.durability = el[2];                    
                    }
                })
            }
            STEVE.health = ReadArrays[5];
            STEVE.hunger = ReadArrays[6];
            itemArray=[];
            particleArray = [];
            markerArray = [];
            new MARKER(0,0,"OOH A SECRET, help");
            entityArray = [STEVE];
            
            Teleport(ReadArrays[7][0][1],ReadArrays[7][0][2]);
            STEVE.x = ReadArrays[7][0][1]
            STEVE.y = ReadArrays[7][0][2]
            ReadArrays[7].forEach(el=>{
                classNameArray.forEach((n,i) =>{
                    if(el[0] == n){
                        var ent = new classArray[i](el[1],el[2]);
                        ent.health = el[3];
                    }
                })
            });
            ReadArrays[8].forEach(el=>{
                classNameArray.forEach((n,i) =>{
                    if(el[0] == n){
                        var ci = new CUSTOMITEM(el[3],true,el[1],el[2],new classArray[i]());
                        ci.obj.durability = el[4];
                    }
                })
            });
            var ft = 45*Math.floor(ReadArrays[9]/45);
            if(ft > 180){
                ft = 180;
            }
            daytime = ft;
            changeDayTime();
            daytime = ReadArrays[9];
            day = ReadArrays[10];
            console.log(ft,daytime)
            UpdateHotBar();
            UpdateHeartBar(Math.floor(STEVE.health/2));
            UpdateFoodBar(Math.floor(STEVE.hunger/1000));
            UpdateArmourBar();
            seed = ReadArrays[2];
            seed2 = ReadArrays[3];
        
        } catch (err) {
            alert("Either the file is tampered...or the wrong file.")
        } 
    } 
}

function changeDayTime(){
    if(daytime%4 == 0){
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
    if(daytime%45 == 0){
        if(daytime >= 360){
            daytime = 0;
        }

        if(daytime == 0 || daytime == 135){
            Sky.src = "images/gui/bg/sky.png";
            bg.style.backgroundImage = "URL('Images/gui/bg/MORNING\ -\ EVENING.png')";
            if(Math.floor(getRandom()*(10/(1+((day-1)%5))))  ==0){
                var x = Math.floor(getRandom()*6000)-3000
                raid = [];
                console.log("Raid",x);
                angerRaid = false;
                raid.push(
                    new EVOKER(x,1200),
                    new VINDICATOR(x,1200 + 10),
                    new VINDICATOR(x,1200-10),
                    new DONKEY(x,1200+3)
                )            
                raid.forEach(el=>{
                    el.vex = 5;
                    el.speed = 0;
                });
                raid[3].Inventory = new CHEST();
                raid[3].Inventory.array[12].obj = new TOTEMOFUNDYING();
                raid[3].Inventory.array[17].obj = new FLINTANDSTEEL();
                raid[3].Inventory.array[12].value = 1;
                raid[3].Inventory.array[17].value = 1;
                for (let i = 0; i < 1+Math.floor(getRandom()*1); i++) {
                        var s = raid[3].Inventory.array[Math.floor(getRandom()*30)];
                        s.obj = new DIAMOND()
                        s.value  ++;
                }
                for (let i = 0; i < 2+Math.floor(getRandom()*3); i++) {
                    var s = raid[3].Inventory.array[Math.floor(getRandom()*30)];
                    s.obj = new STICK()
                    s.value += Math.floor(getRandom()*3)+1;
                }
                for (let i = 0; i < 2+Math.floor(getRandom()*3); i++) {
                    var s = raid[3].Inventory.array[Math.floor(getRandom()*30)];
                    s.obj = new TNT()
                    s.value += Math.floor(getRandom()*4)+1;
                }
            }
        }
        else if(daytime == 180){
                Sky.src = "images/gui/bg/sky2.png"
                bg.style.backgroundImage = "URL('Images/gui/bg/NIGHT.png')";
                day++;
                
        }
        else if(daytime == 45 || daytime == 90){
                Sky.src = "images/gui/bg/sky.png";
                bg.style.backgroundImage = "URL('Images/gui/bg/day.png')";
        }
    }
    daytime+=1/16;  
    Sky.style.transform = "rotate(" + String(-(daytime-90)) + "deg)";
}

function tick(){
    if (MoveDir != 0) {
        Move(MoveDir);        
    }
    STEVE.gravitySpeed = 60;
    
    collide(CollisionDir);
    entityArray.forEach(ent => {
            ApplyGravity(ent);
    });
    itemArray.forEach(ent => {
        if(Math.floor(ent.x/4800) == playerChunkNo){
            ApplyGravity(ent);
        }
    });
    if(!craftingUIOpen){
        ctx.clearRect(x-STEVE.speed,y-STEVE.speed, canvas.width+STEVE.speed, canvas.height+STEVE.speed);
        RenderChunks(playerChunkNo);
    }
    changeDayTime();
    entityArray.forEach(el => {if(el instanceof WARDEN){el.trackPlayer()}});
    entityArray.forEach(el => {if(el instanceof ENDERMAN){el.detectStare()}});
    cursedNum ++;
    if(cursedNum > cursedText.length-1){
        cursedNum = 0;
    }
    cursedLetter = cursedText[cursedNum];
    if(STEVE.attackPower <= 0.9){
        STEVE.attackPower += 0.1;
    }
    else{
        STEVE.attackPower = 1;
    }
}

function className(c){
    classArray.push(c)
    classNameArray.push(c.name)
}

var dgdgd = true;
function delayedTick(){
    tryChunkGen();
    if(dgdgd){
        UpdateHeartBar(Math.floor(STEVE.health/2));
    }
    dgdgd = !(Math.floor(STEVE.health/2) == buffer[0]);

    if(!(Math.floor(STEVE.hunger/1000) == buffer[1])){
        UpdateFoodBar(Math.floor(STEVE.hunger/1000));
    }
    Heal();
    growStuff(playerChunkNo, 30);
    ElementSounds();
    entityArray.forEach(el => {if(el instanceof WARDEN){el.Sound()}});
    EntityPathFind();
    if(Math.floor(getRandom()*3) == 0){
        entityArray.forEach(el => el.ambientSound())
    }
    entityArray.forEach(el => {el.attackP();})
    if(Math.floor(getRandom()*3) == 0){
        // Spawn_Despawn();
    }
    
}

function TranslateEnglish(text){
    text = text.toLowerCase();
    var t="";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        alphabet.forEach((el,ind)=>{
            if(char == el){
                t+=cursedText[ind]
            }
        })
    }
    return t;
}

function TranslateCursed(text){
    text.toLowerCase();
    var t="";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        cursedText.forEach((el,ind)=>{
            if(char == el){
                t+=alphabet[ind]
            }
        })
    }
    return t;
}

function GetNum(str){
    str = str.toLowerCase();
    var arr = str.split("");
    var arr2 = [];
    arr.forEach(el => {
        var converted = (Number(el));
        if( !isNaN(converted)){
            arr2.push(converted);
        }
        else{
            alphabet.forEach((alp,i) =>{
                if(alp == el){
                    arr2.push(i+1)
                }
            })
        }
    })
    str = "";
    var abcdefgh = arr2.length;
    if(arr2.length >10){
        abcdefgh = 10;
    }
    for (let i = 0; i < abcdefgh; i++) {
        const el = arr2[i];
        str = str + el;
    }
    return Number(str);
}

// function findBlock(xp,yp,x){
//     if(Math.sign(Math.floor(x/4800)) != -1 && chunklist[Math.floor(x/4800)] != undefined){
//         try {
//             var abcd =  chunklist[(Math.floor(x/4800))].array[Math.abs(xp)%16][yp%36];
//         } catch (err) {
//             console.error(err,x);
//         }
//     }
//     else{
//         var abcd = chunklist[0].array[0][0];
//     }
//     if(abcd != undefined){
//         return abcd;
//     }
//     else{
//         return chunklist[0].array[0][0];
//     }
// }

//I M VERY PROUND OF THIS HOLD MOUSE DETECTION... I MADE THIS... NGL MY MOST PROUD CREATION
var timer = 0;
var intv = 0;
var down = false
window.addEventListener("mousedown", function(event2) { 
    if(!craftingUIOpen && !down){
        down = true;
        var coords = getMousePos(event2);
        intv = window.setInterval(function() {
            timer++;
            DESTROY(coords.x, coords.y, true, playerChunkNo);
        }, 300);
    }
})

window.addEventListener("mouseup", function(event) {
    if(!craftingUIOpen){
        down = false;
        var coords = getMousePos(event);
        window.clearInterval(intv);
        intv = 0;
        if(timer == 0 && event.button == 0){

            (!attackEntities(coords.x, coords.y))
        }
        else if(timer == 0 && event.button == 2){
            entityArray.forEach(el =>{
                if(!(el instanceof PLAYER)){
                    if(coords.x > el.x && coords.x < el.x + el.width && coords.y > el.y && coords.y < el.y + el.height){
                        el.clicked();
                    }
                }
            })
        }
        timer = 0;
    }
})

window.addEventListener("click", function(event) {
    if(craftingUIOpen){
        var coords = getMousePos(event);    
        GUINAV(coords.x, coords.y);
    }
})

window.addEventListener('beforeunload', function(e) {
    // e.preventDefault();
    // e.returnValue = '';
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }   
});

window.addEventListener('keydown', function(event) {
    keyHeld(event.keyCode);
});
var emfkw = 0;
window.addEventListener("wheel",  function(event){
    emfkw += Math.abs(event.wheelDelta)/1;
    if(emfkw >= 150){
        ss+=Math.sign(event.wheelDelta);
        if(ss>8){
            ss = 0;
        }
        if(ss < 0){
            ss = 8;
        }
        emfkw = 0;
        UpdateHotBar();
    }
});


window.oncontextmenu = function (event) {
    if(craftingUIOpen == false){
        var coords = getMousePos(event);
        var r =PLACE(coords.x, coords.y);
        if(r != true){
            ClickOnClickables(coords.x, coords.y);
        }
    }
    else{
        var coords = getMousePos(event);
        GUINAV(coords.x,coords.y, true,event.ctrlKey);
    }
    return false;    
};


window.setInterval(function() {
    delayedTick()
}, 1000);

window.addEventListener("load", function(){
    window.setInterval(function  () {tick()}, 50);
});

// oi!
// /entityData @e[type=parrot]... with sam the narrator on! XD