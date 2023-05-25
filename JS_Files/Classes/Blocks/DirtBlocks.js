
class DIRT extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDirt;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop ;
        this.amount = 1;
    }
    
    grow(){
        if(chunklist[this.ChunkNo].array[this.pos[0]%16][Math.abs(this.pos[1]-1)] instanceof AIR){
            if(chunklist[this.ChunkNo].biome instanceof MUSHROOM){
                new MYCELIUM(this.x,this.y,true,true).lightLevel = this.lightLevel;

            }
            else{
                new GRASS(this.x,this.y,true,true).lightLevel = this.lightLevel;
            }
        }
    }
}

class MYCELIUM extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageMycelium;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop ;
        this.amount = 1;
    }
}

class GRASS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGrass;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop = DIRT;
        this.amount = 1;
        if(this.commanded == true){
            if(Math.floor(getRandomForTerrainGen()*9) == 0){
                new flowers[Math.floor(getRandomForTerrainGen()*flowers.length)](this.x, this.y-300,1,0);
            }
            else {
                if(Math.floor(getRandomForTerrainGen()*5) == 0){
                    new TALLGRASS(this.x, this.y-300,1,0);
                }
            }
            // chunklist[Math.floor(this.x/4800)].lightArray.forEach(el => lightUpdate(el))
        }
    }
}

class SAND extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageSand;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop;
        this.amount = 1;
    }
    update(){
        if(new SAND(this.x,this.y+300,1,0).exists == true){
            // chunklist[Math.floor(this.x/4800)].lightArray.forEach(el => lightUpdate(el))
            this.image = imageBlank;
            setTimeout(() => {
                this.break(true);                
            }, 100);
        }
    }
}

class REDSAND extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "RED SAND";
        this.image = imageRedSand;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop;
        this.amount = 1;
    }
    
    update(){
        if(new REDSAND(this.x,this.y+300,1,0).exists == true){
            // chunklist[Math.floor(this.x/4800)].lightArray.forEach(el => lightUpdate(el))
            this.image = imageBlank;
            setTimeout(() => {
                this.break(true);                
            }, 100);
        }
    }
}

class GRAVEL extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGravel;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop;
        if(Math.floor(getRandom()*3) == 0){
            this.drop = FLINT;
        }
        this.amount = 1;
    }
    
    update(){
        if(new GRAVEL(this.x,this.y+300,1,0).exists == true){
            // chunklist[Math.floor(this.x/4800)].lightArray.forEach(el => lightUpdate(el))
            this.image = imageBlank;
            setTimeout(() => {
                this.break(true);                
            }, 100);
        }
    }
}

class CLAY extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageClay;
        this.strength = dirtStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.drop =  CLAYBALL;
        this.amount = 4;
    }
}

class SNOW extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageSnow;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "dirt";
        this.amount = 1;
    }
}

className(DIRT);
className(MYCELIUM);
className(GRASS);
className(SAND);
className(REDSAND);
className(GRAVEL);
className(CLAY);
className(SNOW);