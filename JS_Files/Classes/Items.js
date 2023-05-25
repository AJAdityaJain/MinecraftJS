var itemArray = [];

class Item{
    constructor( amount,physical,x,y){
        this.image = imageChicken_Raw;
        this.Consumable = false;
        this.FoodInc = 0;
        this.physical = physical;
        this.x = x;
        this.y = y;
        if(this.physical && !(this.obj instanceof VOID)){
            itemArray.push(this);
        }
        if(!amount){
            this.amount = 1; 
        }
        else{
            this.amount = amount;
        }
        this.width = 200;
        this.height = 200;
        this.name = this.constructor.name;
        this.stackAmount = 64;
    }
    consume(){
        if(this.Consumable && Math.floor(STEVE.hunger/1000) < 9){
            STEVE.hunger += this.FoodInc*1000;
            UpdateFoodBar(Math.floor(STEVE.hunger/1000) );
            PlaySound(soundEat);
            Inventory[ss].value = Inventory[ss].value-1;
            if(Inventory[ss].value == 0){
                delete Inventory[ss].obj;
                Inventory[ss].obj = new VOID();
            }
            return true;
        }
    }
}

class CUSTOMITEM extends Item{  
    constructor(amount,physical,x,y, obj){
        super(amount,physical,x,y)
        this.image = imageBlank;
        this.obj = obj;
        this.x = x;
        this.y = y+100;
        this.gravity = true;
        if(this.x == 0){
            this.x = 21;
        }
        this.num = 0;
        this.inc = 1;
        this.gravitySpeed = 60;
        this.swimSpeed =  gravitySpeed2/4;
    }

    ANIMATE(X,Y){
        this.x += X;
        this.y += Y;
    }

    render(){
        this.num += this.inc;
        if(this.num%25 == 0){
            this.inc = -this.inc
        }
        if(this.physical && this.amount == 1){
            ctx.drawImage(this.obj.image, this.x+(this.num*2), this.y+Math.abs(this.num-12)*2, this.width/3, this.height/3);
        }
        else if(this.physical){
            ctx.drawImage(this.obj.image, this.x+(this.num*2), this.y+Math.abs(this.num-12)*2, this.width/3, this.height/3);
            ctx.drawImage(this.obj.image, this.x+(this.num*2) + 15, this.y+Math.abs(this.num-12)*2 +10, this.width/3, this.height/3);
        }
    }

    changeForm(x, y){
        this.physical = !this.physical;
        if(this.physical){
            this.x = x;
            this.y = y;
            itemArray.push(this);
        }
        else{
            itemArray.forEach((el,ind) => {
                if(el == this){
                    itemArray.splice(ind,1);
                }
            })
        }
    }

    collect(){
        if(Math.abs(STEVE.x+(STEVE.width/2) - this.x) < 300 &&Math.abs(STEVE.y - this.y) <= 600){
            var a = false;
            for (let i = 0; i < this.amount; i++) {
                a = findSlot(this.obj, this.x, this.y);
            }
            if(a){
                this.changeForm();                
            }
            UpdateHotBar();
        }
    }
    
    collide(X,Y){
        this.gravitySpeed = gravitySpeed2;
        if(Math.sign(this.x) == 1){
            var returnVal = false;
            arr = chunklist[ Math.floor(this.x/4800)].array[Math.floor(this.x/300)%16];
            for (let i = 0; i < arr.length; i++) {
                returnVal = arr[i].entitycollide(X,Y,this);
                if(returnVal){
                    i = arr.length;
                }
            }
            
            if(!returnVal){
                if(chunklist[ Math.floor(this.x/4800)].array[(Math.floor(this.x/300)%16)-16] != undefined) {
                    arr = chunklist[ Math.floor(this.x/4800)].array[(Math.floor(this.x/300)%16)-1];
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr.length;
                        }
                    }
                }
                else{
                    if (chunklist[Math.floor(this.x/4800)+1]) {
                        arr = chunklist[ Math.floor(this.x/4800)].array[15].concat(chunklist[ Math.floor(this.x/4800)+1].array[0]);                
                    }
                    else{
                        chunklist[ Math.floor(this.x/4800)].array[0];
                    }
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr.length;
                        }
                    }
                }
            }

            if(!returnVal){
                if(chunklist[ Math.floor(this.x/4800)].array[(Math.floor(this.x/300)%16)+1] != undefined) {
                    arr = chunklist[ Math.floor(this.x/4800)].array[(Math.floor(this.x/300)%16)+1];
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr.length;
                        }
                    }
                }
                else{
                    if (chunklist[Math.floor(this.x/4800)-1]) {
                        arr = chunklist[ Math.floor(this.x/4800)].array[0].concat(chunklist[ Math.floor(this.x/4800)-1].array[15]);                
                    }
                    else{
                        chunklist[ Math.floor(this.x/4800)].array[0];
                    }
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr.length;
                        }
                    }
                }
            }
            return returnVal;
        }
    }

    die(){
        if(this.physical){
            this.changeForm();
            delete this;
        }
    }

    hurt(){}
}

class VOID extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "";
        this.image = imageBlank;
    }
}

className(VOID);

class STICK extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageStick;
        this.isFuel = 3000;
    }
}

className(STICK);

class MUSICDISC extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "#=<⋮;⊣==¢=¢";
        this.image = imageMusicDisc;
        this.stackAmount = 16;
        this.Consumable = true;
        this.stackAmount = 1;

    }
    consume(){
        PlaySound(soundMusic[2],10);
        PlaySound(soundMusic[1],1);
        PlaySound(soundMusic[0],0.11);
        return true
    }
}

className(MUSICDISC);

class COAL extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageCoal;
        this.isFuel = 15000;
    }
}

className(COAL);

class GLOWSTONEDUST extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageGlowstoneDust;
    }
}

className(GLOWSTONEDUST);

class CHARCOAL extends COAL{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageCharcoal;
        this.isFuel = 15000;
    }
}

className(CHARCOAL);

class IRON extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageIron;
    }
}

className(IRON);

class RAWIRON extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW IRON";
        this.image = imageIronRaw;
    }
}

className(RAWIRON);

class GOLD extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageGold;
    }
}

className(GOLD);

class SOULBOTTLE extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "LOST SOULS OF {#=;⨅=¢<=~;⍑⨅⨅ᓵ∴ꖎᒲ";
        this.image = imageSoul;
    }
}

className(SOULBOTTLE);

class RAWGOLD extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW GOLD";
        this.image = imageGoldRaw;
    }
}

className(RAWGOLD);

class QUARTZ extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageQuartzItem ;
    }
}

className(QUARTZ);

class GOLDNUGGET extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageGoldNugget;
    }
}

className(GOLDNUGGET);

class DIAMOND extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageDiamond;
    }
}

className(DIAMOND);

class CLAYBALL extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "CLAY BALL";
        this.image = imageClayBall;
    }
}

className(CLAYBALL);

class BRICK extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageBrick;
    }
}

className(BRICK);

class FLINT extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageFlint;
    }
}

className(FLINT);

class BONE extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageBone;
    }
}

className(BONE);

class LEAD extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageLead;
    }
}

className(LEAD);

class BUCKET extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageBucket;
        this.stackAmount = 16;
    }
}

className(BUCKET);

class APPLE extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageApple;
        this.Consumable = true;
        this.FoodInc = 2;
    }
}

className(APPLE);

class RAWCHICKEN extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW CHICKEN";
        this.image = imageChicken_Raw;
        this.Consumable = true;
        this.FoodInc = 1;
    }
}

className(RAWCHICKEN);

class RAWBEEF extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW BEEF";
        this.image = imageBeef_Raw;
        this.Consumable = true;
        this.FoodInc = 1.5;
    }
}

className(RAWBEEF);

class RAWPORK extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW PORK";
        this.image = imagePorkchop_Raw;
        this.Consumable = true;
        this.FoodInc = 1.5;
    }
}

className(RAWPORK);

class RAWMUTTON extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "RAW MUTTON";
        this.image = imageMutton_Raw;
        this.Consumable = true;
        this.FoodInc = 1;
    }
}

className(RAWMUTTON);

class ROTTENFLESH extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "ROTTEN FLESH";
        this.image = imageRottenFlesh;
        this.Consumable = true;
        this.FoodInc = 1.5;
    }
}

className(ROTTENFLESH);

class COOKEDCHICKEN extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "COOKED CHICKEN";
        this.image = imageChicken_Cooked;
        this.Consumable = true;
        this.FoodInc = 3;
    }
}

className(COOKEDCHICKEN);

class COOKEDBEEF extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "COOKED BEEF";
        this.image = imageBeef_Cooked;
        this.Consumable = true;
        this.FoodInc = 4;
    }
}

className(COOKEDBEEF);

class COOKEDPORK extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "COOKED PORK";
        this.image = imagePorkchop_Cooked;
        this.Consumable = true;
        this.FoodInc = 4;
    }
}

className(COOKEDPORK);

class COOKEDMUTTON extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "COOKED MUTTON";
        this.image = imageMutton_Cooked;
        this.Consumable = true;
        this.FoodInc = 3;
    }
}

className(COOKEDMUTTON);

class GOATHORN extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "GOAT HORN";
        this.image = imageGoatHorn;
        this.Consumable = false;
        this.stackAmount = 1;

    }
    consume(){
        PlaySound(soundHorn);
        return true;
    }
}

className(GOATHORN);

class SNOWBALL extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "SNOW BALL";
        this.image = imageSnowball;
        this.Consumable = false;
        this.stackAmount = 16;
    }
    consume(x,y){
        x = x-STEVE.x;
        y = y-STEVE.y;  
        Inventory[ss].value--;
        if(Inventory[ss].value ==0){
            Inventory[ss].obj = new VOID();
        }
        var traj = (Math.abs(x)+Math.abs(y)) /((Math.abs(x)+Math.abs(y)) * 0.16);
        new SNOWBALL2(STEVE.x -250+62 + (STEVE.width* (Math.sign(x)+1)), STEVE.y+100,            Math.floor(x/traj), Math.ceil(y/traj) )
        return true;
    }
}

className(SNOWBALL);

class FIREBALL extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "FIRE BALL";
        this.image = imageFireball;
        this.Consumable = false;
    }
    consume(x,y){
        x = x-STEVE.x;
        y = y-STEVE.y;  
        Inventory[ss].value--;
        if(Inventory[ss].value ==0){
            Inventory[ss].obj = new VOID();
        }
        var traj = (Math.abs(x)+Math.abs(y)) /((Math.abs(x)+Math.abs(y)) * 0.16);
        new FIREBALL2(STEVE.x -250+62 + (STEVE.width* (Math.sign(x)+1)), STEVE.y+100,  Math.floor(x/traj), Math.ceil(y/traj)+40,0 )
        return true;
    }
}

className(FIREBALL);

class ENDERPEARL extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "ENDER PERL";
        this.image = imageEnderpearl;
        this.Consumable = false;
        this.stackAmount = 16;
    }
    consume(x,y){
        x = x-STEVE.x;
        y = y-STEVE.y;  
        Inventory[ss].value--;
        if(Inventory[ss].value ==0){
            Inventory[ss].obj = new VOID();
        }
        var traj = (Math.abs(x)+Math.abs(y)) /((Math.abs(x)+Math.abs(y)) * 0.16);
        new ENDERPEARL2(STEVE.x -250+62 + (STEVE.width* (Math.sign(x)+1)), STEVE.y+100,            Math.floor(x/traj), Math.ceil(y/traj) )
        return true;
    }
}

className(ENDERPEARL);

class ARROW extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "ARROW";
        this.image = imageArrow2;
        this.Consumable = false;
    }
}

className(ARROW);

class BLAZEROD extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "Blaze Rod";
        this.image = imageBlazeRod;
        this.Consumable = false;
    }
}

className(BLAZEROD);

class TOTEMOFUNDYING extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "TOTEM OF UNDYING";
        this.image = imageTotemOfUndying;
        this.Consumable = false;
        this.stackAmount = 1;
    }
}

className(TOTEMOFUNDYING);

class LEATHER extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "LEATHER";
        this.image = imageLeather;
        this.Consumable = false;
    }
}

className(LEATHER);

class FEATHER extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.name = "FEATHER";
        this.image = imageFeather;
        this.Consumable = false;
    }
}

className(FEATHER);

class STRING extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageString;
        this.Consumable = false;
    }
}

className(STRING);

class GUNPOWDER extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y)
        this.image = imageGunpowder;
        this.Consumable = false;
    }
}

className(GUNPOWDER);




class TOOLS extends Item{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image;
        this.durability;
        this.type;
        this.stackAmount = 1;
    }
}

const wooddurability = 40;
const stonedurability = 88;
const irondurability = 166;
const golddurability = 22;
const diamonddurability = 1040;




class BOW extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageBow;
        this.durability = 50;
        this.durabilitybackup = 50;
        this.type = "bow";
        this.tier = 0;
        this.speed = 0;
        this.Consumable = false;
    }

    consume(x,y){
        if(Inventory[33].value > 0){
            this.durability--;
            if (this.durability <= 0) {
                Inventory[ss].obj = new VOID();
                Inventory[ss].value = 0;
            }
            x = x-STEVE.x;
            y = y-STEVE.y;  
            var traj = (Math.abs(x)+Math.abs(y)) /((Math.abs(x)+Math.abs(y)) * 0.16);
            new ARROW2(STEVE.x -250+62 + (STEVE.width* (Math.sign(x)+1) ) , STEVE.y+100,
                        Math.floor(x/traj), Math.ceil(y/traj),10000,true )
            Inventory[33].value --;
            if(Inventory[33].value<=0){
                Inventory[33].obj = new VOID();
            }
            return true;
        }
        else{
            Inventory[33].obj = new VOID();
        }
    }
}

className(BOW);



class SHIELD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageShield;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "skeld";
        this.tier = 0;
        this.speed = 0;
    }
}

className(SHIELD);

class FLINTANDSTEEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "Flint & Steel";
        this.image = imageFlintAndSteel;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "";
        this.tier = 0;
        this.speed = 0;
    }
    consume(x,y){
        ReduceDurability();
        new FIRE(PlaceFormula1(x),PlaceFormula1(y),true,false);
    }
}

className(FLINTANDSTEEL);

class ARMOUR extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageShield;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "armour";
        this.protection = 0;
    }
}

var dProt = 81;
var gProt = 45;
var iProt = 57;
var lProt = 31;

class HELMET extends ARMOUR{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageAllium;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = (dProt/2)*0.6;
    }
}

class PANTS extends ARMOUR{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageAllium;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = dProt/2;
    }
}

class BOOTS extends ARMOUR{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageAllium;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = (dProt/2)*0.4;
    }
}


class DHELMET extends HELMET{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageDiamondArmour;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = (dProt/2)*0.6;
    }
}

className(DHELMET);

class DPANTS extends PANTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageDiamondArmour;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = dProt/2;
    }
}

className(DPANTS);

class DBOOTS extends BOOTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageDiamondArmour;
        this.durability = diamonddurability;
        this.durabilitybackup = diamonddurability;
        this.type = "armour";
        this.protection = (dProt/2)*0.4;
    }
}

className(DBOOTS);



class GHELMET extends HELMET{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageGoldArmour;
        this.durability = golddurability;
        this.durabilitybackup = golddurability;
        this.type = "armour";
        this.protection = (gProt/2)*0.6;
    }
}

className(GHELMET);

class GPANTS extends PANTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageGoldArmour;
        this.durability = golddurability;
        this.durabilitybackup = golddurability;
        this.type = "armour";
        this.protection = gProt/2;
    }
}

className(GPANTS);

class GBOOTS extends BOOTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageGoldArmour;
        this.durability = golddurability;
        this.durabilitybackup = golddurability;
        this.type = "armour";
        this.protection = (gProt/2)*0.4;
    }
}

className(GBOOTS);



class IHELMET extends HELMET{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageIronArmour;
        this.durability = irondurability;
        this.durabilitybackup = irondurability;
        this.type = "armour";
        this.protection = (iProt/2)*0.6;
    }
}

className(IHELMET);

class IPANTS extends PANTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageIronArmour;
        this.durability = irondurability;
        this.durabilitybackup = irondurability;
        this.type = "armour";
        this.protection = iProt/2;
    }
}

className(IPANTS);

class IBOOTS extends BOOTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageIronArmour;
        this.durability = irondurability;
        this.durabilitybackup = irondurability;
        this.type = "armour";
        this.protection = (iProt/2)*0.4;
    }
}

className(IBOOTS);



class LHELMET extends HELMET{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageLeatherArmour;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "armour";
        this.protection = (lProt/2)*0.6;
    }
}

className(LHELMET);

class LPANTS extends PANTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageLeatherArmour;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "armour";
        this.protection = lProt/2;
    }
}

className(LPANTS);

class LBOOTS extends BOOTS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageLeatherArmour;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "armour";
        this.protection = (lProt/2)*0.4;
    }
}

className(LBOOTS);




class WPICKAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "STONE  PICKAXE";
        this.image = imageWPickaxe;
        this.durability = wooddurability;
        this.durabilitybackup = wooddurability;
        this.type = "STONE";
        this.tier = 1;
        this.speed = 2;
    }
}

className(WPICKAXE);

class WSWORD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "STONE SWORD"
        this.image = imageWSword;
        this.durability = wooddurability;
        this.type = "";
        this.durabilitybackup = wooddurability;
        this.speed = 2;
        this.tier = 0;
    }
}

className(WSWORD);

class WSHOVEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "STONE SHOVEL"
        this.image = imageWShovel;
        this.durability = wooddurability;
        this.type = "DIRT";
        this.durabilitybackup = wooddurability;
        this.speed = 2;
        this.tier = 0;
    }
}

className(WSHOVEL);

class WAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageWAxe;
        this.name = "STONE AXE";
        this.durability = wooddurability;
        this.type = "WOOD";
        this.tier = 0;
        this.speed = 2;
        this.durabilitybackup = wooddurability;
    }
}

className(WAXE);





class SPICKAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageSPickaxe;
        this.name = "STONE PICKAXE"
        this.durability = stonedurability;
        this.type = "STONE";
        this.tier = 2;
        this.speed = 4;
        this.durabilitybackup = stonedurability;
    }
}

className(SPICKAXE);

class SSWORD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.image = imageSSword;
        this.name = "STONE SWORD"
        this.durability = stonedurability;
        this.type = "";
        this.tier = 0;
        this.speed = 4;
        this.durabilitybackup = stonedurability;
    }
}

className(SSWORD);

class SSHOVEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "STONE SHOVEL"
        this.image = imageSShovel;
        this.durability = stonedurability;
        this.type = "DIRT";
        this.tier = 0;
        this.speed = 4;
        this.durabilitybackup = stonedurability;
    }
}

className(SSHOVEL);

class SAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "STONE AXE"
        this.image = imageSAxe;
        this.durability = stonedurability;
        this.type = "WOOD";
        this.tier = 0;
        this.speed = 4;
        this.durabilitybackup = stonedurability;
    }
}

className(SAXE);





class IPICKAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "IRON PICKAXE"
        this.image = imageIPickaxe;
        this.durability = irondurability;
        this.type = "STONE";
        this.tier = 4;
        this.speed = 6;
        this.durabilitybackup = irondurability;
    }
}

className(IPICKAXE);

class ISWORD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "IRON SWORD"
        this.image = imageISword;
        this.durability = irondurability;
        this.type = "";
        this.speed = 6;
        this.tier = 0;
        this.durabilitybackup = irondurability;
    }
}

className(ISWORD);

class ISHOVEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "IRON SHOVEL";
        this.image = imageIShovel;
        this.durability = irondurability;
        this.type = "DIRT";
        this.speed = 6;
        this.tier = 0;
        this.durabilitybackup = irondurability;
    }
}

className(ISHOVEL);

class IAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "IRON AXE";
        this.image = imageIAxe;
        this.durability = irondurability;
        this.type = "WOOD";
        this.speed = 6;
        this.tier = 0;
        this.durabilitybackup = irondurability;
    }
}

className(IAXE);





class GPICKAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "GOLD PICKAXE"
        this.image = imageGPickaxe;
        this.durability = golddurability;
        this.type = "STONE";
        this.speed = 12;
        this.tier = 3;
        this.durabilitybackup = golddurability;
    }
}

className(GPICKAXE);

class GSWORD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "GOLD SWORD"
        this.image = imageGSword;
        this.durability = golddurability;
        this.type = "";
        this.speed = 12;
        this.tier = 0;
        this.durabilitybackup = golddurability;
    }
}

className(GSWORD);

class GSHOVEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "GOLD SHOVEL";
        this.image = imageGShovel;
        this.durability = golddurability;
        this.type = "DIRT";
        this.speed = 12;
        this.tier = 0;
        this.durabilitybackup = golddurability;
    }
}

className(GSHOVEL);

class GAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "GOLD AXE"
        this.image = imageGAxe;
        this.durability = golddurability;
        this.type = "WOOD";
        this.speed = 12;
        this.tier = 0;
        this.durabilitybackup = golddurability;
    }
}

className(GAXE);





class DPICKAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "DIAMOND PICKAXE"
        this.image = imageDPickaxe;
        this.durability = diamonddurability;
        this.type = "STONE";
        this.speed = 8;
        this.tier = 5;
        this.durabilitybackup = diamonddurability;
    }
}

className(DPICKAXE);

class DSWORD extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "DIAMOND SWORD"
        this.image = imageDSword;
        this.durability = diamonddurability;
        this.type = "";
        this.speed = 8;
        this.tier = 0;
        this.durabilitybackup = diamonddurability;
    }
}

className(DSWORD);

class DSHOVEL extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "DIAMOND SHOVEL"
        this.image = imageDShovel;
        this.durability = diamonddurability;
        this.type = "DIRT";
        this.speed = 8;
        this.tier = 0;
        this.durabilitybackup = diamonddurability;
    }
}

className(DSHOVEL);

class DAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "DIAMOND AXE"
        this.image = imageDAxe;
        this.durability = diamonddurability;
        this.type = "WOOD";
        this.speed = 8;
        this.tier = 0;
        this.durabilitybackup = diamonddurability;
    }
}

className(DAXE);

class LOSTAXE extends TOOLS{
    constructor(amount,physical,x,y){
        super(amount,physical,x,y);
        this.name = "Lost Axe of the ⍊¡⊣¢¡~∴{=¢"
        this.image = imageLostAxe;
        this.durability = irondurability - Math.floor(getRandom()*50);
        this.type = "";
        this.speed = 9;
        this.tier = 0;
        this.durabilitybackup = irondurability;
    }
}

className(LOSTAXE);
