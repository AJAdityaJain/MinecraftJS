'use strict';
var sleeping = false;
var SculkDetectionRange = 1350;
var anger = 0;

class Block{
    constructor(x, y, block, commanded,air,startingAir){
        this.name = this.constructor.name;
        this.x = x;
        this.y = y;
        this.image = imageMissing;
        this.strength = 0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.ChunkNo;
        this.drop = "self";
        this.amount = 0;
        this.block = block;
        this.commanded = commanded;
        this.exists;
        this.tier = 0;
        this.lightLevel = 0;
        this.luminant =false;
        this.tint = "000000";
        this.colour = "000000"
        this.clickable = false;
        this.isFuel = false;
        this.isDependent = false;
        this.stackAmount = 64;
        if(this.block){
            this.ChunkNo = Math.floor(this.x /(chunksSize * 300));
            var exists = true;
            var hd = this.y <= TerrainGenerator.depth && this.y >= -3900;

            if(Math.abs(this.ChunkNo) == this.ChunkNo && hd){
                try{
                    var el = chunklist[this.ChunkNo].array[(this.x/300)%16][(this.y+3900)/300];

                    if(commanded){
                        exists = true;
                    }
                    else{
                        if((el instanceof LAVA && this instanceof WATER)||(this instanceof LAVA && el instanceof WATER)){
                            exists = false;
                            console.log(2);
                            new COBBLESTONE(this.x,this.y,true,true);
                        }
                        else if(el instanceof AIR || (el instanceof LIQUIDS && !(this instanceof LIQUIDS)) || (el instanceof LIQUIDS && (el.dir =="right" || el.dir =="left"))){
                            exists = true;
                            chunklist[el.ChunkNo].array[Math.abs((el.ChunkNo*16) - Math.floor(el.x/300))][Math.floor(el.y/300)+13].remove();
                        }
                        else{
                            exists = false;
                        }
                    }
                }
                catch(err){
                    if(exists && !air){
                        GENERATECHUNK();
                    }
                }

                if(exists){
                    if(startingAir){
                        if(chunklist[this.ChunkNo]){
                            chunklist[this.ChunkNo].array.push(this);
                        }
                    }
                    else{
                        if(chunklist[this.ChunkNo]){
                            chunklist[this.ChunkNo].array[Math.abs((this.ChunkNo*16) - Math.floor(this.x/300))][Math.floor(this.y/300)+13] = this;
                        }
                        else if(this.constructor.name != "AIR"){
                            // console.error("meow", this.constructor.name);
                        }
                    }
                }
            }
            else{
                exists = false;
            }
            this.pos = [(this.ChunkNo*16) + (this.x/300),(this.y+3900)/300];
            this.exists = exists;
        }
    }
    
    render(){
        if(this.lightLevel != 0){
            ctx.drawImage(this.image, this.x, this.y, this.width,this.height);
            if(this.strength < this.backupstrength && this.strength >= 0){
                ctx.drawImage(BreakArray[Math.floor(this.strength/this.backupstrength*10)], this.x, this.y, this.width, this.height);
            }
        }
        ctx.globalAlpha =  1- (this.lightLevel/10);
        ctx.fillStyle = "#" + blendColors("000000",this.tint, this.lightLevel/10)//1 - Math.floor(this.lightSpread/10));
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.globalAlpha = 1;
    }

    quasiRender(){
        if(this.lightLevel != 0){
            ctx.drawImage(this.image, 0, 0, (this.width/300)*this.image.width,(this.height/300)*this.image.height,this.x,this.y,this.width,this.height);//this.image.width,this.image.height);
            if(this.strength < this.backupstrength && this.strength >= 0){
                ctx.drawImage(BreakArray[Math.floor(this.strength/this.backupstrength*10)], this.x, this.y, this.width, this.height);
            }
        }
        ctx.drawImage(imageLightGradient,(this.lightLevel),0,1,1,Math.floor(this.x/300)*300,Math.floor(this.y/300)*300,300,300);//l
    }

    clear(){
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    collide(dir){
        if(this.collides){
            var A = STEVE.x + STEVE.width > this.x;
            var B = STEVE.x < this.x + this.width;
            var C = STEVE.y + STEVE.height > this.y;
            var D = STEVE.y < this.y + this.height;

            if(A && B && C && D){
                var DiffY2 =Math.abs(this.y - (STEVE.y + STEVE.height));
                var DiffX2 =Math.abs(this.x - (STEVE.x + STEVE.width));
                var DiffY = Math.abs((this.y + this.height) - STEVE.y);
                var DiffX = Math.abs((this.x + this.width) - STEVE.x);

                    if(dir == 68){
                        MoveCustom(68, DiffX);
                    }
                    if(dir == 65){
                        MoveCustom(65, DiffX2);
                    }
                    if(dir == 83){
                        MoveCustom(83, DiffY);
                    }
                    if(dir == 87){
                        MoveCustom(87, DiffY2);
                    }
                STEVE.gravitySpeed = 60;
                return true;
            }
        }
        return false;
    }
    
    entitycollide(X,Y,ent){
        if(this.collides){
            var A = ent.x + ent.width > this.x;
            var B = ent.x < this.x + this.width;
            var C = ent.y + ent.height > this.y;
            var D = ent.y < this.y + this.height;

            if(A && B && C && D){
                var DiffY2 =Math.abs(this.y - (ent.y + ent.height));
                var DiffX2 =Math.abs(this.x - (ent.x + ent.width));
                var DiffY = Math.abs((this.y + this.height) - ent.y);
                var DiffX = Math.abs((this.x + this.width) - ent.x);

                if(X==1){
                    ent.ANIMATE(DiffX, 0);
                }
                if(X==-1){
                    ent.ANIMATE(-DiffX2, 0);
                }
                if(Y == 1){
                    ent.ANIMATE(0,DiffY);
                }
                if(Y==-1){
                    ent.ANIMATE(0, -DiffY2);
                }
                
                if((ent instanceof PROJECTILE)){ 
                    ent.y -= ent.height;
                    ent.damage = 0;
                    window.clearInterval(ent.int);
                    setTimeout(() => {
                        ent.die()
                    }, ent.time);
                }
                if(ent instanceof ENDERPEARL2){
                    window.clearInterval(ent.int);
                    ent.die()
                    Teleport(this.x,this.y)
                }
                return true;
            }
        }
        return false;
    }

    break(abcd){
        this.block = false;
        if(this.tier <= tier && this.amount >0 && abcd == undefined){
            if(this.drop == "self"){
                new CUSTOMITEM(this.amount,true,this.x+Math.floor(getRandom()*100),this.y+Math.floor(getRandom()*100),this);
            }
            else{
                new CUSTOMITEM(this.amount,true,this.x+Math.floor(getRandom()*100),this.y+Math.floor(getRandom()*100),new this.drop());
    
            }
        }
        this.breakExt()
        this.strength = this.backupstrength;
        if(this.length != undefined){
            this.length = this.backuplength;
        }
        new AIR(Math.floor(this.x/300)*300,Math.floor(this.y/300)*300,true,true);
        chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]-1].checkForSupport();
        delete this;
        gravity=true;
        chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]-1)%36].update();
        chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1)%36].update();
    }

    breakExt(){
        //this is for tile entities to extend the break function
    }

    checkForSupport(){
        if(this.isDependent && this.exists){
            if(!(chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]+1].type == "dirt")){
                this.exists = false;
                this.break(true);
            }
        }
    }

    vibrate(){/*doing this to prevent an error which happens for no apperant reason */}

    update(){/*doing this to prevent an error which happens for no apperant reason */}
    
    remove(){
        
    }
}

class MISSING extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.strength = 0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop = undefined;
        this.amount = 0;
    }
}

class BED extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageBed[0]  ;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 169;
        this.width = 300;
        this.collides = true;
        this.type = "wood";
        this.drop;
        this.amount = 1;
        this.y += 131;
        if(this.exists){
            this.exists = new BED2(x+Math.sign(this.x-STEVE.x)*300,y,1,0).exists;
            if(Math.sign(this.x-STEVE.x) == -1){
                this.image = imageBed2[1]
            }
            if(!this.exists){
                this.break(chunklist[this.ChunkNo].array.length-1,1);
            }
        }
        this.clickable = true;
    }

    click(){
        if((daytime > 230 || daytime < 90) && !sleeping){
            console.log("Gotta Shreep");
            var f = STEVE.render;
            STEVE.render = function(){};
            var speedBackup = STEVE.speed;
            var nameBackup = STEVE.name;
            STEVE.speed = 0;
            STEVE.name = "";
            sleeping = true;
            new SLEEPING(this.x-50,this.y-200)
            setTimeout(function(){
                console.log(2);
                STEVE.render = f;
                daytime = 90;
                sleeping = false;
                STEVE.speed = speedBackup;
                STEVE.name = nameBackup;
            },5000);
        }
    }
}

className(BED);

class BED2 extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageBed[1];
        this.strength = 2; if(Math.sign(this.x-STEVE.x) == -1){
            this.image = imageBed2[0]
        }
        this.backupstrength = this.strength;
        this.height = 169;
        this.width = 300;
        this.collides = true;
        this.type = "wood";
        this.drop;
        this.amount = 0;
        this.y += 131;
        this.clickable = true;
    }

    click(){
        if((daytime > 230 || daytime < 90) && !sleeping){
            console.log("Gotta Shreep");
            STEVE.imageR = imageBlank;
            STEVE.imageL = imageBlank;
            var speedBackup = STEVE.speed;
            var nameBackup = STEVE.name;
            STEVE.speed = 0;
            STEVE.name = "";
            sleeping = true;
            new SLEEPING(this.x-50,this.y-200)
            window.setTimeout(function(){
                daytime = 90;
                sleeping = false;
                STEVE.imageR = imagePlayerRight;
                STEVE.imageL = imagePlayerLeft;
                STEVE.speed = speedBackup;
                STEVE.name = nameBackup;
            },5000);
        }
    }
}

className(BED2);

class REDMUSHROOM extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "RED MUSHROOM";
        this.image = imageRedMushroom;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop ;
        this.amount = 1;
        this.age = 1;
        this.isDependent = true;
        this.checkForSupport()
    }
    grow(){
        if(this.age >= 500){
            ShroomGen(this.x, this.y, "r");
        }
    }
}

className(REDMUSHROOM);

class BROWNMUSHROOM extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "BROWN MUSHROOM";
        this.image = imageBrownMushroom;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop ;
        this.amount = 1;
        this.age = 1;
        this.isDependent = true;
        this.checkForSupport()
    }
    grow(){
        if(this.age >= 500){
            ShroomGen(this.x, this.y);
        }
    }
}

className(BROWNMUSHROOM);

class REDMUSHROOMBLOCK extends Block{
    constructor(x, y, block, commanded,natural){
        super(x, y, block, commanded);
        this.name = "RED MUSHROOM BLOCK";
        this.image = imageRedMushroomBlock  ;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.drop;
        if(Math.floor(getRandom()*2)== 0){
            this.drop = REDMUSHROOM;
        }
        this.amount = 1;
        if(natural){
            this.collides = false;
        }
    }
}

className(REDMUSHROOMBLOCK);

class BROWNMUSHROOMBLOCK extends Block{
    constructor(x, y, block, commanded,natural){
        super(x, y, block, commanded);
        this.name = "BROWN MUSHROOM BLOCK";
        this.image = imageBrownMushroomBlock  ;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.drop;
        if(Math.floor(getRandom()*2)== 0){
            this.drop = BROWNMUSHROOM;
        }
        this.amount = 1;
        if(natural){
            this.collides = false;
        }
    }
}

className(BROWNMUSHROOMBLOCK);

class MUSHROOMSTEMBLOCK extends Block{
    constructor(x, y, block, commanded,natural){
        super(x, y, block, commanded);
        this.name = "MUSHROOM STEM BLOCK"
        this.image = imageMushroomStemBlock;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.drop;
        this.amount = 1;
        if(natural){
            this.collides = false;
        }
    }
}

className(MUSHROOMSTEMBLOCK);

class WOOL extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "WOOL (cotton)"
        this.image = imageWool;
        this.strength = 5;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.drop;
        this.amount = 1;
    }
}

className(WOOL);

class TNT extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "The Fun stuff"
        this.image = imageTNT;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.drop;
        this.amount = 1;
        this.clickable = true;
    }

    click(){
        if(Inventory[ss].obj instanceof FLINTANDSTEEL){
            PlaySoundFrom(soundFuse,this.x);
            new FIREPARTICLE(this.x, this.y,300,300);
            setTimeout(() => {
                new FIREPARTICLE(this.x, this.y,300,300);
            }, 1600);
            setTimeout(() => {
                this.break(1);
                new EXPLOSION(this.x, this.y)                     
            }, 3200);
        }
    }
}

className(TNT);

class SAPLING extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOSapling;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop ;
        this.amount = 1;
        this.age = 1;
        this.isDependent = true;
        this.checkForSupport()
    }
    grow(){
        this.age ++;
        if(this.age >= 500){
            TREEGEN(this.x, this.y);
        }
    }
}

className(SAPLING)


class CACTUS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageCactus;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop ;
        this.amount = 1;
        this.length = 2;
        this.backuplength = this.length;
        this.isDependent = true;
        this.checkForSupport();
    }
}

className(CACTUS);

class LEAVES extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOLeaves;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        const r = Math.floor(getRandom() * 5);
        if(r == 4){
            this.drop =  APPLE;
        }
        else if(r > 1){
            this.drop = SAPLING;
        }
        else{
            this.drop = "self";
        }
        this.amount = 1;
        this.transparent = true;
    }
}

className(LEAVES);

class TALLGRASS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "TALL GRASS";
        this.image = imageGrassTall;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.amount = 1;
        if(Math.floor(getRandom() * 2) == 0){
            this.drop;
        }
        else{
            this.amount = 0;
        }
        this.isDependent = true;
        this.checkForSupport()
    }
}

className(TALLGRASS);

class PUMPKIN extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "PUMPKIN";
        this.image = imagePumpkin;
        this.strength = 3;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "";
        this.amount = 1;
        if(this.exists){
            if(chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1) %36] instanceof SNOW&&chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+2) %36] instanceof SNOW){
                setTimeout(() => {
                    this.break(true);
                    chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1) %36].break(true);
                    chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+2) %36].break(true);
                    new SNOWGOLEM(this.x,this.y)
                }, 100);
            }
        }
    }
}

className(PUMPKIN);

class ALLIUM extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageAllium;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 200;
        this.width = 200;
        this.x +=40 + Math.floor(getRandom()*101);
        this.y +=100;
        this.collides = false;
        this.type = "";
        this.amount = 1;
        this.drop;
        this.isDependent = true;
        this.checkForSupport()
    }
}

className(ALLIUM);

class LILYOFTHEVALLEY extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "LILY OF THE VALLEY"
        this.image = imageLilyOfTheValley;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 200;
        this.width = 200;
        this.x +=40 + Math.floor(getRandom()*101);
        this.y +=100;
        this.collides = false;
        this.type = "";
        this.amount = 1;
        this.drop;
        this.isDependent = true;
        this.checkForSupport()
    }
}

className(LILYOFTHEVALLEY);

class OXEYEDAISY extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "OXEYE DAISY"
        this.image = imageOxeyeDaisy;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 200;
        this.width = 200;
        this.x +=40 + Math.floor(getRandom()*101);
        this.y +=100;
        this.collides = false;
        this.type = "";
        this.amount = 1;
        this.drop;
        this.isDependent = true;
        this.checkForSupport()
    }
}

className(OXEYEDAISY);

class ROSE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageRose;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 200;
        this.width = 200;
        this.x +=40 + Math.floor(getRandom()*101);
        this.y +=100;
        this.collides = false;
        this.type = "";
        this.amount = 1;
        this.drop;
        this.isDependent = true;
        this.checkForSupport()
    }
}

className(ROSE);

class SCULKBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK BLOCK";
        this.image = ImageSculkBlock;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "sculk";
        this.amount = 1;
        this.drop;
    }
}
className(SCULKBLOCK);

class SCULKBONE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK BONE";
        this.image = ImageSculkBone;
        this.strength = 7;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "stone";
        this.amount = 1;
        this.drop;
    }
}

className(SCULKBONE);

class SCULKBUD extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK BUD";
        this.image = ImageSculkBlock;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "sculk";
        this.amount = 0;
        this.drop;
        anger = 0;
        if(this.exists){
            this.marker = new MARKER(this.x,this.y,"bud")
        }
    }

    trigger(){
        if(anger > 5+ Math.floor(getRandom()*10)){
            console.log("run");
            anger = -Infinity;
            new DUST(this.x,this.y-1000);
            new DUST(this.x,this.y-1000);
            new DUST(this.x,this.y-1000);
            setTimeout(() => {
                new WARDEN(this.x,this.y-1000);                
            }, 1000);
        }
        anger++;
    }

    breakExt(){
        this.marker.remove();
        this.marker = null;
    }
}

className(SCULKBUD);

class SCULKVEIN extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK VEIN";
        this.image = ImageSculkVein;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "sculk";
        this.amount = Math.floor(getRandom()*3);
        this.drop;
        this.luminant = true;
        this.lightSpread = 5;
        this.transparent = true;
        if(this.exists){
            chunklist[Math.floor(this.x/4800)].lightArray.push(this);
        }
    }
    breakExt(){
        chunklist[Math.floor(this.x/4800)].lightArray.forEach((el,ind) => {
            if(el.x == this.x && el.y == this.y){
                chunklist[Math.floor(this.x/4800)].lightArray.splice(ind,1);
            }
        })
    }
}

className(SCULKVEIN);

class SCULKSHRIEKER extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK SHRIEKER";
        this.image = ImageSculkShrieker;
        this.strength = 17;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "sculk";
        this.amount = 1;
        this.drop;
        if(this.exists){
            this.marker = new MARKER(this.x,this.y,"shrieker")
        }
    }

    shriek(){
        if(!inCooldown){
            inCooldown=true;
            SearchAt(this.x,this.y,true,"bud")
            var intensity = (Math.floor(getRandom()*50)+50);
            for (let i = 0; i < intensity; i++) {
                window.setTimeout(function(){
                    document.getElementById("Vignette").style.opacity = Math.floor((i/100)*100)/100;
                },i*20);
            }
            window.setTimeout(function(){
                for (let i = intensity; i > 0; i--) {
                    window.setTimeout(function(){
                        document.getElementById("Vignette").style.opacity = Math.abs((intensity/100)-( Math.floor((i/100)*100)/100));
                    },i*20);
                }
            },intensity*20*2)
            PlaySound(soundShriek);
            new SOUL(this.x+75,this.y-300);
            var that = this;
            window.setTimeout(function(){
                inCooldown=false;
            },5000)
        }
    }
    
    breakExt(){
        this.marker.remove();
        this.marker = null;
    }
}

className(SCULKSHRIEKER);

class SCULKSENSOR extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SCULK SENSOR";
        this.image = ImageSculkOff;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "sculk";
        this.amount = 1;
        if(this.exists){
            setTimeout(() => {
                this.marker = new MARKER(this.x,this.y,"sensor")                
            }, 500);
        }
        this.inCooldown = false;
    }

    vibrate(x,y){
        if(!this.inCooldown){
            this.inCooldown = true;
            this.image = ImageSculkOn;
            PlaySoundFrom(soundVibe,this.x);
            var that = this;
            SearchAt(this.x,this.y,true,"shrieker");
            setTimeout(() => {
                SearchAt(this.x,this.y,true,"sensor");                
            }, 100);

            window.setTimeout(function(){
                that.image = ImageSculkOff;
                that.inCooldown = false;
                that = null;
                PlaySound(soundVibeOut,7);
            },3500);
        }
    }
    
    breakExt(){
        this.marker.remove();
        this.marker = null;
    }
}

className(SCULKSENSOR);

class FIRE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageFire[7];
        this.images = imageFire;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop = "self";
        this.amount = 0;
        this.num = 0;
        this.increament = 1;
        this.luminant = true;
        this.transparent = true;
        this.lightSpread = 10;
        if(this.exists){
            chunklist[Math.floor(this.x/4800)].lightArray.push(this);
        }
        this.checkForSupport();
    }
    breakExt(){
        chunklist[Math.floor(this.x/4800)].lightArray.forEach((el,ind) => {
            if(el.x == this.x && el.y == this.y){
                chunklist[Math.floor(this.x/4800)].lightArray.splice(ind,1);
            }
        })
    }
    checkForSupport(){
        if(this.exists){
            if(!(chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]+1].transparent != true)){
                this.exists = false;
                this.break(true);
            }
        }
    }

    render(){
        ctx.drawImage(this.images[Math.floor(this.num)], this.x, this.y, this.width, this.height);
        if(this.strength < this.backupstrength && this.strength >= 0){
            ctx.drawImage(BreakArray[Math.floor(this.strength/this.backupstrength*10)], this.x, this.y, this.width, this.height);
        }
        this.num += this.increament;
        
        if(this.num > 31){
            this.num = 0;
        }
    }
    collide(dir){
        var A = STEVE.x + STEVE.width > this.x;
        var B = STEVE.x < this.x + this.width;
        var C = STEVE.y + STEVE.height > this.y;
        var D = STEVE.y < this.y + this.height;

        if(A && B && C && D){
            STEVE.hurt(2);
            STEVE.gravitySpeed = 60;
        }
        return false;
    }
    
    entitycollide(X,Y,ent){
        var A = ent.x + ent.width > this.x;
        var B = ent.x < this.x + this.width;
        var C = ent.y + ent.height > this.y;
        var D = ent.y < this.y + this.height;

        if(A && B && C && D){
            ent.hurt(2);
            if((ent instanceof PROJECTILE)){ 
                ent.y -= ent.height;
                ent.damage = 0;
                window.clearInterval(ent.int);
                setTimeout(() => {
                    ent.die()
                }, ent.time);
            }
            if(ent instanceof ENDERPEARL2){
                window.clearInterval(ent.int);
                ent.die()
                Teleport(this.x,this.y)
            }
        }
        return false;
    }
}

className(FIRE);

class AIR extends Block{
    constructor(x, y, block, commanded,sa){
        super(x, y, block, commanded,true,sa);
        this.image = imageBlank;
        this.strength = 0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.amount = 0;
        this.drop;
        this.luminant = false;
        this.transparent = true;
    }
    render(){}
}

var flowers = [ALLIUM, LILYOFTHEVALLEY, OXEYEDAISY, ROSE];
var lArray = [];

function SearchAt(x,y,np,filter){
    if(STEVE.sneaking == false|| np){
        for (let i = 0; i < markerArray.length; i++) {
            const marker = markerArray[i];
            if(filter=="sensor"){
                entityArray.forEach(el=>{
                    if(el instanceof WARDEN && Math.abs(el.x-STEVE.x) < SculkDetectionRange *2){
                        el.LastHeardAt = [x,y];
                        PlaySoundFrom(soundVibe,el.x)
                        el.heartbeatstack(60+(Math.floor(2*getRandom())*10));
                    }
                }) 
            }
            if(((Math.abs(marker.x-x)<=SculkDetectionRange && Math.abs(marker.y-y)<=SculkDetectionRange) || filter == "bud") && marker instanceof MARKER){
                if(marker.class == "sensor"&&filter=="sensor"){
                    chunklist[Math.floor(marker.x/4800)].array[Math.abs((Math.floor(marker.x/4800)*16) - Math.floor(marker.x/300))][Math.floor(marker.y/300)+13].vibrate(x,y);
                }
                else if(marker.class == "shrieker"&&filter=="shrieker"){
                    chunklist[Math.floor(marker.x/4800)].array[Math.abs((Math.floor(marker.x/4800)*16) - Math.floor(marker.x/300))][Math.floor(marker.y/300)+13].shriek();
                }
                else if(marker.class == "bud"&&filter=="bud"){
                    chunklist[Math.floor(marker.x/4800)].array[Math.abs((Math.floor(marker.x/4800)*16) - Math.floor(marker.x/300))][Math.floor(marker.y/300)+13].trigger();
                }
            }
        }
    }
}

function lightUpdate(obj,r){
    if(r == undefined){
        for (let I = -obj.lightSpread; I <= obj.lightSpread; I++) {
            for (let i = -obj.lightSpread; i <= obj.lightSpread; i++) {
                var obj2 = chunklist[Math.lower(Math.floor(((obj.x/300)+i)/16))].array[Math.abs(obj.pos[0]+i)%16][Math.lower(obj.pos[1]+I)%36];
                if(0 < 10 -Math.abs(i)- Math.abs(I) && obj2.lightLevel < 10 - Math.abs(i)- Math.abs(I)){
                    obj2.lightLevel = 10 - Math.abs(i)- Math.abs(I);
                }
                obj2.tint = blendColors(obj2.tint,obj.colour, (10-Math.abs(i)-Math.abs(I))/10 );
            }
        }
    }
    else{
        for (let I = -obj.lightSpread; I <= obj.lightSpread; I++) {
            for (let i = -obj.lightSpread; i <= obj.lightSpread; i++) {
                if(0 < 10 -Math.abs(i)- Math.abs(I)){
                    var obj2 = chunklist[Math.lower(Math.floor(((obj.x/300)+i)/16))].array[Math.abs(obj.pos[0]+i)%16][Math.lower(obj.pos[1]+I)%36];
                    if(obj2.lightLevel <= 10 -Math.abs(i)- Math.abs(I)){
                        obj2.lightLevel = 0;
                    }
                    obj2.tint = "000000";
                }
            }
        }
    }
    obj.tint = obj.colour;
}//doesnt werk

function blendColors(colorA, colorB,amount) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return r + g + b;
}

function dayLight(n){   
    var blockCount= 0;
    for (let I = 0; I < 16; I++) {
        for (let i = 0; i < chunklist[n].array[I].length; i++) {
            const el = chunklist[n].array[I][i];
            el.lightLevel = 0;
            if(!el.transparent){
                blockCount ++;
                el.lightLevel = ((5 * (1-Math.floor(daytime/180))) + 5 )-(1.5*blockCount);
                if(blockCount == 5){
                    i = 36;
                    blockCount = 0;
                }
            }
            else{
                el.lightLevel = ((5 * (1-Math.floor(daytime/180))) + 5 );  
            }
        }
    }
}

//return (45+((n-45)/2))/(90-n);
// var adjS = Math.floor( (i-iStore)/tan(daytime));
/*
function dayLight(n){
    var blockCount= 0;
    for (let I = 0; I < 16; I++) {
        var traceShadow = undefined;
        var traceShadowN = undefined;
        for (let i = 0; i < chunklist[n].array[I].length; i++) {
            const el = chunklist[n].array[I][i];
            if(!el.transparent && !(el instanceof NATURALLOG) ){
                blockCount ++;

                if (blockCount == 1) {
                    traceShadow = el;
                    traceShadowN = i;
                }

                if (blockCount == 2 && traceShadow.name == "BRICKS") {
                    var adjS = Math.floor( (i-traceShadowN)/tan(daytime));
                    console.log(adjS);
                    chunklist[Math.lower(n + Math.floor((I-adjS)/16))].array[(16 + (I-adjS))%16].forEach(el =>{
                        el.lightLevel = 0;
                    })
                }

                if(blockCount == 10){
                    i = 36;//go next x
                    blockCount = 0;//reset for next x
                }
            }
        }
    }
}
*/