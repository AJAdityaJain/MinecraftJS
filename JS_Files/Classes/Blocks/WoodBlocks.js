class LOG extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOLog;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "wood";
        this.drop ;
        this.amount = 1;
        this.isFuel = 10000;
    }
}

class NATURALLOG extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOLog;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "wood";
        this.drop = LOG;
        this.amount = 1;
        this.transparent = true;
    }
}

class TORCH extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageTorch;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "wood";
        this.amount = 1;
        this.luminant = true;
        this.lightSpread = 10;
        this.colour = "000000";
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

class CAMPFIRE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imagesCampfire[0];
        this.images = imagesCampfire;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "wood";
        this.drop = "self";
        this.amount = 1;
        this.num = 0;
        this.increament = 0.2;
    }

    render(){
        ctx.drawImage(this.images[Math.floor(this.num)], this.x, this.y, this.width, this.height);
        if(this.strength < this.backupstrength && this.strength >= 0){
            ctx.drawImage(BreakArray[Math.floor(this.strength/this.backupstrength*10)], this.x, this.y, this.width, this.height);
        }
        this.num += this.increament;
        
        if(this.num > 4){
            this.num = 0;
        }
    }
}

class PLANKS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOPlanks;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "wood";
        this.drop;
        this.amount = 1;
        this.isFuel = 5000;
    }
}

class CHEST extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageChest;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.collides = true;
        this.type = "wood";
        this.clickable = true;
        this.drop;
        this.amount = 1;
        this.isFuel = 15000;
        this.array = [];
        for (let i = 0; i < 30; i++) {
            this.array.push(new CHESTSLOT(i));
        }
        this.selected = 0;
    }

    click(){
        UIName = "STORAGE";
        INVENTORYUI(69, this);
    }

    breakExt(){
        for (let i = 0; i < this.array.length; i++) {
            const el = this.array[i];
            if(!(el.obj instanceof VOID)){
                new CUSTOMITEM(el.value,true, this.x+Math.floor(getRandom()*100),this.y+Math.floor(getRandom()*100), el.obj); 
            }
        }
    }
}

class LADDERS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageLadders;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = !true;
        this.type = "wood";
        this.drop;
        this.amount = 1;
        this.isFuel = 3000;
    }

    collide(){
        var A = STEVE.x + STEVE.width > this.x;
        var B = STEVE.x < this.x + this.width;
        var C = STEVE.y + STEVE.height > this.y;
        var D = STEVE.y < this.y + this.height;

        if(A && B && C && D){
            onLadder = true;
            STEVE.GravityDamageSumUp = 0;
        }
        else{
            return false;
        }
    }
}

class FENCES extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDOPlanks;
        this.strength = woodStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 100;
        this.collides = true;
        this.type = "wood";
        this.drop;
        this.amount = 1;
        this.isFuel = 5000;
        this.x += 100;
        this.bars = false;
        setTimeout(() => {
            if(this.exists){
                var A = chunklist[this.ChunkNo].array[(this.pos[0]+1)%16][this.pos[1]] instanceof AIR;
                var B = chunklist[this.ChunkNo].array[(this.pos[0]-1)%16][this.pos[1]] instanceof AIR;
                if(A == false || B == false){
                    this.bars = true;
                }
                if(!A && chunklist[this.ChunkNo].array[(this.pos[0]+1)%16][this.pos[1]] instanceof FENCES){
                    chunklist[this.ChunkNo].array[(this.pos[0]+1)%16][this.pos[1]].bars = true
                }
                if(!B && chunklist[this.ChunkNo].array[(this.pos[0]-1)%16][this.pos[1]] instanceof FENCES){
                    chunklist[this.ChunkNo].array[(this.pos[0]-1)%16][this.pos[1]].bars = true
                }
            }
        }, 500);
    }

    render(){
        this.quasiRender();
        if(this.bars){
            ctx.drawImage(this.image, 0, 0,16,3,PlaceFormula1(this.x),this.y+75 ,300,50);
            ctx.drawImage(this.image, 0, 0,16,3,PlaceFormula1(this.x),this.y+150 ,300,50);    
        }
    }

    collide(dir){
        if(this.collides){
            var A = STEVE.x + STEVE.width > this.x;
            var B = STEVE.x < this.x + this.width;
            var C = STEVE.y + STEVE.height > this.y-150;
            var D = STEVE.y < this.y + this.height;

            if(A && B && C && D){
                var DiffY2 =Math.abs(this.y-150 - (STEVE.y + STEVE.height));
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
}

className(FENCES);
className(LADDERS);
className(CHEST);
className(PLANKS);
className(CAMPFIRE);
className(TORCH);
className(NATURALLOG);
className(LOG);