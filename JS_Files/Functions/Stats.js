var haunchpos = document.getElementById("foodbar");
var heartpos = document.getElementById("healthbar");
var armorpos = document.getElementById("armourbar");
var maxStatAmount = 10;
var hotbararray = [];
var buffer = [Math.floor(STEVE.health/2), Math.floor(STEVE.hunger/1000)];

function UpdateFoodBar(ns){
    var n = Math.floor(ns)+1;
    if(n > maxStatAmount){
        n = maxStatAmount;
    }
    if(n == Math.abs(n)){
        haunchpos.innerHTML ="";

        for (let i = 0; i < n; i++) {
            var haunch=document.createElement("img");
        
            haunch.setAttribute("id","haunch");
            haunch.src= imageHaunch.src;
            haunchpos.appendChild(haunch);
        }
        for (let i = 0; i < maxStatAmount - n; i++) {
            var haunch=document.createElement("img");
        
            haunch.setAttribute("id","haunch");
            haunch.src=imageHaunchE.src;
            haunchpos.appendChild(haunch);
        }
    }
    if(STEVE.hunger <= 0){
        STEVE.hunger = 0;
        STEVE.hurt(1)
    }
}

function UpdateHeartBar(n){
    heartpos.innerHTML = "";

    for (let i = 0; i < n; i++) {
        var heart=document.createElement("img");
    
        heart.setAttribute("id","heart");
        heart.src=imageHeart.src;
        heartpos.appendChild(heart);
    }
    for (let i = 0; i < maxStatAmount - n; i++) {
        var heart=document.createElement("img");
    
        heart.setAttribute("id","heart");
        heart.src= imageHeartE.src;
        heartpos.appendChild(heart);
    }
    if(n <= 0){
        setTimeout(() => {
            STEVE.die();            
        }, 100);
    }
}

function UpdateArmourBar(){
    var n = 0;
    if(Inventory[32].obj instanceof BOOTS){
        n += (Inventory[32].obj.protection/100);
    }
    if(Inventory[31].obj instanceof PANTS){
        n += (Inventory[31].obj.protection/100);
    }
    if(Inventory[30].obj instanceof HELMET){
        n += (Inventory[30].obj.protection/100);
    }
    n = (Math.floor(((n*100)/81) * 10));
    STEVE.armour = n;
    armorpos.innerHTML = "";

    for (let i = 0; i < STEVE.armour; i++) {
        var armour=document.createElement("img");
    
        armour.setAttribute("id","armour");
        armour.src=imageArmour .src;
        armorpos.appendChild(armour);
    }
    for (let i = 0; i < maxStatAmount - STEVE.armour; i++) {
        var armour=document.createElement("img");
    
        armour.setAttribute("id","armour");
        armour.src= imageArmourE.src;
        armorpos.appendChild(armour);
    }
}

function UpdateHotBar(){
    hotbararray.forEach((el,ind) =>{
        el.style.backgroundColor = "rgb(0, 0, 0, 0)";
        el.style.backgroundImage = "url(" + Inventory[ind].obj.image.src + ")";
        
        if(Inventory[ind].value > 1 && !(Inventory[ind].obj instanceof TOOLS)){
            el.innerHTML = Inventory[ind].value;
        }
        else if(Inventory[ind].obj instanceof TOOLS){
            el.innerHTML = '';
            var a = ((Inventory[ind].obj.durability/Inventory[ind].obj.durabilitybackup)*511);
            el.style.backgroundColor = "rgb("+(511-a)+", "+a+", 0)";
        }
        else{
            el.innerHTML = "";
        }
        l = Inventory[ind].obj.width;
        if(l <Inventory[ind].obj.height){
            l =Inventory[ind].obj.height;
        }
        
        el.style.width = (Inventory[ind].obj.width/l)*49 + "px";
        el.style.height = (Inventory[ind].obj.height/l)*49 + "px";
        el.style.marginTop =13 + "px";
        el.style.marginLeft =13 + "px";
        if(Inventory[ind].obj instanceof HELMET){
            el.style.backgroundSize = "61px 85.4px";
            el.style.backgroundPosition = "0% -30%";
            el.style.transform = "rotate(0deg)"
        }
        else if(Inventory[ind].obj instanceof PANTS){
            el.style.backgroundSize = "100px 140px";
            el.style.backgroundPosition = "10% 80%";
            el.style.transform = "rotate(0deg)"
        }
        else if(Inventory[ind].obj instanceof BOOTS){
            el.style.backgroundSize = "100px 140px";//100 140
            el.style.backgroundPosition = "100% 130%";
            el.style.transform = "rotate(180deg)";
        }
        else{
            el.style.backgroundSize = "";
            el.style.backgroundPosition = "0% 0%";
            el.style.transform = "rotate(0deg)";
        }
    })
    HotBarSlotClicked(ss);
}

function TryEat(el,x,y){
    var r;
    if(!(el instanceof Block) && !craftingUIOpen){
        r = el.consume(x,y);
        UpdateHotBar()
    }
    return r;
}

function HotBarSlotClicked(n){
    if(!craftingUIOpen){
        ss=n;
        hotbararray.forEach((el) => {
            el.parentElement.style.backgroundImage = "url('" + imageSlothotbar.src + "')";
            
        });
        var slotObj = Inventory[n].obj

        digSpeed = 1;
        chopSpeed = 1;
        mineSpeed = 1;
        STEVE.attack = 1;
        tier = 0;
        if(slotObj instanceof TOOLS){
            tier = slotObj.tier;
            if(slotObj.type == "STONE"){
                mineSpeed = slotObj.speed
            }
            if(slotObj.type == "DIRT"){
                digSpeed = slotObj.speed
            }
            if(slotObj.type == "WOOD"){
                chopSpeed = slotObj.speed
            }
            if(slotObj.type == ""){
                STEVE.attack = slotObj.speed
            }
        }

        hotbararray[n].parentElement.style.backgroundImage = "url('" + imageSelectedSlothotbar.src + "')";
        STEVE.render();
        if(Inventory[n].obj.name != ""){
            document.getElementById("name").style.opacity = "100%";
            document.getElementById("name").innerHTML = Inventory[n].obj.name;
            document.getElementById("name").style.display = "";
        }
        else{
            for (let i = 10; i >= 0; i--) {
                document.getElementById("name").style.display = "none"; 
            }
        }
    }
}

function Heal(){
    if(STEVE.hunger >= 9000 && STEVE.health < 20){
        STEVE.health ++;
        STEVE.hunger -= 250
    }
}