"use strict";
var gravitySpeed2 = 60;

class LIQUIDS extends Block{
    constructor(x,y,block,commanded){
        super(x,y,block,commanded);
    }
}

class WATER extends LIQUIDS{
    constructor(x, y, block, commanded,dir){
        super(x, y, block, commanded);
        this.image = imageWater;
        this.strength = 1/0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop;
        this.amount = 1;
        this.clickable = true;
        this.dir = dir;
        this.transparent = true;
        var that = this;
        if(this.exists){
            window.setTimeout(() => {
                that.update();
                that = null;
            }, 300);
        }
        if(this.dir == "right"){
            this.image = imageWaterLeft;
        }
        else if(this.dir == "left"){
            this.image = imageWaterRight;
        }
    }
 
    click(){
        if(Inventory[ss].obj instanceof BUCKET){
            Inventory[ss].value--;
            if(Inventory[ss].value <= 0){
                Inventory[ss].obj = undefined;
            }
            findSlot(new WATERBUCKET(0,0,0,0,0,0));
            UpdateHotBar();
        }
    }

    collide(){
        var A = STEVE.x + STEVE.width > this.x;
        var B = STEVE.x < this.x + this.width;
        var C = STEVE.y + STEVE.height > this.y;
        var D = STEVE.y < this.y + this.height;

        if(A && B && C && D){
            STEVE.GravityDamageSumUp = 0;
            STEVE.gravitySpeed = gravitySpeed2/4;
        }
        else{
            return false;
        }
    }
    entitycollide(x,y,ent){
        var A = ent.x + ent.width > this.x;
        var B = ent.x < this.x + this.width;
        var C = ent.y + ent.height > this.y;
        var D = ent.y < this.y + this.height;

        if(A && B && C && D){
            ent.GravityDamageSumUp = 0;
            ent.gravitySpeed = ent.swimSpeed;
            if(ent instanceof PROJECTILE){
                ent.speed /= 1.05;
            }
        }
        else{
            return false;
        }
    }

    update(){
        if(this.dir == true){
            if(chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1)%36].constructor.name != "AIR"){
                (new WATER(this.x+300,this.y,true,false,"still"));
                (new WATER(this.x-300,this.y,true,false,"still"));
            }
            (64);
        }
        else if(this.dir == "still"){
            (new WATER(this.x+300,this.y,true,false,"right"));
            (new WATER(this.x-300,this.y,true,false,"left"));
        }
        else if(this.dir == "down"){
            if(!(chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1)%36] instanceof AIR|| chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1)%36] instanceof LIQUIDS) && (chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]-1)%36].dir != "left" || chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]-1)%36].dir != "right")){
                this.dir = true;
                (new WATER(this.x-300,this.y,true,false,"left")); 
                (new WATER(this.x+300,this.y,true,false,"right"));
                this.update();
            }
        }
        (new WATER(this.x,this.y+300,true,false,"down"));
    }
}

class LAVA extends LIQUIDS{
    constructor(x, y, block, commanded,dir){
        super(x, y, block, commanded);
        this.image = imageLava;
        this.strength = 1/0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "";
        this.drop;
        this.amount = 1;
        this.clickable = true;
        this.dir = dir;
        var that = this;
        if(this.exists){
            window.setTimeout(() => {
                that.update();
                that = null;
            }, 700);
        }
        if(this.dir == "right"){
            this.image = imageLavaLeft;
        }
        else if(this.dir == "left"){
            this.image = imageLavaRight;
        }
    }
 
    click(){
        if(Inventory[ss].obj instanceof BUCKET){
            Inventory[ss].value--;
            if(Inventory[ss].value <= 0){
                Inventory[ss].obj = undefined;
            }
            findSlot(new LAVABUCKET(0,0,0,0,0,0));
            UpdateHotBar();
        }
    }

    collide(){
        var A = STEVE.x + STEVE.width > this.x;
        var B = STEVE.x < this.x + this.width;
        var C = STEVE.y + STEVE.height > this.y;
        var D = STEVE.y < this.y + this.height;

        if(A && B && C && D){
            STEVE.GravityDamageSumUp = 0;
            STEVE.gravitySpeed = gravitySpeed2/5;
        }
        else{
            return false;
        }
        STEVE.hurt(4)        
    }
    
    entitycollide(x,y,ent){
        var A = ent.x + ent.width > this.x;
        var B = ent.x < this.x + this.width;
        var C = ent.y + ent.height > this.y;
        var D = ent.y < this.y + this.height;

        if(A && B && C && D){
            ent.GravityDamageSumUp = 0;
            ent.gravitySpeed = ent.swimSpeed;
            if(ent instanceof PROJECTILE){
                ent.speed /= 1.05;
            }
        }
        else{
            return false;
        }
        ent.hurt(4)        
    }

    update(){
        if(this.dir == true){
            if(chunklist[this.ChunkNo].array[this.pos[0]%16][(this.pos[1]+1)%36].constructor.name != "AIR"){
                new LAVA(this.x+300,this.y,true,false,"still");
                new LAVA(this.x-300,this.y,true,false,"still");
            }
        }
        else if(this.dir == "still"){
            new LAVA(this.x+300,this.y,true,false,"right");
            new LAVA(this.x-300,this.y,true,false,"left");
        }
        else if(this.dir == "down"){
            if(!(chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]+1] instanceof AIR
                || chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]+1] instanceof LIQUIDS) 
                && (chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]-1].dir != "left"
                || chunklist[this.ChunkNo].array[this.pos[0]%16][this.pos[1]-1].dir != "right")){
                this.dir = true;
                new LAVA(this.x-300,this.y,true,false,"left"); 
                new LAVA(this.x+300,this.y,true,false,"right");
                this.update();
            }
        }
        new LAVA(this.x,this.y+300,true,false,"down");
    }
}

class WATERBUCKET extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "WATER BUCKET";
        this.image = imageWaterBucket;
        this.Consumable = false;
        this.stackAmount = 1;
    }
    consume(x,y){
        var b =new WATER(PlaceFormula1(x),PlaceFormula1(y),true,false,true)
        PlaySound(soundWater);
        if(b.exists){
            Inventory[ss].obj = new VOID();
            Inventory[ss].obj = new BUCKET();    
        }return b.exists;
    }
}

class LAVABUCKET extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "LAVA BUCKET";
        this.image = imageLavaBucket;
        this.Consumable = false;
        this.stackAmount = 1;
    }
    consume(x,y){
        var b =new LAVA(PlaceFormula1(x),PlaceFormula1(y),true,false,true)
        PlaySound(soundFire);
        if(b.exists){

            Inventory[ss].obj = new VOID();
            Inventory[ss].obj = new BUCKET();
        }
        return b.exists;
    }
}

className(WATER);
className(LAVA);
className(WATERBUCKET);
className(LAVABUCKET);