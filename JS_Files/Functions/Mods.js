if(params.get("modSrc") != null){
    var modScriptElement = document.createElement("SCRIPT");
    modScriptElement.src = params.get("modSrc");
    canvas.appendChild(modScriptElement);   
}  
const PICKAXE = DPICKAXE;
const AXE = DAXE;
const SHOVEL = DSHOVEL;

class MOD{
    constructor(){
        this.srcipt = modScriptElement;
    }

    CreateCraftingRecipe([obj1,obj2,obj3,obj4, obj5, obj6, obj7, obj8, obj9],returnItem, Amount){
        new RECIPE([
            new obj1(0,0,0,0).constructor.name,new obj2(0,0,0,0).constructor.name,new obj3(0,0,0,0).constructor.name,
            new obj4(0,0,0,0).constructor.name,new obj5(0,0,0,0).constructor.name,new obj6(0,0,0,0).constructor.name,
            new obj7(0,0,0,0).constructor.name,new obj8(0,0,0,0).constructor.name,new obj9(0,0,0,0).constructor.name
        ], returnItem, Amount);
        obj1 = null;
        obj2 = null;
        obj3 = null;
        obj4 = null;
        obj5 = null;
        obj6 = null;
        obj7 = null;
        obj8 = null;
        obj9 = null;
    }

    CreateFurnaceRecipe(input, output){
        new FURNACERECIPE(new input(0,0,0,0), new output(0,0,0,0));
    }

    CreateBlock(className){
        className.strength = className.hardness;
        className.backupstrength = className.strength;
        className.collides = className.solid;
        className.type = new className.tool().type.toLowerCase();
        if(className.breakDrop){
            className.drop = className.breakDrop;
        }
        if(className.dropAmount){
            className.amount = className.dropAmount;
        }
        className.tier = className.pickaxeTier;
        if(className.FuelDuration){
            className.isFuel = className.FuelDuration * 1000;
        }
    } 
    
    CreateItem(className){
        className.Consumable = className.isFood;
        className.FoodInc = className.foodPoints;
    }

    CreateTool(className){
        className.Consumable = false;
        className.durabilitybackup = className.durability;
    }

    CreateEntity(className){
        className.constructor.nameR = className.constructor.nameRight;
        className.constructor.nameL = className.constructor.nameLeft;
        className.amount = className.dropAmount
        className.GravityDamageSumUp = 0;
    }

    CreateSlab(className){
        className.height /= 2;
        className.y += 150;
        className.drop = "self";
    }

    CreateSlabRecipe(className1,parentMaterial){
        new RECIPE(["VOID","VOID","VOID","VOID","VOID","VOID",new parentMaterial(0,0,0,0).constructor.name,new parentMaterial(0,0,0,0).constructor.name,new parentMaterial(0,0,0,0).constructor.name],className1,6);
        className(className1);
    }

    CreateImage(url){
        var image = document.createElement("IMG");
        image.src = url;
        return image;
    }

    CreateSound(url) {
        var Sound = document.createElement("AUDIO");
        Sound.src = url;
        return Sound;
    }
}

const Mod = new MOD();