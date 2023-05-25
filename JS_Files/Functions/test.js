"use strict";

class b extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.height = 300;
        this.width = 300;
        this.image = Mod.CreateImage("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWF8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
        this.hardness = 8;
        this.solid = true;
        this.tool = AXE;
        this.breakDrop;
        this.dropAmount = 6;
        this.pickaxeTier = 0;
        this.FuelDuration;
        Mod.CreateBlock(this)
    }
}

class i extends Item{
    constructor(){
        super();
        this.image = Mod.CreateImage("https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2a/Dried_Kelp_JE1.png/revision/latest?cb=20190403184613")
        this.isFood = false//true;
        this.foodPoints = 10;
        Mod.CreateItem(this);
    }
}

class t extends TOOLS{
    constructor(){
        super();
        this.image = Mod.CreateImage("https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2a/Dried_Kelp_JE1.png/revision/latest?cb=20190403184613")
        this.durability = 20;
        this.type = "WOOD"
        this.speed = 10;
        this.tier = 20;
        Mod.CreateTool(this);
    }
}

class ag extends AGGRESSIVE{
    constructor(x, y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 485;
        this.imageRight = Mod.CreateImage("https://2018media.idtech.com/2020-03/custom-entities.jpg?478049efb0");
        this.imageLeft = Mod.CreateImage("https://2018media.idtech.com/2020-03/custom-entities.jpg?478049efb0");
        this.drop = ROTTENFLESH;
        this.dropAmount = 2;
        this.attack = 1;
        this.sound = [
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")],
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")],
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")]
        ];
        this.speed = 10;
        this.health =2;
        Mod.CreateEntity(this)
    }
}

class p extends PASSIVE{
    constructor(x, y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.width = 325;
        this.height = 350;
        this.imageRight = imageCowRight;
        this.imageLeft = imageCowLeft;
        this.drop = RAWBEEF;
        this.dropAmount = 9;
        this.sound = [
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")],
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")],
            [Mod.CreateSound("SFX/Entity/piglin/say1.ogg")]
        ];
        this.speed = 18;
        this.health = 21;
        Mod.CreateEntity(this)
    }
}


class SL extends b{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}
// class EF extends BIOME{
//     constructor(){
//         super();
//         this.temp = 0;
//         this.maxsize = 200;
//         biome.push(this);
//     }

//     createTerrain(start){
//         TerrainGenerator.terrain(start,1,2,true,DIAMONDBLOCK,TERRACOTTA,6,[CACTUS]);
//     }

// }

// var Ef = new EF()