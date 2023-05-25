class FURNACE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageFurnace_OFF;
        this.strength = stoneStrength+1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
        this.clickable = true;
        this.array = [new FURNACESLOT(3200, 800,1)
        ,new FURNACESLOT(3200, 1300,2)
        ,new FURNACESLOT(3900, 1050,3)];
    }

    click(){
        UIName = "SMELT";
        INVENTORYUI(69, this);
    }

    breakExt(){
        for (let i = 0; i < this.array.length; i++) {
            const el = this.array[i];
            new CUSTOMITEM(el.value,true, this.x+Math.floor(getRandom()*100),this.y+Math.floor(getRandom()*100), el.obj)
        }
    }
}

className(FURNACE);

class GRAVE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGrave;
        this.strength = 1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = false;
        this.type = "stone";
        this.clickable = true;
        this.drop =  VOID;
        this.amount = 0;
        this.isFuel = 15000;
        this.array = [];
        for (let i = 0; i < 30; i++) {
            this.array.push(new CHESTSLOT(i));
            this.array[i].obj = Inventory[i].obj;
            this.array[i].value = Inventory[i].value;
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

className(GRAVE);

class COALBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "COAL BLOCK";
        this.image = imageCoalBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(COALBLOCK);

class RAWIRONBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "RAW IRON BLOCK";
        this.image = imageRawIronBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 2;
    }
}

className(RAWIRONBLOCK);

class RAWGOLDBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "RAW GOLD BLOCK";
        this.image = imageRawGoldBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 3;
    }
}

className(RAWGOLDBLOCK);

class IRONBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "IRON BLOCK";
        this.image = imageIronBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 2;
    }
}

className(IRONBLOCK);

class GOLDBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "GOLD BLOCK";
        this.image = imageGoldBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 3;
    }
}

className(GOLDBLOCK);

class ENCHANTEDGOLDBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "ENCHANTED GOLD BLOCK";
        this.image = imageGoldBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 3;
        this.abc = particleArray.length;
        if(this.exists){
            new GLINT(this.x,this.y,300,300);
            new CURSEDTEXT(this.x,this.y);
        }
    }

    breakExt(){
        particleArray.splice(this.abc,2)
    }
}

className(ENCHANTEDGOLDBLOCK);

class DIAMONDBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "DIAMOND BLOCK";
        this.image = imageDiamondBlock;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 4;
    }
}

className(DIAMONDBLOCK);

class STONE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageStone;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = COBBLESTONE;
        this.amount = 1;
        this.tier = 1;
    }
}

className(STONE);

class NETHERRACK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageNetherrack;
        this.strength = 3;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 2;
    }
}

className(NETHERRACK);

class SMOOTHSTONE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "SMOOTH STONE";
        this.image = imageSmoothStone;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(SMOOTHSTONE);

class STONEBRICKS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "STONE BRICKS";
        this.image = imageStoneBricks;
        this.strength = stoneStrength+1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(STONEBRICKS);

class BRICKS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageBricks;
        this.strength = stoneStrength+1;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(BRICKS);

class DIORITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageDiorite;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(DIORITE);

class QUARTZBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageQuartz;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(QUARTZBLOCK);

class QUARTZSMOOTHBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageQuartzSmooth;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(QUARTZSMOOTHBLOCK);

class QUARTZCHISELEDBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageQuartzChiseled;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(QUARTZCHISELEDBLOCK);

class QUARTZPILLARBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageQuartzPillar;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(QUARTZPILLARBLOCK);

class QUARTZBRICKSBLOCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageQuartzBricks;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(QUARTZBRICKSBLOCK);

class GRANITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGranite;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(GRANITE);

class ANDESITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageAndesite;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(ANDESITE);

class POLISHEDDIORITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "POLISHED DIORITE";
        this.image = imageDioritePolished;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;

        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(POLISHEDDIORITE);

class POLISHEDGRANITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "POLISHED GRANITE";
        this.image = imageGranitePolished;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(POLISHEDGRANITE);

class POLISHEDANDESITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "POLISHED ANDESITE";
        this.image = imageAndesitePolished;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(POLISHEDANDESITE);

class COBBLESTONE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageCobbleStone;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(COBBLESTONE);

class GLOWSTONE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGlowstone;
        this.strength = 2;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = GLOWSTONEDUST;
        this.amount = 4;
        this.tier = 0;
    }
}

className(GLOWSTONE);

class MAGMA extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageMagma;
        this.strength = 7;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 2;
    }
}

className(MAGMA);

class ORECOAL extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "COAL ORE";
        this.image = imageCoalOre;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = COAL;
        this.amount = 1;
        this.tier = 1;
    }
}

className(ORECOAL);

class OREIRON extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "IRON ORE";
        this.image = imageIronOre;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = RAWIRON;
        this.amount = 1;
        this.tier = 2;
    }
}

className(OREIRON);

class OREGOLD extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "GOLD ORE";
        this.image = imageGoldOre;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = RAWGOLD;
        this.amount = 1;
        this.tier = 3;
    }
}

className(OREGOLD);

class OREQUARTZ extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "QUARTZ ORE";
        this.image = imageQuartzOre;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = QUARTZ;
        this.amount = 1 + Math.floor(getRandom()*5);
        this.tier = 3;
    }
}

className(OREQUARTZ);

class ORENETHERGOLD extends OREGOLD{
    constructor(x,y,b,c){
        super(x,y,b,c);
        this.name = "NETHER GOLD ORE";
        this.image = imageNetherGoldOre;        
        this.drop = GOLDNUGGET;
        this.amount = 1 + Math.floor(getRandom()*9);
    }
}

className(ORENETHERGOLD);

class OREDIAMOND extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "DIAMOND ORE";
        this.image = imageDiamondOre;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = DIAMOND;
        this.amount = 1;
        this.tier = 4;
    }
}

className(OREDIAMOND);

class TERRACOTTA extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageTerracottaRegular;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(TERRACOTTA);

class TERRACOTTAYELLOW extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "YELLOW TERRACOTTA";
        this.image = imageTerracottaYellow;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(TERRACOTTAYELLOW);

class TERRACOTTAWHITE extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "WHITE TERRACOTTA";
        this.image = imageTerracottaWhite;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(TERRACOTTAWHITE);

class TERRACOTTARED extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "RED TERRACOTTA";
        this.image = imageTerracottaRed;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(TERRACOTTARED);

class TERRACOTTABROWN extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.name = "BROWN TERRACOTTA";
        this.image = imageTerracottaBrown;
        this.strength = stoneStrength;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(TERRACOTTABROWN);

class BEDROCK extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageBedrock;
        this.strength = 1/0;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop;
        this.amount = 1;
        this.tier = 1;
    }
}

className(BEDROCK);

class GLASS extends Block{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        this.image = imageGlass;
        this.strength = 3;
        this.backupstrength = this.strength;
        this.height = 300;
        this.width = 300;
        this.collides = true;
        this.type = "stone";
        this.drop = undefined;
        this.amount = 1;
        this.tier = 1;
    }
}

className(GLASS);