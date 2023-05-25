'use strict';
var chunklist = [];
var chunksSize = 16;
var playerChunkNo = 0;
var elevation = 0;
var flatness = 1;
var biome = [];
var chunkNum = 0;
var noRepeatBiome;
var biomePos = new String(params.get("biomes"));
if(biomePos instanceof String){
    biomePos = biomePos.split(",");
}
if(biomePos[0] == "null"){
    biomePos = [];
}
function air1(X){
    var arr = [];
    for (let i = 0; i < 36; i++) {
        arr.push(new AIR(X,(i*300)-3900,1,0,true));
    }
    return arr;
} 

function air(start){
    var arr = [];
    for (let i = 0; i < 16; i++) {
        arr.push(air1(start + (i*300)))
    }
    return arr;
}

class TERRAIN{
    constructor(){
        this.start = 5*300
        this.depth = 22*300;

        this.coal = 24;
        this.iron = 36;
        this.gold = 54;
        this.diamonds = 56;

        this.gd = this.depth - (0.3 * this.depth);
        this.dd = this.depth - (0.2 * this.depth);
        
        this.oreVeinSize = 3;
        this.blobNum = 0;
    }

    terrainLayoutMap(changeAmount,limit,curvy,dir){
        changeAmount++;
        var RaisedReliefMapArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < RaisedReliefMapArray.length; i++) {
            RaisedReliefMapArray[i] = elevation;
            if(Math.floor(getRandomForTerrainGen()* flatness) == 0){
                if((i <chunksSize/4 || curvy) && dir != -1){
                    elevation += Math.floor(getRandomForTerrainGen()*changeAmount);
                }
                if((i >= (chunksSize*3)/4 || curvy) && dir != 1){
                    elevation -= Math.floor(getRandomForTerrainGen()*changeAmount);
                }            
            }
            if(elevation > limit){
                if(curvy){
                    dir = -1;
                }
                if(Math.abs(elevation-limit) > 3){
                    elevation-=1+Math.floor(getRandomForTerrainGen()*3);
                }
                else{
                    elevation = limit;
                }
            }
            if(elevation < 0){
                if(curvy){
                    dir = 1;
                }
                elevation = 0;
            }
        }
        // disp(RaisedReliefMapArray)
        return RaisedReliefMapArray;
    }

    terrain(start,changeAmount,limit,curvy,l1,l2,foliageDensity,foliage,dir){
        var RaisedReliefMapArray = this.terrainLayoutMap(changeAmount,limit,curvy,dir);
        var treeNum = Math.floor(getRandomForTerrainGen()*foliageDensity) + 1;
        RaisedReliefMapArray.forEach((y,x) => {
            new l1(start + (x*300), (-y*300)+1200, 1,1);
            treeNum--;
            if(treeNum == 0){
                treeNum = Math.floor(getRandomForTerrainGen()*foliageDensity) + 2;
                new foliage[Math.floor(foliage.length*getRandomForTerrainGen())](start + (x*300), (-y*300)+900, 1,1);
            }
            new l2(start + (x*300), (-y*300)+1500, 1,1);
            if(Math.floor(getRandomForTerrainGen()*2) == 0){
                new l2(start + (x*300), (-y*300)+1800, 1,1);
            }
            for (let i = 0; i < 16 + Math.abs(y); i++) {
                new STONE(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
            }
        });
        for (let x= 0; x< chunksSize;x++) {
            new BEDROCK(start + (x*300), (this.depth), 1,1);
        }
    }

    distributeBiomes(){
        var chunk = chunklist[chunklist.length-1];
        var temp = [];
        var location = 0;

        biome.forEach(el =>{
            temp.push(el.temp);
        })
        temp.sort(function(a, b){return a - b});
        temp.forEach((el,ind)=>{
            if(chunk.biome.temp == el){
                location = ind;
            }
        });
        var biomes1 = biome[location + Math.floor(getRandomForTerrainGen()*5) -3 ];
        if(biomes1 == undefined){
            biomes1 = biome[location +4]
        }
        if(biomes1 == undefined){
            biomes1 = biome[location -4]
        }
        return biomes1;
    }

    oreDistribution(tr){
        for (let i = 0; i < chunksSize - this.oreVeinSize+1; i++) {
            for (let y = this.start + 900; y <  this.depth; y += 300){
                if(y/300 > 13 || !(chunklist[tr/4800].biome instanceof NETHER)){
                    if(Math.floor(getRandomForTerrainGen()*this.coal)+1 == this.coal){
                        this.coalVein(tr + (i*300), y, true, true);
                    }
                    if(Math.floor(getRandomForTerrainGen()*this.iron)+1 == this.iron){
                        this.ironVein(tr + (i*300), y, true, true);
                    }
                    if(y > this.gd){
                        if(Math.floor(getRandomForTerrainGen()*this.gold)+1 == this.gold){
                            this.goldVein(tr + (i*300), y, true, true);
                        }
                    }
                    if(y > this.dd){
                        if(Math.floor(getRandomForTerrainGen()*this.diamonds)+1 == this.diamonds){
                            this.diamondVein(tr + (i*300), y, true, true);
                        }
                    }
                }
                else{
                    if(Math.floor(getRandomForTerrainGen()*this.coal)+4  == this.coal){
                        this.quartzVein(tr + (i*300), y, true, true);
                    }
                    if(Math.floor(getRandomForTerrainGen()*this.iron)+1 == this.iron){
                        this.nethergoldVein(tr + (i*300), y, true, true);
                    }
                }
            }            
        }
        new CAVE(tr,0).Spawn();
        if(chunklist[Math.floor(tr/4800)].biome instanceof NETHER){
            new POND(tr,0).Spawn(LAVA);
        }
        else{
        new POND(tr,0).Spawn();
        }
    }

    coalVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORECOAL(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORECOAL(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORECOAL(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORECOAL(x+300, y-300, true, true);
        }
    }

    ironVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREIRON(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREIRON(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREIRON(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREIRON(x+300, y-300, true, true);
        }
    }

    quartzVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREQUARTZ(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREQUARTZ(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREQUARTZ(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREQUARTZ(x+300, y-300, true, true);
        }
    }

    goldVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREGOLD(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREGOLD(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREGOLD(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREGOLD(x+300, y-300, true, true);
        }
    }

    nethergoldVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORENETHERGOLD(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORENETHERGOLD(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORENETHERGOLD(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new ORENETHERGOLD(x+300, y-300, true, true);
        }
    }

    diamondVein(x, y){
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREDIAMOND(x, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREDIAMOND(x+300, y, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREDIAMOND(x, y-300, true, true);
        }
        if(Math.floor(getRandomForTerrainGen()*this.oreVeinSize)+1 == this.oreVeinSize){
            new OREDIAMOND(x+300, y-300, true, true);
        }
    }

    igneousRocks(tr){
        for (let x = 0; x < chunksSize-2; x++) {
            for (let y = this.start + 900; y <  this.depth; y += 300){
                var size = Math.floor(getRandomForTerrainGen()*3)+1==3;
                if(Math.floor(getRandomForTerrainGen()*18)+1==18){
                    this.blob(tr + x*300, y, size, this.blobType());
                }
            }            
        }
    }

    blobType(){
        var blob;
        if(this.blobNum==0){
            blob=ANDESITE;
        }
        if(this.blobNum==1){
            blob=DIORITE;
        }
        if(this.blobNum==2){
            blob=GRANITE;
        }
        if(this.blobNum==3){
            blob=CLAY;
        }
        this.blobNum = (this.blobNum+1)%4;
        return blob;
    }

    blob(x,y,large, c){
        if(!large){
            new c(x+300,y,true,true);
            new c(x+300,y-300,true,true);
            new c(x+300,y-600,true,true);
            new c(x+600,y-300,true,true);
            new c(x,y-300,true,true);
        }
        else{
            new c(x+300,y,true,true);
            new c(x,y-300,true,true);   
            new c(x+600,y,true,true);
            new c(x,y-600,true,true);   

            new c(x+300,y-300,true,true);
            new c(x+600,y-600,true,true);

            new c(x+900,y-600,true,true);
            new c(x+600,y-900,true,true);
            new c(x+300,y-600,true,true);
            new c(x+600,y-300,true,true);  
            new c(x+300,y-900,true,true);
            new c(x+900,y-300,true,true);  
        }
    }
}

class CHUNK{
    constructor(biome){
        this.biome = biome;
        this.array = [];
        this.lightArray = [];
    }
}

var TerrainGenerator = new TERRAIN();

class BIOME{
    constructor(){
        this.temp = 0;
        this.num = biome.length;
        this.mobs = [[],[]]
    }

    createTerrain(start){   }
}

class PLAINS extends BIOME{
    constructor(){
        super();
        this.temp = 16;
        this.mobs = [passive,aggressive];
        this.mobsW = [passiveW,aggressiveW];
        biome.push(this);
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,1,2,true,GRASS,DIRT,16,[SAPLING]);
        new HOUSE(start,0).Spawn();
    }
}

class FOREST extends BIOME{
    constructor(){
        super();
        this.temp = 10;
        biome.push(this);
        this.mobs = [passive,aggressive];
        this.mobsW = [passiveW,aggressiveW];
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,1,5,true,GRASS,DIRT,5,[SAPLING]);
        new HOUSE(start,0).Spawn();
    }
}

class MOUNTAINS extends BIOME{
    constructor(){
        super();
        this.temp = 0;
        biome.push(this);
        this.mobs = [[GOAT,SNOWGOLEM],aggressive];
        this.mobsW = [[7,1],aggressiveW];
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,2,10,true,SNOW,DIRT,16,[PUMPKIN],1);
    }
}

class MUSHROOM extends BIOME{
    constructor(){
        super();
        this.temp = 15;
        biome.push(this);
        this.mobs = [[MOOSHROOM],[]];
        this.mobsW = [[1],[]]
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,1,2,true,MYCELIUM,DIRT,7,[REDMUSHROOM,BROWNMUSHROOM]);
    }
}

class DESERT extends BIOME{
    constructor(){
        super();
        this.temp = 40;
        biome.push(this);
        this.mobs = [[],[HUSK,SKELETON,CREEPER]];
        this.mobsW = [[],[5,3,2]];
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,1,2,true,SAND,TERRACOTTAYELLOW,6,[CACTUS]);
        new PYRAMID(start,0).Spawn();
    }

}

class MESA extends BIOME{
    constructor(){
        super();
        this.temp = 50;
        biome.push(this);
        this.mobs = [[],[HUSK,SKELETON,CREEPER]];
        this.mobsW = [[],[5,3,2]];
    }

    createTerrain(start){
        TerrainGenerator.terrain(start,1,2,true,REDSAND,TERRACOTTA,6,[CACTUS]);
        new MESASTRUCT(start,0).Spawn();
    }

}

class NETHER extends BIOME{
    constructor(){
        super();
        this.temp = 100;
        this.mobs = [[PIGLIN,BLAZE],[PIGLIN]];
        this.mobs = [[2,1],[1]]
        biome.push(this);
    }

    f(f, a,b,c,d){
        if(f.name != "LAVA"){
            b -= 1800;
            new f(a,b-4500+2400,c,d,true);
            new f(a + (300*(1-Math.floor(getRandomForTerrainGen()*3))),b-4200+2400,c,d,true);
            new f(a,b-3900+2400,c,d,true);
            
            new f(a-300,-300+b-4500+2400,c,d,true);
            new f(a-300 + (300*(1-Math.floor(getRandomForTerrainGen()*3))),-300+b-4200+2400,c,d,true);
            new f(a-300,-300+b-3900+2400,c,d,true);
        }else{
            b -= 300;
            new f(a,b-3900,c,d,true);
            for (let i = 0; i < 12; i++) {
                new AIR(a,b+300-3900 + (i*300),c,d)
                new AIR(a,b+300-3900 + (i*300),c,d)
                new AIR(a,b+300-3900 + (i*300),c,d)
                new AIR(a,b+300-3900 + (i*300),c,d)    
            }
            new AIR(a+300,b+300-3900 + (11*  300),c,d)    
            new AIR(a-300,b+300-3900 + (11*300),c,d)    
        }       
    }

    createTerrain(start){
        // TerrainGenerator.terrain(start,1,5,true,NETHERRACK, NETHERRACK,0,[]);
        var RaisedReliefMapArray = TerrainGenerator.terrainLayoutMap(1,5,true);
        var foliage = [GLOWSTONE,QUARTZBLOCK, LAVA]
        var treeNum = Math.floor(getRandomForTerrainGen()*6)+1;
        RaisedReliefMapArray.forEach((y,x) => {
            
            new NETHERRACK(start + (x*300), (-y*300)+1200, 1,1);
            new NETHERRACK(start + (x*300), (-y*300)+1500, 1,1);
            new NETHERRACK(start + (x*300), Math.floor((y*150)/300)*300-3600,true,true);
            new NETHERRACK(start + (x*300), Math.floor((y*150)/300)*300-3900,true,true);
            new NETHERRACK(start + (x*300), Math.floor((y*150)/300)*300-3300,true,true);
            new NETHERRACK(start + (x*300), Math.floor((y*150)/300)*300-4200,true,true);
            new NETHERRACK(x*300 + start, -3900,true,true);
            for (let i = 0; i < 16 + Math.abs(y); i++) {
                if(i < 8 ){
                    var distans = (1+x-8);
                    if(Math.sign(distans) != 1){
                        distans --;
                    }
                    if (Math.abs(distans)<= 5){
                        new NETHERRACK(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                    }
                    else {
                        if(Math.floor(getRandomForTerrainGen()*Math.round(Math.abs(distans)/4  + 0.1) ) == 0){
                            if(Math.floor(getRandomForTerrainGen()*4) == 0){
                                if(Math.floor(getRandomForTerrainGen()*2) == 0){
                                    TerrainGenerator.nethergoldVein(start + (x*300), (-y*300)+1800 + (i*300));
                                }
                                else{
                                    TerrainGenerator.quartzVein(start + (x*300), (-y*300)+1800 + (i*300));
                                }
                            }
                            new NETHERRACK(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                        }
                        else{
                            if(Math.floor(getRandomForTerrainGen()*6) == 0){
                                TerrainGenerator.diamondVein(start + (x*300), (-y*300)+1800 + (i*300));
                            }
                            new STONE(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                        }
                    }
                }
                else if(i > 11){
                    new STONE(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                }
                else{
                    if(Math.floor(getRandomForTerrainGen()*2) == 0){
                        new NETHERRACK(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                    }
                    else{
                        new STONE(start + (x*300), (-y*300)+1800 + (i*300), 1,0);
                    }
                }
                }
                
        });
        RaisedReliefMapArray.forEach((y,x) => {
            treeNum--;
            if(treeNum == 0){
                treeNum = Math.floor(getRandomForTerrainGen()*6)+2 ;
                var f = foliage[Math.floor(foliage.length*getRandomForTerrainGen())];
                this.f( f,start + (x*300), 600+(-y*300)+900, 1,1);
            }
        });
        for (let x= 0; x< chunksSize;x++) {
            new BEDROCK(start + (x*300), (TerrainGenerator.depth), 1,1);
        }
    }
}




class STRUCTURE{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.ruined = false;
        this.onsurface = true;
    }
    
    Spawn(l){
        var x = this.x;
        if(!(Math.floor(getRandomForTerrainGen()*100) < this.noSpawn)){
            var am = Math.floor(getRandomForTerrainGen()*(Math.abs(this.minmax[0] - this.minmax[1])+1))+this.minmax[0];
            for (let i = 0; i < am; i++) {

                var x2 = this.x+ this.width + (Math.floor((getRandomForTerrainGen()*2))+1)*300;
                if(this.onsurface){
                    for (let i = 0; i < chunklist[Math.floor(this.x/4800)].array[(this.x/300)%16].length; i++) {
                        const el = chunklist[Math.floor(this.x/4800)].array[(this.x/300)%16][i];
                        if(el.collides){
                            i = 36
                            this.y = el.y;
                        }    
                    }
                }
                else{
                    this.y = (Math.floor(getRandomForTerrainGen()*17)*300)+1500;
                }
                if(Math.abs(x-x2) > 4800+this.width ){
                    i = am+1;
                }
                else{
                    this.create(l)
                }
                if(this.onsurface){
                    this.x = x2;
                }
                else{
                    this.x =(300* Math.floor(getRandomForTerrainGen()*(16 ))) +(4800 * Math.floor(this.x/4800));
                }
            }
        }
    }

    Random(){
        var returnVal = true;
        if(this.ruined){
            returnVal = Math.floor(getRandomForTerrainGen()*4)!=0;
        }
        return returnVal;
    }

    create(){

    }

    base(b,x, y,width){
        var wc = true;
        var I = 0;
        while(wc){
            wc = false;
            for (let i = 0; i < width; i++) {
                var ex = new b(x+ (i*300),y+(I*300),true,false).exists;
                if(ex){
                    wc = true;
                }
            }
            I++;
        }
    }
}

class HOUSE extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.noSpawn = 75;
        this.minmax = [1,1];
        this.width = 2100;
        this.x += Math.floor(getRandomForTerrainGen() *(16/this.minmax[1]))*300;
        this.onsurface = true;
    }

    create(){
        new LOG(this.x,this.y-1200,this.Random(),true);
        new LOG(this.x+300,this.y-300-1200,this.Random(),true);
        new LOG(this.x+600,this.y-600-1200,this.Random(),true);
        new LOG(this.x+900,this.y-900-1200,this.Random(),true);
        new LOG(this.x+1200,this.y-600-1200,this.Random(),true);
        new LOG(this.x+1500,this.y-300-1200,this.Random(),true);
        new LOG(this.x+1800,this.y-1200,this.Random(),true);

        new PLANKS(this.x+300,this.y-300,this.Random(),true);
        new PLANKS(this.x+300,this.y-600,this.Random(),true);
        new PLANKS(this.x+300,this.y-900,this.Random(),true);
        new PLANKS(this.x+300,this.y-1200,this.Random(),true);

        new PLANKS(this.x+1500,this.y-300,this.Random(),true);
        new PLANKS(this.x+1500,this.y-600,this.Random(),true);
        new PLANKS(this.x+1500,this.y-900,this.Random(),true);
        new PLANKS(this.x+1500,this.y-1200,this.Random(),true);

        new PLANKS(this.x+600,this.y-1200,this.Random(),true);
        new PLANKS(this.x+900,this.y-1200,this.Random(),true);
        new PLANKS(this.x+1200,this.y-1200,this.Random(),true);

        new PLANKS(this.x+600,this.y-1500,this.Random(),true);
        new PLANKS(this.x+900,this.y-1800,this.Random(),true);
        new GLASS(this.x+900,this.y-1500,this.Random(),true);
        new PLANKS(this.x+1200,this.y-1500,this.Random(),true);

        new AIR(this.x+600,this.y-300,this.Random(),true);
        new AIR(this.x+900,this.y-300,this.Random(),true);
        new AIR(this.x+1200,this.y-300,this.Random(),true);
        new AIR(this.x+600,this.y-600,this.Random(),true);
        new AIR(this.x+900,this.y-600,this.Random(),true);
        new AIR(this.x+1200,this.y-600,this.Random(),true);
        new AIR(this.x+600,this.y-900,this.Random(),true);
        new AIR(this.x+900,this.y-900,this.Random(),true);
        new AIR(this.x+1200,this.y-900,this.Random(),true);
        new BED(this.x+900,this.y-300,this.Random(),true);

        new BRICKS(this.x+300,this.y,true,true);
        new BRICKS(this.x+600,this.y,true,true);
        new BRICKS(this.x+900,this.y,true,true);
        new BRICKS(this.x+1200,this.y,true,true);
        new BRICKS(this.x+1500,this.y,true,true);
        this.base(BRICKS,this.x+300,this.y+300,5);
    }
}

class POND extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.y+= 1200;
        this.noSpawn = 10;
        this.minmax = [1,1];
        this.width = 3000;
        this.x += Math.floor(getRandomForTerrainGen() *(16/this.minmax[1]))*300;
        this.onsurface = false;
    }

    create(){
        var add = 0;
        var liquid = WATER;
        var side = [SAND,CLAY];
        if(this.y > 4200){
            liquid = LAVA;
            side = [STONE,ANDESITE];
        }
        this.y -= 300;
        new side[0](this.x+add, this.y-900+600,true,true);
        new side[0](this.x-300+add, this.y-900+600,true,true);
        new side[0](this.x-300+add, this.y-1200+600,true,true);
        new side[0](this.x+300+add, this.y-900+600,true,true);
        
        new side[1](this.x+add, this.y-600+600,true,true);
        new side[1](this.x+300+add, this.y-600+600,true,true);
        
        new side[1](this.x+600+add, this.y-300+600,true,true);
        new side[1](this.x+300+add, this.y-300+600,true,true);

        new side[1](this.x+600+add, this.y+600,true,true);
        new side[1](this.x+900+add, this.y+600,true,true);
        new side[1](this.x+1200+add, this.y+600,true,true);
        new side[1](this.x+1500+add, this.y+600,true,true);

        new side[1](this.x+1500+add, this.y-300+600,true,true);
        new side[1](this.x+1800+add, this.y-300+600,true,true);

        new side[1](this.x+2100+add, this.y-600+600,true,true);
        new side[1](this.x+1800+add, this.y-600+600,true,true);
        
        new side[0](this.x+2100+add, this.y-900+600,true,true);
        new side[0](this.x+2400+add, this.y-900+600,true,true);
        new side[0](this.x+2400+add, this.y-1200+600,true,true);

        new liquid(this.x+2100+add, this.y-1200+600,true,true,true);
        new liquid(this.x+1800+add, this.y-1200+600,true,true,true);
        new liquid(this.x+1500+add, this.y-1200+600,true,true,true);
        new liquid(this.x+1200+add, this.y-1200+600,true,true,true);
        new liquid(this.x+900+add, this.y-1200+600,true,true,true);
        new liquid(this.x+600+add, this.y-1200+600,true,true,true);
        new liquid(this.x+300+add, this.y-1200+600,true,true,true);
        new liquid(this.x+600+add, this.y-900+600,true,true,true);
        new liquid(this.x+900+add, this.y-900+600,true,true,true);
        new liquid(this.x+1200+add, this.y-900+600,true,true,true);
        new liquid(this.x+1500+add, this.y-900+600,true,true,true);
        new liquid(this.x+1800+add, this.y-900+600,true,true,true);

        new liquid(this.x+600+add, this.y-600+600,true,true,true);
        new liquid(this.x+900+add, this.y-600+600,true,true,true);
        new liquid(this.x+1200+add, this.y-600+600,true,true,true);
        new liquid(this.x+1500+add, this.y-600+600,true,true,true);

        new liquid(this.x+900+add, this.y-300+600,true,true,true);
        new liquid(this.x+1200+add, this.y-300+600,true,true,true);
    }
}

class PYRAMID extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.noSpawn = 50;
        this.minmax = [1,1];
        this.width = 2100;
        this.x += Math.floor(getRandomForTerrainGen() *(16/this.minmax[1]))*300;
        this.onsurface = true;
    }

    create(){
        for (let i = 0; i < 5; i++) {
            new TERRACOTTAYELLOW(this.x+(i*300)+300,this.y-1200,1,1);
            new TERRACOTTAYELLOW(this.x+(i*300)+300,this.y-900,1,1);
            new TERRACOTTAYELLOW(this.x+(i*300)+300,this.y-600,1,1);
        }
        for (let i = 0; i < 3; i++) {
            new TERRACOTTAYELLOW(this.x+(i*300)+600,this.y-1500,1,1);
            new TERRACOTTAYELLOW(this.x+(i*300)+600,this.y-1800,1,1);
        }
        for (let i = 0; i < 7; i++) {
            new TERRACOTTAYELLOW(this.x+(i*300),this.y-300,1,1);
            new TERRACOTTAYELLOW(this.x+(i*300),this.y,1,1);
        }
        new TERRACOTTAYELLOW(this.x+900,this.y-2100,1,1);

        //ANKH

        new TERRACOTTA(this.x+900,this.y,1,1);
        new TERRACOTTA(this.x+900,this.y-300,1,1);
        new TERRACOTTA(this.x+1200,this.y-600,1,1);
        new TERRACOTTA(this.x+600,this.y-600,1,1);
        new ENCHANTEDGOLDBLOCK(this.x+900,this.y-600,1,1);
        new TERRACOTTA(this.x+900,this.y-900,1,1);
        new TERRACOTTA(this.x+600,this.y-1200,1,1);
        new TERRACOTTA(this.x+1200,this.y-1200,1,1);
        new TERRACOTTA(this.x+600,this.y-1500,1,1);
        new TERRACOTTA(this.x+900,this.y-1500,1,1);
        new TERRACOTTA(this.x+1200,this.y-1500,1,1);
        this.base(TERRACOTTAYELLOW,this.x,this.y+300,7);
    }
}

class CAVE extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.noSpawn = 0;
        this.minmax = [2,5];
        this.width = 300;
        this.x += Math.floor(getRandomForTerrainGen() *(16/this.minmax[1]))*300;
        this.onsurface = false;
    }

    create(){
        if(!(chunklist[Math.floor(this.x/4800)].biome instanceof NETHER)){
            if(Math.floor(getRandomForTerrainGen()*2) == 0){
                new AIR(this.x,this.y,1,1);
                new AIR(this.x+300,this.y,1,1);
                new AIR(this.x+300,this.y+300,1,1);
                new AIR(this.x,this.y+300,1,1);
            }
            else{
                new AIR(this.x,this.y,1,1);
                new AIR(this.x+300,this.y,1,1);
                new AIR(this.x+600,this.y,1,1);
                new AIR(this.x+900,this.y,1,1);

                new AIR(this.x,this.y+300,1,1);
                new AIR(this.x+300,this.y+300,1,1);
                new AIR(this.x+600,this.y+300,1,1);
                new AIR(this.x+900,this.y+300,1,1);

                new AIR(this.x+300,this.y+600,1,1);
                new AIR(this.x+600,this.y+600,1,1);

                new AIR(this.x+300,this.y-300,1,1);
                new AIR(this.x+600,this.y-300,1,1);
            }
        }
    }
}

class MESASTRUCT extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.noSpawn = 50;
        this.minmax = [1,1];
        this.x = Math.floor(this.x/4800)*4800
        this.onsurface = true;
    }

    Spawn(){
        if(!(Math.floor(getRandomForTerrainGen()*100) < this.noSpawn)){
            this.create(this.x);
        }
    }

    create(start){
        var layer;
        var RaisedReliefMapArray = TerrainGenerator.terrainLayoutMap(6,16,false);
        RaisedReliefMapArray.forEach((y,x) => {
            layer = this.getMesaLayer(1200, y)
            new layer(start + (x*300), (-y*300)+1200, 1,1);
            layer = this.getMesaLayer(1500, y)
            new layer(start + (x*300), (-y*300)+1500, 1,1);
            for (let i = 0; i < y; i++) {
                layer = this.getMesaLayer(1800+ (i*300), y)
                new layer(start + (x*300), (-y*300)+1800 + (i*300), 1,1);
            }
        });
    }

    getMesaLayer(addNum, y){
        var returnVal;
        if(-((-y*300)+addNum) <=  -900){
            returnVal = TERRACOTTABROWN;
        }
        else if(-((-y*300)+addNum) <=  -300){
            returnVal = TERRACOTTA;
        }
        else if(-((-y*300)+addNum) <=  300){
            returnVal = TERRACOTTAWHITE;
        }
        else if(-((-y*300)+addNum) <=  1200){
            returnVal = TERRACOTTAYELLOW;
        }
        else{
            returnVal = TERRACOTTARED;
        }
        return returnVal;
    }
}

class DEEPDARK extends STRUCTURE{
    constructor(x,y){
        super(x,y);
        this.noSpawn = 100;
        this.minmax = [1,1];
        this.x = x + 4800;
        this.onsurface = false;
        this.arr = [];
        this.arr2 = [];
        this.sss = 1;
    }

    Spawn(){
        this.create(this.x);
        var la = chunklist[(Math.floor(this.x/4800))].lightArray;
        if(chunklist[(Math.floor(this.x/4800))-1] != undefined){
            la = la.concat((chunklist)[-1+(Math.floor(this.x/4800))].lightArray)      
        }
        if(chunklist[(Math.floor(this.x/4800))+1] != undefined){
            la = la.concat(chunklist[1+(Math.floor(this.x/4800))].lightArray)      ;   
        }
        la.forEach(el => lightUpdate(el,true))
        la.forEach(el => lightUpdate(el))
    }

    air(x,y){
        new AIR(x,y,true,true)
    }

    sculkblock(x,y){
        var aad = new SCULKBLOCK(x,y,true,true);
        if(Math.floor(getRandom()*2) == 0){
            new SCULKBLOCK(x,y+300,true,true);
        }
        if(Math.floor(getRandom()*15) == 0 && y <= 4200){
            this.arr.push([x,y,aad.pos, aad.ChunkNo])
        }
        this.arr2.push([x,y,aad.pos, aad.ChunkNo])
    }

    spike(x,y){
        var t = 2+ Math.floor(getRandom()*4 );
        y += 1500 - ((6-t)*300);
        for (let i = 0; i < t; i++) {
            new SCULKBONE(x,y-(i*300),true,true);
        }
    }

    create(){



        for (let y= 3; y< 8;y++) {
            for (let x = 0; x < 16; x++) {
                this.sculkblock(+(300*x) + this.x, 2700+(y*300 ),true,true)
                this.sculkblock(-(300*x) + this.x, 2700+(y*300 ),true,true)
            }
        }for (let y= 2; y< 9;y++) {
            for (let x = 0; x < 15; x++) {
                this.sculkblock(+(300*x) + this.x, 2700+(y*300 ),true,true)
                this.sculkblock(-(300*x) + this.x, 2700+(y*300 ),true,true)
            }
        }for (let y= 1; y< 10;y++) {
            for (let x = 0; x < 13  ; x++) {
                this.sculkblock(+(300*x) + this.x, 2700+(y*300 ),true,true)
                this.sculkblock(-(300*x) + this.x, 2700+(y*300 ),true,true)
            }
        }for (let y= 0; y< 11;y++) {
            for (let x = 0; x < 9; x++) {
                this.sculkblock(+(300*x) + this.x, 2700+(y*300 ),true,true)
                this.sculkblock(-(300*x) + this.x, 2700+(y*300 ),true,true)
            }
        }for (let y= -1; y< 12;y++) {
            for (let x = 0; x < 4; x++) {
                this.sculkblock(+(300*x) + this.x, 2700+(y*300 ),true,true)
                this.sculkblock(-(300*x) + this.x, 2700+(y*300 ),true,true)
            }
        }



        for (let y= 4; y< 6;y++) {
            for (let x = 0; x < 16; x++) {
                this.air(+(300*x) + this.x, 2700+(y*300 ))
                this.air(-(300*x) + this.x, 2700+(y*300 ))
            }
        }for (let y= 3; y< 7;y++) {
            for (let x = 0; x < 15; x++) {
                this.air(+(300*x) + this.x, 2700+(y*300 ))
                this.air(-(300*x) + this.x, 2700+(y*300 ))
            }
        }for (let y= 2; y< 8;y++) {
            for (let x = 0; x < 13  ; x++) {
                this.air(+(300*x) + this.x, 2700+(y*300 ))
                this.air(-(300*x) + this.x, 2700+(y*300 ))
            }
        }for (let y= 1; y< 9;y++) {
            for (let x = 0; x < 9; x++) {
                this.air(+(300*x) + this.x, 2700+(y*300 ))
                this.air(-(300*x) + this.x, 2700+(y*300 ))
            }
        }for (let y= 0; y< 10;y++) {
            for (let x = 0; x < 4; x++) {
                this.air(+(300*x) + this.x, 2700+(y*300 ))
                this.air(-(300*x) + this.x, 2700+(y*300 ))
            }
        }

        this.arr.forEach(el=>{
            if(chunklist[el[3]].array[el[2][0]%16 ][el[2][1]] instanceof SCULKBLOCK ){
                this.spike(el[0],el[1]);
                this.spike(el[0],el[1]);
            }
        });
        this.arr2.forEach(el=>{
            if(chunklist[el[3]].array[el[2][0]%16 ][el[2][1] -1] instanceof AIR &&chunklist[el[3]].array[el[2][0]%16 ][el[2][1] ] instanceof SCULKBLOCK ){
                var b = chunklist[el[3]].array[el[2][0]%16 ][el[2][1] ];
                if(b.y > 3900){
                    if(this.sss > 3+Math.floor(getRandom()*2)){
                        this.sss = 0;
                        if(Math.floor(getRandom()*3) == 0){
                            new SCULKSHRIEKER(b.x,b.y-300,true,true);
                            new SCULKBUD(b.x,b.y,true,true);
                        }
                        else{
                            new SCULKSENSOR(b.x,b.y-300,true,true);
                        }
                        new SCULKVEIN(b.x+ ((Math.floor(getRandom()*3)*300) -300 ),b.y-600,true,true);
                    }
                    else{
                        this.sss++;
                    }
                }
            }
        })
    }
}

function GENERATECHUNK(notr){
    var nchunk;
    if(biomePos[chunklist.length] == undefined){
        if(chunklist.length == 0){
            nchunk = new CHUNK(biome[0]);
        }
        else{
            nchunk = new CHUNK(TerrainGenerator.distributeBiomes());
        }
        // if(chunklist.length == 1){
            // new DEEPDARK(0*4800,0).Spawn();
        // }
    }
    else{
        biome.forEach(el =>{
            if(biomePos[chunklist.length] == el.constructor.name){
                nchunk = new CHUNK(el);
            }
        })
    }
    chunklist.push(nchunk);
    GenerateTerrain(chunklist.length-1,notr);
}

function GenerateTerrain(start,notr){
    var tr = start * chunksSize*300;
    chunklist[start].array = air(tr);
    if(notr == undefined){
        chunklist[chunklist.length-1].biome.createTerrain(tr);
        // for (let i = 0; i < 16; i++) {
        //     new GRASS(tr + (i*300), 1200,1,1)
        // }
        growStuff(chunklist.length-1, 1);
        growStuff(chunklist.length-1, 3);
        if(!(chunklist[Math.floor(tr/4800)].biome instanceof NETHER)){
            TerrainGenerator.igneousRocks(tr);
        }
        TerrainGenerator.oreDistribution(tr);
        for (let i = 0; i < 16; i++) {
            new BEDROCK(tr+(i*300), TerrainGenerator.depth,1,1);
        }
    }
}

function RenderChunks(chunkno){
    chunklist[chunkno].array.forEach(X =>{
        X.forEach(Y =>Y.render());            
    });
    if(chunklist[chunkno+1] && STEVE.x%4800 > 2400){
        chunklist[chunkno+1].array.forEach(X =>{
            X.forEach(Y =>Y.render());            
        });
    }
    if(chunklist[chunkno-1] && (STEVE.width+STEVE.x)%4800 < 2400){
        chunklist[chunkno-1].array.forEach(X =>{
            X.forEach(Y =>Y.render());            
        });
    }
    
    particleArray.forEach(el => el.render());
    itemArray.forEach(el => el.render());
    entityArray.forEach(el=>el.render());
}

function TreeGen(spx,spy){
    var inc = Math.floor(getRandomForTerrainGen()*2)*300;
    new NATURALLOG(spx, spy, true, true);
    new NATURALLOG(spx, spy-300, true, false);
    new NATURALLOG(spx, spy-600, true, false);
    if(inc == 300){
        new NATURALLOG(spx, spy-600-inc, true, false);
    }
    
    new LEAVES(spx, spy-900-inc,true,false);
    new LEAVES(spx, spy-1200-inc,true,false);
    new LEAVES(spx-300, spy-1200-inc,true,false);
    new LEAVES(spx+300, spy-1200-inc,true,false);

    new LEAVES(spx+300, spy-900-inc,true,false);
    new LEAVES(spx+600, spy-900-inc,true,false);
    new LEAVES(spx-300, spy-900-inc,true,false);
    new LEAVES(spx-600, spy-900-inc,true,false);

    new LEAVES(spx+300, spy-600-inc,true,false);
    new LEAVES(spx+600, spy-600-inc,true,false);
    new LEAVES(spx-300, spy-600-inc,true,false);
    new LEAVES(spx-600, spy-600-inc,true,false);
    if(craftingUIOpen){
        for (let i = 0; i < noOfSlots; i++) {
            Inventory[i].draw();
        }
    }
    chunklist[Math.floor(spx/4800)].lightArray.forEach(el => lightUpdate(el))
}

function ShroomGen(spx,spy,c){
    var inc = Math.floor(getRandomForTerrainGen()*2)*300;
    new MUSHROOMSTEMBLOCK(spx, spy, true, true,true);
    new MUSHROOMSTEMBLOCK(spx, spy-300, true, false,true);
    new MUSHROOMSTEMBLOCK(spx, spy-600, true, false,true);
    if(inc == 300){
        new MUSHROOMSTEMBLOCK(spx, spy-600-inc, true, false,true);
    }
    if(c == "red"){
        new REDMUSHROOMBLOCK(spx, spy-900-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx, spy-1200-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx-300, spy-1200-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx+300, spy-1200-inc,true,false,true);

        new REDMUSHROOMBLOCK(spx+300, spy-900-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx+600, spy-900-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx-300, spy-900-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx-600, spy-900-inc,true,false,true);

        new REDMUSHROOMBLOCK(spx+300, spy-600-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx+600, spy-600-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx-300, spy-600-inc,true,false,true);
        new REDMUSHROOMBLOCK(spx-600, spy-600-inc,true,false,true);
    }
    else{
        new BROWNMUSHROOMBLOCK(spx+600, spy-900-inc,true,false,true);
        new BROWNMUSHROOMBLOCK(spx+300, spy-900-inc,true,false,true);
        new BROWNMUSHROOMBLOCK(spx, spy-900-inc,true,false,true);
        new BROWNMUSHROOMBLOCK(spx-300, spy-900-inc,true,false,true);
        new BROWNMUSHROOMBLOCK(spx-600, spy-900-inc,true,false,true);
    }
    if(craftingUIOpen){
        for (let i = 0; i < noOfSlots; i++) {
            Inventory[i].draw();
        }
    }
    chunklist[Math.floor(spx/4800)].lightArray.forEach(el => lightUpdate(el))
}

function growStuff(c, r){
    var listSapling = [];
    var listCactus = [];
    var listShroom = [];
    var listDirt = [];
    chunklist[c].array.forEach(ele=> {
        ele.forEach(el =>{
            if(el instanceof SAPLING){
                listSapling.push(el);
            }
            
            else if(el instanceof CACTUS){
                listCactus.push(el);
            }

            else if(el instanceof DIRT){
                listDirt.push(el);
            }
    
            else if(el instanceof REDMUSHROOM || el instanceof BROWNMUSHROOM){
                listShroom.push(el);
            }
        });
    });

    listSapling.forEach(el=>{
        if(r){
            if(Math.floor(getRandom()*r)==0){
                TreeGen(el.x, el.y);
            }
        }else{
            el.grow();
        }
    });
    listDirt.forEach(el=>{
        if(r){
            if(Math.floor(getRandom()*r)==0){
                el.grow()
            }
        }else{
            el.grow();
        }
    });
    listShroom.forEach(el=>{
        if(r){
            if(Math.floor(getRandom()*r)==0){
                if(el instanceof REDMUSHROOM){
                    var a = "red";
                }
                ShroomGen(el.x, el.y,a);
            }
        }else{
            el.grow();
        }
    });
    listCactus.forEach(el=>{
        if(Math.floor(getRandom()*r)==0){
            if(el.length > 0){
                var c = new CACTUS(el.x, el.y-300, true, false);
                c.length = el.length-1;
            }
        }
    });
}

function tryChunkGen(){
    if(chunklist[playerChunkNo+1] == undefined){
        GENERATECHUNK();
    }
    if(chunklist[playerChunkNo+2] == undefined){
        GENERATECHUNK();
    }
}

function display(arr){
    var str = ["","","","","","","","","","","","","","","",""]
    arr.forEach(y => {
        str[y] += "#";
        for (let i = 0; i < str.length; i++) {
            if(i != y){
                str[i] += "_";
            }
        }
    })
    str.reverse();
    console.table(str);
}
