"use strict";
var Volume = 5;
var container = 0;
var blankSound = document.createElement("AUDIO");
var blankSoundaArray = [[document.createElement("AUDIO")],[document.createElement("AUDIO")],[document.createElement("AUDIO")]];


function createSound(url) {
    var Sound = document.createElement("AUDIO");
    Sound.src = url;
    return Sound;
}

function entity(type, Name, num) {
    var x = []
    for (let i = 1; i < num+1; i++) {
        x.push(createSound("SFX/entity/"+Name+"/"+type+i+".ogg"));
    }
    return x;
}

const soundBreakStone = createSound("SFX/block/stone.ogg");
const soundBreakDirt = createSound("SFX/block/grass.ogg");
const soundBreakWood = createSound("SFX/block/wood.ogg");
const soundBreakSculk = createSound("SFX/block/sculk.ogg");
const BreakSounds = [soundBreakStone, soundBreakWood,soundBreakDirt,soundBreakSculk];

const soundVibe = createSound("SFX/block/vibe.ogg");
const soundVibeOut = createSound("SFX/block/vibeout.ogg");
const soundShriek = createSound("SFX/block/shriek.ogg");
const soundPlace = createSound("SFX/block/place.ogg");
const soundEat = createSound("SFX/block/eat.ogg");
const soundFireBall = createSound("SFX/block/fireball.ogg");
const soundClick = createSound("SFX/block/click.ogg");
const soundWater = createSound("SFX/block/swim.ogg");
const soundFire = createSound("SFX/block/fire.ogg");
const soundFall = createSound("SFX/damage/fall.ogg");
const soundHurt = [createSound("SFX/damage/hit1.ogg"),createSound("SFX/damage/hit2.ogg"),createSound("SFX/damage/hit3.ogg")];
const soundMusic = [createSound("SFX/block/beep1.wav"),createSound("SFX/block/bgm.mp3"),createSound("SFX/block/32.wav")];
const soundHorn = createSound("SFX/entity/goat/Goathorn.ogg");
const soundFuse = createSound("SFX/entity/creeper/fuse.ogg");
const soundExplosion = createSound("SFX/damage/Explosion.ogg");

const soundPig = [
    entity("say", "pig", 3),
    entity("hurt", "pig", 1),
    entity("death", "pig", 1)
];
const soundChicken = [
    entity("say", "chicken", 3),
    entity("hurt", "chicken", 1),
    entity("death", "chicken", 1)
];
const soundCow = [
    entity("say", "cow", 4),
    entity("hurt", "cow", 1),
    entity("death", "cow", 1)
];
const soundCreeper = [
    entity("say", "creeper", 0),
    entity("hurt", "creeper", 1),
    entity("death", "creeper", 1)
];
const soundDonkey = [
    entity("say", "donkey", 3),
    entity("hurt", "donkey", 1),
    entity("death", "donkey", 1)
];
const soundSheep = [
    entity("say", "sheep", 3),
    entity("hurt", "sheep", 1),
    entity("death", "sheep", 1)
];
const soundGoat = [
    entity("say", "goat", 4),
    entity("hurt", "goat", 1),
    entity("death", "goat", 1)
];
const soundZombie = [
    entity("say", "zombie", 3),
    entity("hurt", "zombie", 1),
    entity("death", "zombie", 1)
];
const soundSpider = [
    entity("say", "spider", 3),
    entity("hurt", "spider", 2),
    entity("death", "spider", 1)
];
const soundBlaze = [
    entity("say", "blaze", 3),
    entity("hurt", "blaze", 2),
    entity("death", "blaze", 1)
];
const soundSkeleton = [
    entity("say", "skeleton", 3),
    entity("hurt", "skeleton", 1),
    entity("death", "skeleton", 1)
];
const soundPiglin = [
    entity("say", "Piglin", 2),
    entity("hurt", "Piglin", 1),
    entity("death", "Piglin", 1)
];
const soundVindicator = [
    entity("say", "vindicator", 4),
    entity("hurt", "vindicator", 1),
    entity("death", "vindicator", 1)
];
const soundWarden = [
    entity("warden_whine", "warden", 2),
    entity("warden_hurt", "warden", 4),
    entity("warden_scream", "warden", 1)
];

function PlaySound(s,v){
    if(!v || v > 10){
        v = 10;
    }
    if(v < 0){
        v = 0;
    }
    container = (v - Volume);
    if(Math.sign(container) == -1 && v >0){
        container = 1
    }
    if(Math.sign(container) == -1){
        container = 0;
    }
    s.volume = container/10 ;
    s.play();
}

function PlaySoundFrom(s, x){
    PlaySound(s,Math.floor(10 - (Math.abs(STEVE.x-x)/300)));
}

function ElementSounds(){
    if(STEVE.gravitySpeed == 15){
        if(Math.floor(getRandom()*2) == 0){
            PlaySound(soundWater, 6)
        }
    }
    if(STEVE.gravitySpeed == 12){
        if(Math.floor(getRandom()*2) == 0){
            PlaySound(soundFire, 6)
        }
    }
    if(Math.floor(getRandom()*2) == 0){
        particleArray.forEach(el =>{
            if(el instanceof CAMPFIREOUTLINE){
                PlaySoundFrom(soundFire, el.x);
            }
        });
    }
}