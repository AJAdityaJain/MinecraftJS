var craftingRecipeArray = [];
var furnaceRecipeArray = [];
var PrevX = 0;
var PrevY = 0;
var UIName = "CRAFT";
var lastClickedObj = undefined;
var smeltDuration = 5000;
var Inventory = [];
var craftingSlotArray = [];
var craftingUIOpen = false;
var noOfSlots = 35;
var ss = 0;
var selectedSlot = undefined;

class SLOTS{
    constructor(obj, value){
        this.obj = obj
        this.image = this.obj.image;
        this.value = value;
        Inventory.push(this);
        this.sno = Inventory.findIndex(e => e == this) + 1;
        this.selected = false;
        this.row=6;
        this.gap=350;
        this.side=350;
        if(this.sno <= 30){
            this.x = (this.gap * this.sno) - ((this.gap*this.row) * Math.floor((this.sno -1) /this.row));
            this.y = this.side + (this.gap * Math.floor((this.sno -1) /this.row));
        }
        else{
            this.x = 2500;
            this.y = 1111+(this.sno *350)-11608;//*this.side);
        }
    }

    draw(){
        if(this.selected){
            var img = imageSelectedSlot
        }
        else{
            var img = imageSlot
        }
        ctx.drawImage(img,
            this.x+x,
            this.y+y,
            this.side,
            this.side
        );
        
        if(!(this.sno <= 30) && this.obj instanceof VOID){
            if(this.sno == 31){
                ctx.drawImage(imageHelmetGUI,
                    x + this.x+40 + Math.abs(this.obj.width - 300)/2,
                y + this.y+40 + Math.abs(this.obj.height- 300)/2,175,175*1.1)
            }
            else if(this.sno == 32){
                ctx.drawImage(imagePantsGUI,
                    x + this.x+30 + Math.abs(this.obj.width - 300)/2,
                y + this.y+30 + Math.abs(this.obj.height- 300)/2,175,1.3*175)
            }
            else if(this.sno == 33){
                ctx.drawImage(imageBootsGUI,
                    x + this.x + Math.abs(this.obj.width - 300)/2,
                y + this.y+50 + Math.abs(this.obj.height- 300)/2,245,175);
            }
            else if(this.sno == 34){
                ctx.drawImage(imageArrowGUI,
                    x + this.x+50 + Math.abs(this.obj.width - 300)/2,
                y + this.y+50 + Math.abs(this.obj.height- 300)/2,
                (this.side-100) * (this.obj.width/300),
                (this.side-100) * (this.obj.height/300)); 
            }
            else if(this.sno == 35){
                ctx.drawImage(imageShieldGUI,
                    x + this.x+50 + Math.abs(this.obj.width - 300)/2,
                y + this.y+50 + Math.abs(this.obj.height- 300)/2,
                (this.side-100) * (this.obj.width/300),
                (this.side-100) * (this.obj.height/300)); 
            }
        }
        if(this.obj instanceof ARMOUR){
            if(this.obj instanceof HELMET){
                ctx.drawImage(this.obj.image, 23,0,96.6,69,this.x+x+50,this.y+y+50,this.side-100,180);    
            }
            else if(this.obj instanceof PANTS){
                ctx.drawImage(this.obj.image, 64,89,54,38,this.x+x+50,this.y+y+100,this.side-120 ,160);
            }
            else if(this.obj instanceof BOOTS){
                ctx.drawImage(this.obj.image, 58,135,60,18,this.x+x+50,this.y+y+200,this.side-120,65);
            }
        }
        else{
            ctx.drawImage(this.obj.image,
                x + this.x+50 + Math.abs(this.obj.width - 300)/2,
                y + this.y+50 + Math.abs(this.obj.height- 300)/2,
                (this.side-100) * (this.obj.width/300),
                (this.side-100) * (this.obj.height/300)
            );
        }
        if(this.value > 1){
            ctx.fillText(this.value,this.x+x+50,this.y+y+150);
        }
    }
}

class FURNACESLOT{
    constructor(x,y ,n){
        this.side=300;
        this.obj = new VOID();
        this.value = 0;
        this.sno = n;
        this.x = x//(this.sno*this.side) - (this.row*this.side) * Math.floor(this.sno/this.row) + 2900;
        this.y = y//this.side * Math.floor(this.sno/this.row) + 300;
            this.selected = false;
    }

    draw(){
        if(this.selected){
            var img = imageSelectedSlot
        }
        else{
            var img = imageSlot
        }

        ctx.drawImage(img, 
            this.x+ x,
            this.y + y,
            this.side, this.side
        );
        if(this.obj instanceof ARMOUR){
            if(this.obj instanceof HELMET){
                ctx.drawImage(this.obj.image, 23,0,96.6,69,this.x+x+50,this.y+y+50,this.side-100,180);    
            }
            else if(this.obj instanceof PANTS){
                ctx.drawImage(this.obj.image, 64,89,54,38,this.x+x+50,this.y+y+100,this.side-120 ,160);
            }
            else if(this.obj instanceof BOOTS){
                ctx.drawImage(this.obj.image, 58,135,60,18,this.x+x+50,this.y+y+200,this.side-120,65);
            }
        }
        else{
            ctx.drawImage(this.obj.image, 
                this.x+50 + x+ Math.abs(this.obj.width - 300)/2,
                this.y + 50 + y+ Math.abs(this.obj.height - 300)/2,
                (this.side-100) * (this.obj.width/300), (this.side-100) * (this.obj.height/300)
            );    
        }
        if(this.value > 1){
            ctx.fillText(this.value,this.x+x+50,this.y+y+150);
        }
    }
}

class CHESTSLOT{
    constructor( n){
        this.x=x;
        this.y=y;
        this.side=300;
        this.obj = new VOID();
        this.value = 0;
        this.sno = n;
        this.row = 5;
        this.x = (this.sno*this.side) - (this.row*this.side) * Math.floor(this.sno/this.row) + 2900;
        this.y = this.side * Math.floor(this.sno/this.row) + 300;
            this.selected = false;
    }

    draw(){
        if(this.selected){
            var img = imageSelectedSlot
        }
        else{
            var img = imageSlot
        }

        ctx.drawImage(img, 
            this.x+ x,
            this.y + y,
            this.side, this.side
        );
        if(this.obj instanceof ARMOUR){
            if(this.obj instanceof HELMET){
                ctx.drawImage(this.obj.image, 23,0,96.6,69,this.x+x+50,this.y+y+50,this.side-100,180);    
            }
            else if(this.obj instanceof PANTS){
                ctx.drawImage(this.obj.image, 64,89,54,38,this.x+x+50,this.y+y+100,this.side-120 ,160);
            }
            else if(this.obj instanceof BOOTS){
                ctx.drawImage(this.obj.image, 58,135,60,18,this.x+x+50,this.y+y+200,this.side-120,65);
            }
        }
        else{
            ctx.drawImage(this.obj.image, 
                this.x+50 + x+ Math.abs(this.obj.width - 300)/2,
                this.y + 50 + y+ Math.abs(this.obj.height - 300)/2,
                (this.side-100) * (this.obj.width/300), (this.side-100) * (this.obj.height/300)
            );    
        }
        if(this.value > 1){
            ctx.fillText(this.value,this.x+x+50,this.y+y+150);
        }
    }
}

class CRAFTINGSLOTS{
    constructor(){
        this.obj = new VOID();
        craftingSlotArray.push(this);
        this.sno = craftingSlotArray.length-1;
        this.a = Math.floor(this.sno/3);
        this.b = this.sno%3;
        this.x = 3200 + (310 * this.b);
        this.y = 500 + (310 * this.a);
        this.side = 300;
        this.value = 0;
    }

    draw(){
        var img = imageSelectedSlot;
        if(this.selected != true){
            img = imageSlot
        }
        ctx.drawImage(
            img,
            x + this.x,
            y + this.y,
            this.side,
            this.side
        );
        if(this.obj instanceof ARMOUR){
            if(this.obj instanceof HELMET){
                ctx.drawImage(this.obj.image, 23,0,96.6,69,this.x+x+50,this.y+y+50,this.side-100,180);    
            }
            else if(this.obj instanceof PANTS){
                ctx.drawImage(this.obj.image, 64,89,54,38,this.x+x+50,this.y+y+100,this.side-120 ,160);
            }
            else if(this.obj instanceof BOOTS){
                ctx.drawImage(this.obj.image, 58,135,60,18,this.x+x+50,this.y+y+200,this.side-120,65);
            }
        }
        else{
            ctx.drawImage(
                this.obj.image,
                x + this.x+50+ Math.abs(this.obj.width - 300)/2,
                y + this.y+50+ Math.abs(this.obj.height - 300)/2,
                (this.side - 100) * (this.obj.width/300),
                (this.side - 100) * (this.obj.height/300)
            );
        }
        if(this.value > 1){
            ctx.fillText(this.value,this.x + x + 100, this.y + 200 + y);
        }
    }
}

class RECIPE{
    constructor(RecipeArray, output, amount){
        this.RecipeArray =RecipeArray;
        this.output = output;
        this.amount = amount;
        craftingRecipeArray.push(this);
    }
    craft(){
        var craftable = true;
        for (let i = 0; i < 9; i++) {
            if(this.RecipeArray[i] != craftingSlotArray[i].obj.constructor.name){
                craftable = false;
                i = 10;
            }
        }
        if(craftable){
            craftingSlotArray.forEach(el => {
                el.value--
                if (el.value <= 0){
                    el.value = 0;
                    delete el.obj;
                    el.obj = new VOID();                    
                }
                el.draw();
            });
            for(var i =0; i < this.amount; i++){
                findSlot(new this.output(0,0,false, false));
            }
        }
    }
}

class FURNACERECIPE{
    constructor(input, output){
        this.input = input;
        this.output = output;
        furnaceRecipeArray.push(this);
    }
    
    smelt(f){
        if(f == undefined){
            var furnace = lastClickedObj; 
        }
        else{
            var furnace = f; 
        }
        if(furnace!=undefined&&furnace.image == imageFurnace_OFF&&furnace.array[0].obj.constructor.name == this.input.constructor.name&& furnace.array[1].obj.isFuel!= undefined&& furnace.array[2].value <=64&&(furnace.array[2].obj.constructor.name == this.output.constructor.name||furnace.array[2].obj.constructor.name == "VOID")){
            furnace.image = imageFurnace_ON;
            ctx.drawImage(furnace.image, x + 3500, y + 1800, 300, 300);
            furnace.array[1].value--;
            console.log(furnace.array[1].value);
            
            furnace.array[1].draw();
            for (let i = 0; i < furnace.array[1].obj.isFuel/smeltDuration; i++) {
                setTimeout(() => {
                    if(furnace.array[0].value >0 && furnace.array[0].obj.constructor.name == this.input.constructor.name){
                        furnace.array[2].obj = this.output;
                        furnace.array[2].value++;
                        if(furnace!=undefined&&lastClickedObj == furnace){
                            furnace.array[2].draw();
                        }
                        furnace.array[0].value--;
                        if(furnace.array[0].value == 0){
                            furnace.array[0].obj = new VOID();
                        }
                        if(furnace!=undefined&&lastClickedObj == furnace){
                            furnace.array[0].draw();
                            ctx.drawImage(furnace.image, x + 3500, y + 1800, 300, 300);
                        }
                        this.smelt();
                    }
                }, (i+1)*smeltDuration);
            }
            setTimeout(() => {
                furnace.image = imageFurnace_OFF;
                if(furnace!=undefined&&lastClickedObj == furnace){
                    ctx.drawImage(furnace.image, x + 3500, y + 1800, 300, 300);
                }
                this.smelt(furnace);
            }, furnace.array[1].obj.isFuel+100);
            if(furnace.array[1].value == 0){
                furnace.array[1].obj = new VOID();
            }
            furnace.array[1].draw();
        }
    }
}

function INVENTORYUI(keypressed,obj){
    lastClickedObj = obj;
    if(keypressed == 69){
        craftingUIOpen = !craftingUIOpen;
        UpdateHotBar();
        if(selectedSlot != undefined){
            selectedSlot.selected = false;
        }
        selectedSlot = undefined;
    }
    if(craftingUIOpen){
        var UIX = x + 100;
        var UIY = y + 100;

        ctx.drawImage(imageUI, UIX,UIY, canvas.width - 200, canvas.height - 200);
        
        for (let i = 0; i < noOfSlots; i++) {
            Inventory[i].draw();
        }

        if(obj == undefined && UIName != "CRAFT"){
            UIName = "";
        }       
        if(UIName == "CRAFT"){
            craftingSlotArray.forEach(el => el.draw());
            ctx.drawImage(imageCraftButton, x + 3500, y + 1600, 300, 300);
            ctx.fillText("Crafting", x + 3500, y + 460);
        }
        if(UIName == "SMELT"){
            obj.array.forEach(el=> el.draw());
            ctx.drawImage(obj.image, x + 3500, y + 1800, 300, 300);
            ctx.fillText("Smelting", x + 3500, y + 500);
        }
        if(UIName == "STORAGE"){
            for (let i = 0; i < noOfSlots; i++) {
                Inventory[i].draw();   
            }
            for (let i = 0; i < lastClickedObj.array.length; i++) {
                lastClickedObj.array[i].draw();   
            }
        }
    }

    if(!craftingUIOpen){
        document.getElementsByClassName("overlay")[0].style.display = "";
    }
    else{
        document.getElementsByClassName("overlay")[0].style.display = "none";
    }
}

function InventoryVacuum(){
    Inventory.forEach(el=>{
        if(el.obj == undefined){
            delete el.obj;
            el.obj = new VOID();
            el.value = 0;
        }
    });
}

function findSlot(el){
    InventoryVacuum();
    returnVal = false;
    var Stacked = findSlotCheck(el);
    returnVal = Stacked;
    if(!Stacked && el.constructor.name != "VOID"){
        for (let i = 0; i < Inventory.length-5; i++) {
            const slot = Inventory[i];
            if(slot.obj instanceof VOID){
                slot.obj = el;
                slot.value = 1;
                if(craftingUIOpen){slot.draw();}
                i=Inventory.length;
                returnVal = true;
            }
        }
    }
    return returnVal
}

function findSlotCheck(el){
    for (let i = 0; i < Inventory.length-5; i++) {
        const slot = Inventory[i];

        if(slot.obj.constructor.name == el.constructor.name){
            if(slot.value < slot.obj.stackAmount){
                slot.value = slot.value+1;
                if(craftingUIOpen){slot.draw();}
                i = Inventory.length;
                return true;
            }
        }
    }
}

function GUINAV(X, Y,r,c){
    // PlaySound(soundClick);
    var combined = Inventory;
    if(lastClickedObj != undefined){
        combined = combined.concat(lastClickedObj.array);
    }
    else{
        combined = combined.concat(craftingSlotArray);
    }
    combined.forEach(el=>{
        if(X <= el.x +x + el.side && X >= el.x + x && Y <= el.y + y + el.side && Y >= el.y + y ){
            if(selectedSlot ==undefined){
                selectedSlot = el;
                el.selected = true;
                if(selectedSlot != undefined){
                    selectedSlot.draw();
                }
                el.draw();
            }
            else if(el != selectedSlot&& (selectedSlot.sno < 31 || el.obj instanceof VOID)&&((selectedSlot.obj instanceof HELMET && el.sno==31) ||(selectedSlot.obj instanceof PANTS && el.sno==32) ||(selectedSlot.obj instanceof BOOTS && el.sno==33) ||(selectedSlot.obj instanceof ARROW && el.sno==34) || (el.sno<31||el.sno==35))){
                if(selectedSlot.obj.constructor.name != el.obj.constructor.name||r){
                    if(!r){
                        [selectedSlot.obj,el.obj]= [el.obj, selectedSlot.obj];
                        [selectedSlot.value,el.value]= [el.value, selectedSlot.value];
                        selectedSlot.selected = false;
                        if(selectedSlot != undefined){
                            selectedSlot.draw();
                        }
                        el.draw();
                        selectedSlot = undefined;
                    }
                    else if((el.obj.constructor.name == "VOID" || el.obj.constructor.name == selectedSlot.obj.constructor.name)&&!c){
                        [selectedSlot.obj,el.obj]= [selectedSlot.obj, selectedSlot.obj];
                        [selectedSlot.value,el.value]= [Math.floor(selectedSlot.value/2), Math.ceil(selectedSlot.value/2) + el.value];
                        if(selectedSlot.value == 0){
                            selectedSlot.obj = new VOID();
                        }
                        if(el.value == 0){
                            el.obj = new VOID();
                        }
                        if(selectedSlot != undefined){
                            selectedSlot.draw();
                        }
                        el.draw();
                    }
                    else if((el.obj.constructor.name == "VOID" || el.obj.constructor.name == selectedSlot.obj.constructor.name)){
                        [selectedSlot.obj,el.obj]= [selectedSlot.obj, selectedSlot.obj];
                        [selectedSlot.value,el.value]= [Math.floor(selectedSlot.value-1), Math.floor(el.value+1)];
                        if(selectedSlot.value == 0){
                            selectedSlot.obj = new VOID();
                        }
                        if(el.value == 0){
                            el.obj = new VOID();
                        }
                        selectedSlot.draw();
                        el.draw();
                    }
                }
                else if(el.obj.constructor.name == el.obj.constructor.name){
                    var a =selectedSlot.value
                    for (let i = 0; i < a ; i++) {
                        if(el.value < el.obj.stackAmount){
                            selectedSlot.value--;
                            el.value++;
                        }
                    }
                    if(selectedSlot.value <= 0){
                        selectedSlot.obj = new VOID();
                    }
                    selectedSlot.selected = false;
                    if(selectedSlot != undefined){
                        selectedSlot.draw();
                    }
                    el.draw();
                    selectedSlot = undefined;
                }
                else{
                    selectedSlot.selected = false;
                    selectedSlot.draw();
                    selectedSlot = undefined;
                }
            }
        }
    });
    if(UIName = "CRAFT"){
        if(X <= 3500 +x + 300 && X >= 3500 + x && Y <= 1600 + y + 300 && Y >= 1600 + y){
            craftingRecipeArray.forEach(el => el.craft());
        }
    }
    if(UIName = "SMELT"){
        if(X <= 3500 +x + 300 && X >= x + 3500 && Y <=  y + 1800 + 300 && Y >= y + 1800){
            furnaceRecipeArray.forEach(el => {
                el.smelt();
            });
        }
    }
}

function ClickOnClickables(X,Y){
    if(X == Math.abs(X)){
        var el = chunklist[Math.floor(X/4800)].array[((Math.floor(X/4800)*16) + Math.floor(X/300))%16][Math.abs((PlaceFormula1(Y)+3900)/300)];
        if(el.clickable){
            el.click();
        }
    }
}

function ReduceDurability(){
    if(Inventory[ss].obj instanceof TOOLS && !(Inventory[ss].obj instanceof BOW)){
        Inventory[ss].obj.durability--;
        UpdateHotBar();
        if(Inventory[ss].obj.durability <= 0){
            delete Inventory[ss].obj;
            InventoryVacuum();
            UpdateHotBar();
        }
    }
}

function give(clsnm, amount){
    if(amount){
        for (let i = 0; i < amount; i++) {
            findSlot(new clsnm(0,0,0,0));
        }
    }
    else{
        findSlot(new clsnm(0,0,0,0));
    }
    UpdateHotBar();
}