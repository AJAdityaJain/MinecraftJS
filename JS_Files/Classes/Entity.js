"use strict";
var entityArray = [];
var particleArray  = [];
var markerArray = [];
var Mobcap = 7;
var despawnRange = 6000;
var n = 0;
var e = undefined;
var ps = false;


class Entities{
    constructor(){
        this.health;
        this.speed;
        this.height;
        this.width;
        this.image;
        this.x;
        this.y;
        this.gravity = true;
        this.drop = undefined;
        this.amount = Math.floor(getRandom()*3)+1;
        this.GravityDamageSumUp = 0;
        this.dir = Math.floor(getRandom()*3)-1;
        this.sound = blankSoundaArray;
        this.randomSoundDelay = Math.floor(getRandom()*4)*1000;
        this.despawnable = true;
        this.gravitySpeed = 60;
        this.LastHeardAt = [x,y];
        this.lead = false;
        entityArray.push(this);
        for (let i = 0; i < Math.floor(getRandom()*10)+6; i++) {
            
            setTimeout(()=> {this.pathFind()}, 100*i);            
        }
        this.changeDir();

        if(Math.floor(getRandom()*2) == 0){
            this.track();
        }
        this.jumpDistance =350;
        this.jumpCooldown = false;
        this.swimSpeed =  -gravitySpeed2/4;
        this.hurtable = true;
    }

    clicked(){}
    
    render(){
        if(this.lead){
            ctx.drawImage(imageLead,this.x-50+this.width/2,this.y,100,100)
        }
        if(this.dir == -1){
            ctx.scale(-1,1);
            ctx.drawImage(this.image, -this.x-this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        }
        else{
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    clear(){
        ctx.clearRect(this.x, this.y, this.width, this.height)
    }

    ANIMATE(X, Y){
        this.x += X;
        this.y += Y;
        if(this.x <= 0){
            this.x = 0;
        }   
    }

    collide(X,Y){
        this.gravitySpeed = gravitySpeed2;
        if(Math.sign(this.x) != -1){
            var returnVal = false;
            for (let wi = 0; wi < Math.ceil(this.width/300)+2; wi++) {
                var arr = chunklist[Math.floor(Math.abs(Math.floor(this.x/300) + (wi-1))/16)].array[Math.abs(Math.floor((this.x/300)%16) + (wi-1))%16];  
                if(arr){
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr[wi].length;
                            wi = Math.ceil(this.width/300)+2;
                        }
                    }
                }
            }
            return returnVal;
        }
    }

    die(){
        new SKULLPARTICLE(this.x, this.y);
        entityArray.forEach((el,ind) => el==this?entityArray.splice(ind, 1):0);
        for (let i = 0; i < this.drop.length; i++) {
            var item = new CUSTOMITEM(this.amount, true, this.x, this.y+this.height-200, new this.drop[i]());
            if(item.obj instanceof TOOLS){
                item.obj.durability = 1 + Math.floor(getRandom()*3);
            }            
        }
        this.dieExt();
        PlaySoundFrom(this.sound[2][0], this.x)
        delete this;
    }

    dieExt(){
        console.log("RIP")
    }

    hurt(){
        
    }

    changeDir(){
        this.dir = Math.sign(((Math.floor(getRandom()*2)+1)/2)-0.6);
    }

    track(){
        
    }

    jump(){
        this.jumpCooldown = true;
        ;
        var i = 0;
        for (i = 0; i < this.jumpDistance/6; i++) {
            setTimeout(()=>{
                this.y -= 6;
                this.collide(0,1);
                this.gravity = false;   
            },1*i);
        }
        setTimeout(()=>{
            // this.x += this.speed * this.dir;
            this.collide(-this.dir,1);
            this.gravity = true;
            this.GravityDamageSumUp = 0;
        },1000);
        setTimeout(() => {
            this.jumpCooldown = false;
        }, 2000); 
    }
    
    pathFind(){
        
    }

    attackP(){

    }

    ambientSound(){
        if(Math.floor(getRandom()*3) == 0){
            ;
            setTimeout(()=>{
                PlaySoundFrom(this.sound[0][Math.floor(getRandom() * this.sound[0].length)], this.x);
            },this.randomSoundDelay);
        }
    }
}

class PASSIVE extends Entities{
    constructor(){
        super()
        this.tracking = false;
        this.range = 1.25 * 100;
    }
    
    hurt(d,playerAttack){
        if(this.hurtable){
            this.hurtable=false;
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x, this.y -100);
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){
                this.track();
                this.dir = Math.sign(this.x -STEVE.x);
                this.despawnable = false;
            }
            if(this.health <= 0){
                this.die();
            }
            this.x += 50*Math.sign(this.x- STEVE.x);
            this.collide(-Math.sign(this.x- STEVE.x),0)
            
            setTimeout(() => {
                this.hurtable = true;
            }, 600);
        }
    }

    track(){
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(!this.tracking){
                this.tracking = true;
                this.changeDir();
                ;
                for(var i = 0; i < 100; i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    pathFind(){
        if(this.lead && Math.abs(this.x-STEVE.x) > 600){
            this.dir = Math.sign(STEVE.x-this.x);
            if(Math.abs(this.x-STEVE.x) > 3000){
                this.lead = false;
                new CUSTOMITEM(1,true,this.x,this.y, new LEATHER())
            }
        }
        this.ANIMATE(this.speed*this.dir, 0);
        var col = this.collide(-this.dir,0);
        this.gravity = true;
        if(col && !this.jumpCooldown){
            this.jump();
        }
    }
}

class AGGRESSIVE extends Entities{  
    constructor(x,y){
        super()
        this.attack;
        this.tracking = false;
        this.range = 1.25 * 300;
        this.LastHeardAt = [x,y];
    }

    hurt(d,playerAttack){
        if(this.hurtable){
            this.hurtable = false;
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
            if(this.health <= 0){
                this.die();
            }
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){
                this.despawnable = false;
            }
            
            setTimeout(() => {
                this.hurtable = true;
            }, 600);
        }
    }

    track(){
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(!this.tracking){
                this.tracking = true;
                ;
                for(var i = 0; i < ((Math.abs(this.x - STEVE.x)+((-this.dir +1) * this.width)/2)/this.speed); i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    attackP(){
        if(Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.25 && Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.25 ){
            STEVE.hurt(this.attack);
        }
    }

    pathFind(){
        if(Math.abs(this.x - STEVE.x) > this.range) {
            if(this.x > STEVE.x){
                this.dir = -1;
            }
            else{
                this.dir = 1;
            }
            this.ANIMATE(this.speed*this.dir, 0);
            var col = this.collide(-this.dir,0);
            this.gravity = true;
            if(col && !this.jumpCooldown){
                this.jump();
            }
        }
        if(this.x ==0){
            this.dir = 1;
        }
    }
}

class PROJECTILE extends Entities{
    constructor(x, y, speed, speed2, byp,spm){
        super(x, y, speed, 1);
        this.x = x;
        this.y = y;
        this.width = 160;
        this.height = 50;
        this.image = imageMissing;
        this.speed = speed;
        this.speed2 =speed2-50;
        this.speedBackup = this.speed;
        this.health = 1 ;
        this.dir = Math.sign(speed);
        this.num = 7;
        if(spm == undefined){
            spm = 5;
        }
        this.int = setInterval(() => {
            this.ANIMATE((this.speed)/2,this.speed2);
            this.speed2+= spm;
            this.num ++;
            if(this.num > 30){
                this.num = 0;
                this.damage++;
            }
            // if(this.num != 0){this.num--}
        }, 50);
        this.damage= 0;
        this.byp = byp;
        // this.num = 1;
        this.swimSpeed =  30;
    }

    collide(X,Y){
        this.gravitySpeed = gravitySpeed2;

        if(chunklist[Math.floor(this.x/4800)+1] != undefined ){
            var returnVal = false;
            for (let wi = 0; wi < Math.ceil(this.width/300)+2; wi++) {
                var arr = chunklist[Math.floor(Math.abs(Math.floor(this.x/300) + (wi-1))/16)].array[Math.abs(Math.floor((this.x/300)%16) + (wi-1))%16];  
                if(arr){
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr[wi].length;
                            wi = Math.ceil(this.width/300)+2;
                        }
                    }
                }
            }
            entityArray.forEach(ent => {
                if(!(ent instanceof PROJECTILE) && !(ent instanceof BLAZE && this instanceof FIREBALL2)){
                    var A = ent.x + ent.width > this.x;
                    var B = ent.x < this.x + this.width;
                    var C = ent.y + ent.height > this.y;
                    var D = ent.y < this.y + this.height;
                    if(A && B && C && D){
                        if(ent instanceof PLAYER){
                            ps = true;
                            if(!(Inventory[34].obj instanceof SHIELD) || !STEVE.sneaking){
                                ent.hurt(this.damage);
                                this.die();
                            }
                            else if(STEVE.dir != this.dir){
                                this.dir = -this.dir;
                                this.x += this.dir*30;
                                this.speed = -(this.speed/2);
                                this.speed2 -= 10;
                            }
                            else{
                                ent.hurt(this.damage);
                                this.die();
                            }
                        }
                        else{
                            if(ent instanceof ENDERMAN){
                                ent.hurt(0,this.byp)
                                ent.Teleport(ent.x+Math.floor(getRandom() * 9600)-4800,ent.y+300)
                            }
                            else{
                                ent.hurt(this.damage, this.byp);
                                this.die();
                            }
                        }
                    }
                }
            })
            SearchAt(this.x,this.y,true,"sensor")

        }
        return returnVal;
    }

    die(){
        clearInterval( this.int)
        entityArray.forEach((el,ind) => el==this?entityArray.splice(ind, 1):0);
        delete this;
    }
}

class PLAYER extends Entities{  
    constructor(x, y, speed, health, Name){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 250;
        this.height = 500;
        this.image = imagePlayer;
        this.speed = speed;
        this.speedBackup = this.speed;
        this.health = health;
        this.attack;
        this.dir = 1;
        this.hunger = 10000;
        this.name = Name;
        this.sneaking = false;
        this.attackPower = 1;
        this.hurtable = true;
        this.attackAble = true;
        this.armour = 5;
    }

    render(){
        if(this.dir == 1){
            ctx.drawImage(this.image, this.x, this.y+(Number(this.sneaking)*50), this.width, this.height-(Number(this.sneaking)*50));

            ctx.drawImage(Inventory[ss].obj.image, this.x, this.y + this.height/2, 100,100);
            if(!this.sneaking){
                ctx.drawImage(Inventory[30].obj.image, 0,0,96.6,69,this.x,this.y,this.width,180);
            }
            else{
                ctx.drawImage(Inventory[30].obj.image, 0,0,96.6,69,this.x,this.y+80,this.width,180);
            }
            ctx.drawImage(Inventory[31].obj.image, 10,89,54,38,this.x+40,this.y+this.height-150,this.width/2 + 30,120);
            ctx.drawImage(Inventory[32].obj.image, 16,135,60,18,this.x+40,this.y+this.height-45,this.width/2 + 30,45);
            ctx.drawImage(Inventory[34].obj.image, this.x+this.width-100, this.y + this.height/2, 150,150);
        }
        else{//rl
            ctx.scale(-1,1);
            ctx.drawImage(this.image, - this.x-this.width, this.y+(Number(this.sneaking)*50), this.width, this.height-(Number(this.sneaking)*50));
            ctx.scale(-1,1);

            ctx.drawImage(Inventory[ss].obj.image, this.x+this.width, this.y + this.height/2, -100,100);
            if(!this.sneaking){
                ctx.drawImage(Inventory[30].obj.image, 23,0,96.6,69,this.x,this.y,this.width,180);
            }
            else{
                ctx.drawImage(Inventory[30].obj.image, 23,0,96.6,69,this.x,this.y+80,this.width,180);
            }
            ctx.drawImage(Inventory[31].obj.image, 64,89,54,38,this.x+55,this.y+this.height-150,this.width/2 + 30,120);
            ctx.drawImage(Inventory[32].obj.image, 58,135,60,18,this.x+55,this.y+this.height-45,this.width/2 + 30,45);
            ctx.drawImage(Inventory[34].obj.image, this.x+100, this.y + this.height/2, -150,150);
        }
        ctx.fillText(this.name, this.x - 50, this.y, this.width+100);
    }

    ANIMATE(X, Y){
        this.x += X;
        this.y += Y;
        if(this.x < 0){
            MoveCustom(68, this.speed);
        }
    }

    collide(){
        
    }

    die(){
        if(!((Inventory[34].obj instanceof TOTEMOFUNDYING)||(Inventory[ss].obj instanceof TOTEMOFUNDYING))){
            alert("You died... Their will be a gravestone with all your stuff at your death location!");
            this.health = 20;
            this.hunger = 10000;
            new GRAVE(PlaceFormula1( this.x), PlaceFormula1(this.y +300), 1,1);
            playerChunkNo = 0;
            Teleport(SpawnPoint[0], SpawnPoint[1]-300);
            Inventory.forEach(el =>{el.obj = new VOID(); el.value = 0;});
            UpdateHeartBar(10);
            UpdateFoodBar(10);
            UpdateArmourBar(10);
            UpdateHotBar();
            this.GravityDamageSumUp = 0;    
            playerChunkNo = 0;

        }
        else{
            STEVE.health = 24;
            if(Inventory[34].obj instanceof TOTEMOFUNDYING){
                Inventory[34].obj = new VOID();
                Inventory[34].value = 0;
            }
            else if(Inventory[ss].obj instanceof TOTEMOFUNDYING){
                Inventory[ss].obj = new VOID();
                Inventory[ss].value = 0;
            }
            UpdateHotBar();
            UpdateHeartBar();
        }
    }

    hurt(a){
        if(a > 0 && this.hurtable){
            this.hurtable = false;
            var abc = 0;
            if(Inventory[32].obj instanceof BOOTS){
                abc += (Inventory[32].obj.protection/100);
                Inventory[32].obj.durability-= a;
                if(Inventory[32].obj.durability <= 0){
                    Inventory[32].obj = new VOID()
                }
            }
            if(Inventory[31].obj instanceof PANTS){
                abc += (Inventory[31].obj.protection/100);
                Inventory[31].obj.durability-= a;
                if(Inventory[31].obj.durability <= 0){
                    Inventory[31].obj = new VOID()
                }
            }
            if(Inventory[30].obj instanceof HELMET){
                abc += (Inventory[30].obj.protection/100);
                Inventory[30].obj.durability-= a;
                if(Inventory[30].obj.durability <= 0){
                    Inventory[30].obj = new VOID()
                }
            }
            a = a - ((a*abc)*(9/10))
            this.health -=(a)*2;
            this.health = Math.floor(this.health*10)/10
            PlaySound(soundHurt[Math.floor(getRandom() * soundHurt.length)])
            UpdateHeartBar(Math.floor(this.health/2));
            setTimeout(() => {
                this.hurtable = true;
            }, 500);
        }
    }
    ambientSound(){}
}




class PIG extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 350;
        this.height = 400;
        this.image = imagePig;
        this.drop = [RAWPORK];
        this.amount = 1+Math.floor(getRandom()*3);
        this.sound = soundPig;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 18;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 10;
        }
    }
}

className(PIG);

class DONKEY extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 530;
        this.height = 480;
        this.image = imageDonkey;
        this.drop = [LEATHER];
        this.amount = 1+Math.floor(getRandom()*3);
        this.sound = soundDonkey;
        this.Inventory = new VOID();;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 22;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 16 + Math.floor(getRandom()*15);
        }
        this.jumpDistance = 351 + Math.floor(getRandom()*350);
        console.log(this.jumpDistance);
    }
    render(){
        if(this.lead){
            ctx.drawImage(imageLead,this.x-50+this.width/2,this.y,100,100)
        }
        if(this.dir == -1){
            ctx.scale(-1,1);
            ctx.drawImage(this.image, -this.x-this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        }
        else{
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.Inventory.image, this.x + ((-this.dir+1)/2*(this.width-200)), this.y+50, 200, 200    );
    }
    clicked(){
        if(Inventory[ss].obj instanceof CHEST){
            if(this.Inventory instanceof VOID){
                this.Inventory = new CHEST();
                Inventory[ss].value --;
                if(Inventory[ss].value == 0){
                    Inventory[ss].obj = new VOID();
                }
                UpdateHotBar();
            }
        }
        if(Inventory[ss].obj instanceof LEAD){
            if(this.lead == false){
                console.log(this.lead);
                this.lead = true
                console.log(this.lead);
                Inventory[ss].value --;
                if(Inventory[ss].value == 0){
                    Inventory[ss].obj = new VOID();
                }
            }
        }
        else if(!(this.Inventory instanceof VOID) && STEVE.sneaking){
            UIName = "STORAGE";
            INVENTORYUI(69, this.Inventory);
        }
        else if(this.lead == true){
            this.lead = false
            give(LEAD)
        }
    }
}

className(DONKEY);

class CHICKEN extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 175;
        this.height = 225;
        this.image = imageChicken;
        this.drop = [RAWCHICKEN,FEATHER];
        this.amount = 1;
        this.sound = soundChicken;


        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 18;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 4;
        }
    }
}

className(CHICKEN);


class COW extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 325;
        this.height = 350;
        this.image = imageCow;
        this.drop = [RAWBEEF,LEATHER];
        this.sound = soundCow;
        this.amount = 1+Math.floor(getRandom()*3)

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 18;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 10;
        }
    }
}

className(COW);

class SHEEP extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 367.5;
        this.height = 350;
        this.image = imageSheep;
        this.drop = [RAWMUTTON];
        this.sound = soundSheep;
        this.amount = Math.floor(getRandom()*2)+1;
        this.coat = true;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 18;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 8;
        }
    }
    render(){
        if(this.lead){
            ctx.drawImage(imageLead,this.x-50+this.width/2,this.y,100,100)
        }
        if(this.dir == -1){
            ctx.scale(-1,1);
            ctx.drawImage(this.image, -this.x-this.width, this.y, this.width, this.height);
            
            if(this.coat){
            ctx.drawImage(imageSheepCoat, -this.x - this.width, this.y+65, 310, 157.5);
            }
            ctx.scale(-1,1);
        }
        else{
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if(this.coat){
            ctx.drawImage(imageSheepCoat, this.x, this.y+65, 310, 157.5);
            }
        }
    }
    clicked(){
        if(this.coat){new CUSTOMITEM(2,true,this.x,this.y, new WOOL())}
        this.coat =false;
        setTimeout(() => {
            this.coat = true;
            this.health++;
        }, 60000);
    }
}

className(SHEEP);

class MOOSHROOM extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 325;
        this.height = 405;
        this.image = imageMooshroom;
        this.drop = [RAWBEEF,LEATHER, REDMUSHROOM];
        this.sound = soundCow;
        this.amount = 1+Math.floor(getRandom()*1)

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 18;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 10;
        }
    }
}

className(MOOSHROOM);

class GOAT extends PASSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 325;
        this.height = 405;
        this.image = imageGoat;
        this.drop = [GOATHORN,RAWMUTTON];
        this.amount = 1;
        this.sound = soundGoat;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 25;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 10;
        }
        this.jumpDistance =1000;
        if(Math.floor(getRandom()*50) == 0){
            this.jumpDistance = 300000;
        }
    }
}

className(GOAT);

class ZOMBIE extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 485;
        this.image = imageZombie;
        this.drop = [ROTTENFLESH];
        this.amount = 2;
        this.attack = 2;
        this.sound = soundZombie;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 10;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 20;
        }
    }
}

className(ZOMBIE);

class SPIDER extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 400;
        this.height = 280;
        this.image = imageSpider;
        this.drop = [STRING];
        this.amount = Math.floor(3*getRandom());
        this.attack = 2;
        this.sound = soundSpider;
        this.range = 1.25 *250

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 10;
        }
    }
    
    attackP(){
        if(Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.25 ){
            if( Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.25 ){
                STEVE.hurt(this.attack)
            }
        }
    }

    pathFind(){
        if(Math.abs(this.x - STEVE.x) > this.range) {
            if(this.x > STEVE.x){
                this.dir = -1;
            }
            else{
                this.dir = 1;
            }
            this.ANIMATE(this.speed*this.dir, 0);
            var col = this.collide(-this.dir,0);
            this.gravity = true;
            if(col && !this.jumpCooldown){
                this.y-= 100;
                this.collide(0,1);
            }
        }
        if(this.x ==0){
            this.dir = 1;
        }
    }
}

className(SPIDER);

class HUSK extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 485;
        this.image = imageHusk;
        this.drop = [ROTTENFLESH];
        this.amount = 2;
        this.attack = 3;
        this.sound = soundZombie;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 10;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 20;
        }
    }
}

className(HUSK);

class SKELETON extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 400;
        this.height = 500;
        this.image = imageSkeleton;
        this.drop = [BOW, BONE, ARROW];
        this.amount = 1;
        this.attack = 1;
        this.range = 2000;
        this.range2 = 2000;
        this.sound = soundSkeleton;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 15;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 20;
        }
    }
    attackP(){
        this.dir = Math.sign(STEVE.x - this.x);
        new ARROW2(this.x+(this.width/2)-80 +(400*this.dir),    this.y+125, 
        (Math.abs(STEVE.x - this.x)/1000*100 *this.dir ) ,(Math.abs(STEVE.y - this.y)/1000 *this.dir)/ (Math.floor(getRandom()*2)+1) ,2000);
        setTimeout(() => {
            if(ps == false){
                this.range = 1000;
            }
            else{
                ps = false;
                this.range = this.range2
            }
        }, 1000);
    }

}

className(SKELETON);

class BLAZE extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 400;
        this.image = imageBlaze;
        this.drop = [VOID];
        this.amount = 0;
        this.attack =0;
        this.range = 3000;
        this.sound = soundBlaze;
        this.rods = [];
        this.gravitySpeed = 20;

        this.rods.push(new ROD(this.x+100,this.y));

        setTimeout(() => {
            this.rods.push(new ROD(this.x+100,this.y));
        }, 750);

        setTimeout(() => {
            this.rods.push(new ROD(this.x+100,this.y));
        }, 1500);

        setTimeout(() => {
            this.rods.push(new ROD(this.x+100,this.y));
        }, 2250);

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 10;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 20;
        }
        this.attackCooldown = false;
    }
    
    hurt(d,playerAttack){
        if((d < 8 && !playerAttack) || !(playerAttack && Inventory[ss].obj instanceof DSWORD)){
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
            if(this.health <= 0){
                this.die();
            }
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){
                this.despawnable = false;
            }

        }
        else if(this.rods.length != 0){
            this.rods[0].delete();
            this.rods.splice(0,1);
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
        }
        else{
            this.die();
        }
    }
    
    ANIMATE(X, Y){
        this.x += X;
        this.y += Y;
        if(this.x <= 0){
            this.x = 0;
        }   

        this.rods.forEach(el =>{
            el.x += X;
            el.y += Y;
            if(el.x <= 0){
                el.x = 0;
            }   
        })
    }

    collide(X,Y){
        if(Math.sign(this.x) != -1){
            var returnVal = false;
            for (let wi = 0; wi < Math.ceil(this.width/300)+2; wi++) {
                var arr = chunklist[Math.floor(Math.abs(Math.floor(this.x/300) + (wi-1))/16)].array[Math.abs(Math.floor((this.x/300)%16) + (wi-1))%16];  
                if(arr){
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr[wi].length;
                            wi = Math.ceil(this.width/300)+2;
                        }
                    }
                }
            }
            return returnVal;
        }
    }

    jump(){
        this.jumpCooldown = true;
        var i = 0;
        for (i = 0; i < this.jumpDistance/6; i++) {
            setTimeout(()=>{
                this.ANIMATE(0,-6);
                this.collide(0,1);
                this.gravity = false;   
            },1*i);
        }
        setTimeout(()=>{
            this.ANIMATE(this.speed*this.dir,0);
            this.collide(-this.dir,1);
            this.gravity = true;
            this.GravityDamageSumUp = 0;
        },1000);
        setTimeout(() => {
            this.jumpCooldown = false;
        }, 2000); 
    }
    
    dieExt(){
        this.rods.forEach((el,ind) =>{
            setTimeout(() => {
                new SOUL(el.x,el.y);
                new CUSTOMITEM(1,true,el.x+el.xoffset,el.y+el.yoffset,new BLAZEROD());
                el.delete();
            }, ind*750);
        })   
    }

    attackP(){
        if(!this.attackCooldown&& this.gravity == false){
            this.dir = -Math.sign(this.x-STEVE.x);
            this.attackCooldown = true;
            this.gravity = true;
            this.gravitySpeed = -30;
            this.rods.push( new FIREPARTICLE(this.x,this.y,this.width,this.height));
            console.log(this.gravitySpeed);
            this.speed = 0.1;
            setTimeout(() => {
                for (let i = 0; i < this.rods.length+1; i++) {
                    setTimeout(() => {
                        new FIREBALL2(this.x +(this.width*((this.dir+1)/2)) -(160*((-this.dir+1)/2)),    this.y+125, 
                        (Math.abs(STEVE.x - this.x)/1000*100 *this.dir ) ,(Math.abs(STEVE.y - this.y)/1000*50 *this.dir)+50 ,0);            
                    }, 300*i);
                }
                this.gravitySpeed = 0;  
            }, 2000);
            setTimeout(() => {
                this.gravitySpeed = 10;
                this.speed = 10;
            }, 4000);
            setTimeout(() => {
                this.attackCooldown = false;
            }, 10000);
            if(this.rods.length < 4){
                this.rods.push(new ROD(this.x+100,this.y));
            }
        }
    }
}

className(BLAZE);

class SNOWGOLEM extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 500;
        this.image = imageSnowGolem;
        this.drop = [SNOWBALL];
        this.amount = Math.floor(getRandom()*16);
        this.attack = 1;
        this.range = 2000;
        this.range2 = 2000;
        this.sound = blankSoundaArray;
        this.target = undefined;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 15;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 4;
        }
    }
    
    track(){
        var djjd = [];
        entityArray.forEach(el => {
            if(Math.abs(el.x - this.x) != NaN && Math.abs(el.x - this.x) <= 4800&& !(el instanceof SNOWGOLEM)&& el instanceof AGGRESSIVE){
                djjd.push([Math.abs(el.x - this.x),el]);
            }
        })
        djjd.sort()

        if(djjd[0] != undefined){
            this.target = djjd[0][1];
        }
        else{
            this.target = undefined;
        }
        if(djjd.length >= 3){
            this.target = STEVE;
        }
        if((Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1) && this.target != undefined){
            if(!this.tracking){
                this.tracking = true;
                ;
                for(var i = 0; i < ((Math.abs(this.x - this.target.x)+((-this.dir +1) * this.width)/2)/this.speed); i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    pathFind(){
        if(this.target!= undefined &&Math.abs(this.x - this.target.x) > this.range) {
            if(this.x > this.target.x){
                this.dir = -1;
            }
            else{
                this.dir = 1;
            }
            this.ANIMATE(this.speed*this.dir, 0);
            var col = this.collide(-this.dir,0);
            this.gravity = true;
            if(col && !this.jumpCooldown){
                this.jump();
            }
        }
        if(this.x ==0){
            this.dir = 1;
        }
    }

    attackP(){
        if(this.target != undefined){
            this.dir = Math.sign(this.target.x - this.x);
            new SNOWBALL2(this.x+(this.width/2)-80 +(400*this.dir),    this.y+50, 
            Math.abs(this.target.x - this.x)/1000*100 *this.dir  ,(Math.abs(this.target.y - this.y)/1000*50 *this.dir) -20,2000).damage = 1;
            setTimeout(() => {
                if(ps == false){
                    this.range = 1000;
                }
                else{
                    ps = false;
                    this.range = this.range2
                }
            }, 1000);
        }
    }   
}

className(SNOWGOLEM);

class ENDERMAN extends AGGRESSIVE{  
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 260;
        this.height = 870;
        this.image = imageEnderman;
        this.drop = [ENDERPEARL];
        this.amount = Math.floor(getRandom()*3);
        this.attack = 4 ;
        this.range = 400;
        this.sound = soundSkeleton;
        this.aggressive = false
        this.jumpDistance = 500;
        this.stare = false;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 12;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 40;
        }
    }
    render(){
        if(this.stare || this.aggressive){
            if(this.dir == -1){
                ctx.scale(-1,1);
                ctx.drawImage(this.image, -this.x-this.width + Math.floor(getRandom()*10)-5, this.y+ Math.floor(getRandom()*10)-5, this.width, this.height);
                ctx.scale(-1,1);
            }
            else{
                ctx.drawImage(this.image, this.x+ Math.floor(getRandom()*10)-5, this.y+ Math.floor(getRandom()*10)-5, this.width, this.height);
            }
        }
        else{
            if(this.dir == -1){
                ctx.scale(-1,1);
                ctx.drawImage(this.image, -this.x-this.width, this.y, this.width, this.height);
                ctx.scale(-1,1);
            }
            else{
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }
    }

    hurt(d,playerAttack){
        if(!this.stare){
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
            if(this.health <= 0){
                this.die();
            }
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){1
                this.aggressive = true;
                this.despawnable = false;
            }
        }
    }

    track(){
        if(!this.stare){
            if(this.aggressive){
                if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
                    if(!this.tracking){
                        if(Math.abs(this.x- STEVE.x)  > this.range*2.5 && Math.floor(Math.random()*5) != 0){
                            this.Teleport(STEVE.x + (STEVE.width/2) +(STEVE.dir * 900),STEVE.y +(-1 * 900));
                        }
                        this.tracking = true;
                        for(var i = 0; i < ((Math.abs(this.x - STEVE.x)+((-this.dir +1) * this.width)/2)/this.speed); i++){
                            setTimeout(() => {
                                this.pathFind();
                            }, i *50)
                        }
                        setTimeout(() => {
                            this.tracking = false;
                        }, i *50);
                    }
                }
            }
            else{
                if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
                    if(!this.tracking){
                        this.tracking = true;
                        this.changeDir();
                        ;
                        if(Math.floor(getRandom()*3) == 0){
                            for(var i = 0; i < 100; i++){
                                setTimeout(()=>{
                                    this.pathFind();
                                }, i *50)
                            }
                        }
                        else{
                            this.Teleport(this.x + Math.floor(getRandom() * 9600)-4800,this.y+300)
                               
                        }
                        setTimeout(()=>{
                            this.tracking = false;
                        }, i *50)
                    }
                }
            }
        }
    }

    Teleport(x,y){
        for (let i = 0; i < 3; i++) {
            new DUST(this.x+Math.floor(getRandom()*this.width),this.y+Math.floor(getRandom()*this.height));
        }
        this.x = x//STEVE.x + (STEVE.width/2) +(STEVE.dir * 900);
        this.y =  y;
        this.gravity = true;
        this.collide(-this.dir,-1);
        for (let i = 0; i < 15; i++) {
            new DUST(this.x+Math.floor(getRandom()*this.width),this.y+Math.floor(getRandom()*this.height));
        }    
    }

    pathFind(){
        if(!this.stare){
            if(this.aggressive){
                if(Math.abs(this.x - STEVE.x) > this.range) {
                    if(this.x > STEVE.x){
                        this.dir = -1;
                    }
                    else{
                        this.dir = 1;
                    }
                    this.ANIMATE(this.speed*this.dir, 0);
                    var col = this.collide(-this.dir,0);
                    this.gravity = true;
                    if(col && !this.jumpCooldown){
                        this.jump();
                    }
                }
                if(this.x ==0){
                    this.dir = 1;
                }
            }
            else{
                this.ANIMATE(this.speed*this.dir, 0);
                var col = this.collide(-this.dir,0);
                this.gravity = true;
                if(col && !this.jumpCooldown){
                    this.jump();
                }
            }
        }

        
    }

    attackP(){
        if(Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.25 && Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.25  && this.aggressive){
            STEVE.hurt(this.attack);
        }
    }

    detectStare(){
        if(Math.abs(this.x-STEVE.x) < 4800){
            if(Math.abs(this.y - STEVE.y ) < 75 && ((this.x < STEVE.x&&this.dir == 1&&STEVE.dir == -1)||(this.x > STEVE.x&&this.dir == -1&&STEVE.dir == 1)) ){
                var agg = true;
                for (let i = 0; i < Math.floor(Math.abs(this.x-STEVE.x)/300); i++) {           
                    if(chunklist[Math.floor(((PlaceFormula1(STEVE.x)/300) +(-this.dir*i))/16)].array[((PlaceFormula1(STEVE.x)/300) +(-this.dir*i))%16][Math.lower(PlaceFormula1(STEVE.y)/300 + 13)].constructor.name!= "AIR"){
                        agg = false;
                    }
                }
                if(agg){
                    this.image= imageEndermanAggressive;
                    this.stare = true;
                    this.aggressive = true;
                    this.speed = 25;
                }
            }
            else{
                this.image= imageEnderman;
                this.stare = false;
            }
        }
    }
}

className(ENDERMAN);

class PIGLIN extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 500;
        this.image = imagePiglin;
        this.drop = [GAXE];
        this.amount = 1;
        this.attack = 7;
        this.sound = soundPiglin;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 16;
        }
    }
}

className(PIGLIN);

class VINDICATOR extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 380;
        this.height = 570;
        this.image = imageVindicator;
        this.drop = [IAXE];
        this.amount = 1;
        this.attack = 6.5;
        this.sound = soundVindicator;
        if(Math.floor(getRandom()*5) == 0){
            this.attack = 10;
            this.drop = [LOSTAXE]
        }
        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 24;
        }
    }
    hurt(d,playerAttack){
        if(this.hurtable){
            this.hurtable = false;
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
            if(this.health <= 0){
                this.die();
            }
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){
                this.despawnable = false;
            }
            
            setTimeout(() => {
                this.hurtable = true;
            }, 600);
            angerRaid = true;
            raid.forEach(el => {
                console.log(el);
                el.speed =20;
                el.vex = 0;
            })
            raid = [];
        }
    }
    track(){
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(this.speed != 0 && !this.tracking){
                this.tracking = true;
                ;
                for(var i = 0; i < ((Math.abs(this.x - STEVE.x)+((-this.dir +1) * this.width)/2)/this.speed); i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    die(){
        new SKULLPARTICLE(this.x, this.y);
        entityArray.forEach((el,ind) => el==this?entityArray.splice(ind, 1):0);
        for (let i = 0; i < this.drop.length; i++) {
            var item = new CUSTOMITEM(this.amount, true, this.x, this.y+this.height-200, new this.drop[i]());
        }
        this.dieExt();
        PlaySoundFrom(this.sound[2][0], this.x)
        delete this;
    }
}

className(VINDICATOR);

class CREEPER extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 400;
        this.image = imageCreeper;
        this.drop = [GUNPOWDER];
        this.amount = Math.floor(getRandom()*3);
        this.attack = 0;
        this.sound = soundCreeper;
        this.attackCooldown = false;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 10;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 20;
        }
    }
    
    ambientSound(){}

    attackP(){
        if(!this.attackCooldown &&Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.25 && Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.75 ){
            this.image= imageCreeper2
            this.attackCooldown = true;
            this.speed = 0;
            PlaySoundFrom(soundFuse,this.x);
            setTimeout(() => {    
                if(Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.75 && Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.75 ){
                    this.die(3);
                    new EXPLOSION(this.x,this.y);
                    this.attackCooldown = false;
                }
                else{
                    this.attackCooldown = false;
                    this.image = imageCreeper;
                }
                this.speed = 10;
            }, 1000);
        }
    }
}

className(CREEPER);

class EVOKER extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 500;
        this.image = imageEvoker;
        this.drop = [TOTEMOFUNDYING];
        this.amount = 1;
        this.attack = 1;
        this.sound = blankSoundaArray;
        this.range = 1.25 *1600;
        this.attackCooldown = 0;
        this.vex = 0;

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 24;
        }
    }
    attackP(){
        if(this.attackCooldown == 0){
            this.dir = Math.sign(STEVE.x - this.x);
            for (let i = 0; i < 1+ Math.floor(getRandom()*2) ; i++) {
                if(this.vex < 5){
                    new SKULLPARTICLE(this.x + (this.width/2) -135/2, this.y -200);
                    this.vex++;
                    e = this;
                    new VEX(this.x + Math.floor(getRandom()*500) - 250, this.y - Math.floor(getRandom()*500));          
                    new SOUL(this.x + Math.floor(getRandom()*500) - 250, this.y - Math.floor(getRandom()*500));          
                }
            }
            this.attackCooldown = 1;
        }
        else{
            this.attackCooldown--;
        }    
    }
    hurt(d,playerAttack){
        if(this.hurtable){
            this.hurtable = false;
            this.health -= d;
            new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
            if(this.health <= 0){
                this.die();
            }
            PlaySoundFrom(this.sound[1][0], this.x);
            if(playerAttack){
                this.despawnable = false;
            }
            
            setTimeout(() => {
                this.hurtable = true;
            }, 600);
            angerRaid = true;
            raid.forEach(el => {
                console.log(el);
                el.speed =20;
                el.vex = 0;
            })
            raid = [];
        }
    }
    dieExt(){
        for (let i = 0; i < 3+ Math.floor(getRandom()*2) ; i++) {
            new SKULLPARTICLE(this.x + (this.width/2) -135/2, this.y -200);
            new VEX(this.x + Math.floor(getRandom()*500) - 250, this.y - Math.floor(getRandom()*500));          
            new SOUL(this.x + Math.floor(getRandom()*500) - 250, this.y - Math.floor(getRandom()*500));          
        }
    }
    track(){
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(this.speed != 0 && !this.tracking){
                this.tracking = true;
                ;
                for(var i = 0; i < ((Math.abs(this.x - STEVE.x)+((-this.dir +1) * this.width)/2)/this.speed); i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }
}

className(EVOKER);

class VEX extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 256;
        this.height = 256;
        this.image = imageVex;
        this.drop = [VOID];
        this.amount = 0;
        this.attack = 3.5;
        this.sound = blankSoundaArray;
        this.range = 1.25 * 300;
        this.gravitySpeed = 0;
        this.dir2 = 1;
        this.numDir2 = 0;
        this.e = e;
        this.int = setTimeout(() => {
            this.die(); 
        }, 30*1000);

        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20;
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 14;
        }
    }
    collide(){}
    
    
    track(){
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(!this.tracking){
                this.tracking = true;
                if(this.x > STEVE.x){
                    this.dir = -1;
                }
                else{
                    this.dir = 1;
                }
                ;
                for(var i = 0; i < ((Math.abs(this.x - STEVE.x)+((-this.dir +1) * this.width)/2)/this.speed)*2; i++){
                    setTimeout(()=>{
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    pathFind(){ 
        this.numDir2++;
        if(this.numDir2 > 20){
            this.numDir2 = 0;
            this.dir2 = -this.dir2;
        }
        if(this.dir2 == -Math.sign(this.y - STEVE.y+100)){
            this.ANIMATE(this.speed*this.dir, this.dir2*20);
        }
        else{
            this.ANIMATE(this.speed*this.dir, this.dir2*10);
        }
    }

    dieExt(){
        this.e.vex--;
        clearInterval(this.int);
    }
    
    hurt(d){
        this.health -= d;
        if(this.health <= 0){
            this.die();
        }
    }

    die(){
        new SOUL(this.x, this.y);
        entityArray.forEach((el,ind) => el==this?entityArray.splice(ind, 1):0);
        this.dieExt();
        delete this;
    }
}

className(VEX);

class WARDEN extends AGGRESSIVE{
    constructor(x, y, speed, health){
        super(x, y, speed, health);
        this.x = x;
        this.y = y;
        this.width = 500;
        this.range = 1.25 * 500;
        this.height = 750;
        this.image = imageWarden;
        this.drop = [SOULBOTTLE];
        this.amount = 1;
        this.attack = 32;
        this.sound = soundWarden;
        this.despawnable = false;
        this.jumpDistance = 300;
        this.heartbeat = 100;
        this.hbblah = 0;
        if(speed){
            this.speed = speed;
        }
        else{
            this.speed = 20+Math.floor(getRandom()*5);
        }

        if(health){
            this.health = health;
        }
        else{
            this.health = 160;
        }
        this.attackCooldown = 0;
        this.decrease = 10;
        this.anger = 15+Math.floor(getRandom()*5);
    }

    render(){
        if(this.dir == -1){
            ctx.scale(-1,1);
            ctx.drawImage(this.image, -this.x-this.width, this.y, this.width, this.height);
            ctx.globalAlpha = this.heartbeat/100;
            ctx.drawImage(imageWardenOverlay, -this.width-this.x, this.y, this.width, this.height);
            ctx.scale(-1,1);
        }
        else{
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.globalAlpha = this.heartbeat/100;
            ctx.drawImage(imageWardenOverlay, this.x, this.y, this.width, this.height);
        }
        ctx.globalAlpha = 1;
        if(this.heartbeat > 0){
            this.heartbeat -= this.decrease;
            this.shriek();
        }
        else{
            this.hbblah += 1;
            if(this.hbblah == this.decrease*3){
                this.hbblah = 0;
                this.heartbeatstack(30);
            }
        }
    }

    heartbeatstack(a){
        if(this.heartbeat <= 0){
            this.heartbeat =a;
        }
    }

    hurt(d,playerAttack){
        this.health -= d;
        new LOSSHEARTPARTICLE(this.x+(this.width/2)-10, this.y -100);
        if(this.health <= 0){
            this.die();
        }
        PlaySoundFrom(this.sound[1][0], this.x);
        if(playerAttack){
            this.LastHeardAt = [STEVE.x,STEVE.y];
            this.despawnable = false;
        }
    }

    attackP(){
        if (this.attackCooldown == 0) {
            if(Math.abs(this.x+(this.width/2) - STEVE.x - (STEVE.width/2)) <= this.range*1.25 && Math.abs(this.y + (this.height/2) - STEVE.y - (STEVE.height/2)) <= this.range*1.25 ){
                if(Math.abs(this.x+(this.width/2) - this.LastHeardAt[0] - (STEVE.width/2)) <= this.range*1.25 && Math.abs(this.y + (this.height/2) - this.LastHeardAt[1] + (STEVE.height/2) ) <= this.range*1.25){
                    if(Math.sign(this.x-STEVE.x) != this.dir){
                        STEVE.hurt(this.attack)
                        this.amount++;
                        this.attackCooldown = 25;
                    }
                }
            }
        }
        else{
            this.attackCooldown--;
        }
    }

    pathFind(){
        if(Math.abs(this.x-this.LastHeardAt[0]) > 100){
            if(this.x > this.LastHeardAt[0]){
                this.dir = -1;
            }
            else{
                this.dir = 1;
            }
        }
        else{
            this.attackP();
        }
        n =Math.floor(((1000/   Math.abs(
            (this.x+(this.width/2))-(this.LastHeardAt[0]+(STEVE.width/2) )
            )) ** 1.6)*100)/100;
        if (n > 15) {
            n =0;
        }
        this.ANIMATE((this.speed*n)*this.dir, 0);
        var col = this.collide(-this.dir,0);
        this.gravity = true;
        if(col && !this.jumpCooldown){
            // this.jump();
            this.y-= 100;
            this.collide(0,1);
        }

        if(this.x == 0){
            this.x += 1 ;
        }
    }

    trackPlayer(){
        anger = -Infinity;
        this.dir = Math.sign(STEVE.x-this.x) ;
        this.attackP();
        if(Math.floor(this.x/4800) == playerChunkNo || Math.floor(this.x/4800) == playerChunkNo-1 || Math.floor(this.x/4800) == playerChunkNo+1){
            if(!this.tracking){
                this.tracking = true;
                for(var i = 0; i < ((Math.abs((this.x + (this.width/2)) - (this.LastHeardAt[0] + (STEVE.width/2)))-this.range)/this.speed); i++){
                    setTimeout(() => {
                        this.pathFind();
                    }, i *50)
                }
                setTimeout(()=>{
                    this.tracking = false;
                }, i *50)
            }
        }
    }

    dieExt(){
        anger = 0;
        document.getElementById("Vignette").style.opacity = 0;
    }

    shriek(){
        if(!inCooldown&& Math.abs(this.x-STEVE.x) < 3200){
            inCooldown=true;
            var intensity = (Math.floor(getRandom()*50)+50);
            for (let i = 0; i < intensity; i++) {
                setTimeout(()=>{
                    document.getElementById("Vignette").style.opacity = Math.floor((i/100)*100)/100;
                },i*20);
            }
            setTimeout(()=>{
                for (let i = intensity; i > 0; i--) {
                    setTimeout(()=>{
                        document.getElementById("Vignette").style.opacity = Math.abs((intensity/100)-( Math.floor((i/100)*100)/100));
                    },i*20);
                }
            },intensity*20*2)
            setTimeout(()=>{
                inCooldown=false;
                
            },4000)
        }
    }

    ambientSound(){}

    Sound(){
        if(this.tracking == false){
            this.anger --;
            if(this.anger == 0){
                this.drop = [VOID];
                this.die()
                this.anger = 0;
            }
        }
        if(Math.floor(getRandom()*3) == 0){
            ;
            setTimeout(()=>{
                PlaySoundFrom(this.sound[0][Math.floor(getRandom() * this.sound[0].length)], this.x);
                
            },Math.floor(5000*getRandom()));
        }
    }

    track(){}
}

className(WARDEN);

class ARROW2 extends PROJECTILE{
    constructor(x,y,speed,speed2,t,byp){
        super(x,y,speed,speed2,byp)
        this.image = imageArrow;
        this.damage = 1.25;
        this.time = t;
        if(t== undefined){
            this.time = 30000;
        }
    }
}

class SNOWBALL2 extends PROJECTILE{
    constructor(x,y,speed,speed2){
        super(x,y,speed,speed2)
        this.image = imageSnowball;
        this.height = 120;
        this.width = 120;
        this.damage = -1;
        this.time = 100;
        this.gravitySpeed = 70
    }
}

class FIREBALL2 extends PROJECTILE{
    constructor(x,y,speed,speed2,s){
        super(x,y,speed,speed2,false,s)
        this.image = imageFireball;
        this.height = 120;
        this.width = 120;
        this.damage = 4;
        this.time = 100;
        this.gravitySpeed = 0;
        PlaySoundFrom(soundFireBall,this.x)
    }
    collide(X,Y){
        if(chunklist[Math.floor(this.x/4800)+1] != undefined ){
            var returnVal = false;
            for (let wi = 0; wi < Math.ceil(this.width/300)+2; wi++) {
                var arr = chunklist[Math.floor(Math.abs(Math.floor(this.x/300) + (wi-1))/16)].array[Math.abs(Math.floor((this.x/300)%16) + (wi-1))%16];  
                if(arr){
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr[wi].length;
                            wi = Math.ceil(this.width/300)+2;
                        }
                    }
                }
            }
            entityArray.forEach(ent => {
                if(!(ent instanceof PROJECTILE) ){
                    var A = ent.x + ent.width > this.x;
                    var B = ent.x < this.x + this.width;
                    var C = ent.y + ent.height > this.y;
                    var D = ent.y < this.y + this.height;
                    if(A && B && C && D){
                        if(ent instanceof PLAYER){
                            ps = true;
                            if(!(Inventory[34].obj instanceof SHIELD) || !STEVE.sneaking){
                                ent.hurt(this.damage);
                                this.die();
                            }
                            else if(STEVE.dir != this.dir){
                                this.dir = -this.dir;
                                this.x += this.dir*30;
                                this.speed = -(this.speed/2);
                                this.speed2 -= 10;
                            }
                            else{
                                ent.hurt(this.damage);
                                this.die();
                            }
                        }
                        else{
                            if(ent instanceof ENDERMAN){
                                ent.hurt(0,this.byp)
                                ent.Teleport(ent.x+Math.floor(getRandom() * 9600)-4800,ent.y+300)
                            }
                            else{
                                ent.hurt(this.damage, this.byp);
                                this.die();
                            }
                        }
                    }
                }
            })
        }
        return returnVal;
    }
}

class ENDERPEARL2 extends PROJECTILE{
    constructor(x,y,speed,speed2){
        super(x,y,speed,speed2)
        this.image = imageEnderpearl;
        this.height = 120;
        this.width = 120;
        this.damage = 0.5;
        this.time = 0;
        this.gravitySpeed = 60
    }
    collide(X,Y){
        this.gravitySpeed = gravitySpeed2;
        if(chunklist[Math.floor(this.x/4800)+1] != undefined ){
            var returnVal = false;
            for (let wi = 0; wi < Math.ceil(this.width/300)+2; wi++) {
                var arr = chunklist[Math.floor(Math.abs(Math.floor(this.x/300) + (wi-1))/16)].array[Math.abs(Math.floor((this.x/300)%16) + (wi-1))%16];  
                if(arr){
                    for (let i = 0; i < arr.length; i++) {
                        returnVal = arr[i].entitycollide(X,Y,this);
                        if(returnVal){
                            i = arr[wi].length;
                            wi = Math.ceil(this.width/300)+2;
                        }
                    }
                }
            }
            entityArray.forEach(ent => {
                if(!(ent instanceof PROJECTILE) ){
                    var A = ent.x + ent.width > this.x;
                    var B = ent.x < this.x + this.width;
                    var C = ent.y + ent.height > this.y;
                    var D = ent.y < this.y + this.height;
                    if(A && B && C && D){
                        Teleport(this.x,this.y)
                        this.die();
                    }
                }
            })
        }
        return returnVal;
    }
}

var STEVE = new PLAYER(SpawnPoint[0], SpawnPoint[1],30, 20, "AskForName()" );

class PARTICLE{
    constructor( x, y){
        this.x = x; 
        this.y = y;
        this.width;
        this.height;
        this.image;
        this.num = 0;
        this.increament = 0;
        particleArray.push(this);
    }

    render(){
        if(this.image[Math.floor(this.num)] == undefined){
            this.delete();
            return true;
        }
        ctx.drawImage(this.image[Math.floor(this.num)], this.x,this.y, this.width, this.height);
        this.num += this.increament;    
    }

    delete(){
        particleArray.forEach((el,ind) =>{
            el==this?particleArray.splice(ind, 1):0;
        });
        delete this;
    }
}

class SKULLPARTICLE extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = 135;
        this.height = 207;
        this.image = particleMaker("dead",3);
        this.increament = 0.25  ;
    }
}

class LOSSHEARTPARTICLE extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.image = particleMaker("heartloss",3);
        this.increament = 0.75;
    }
}

class CAMPFIREOUTLINE extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x-300; 
        this.y = y-300;
        this.width = 900;
        this.height = 900;
        this.image = [ImageCampfireOutline];
        this.increament = 0;
    }
}

class SOUL extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = 100;
        this.height = 150;
        this.image = particleMaker("soul",10);
        this.increament = 1;
    }
}

class EXPLOSION extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = 350;
        this.height = 350;
        this.image = particleMaker("explosion",12);
        this.increament = 0.5;
        PlaySoundFrom(soundExplosion,this.x);
        entityArray.forEach(el =>{
            el.hurt(
                Math.lower(1000-Math.abs(this.x- el.x)+Math.abs(this.y-el.y))/20
            );
        });
    }
    
    render(){
        if(this.image[Math.floor(this.num)] == undefined){
            this.delete();
            this.num = 11;
        }
        ctx.drawImage(this.image[Math.floor(this.num)], this.x,this.y, this.width, this.height);
        this.num += this.increament;    
    }
}

class FIREPARTICLE extends PARTICLE{
    constructor(x,y,w,h){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = particleMaker("",32);
        this.increament = 1;
    }
    
    render(){
        if(this.image[Math.floor(this.num)] == undefined){
            this.delete();
            this.num = 0;
        }
        ctx.drawImage(this.image[Math.floor(this.num)], this.x,this.y,this.width,this.height);
        this.num += this.increament;
    }
}

class SLEEPING extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = STEVE.height;
        this.height = STEVE.width;
        this.image = [imageSleeping];
        this.increament = 1/100;
    }
}

class ROD extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y+200;
        this.width = 67;
        this.height = 200;
        this.image = imageRod;
        this.increament = 0;
        var r = Math.floor(getRandom()*3)+3;
        this.speed1 = 4*r;
        this.speed2 = 2*r;
        this.xoffset = 0;
        this.yoffset = 0;
        // this.speed2 = 1;
        this.diameter1 = 100;
        this.diameter2 = 100;
        this.dir = 1;
    }
    render(){
        ctx.drawImage(this.image, this.x+this.xoffset,this.y + this.yoffset,this.width,this.height);
        this.xoffset += this.speed1;
        this.yoffset += this.speed2;
        if(this.xoffset >= this.diameter1){
            this.speed1--;
        }
        else if(this.xoffset < -this.diameter1){
            this.speed1++;
        }
        if(this.yoffset >= this.diameter2){
            this.speed2--;
        }
        else if(this.yoffset < -this.diameter2){
            this.speed2++;
        }
    }
}

class DUST extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x; 
        this.y = y+200;
        this.width = 99;
        this.height = 99;
        this.image = particleMaker("particle",8);
        this.increament = 0.25;
        var r = Math.floor(getRandom()*3)+3;
        this.speed1 = 4*r* ((Math.floor(getRandom()*2)*2)-1);
        this.speed2 = 2*r * ((Math.floor(getRandom()*2)*2)-1);
        this.xoffset = 0;
        this.yoffset = 0;
        // this.speed2 = 1;
        this.diameter1 = 100;
        this.diameter2 = 100;
        this.num = 0
    }
    render(){
        if(this.image[Math.floor(this.num)] == undefined){
            this.delete();
        }
        else{

            ctx.drawImage(this.image[Math.floor(this.num)], this.x+this.xoffset,this.y + this.yoffset,this.width,this.height);
            this.xoffset += this.speed1;
            this.yoffset += this.speed2;
            if(this.xoffset >= this.diameter1){
                this.speed1--;
            }
            else if(this.xoffset < -this.diameter1){
                this.speed1++;
            }
            if(this.yoffset >= this.diameter2){
                this.speed2--;
            }
            else if(this.yoffset < -this.diameter2){
                this.speed2++;
            }
            this.num += this.increament;
        }
    }
}

class GLINT extends PARTICLE{
    constructor(x,y,h,w){
        super(x,y)
        this.x = x; 
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = imageGlint;
        this.num = 0;
        this.increament = 4;
    }

    render(){
        ctx.drawImage(this.image, (this.num+= this.increament)%this.width, (this.num+=this.increament)%this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }   
}

class CURSEDTEXT extends PARTICLE{
    constructor(x,y){
        super(x,y)
        this.x = x+92; 
        this.y = y+185;
        this.width = 0;
        this.height = 0;
        this.increament = 0;
    }

    render(){
        ctx.fillStyle = "#D07A99";
        ctx.fillText(cursedLetter,this.x,this.y);
        ctx.fillStyle = "white";
    }
}

class MARKER{
    constructor(x,y,clas){
        this.x = x; 
        this.y = y;
        this.class = clas;
        markerArray.push(this)
    }
    remove(){
        markerArray.forEach((el,ind) => {
            if(el == this){
                markerArray.splice(ind,1);
            }
        })
    }
}
new MARKER(0,0,"OOH A SECRET, help");
function AskForName(){
    var name = prompt("Please enter your character name -").trim();
    if(name.length > 8||name.toLowerCase()  == "gourang"||name.toLowerCase()  == "gou"||name.toLowerCase()  == "god"){
        name = AskForNameAgain();
    }
    return name;
}

function AskForNameAgain(){
    var name = prompt("Smaller than 8 characters :p  -").trim();
    if(name.length > 8||name.toLowerCase()  == "gourang"||name.toLowerCase()  == "gou"||name.toLowerCase()  == "god"){
        name = AskForNameAgain();
    }
    return name;
}

function attackEntities(X, Y ){
    var returnVal = false;
    for (let i = 0; i < entityArray.length; i++) {
        const el = entityArray[i];
        if(!(el instanceof PLAYER) && STEVE.attackAble){
            if(X + 10 < el.x + el.width && X + 10 > el.x && Y + 10 < el.y + el.height && Y + 10 > el.y){
                if(Math.abs(el.x - STEVE.x) < playerRange && Math.abs(el.y - STEVE.y) < playerRange){
                    STEVE.attackAble = false;
                    var dhded = el.health
                    if(gravity && !onLadder  && STEVE.gravitySpeed == 60){
                        var dddw  = (1+(Math.sqrt(STEVE.GravityDamageSumUp )/2)) * STEVE.attack;
                        if(Math.round(dddw*100)/100){
                            el.hurt((Math.round(dddw*100)/100) * STEVE.attackPower * (1/1.5), true );
                        }
                        else{
                            el.hurt((STEVE.attack) * STEVE.attackPower, true);
                        }
                    }
                    else{
                        el.hurt((STEVE.attack) * STEVE.attackPower, true);
                    }
                    el.health = Math.round(el.health);
                    ReduceDurability();
                    i = entityArray.length;
                    STEVE.attackPower = 0;
                    setTimeout(() => {
                        STEVE.attackAble= true;
                    }, 300);
                }
                returnVal =  true;
            }
        }
    };
    return returnVal;
}

function EntityPathFind(){
    entityArray.forEach(el => {
        if(el.x <= 50){
            el.dir = 1;
        }
        if(el.x < 0){
            el.x = 0;
        }
        if(Math.abs(el.x - STEVE.x) < 4800){
            if(el instanceof AGGRESSIVE){
                el.track();
            }
            else if(Math.floor(getRandom()*5) == 0||el.lead){
                el.track();
            }
        }
    });
}

function Spawn_Despawn(){
    Spawn();
    Despawn();
}   

function SpawnInChunk(n){
    let chunk = chunklist[n];
    var grp = false;
    var x = (4800 * (n))+ Math.floor(getRandom()*4800)+20;
    var y = 0;

    var activeMobs = 0;
    entityArray.forEach(ent =>{
        if((Math.abs(ent.x - STEVE.x) < 6000 || ent instanceof AGGRESSIVE) && !ent instanceof PROJECTILE){
            activeMobs ++;
        }
        if(1600 > Math.abs(ent.x-x)){
            grp = true;
        }
    })

    if(activeMobs<=Mobcap){
        for (let i = 0; i < chunk.array[Math.floor(x/300)%16].length; i++) {
            const el = chunk.array[Math.floor(x/300)%16][i];
            if(el.collides){
                y = i-13;
                i = chunk.array[Math.floor(x/300)%16].length;
            }
        }
        y = (y-2)*200;
        if(daytime>180 && !grp){
            var mobArr = chunk.biome.mobs[1];
            var mobArr2 = [];
            mobArr.forEach((el,i) =>{
                for (let ind = 0; ind < chunk.biome.mobsW[1][i]; ind++) {
                    mobArr2.push(el);
                }
            })
            console.log(mobArr,mobArr2);
            if(mobArr2[0] != undefined){
                new mobArr2[Math.floor(getRandom()*mobArr2.length)](x, y);
            }
        }
        else if(!grp  &&  chunk.biome.mobs[0].length > 0){
            new chunk.biome.mobs[0][Math.floor(getRandom()*chunk.biome.mobs[0].length)](x, y);
        }
    }
}

function Spawn(){
    if(entityArray.length < Mobcap){
        if(chunklist[playerChunkNo-1]){
            SpawnInChunk(playerChunkNo-1)
        }
        if(chunklist[playerChunkNo+1]){
            SpawnInChunk(playerChunkNo+1)
        }
    }
}

function Despawn(){
    entityArray.forEach((el,i) =>{
        if((Math.abs(el.x - STEVE.x) >= despawnRange||(el instanceof PASSIVE && daytime > 180) ||(el instanceof AGGRESSIVE && daytime <180))&& el.despawnable){
            entityArray.splice(i,1);
        }
    })
}

var aggressive = [ZOMBIE,CREEPER,SKELETON,SPIDER,ENDERMAN];
var aggressiveW = [5,3,2,4,1];
var passive = [SHEEP,CHICKEN,PIG,COW];
var passiveW = [6,5,5,4];

var biomeStringArray=["PLAINS", "FOREST","MOUNTAINS","DESERT","MESA","NETHER"];
var Plains = new PLAINS();
var Forest = new FOREST();
var Mounatains = new MOUNTAINS();
var Mooshroom = new MUSHROOM();
var Desert = new DESERT();
var Mesa = new MESA(); 
var Nether = new NETHER(); 