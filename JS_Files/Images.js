'use strict';
Math.random = function(){return "Listen up, I have disabled math.random()... so use getRandom function"};
Math.lower = function(n){if(n<0){return 0}else{return n}}

// Fill with gradient

const imagePlayer = new Image();imagePlayer.src = "IMAGES/ENTITIES/player.png";
const imagePlayerSneaking = new Image();imagePlayerSneaking.src = "IMAGES/ENTITIES/player_Sneaking.png";
const imageSleeping = new Image();imageSleeping.src = "IMAGES/ENTITIES/sleeping.png";

const imageCow = new Image();imageCow.src = "IMAGES/ENTITIES/Cow.png";
const imageDonkey = new Image();imageDonkey.src = "IMAGES/ENTITIES/Donkey.png";

const imageMooshroom = new Image();imageMooshroom.src = "IMAGES/ENTITIES/Mooshroom.png";

const imageGoat = new Image();imageGoat.src = "IMAGES/ENTITIES/Goat.png";

const imageSheep = new Image();imageSheep.src = "IMAGES/ENTITIES/Sheep.png";

const imageSheepCoat = new Image();imageSheepCoat.src = "IMAGES/ENTITIES/SheepCoat.png";

const imageChicken = new Image();imageChicken.src = "IMAGES/ENTITIES/Chicken.png";

const imagePig = new Image();imagePig.src = "IMAGES/ENTITIES/pig.png";

const imageZombie = new Image();imageZombie.src = "IMAGES/ENTITIES/Zombie.png";

const imageSpider = new Image();imageSpider.src = "IMAGES/ENTITIES/Spider.png";
const imageBlaze = new Image();imageBlaze.src = "IMAGES/ENTITIES/Blaze.png";

const imageHusk = new Image();imageHusk.src = "IMAGES/ENTITIES/Husk.png";

const imageSkeleton = new Image();imageSkeleton.src = "IMAGES/ENTITIES/Skeleton.png";

const imageEnderman = new Image();imageEnderman.src = "IMAGES/ENTITIES/Enderman.png";
const imageEndermanAggressive = new Image();imageEndermanAggressive.src = "IMAGES/ENTITIES/EndermanAggressive.png";

const imageCreeper = new Image();imageCreeper.src = "IMAGES/ENTITIES/Creeper.png";
const imageCreeper2 = new Image();imageCreeper2.src = "IMAGES/ENTITIES/Creeper2.png";

const imageSnowGolem = new Image();imageSnowGolem.src = "IMAGES/ENTITIES/SnowGolem.png";

const imageVindicator = new Image();imageVindicator.src = "IMAGES/ENTITIES/Vindicator.png";

const imagePiglin = new Image();imagePiglin.src = "IMAGES/ENTITIES/piglin.png";

const imageEvoker = new Image();imageEvoker.src = "IMAGES/ENTITIES/Evoker.png";

const imageVex = new Image();imageVex.src = "IMAGES/ENTITIES/Vex.png";

const imageArrow = new Image();imageArrow.src = "IMAGES/ENTITIES/Arrow.png";
const imageFireball = new Image();imageFireball.src = "IMAGES/ENTITIES/Fireball.png";
const imageSnowball = new Image();imageSnowball.src = "IMAGES/ENTITIES/Snowball.png";
const imageEnderpearl = new Image();imageEnderpearl.src = "IMAGES/ENTITIES/Enderpearl.png";

const imageWarden = new Image();imageWarden.src = "IMAGES/ENTITIES/warden/Warden1.png";

const imageWardenOverlay = new Image();imageWardenOverlay.src = "IMAGES/ENTITIES/warden/overlay1.png";

var imageBed = [];
var imageBed2 = [];
var bedVar;
for (let i = 0; i < 2; i++) {
    bedVar = new Image();bedVar.src = "IMAGES/OBJECTS/BLOCKS/bed1"+(i+1)+".png";
    imageBed.push(bedVar);
    bedVar = new Image();bedVar.src = "IMAGES/OBJECTS/BLOCKS/bed2"+(i+1)+".png";
    imageBed2.push(bedVar);
}
const imageMushroomStemBlock = new Image();imageMushroomStemBlock.src = "IMAGES/OBJECTS/BLOCKS/MushroomStemBlock.png";
const imageBrownMushroomBlock = new Image();imageBrownMushroomBlock.src = "IMAGES/OBJECTS/BLOCKS/MushroomBlockBrown.png";
const imageRedMushroomBlock = new Image();imageRedMushroomBlock.src = "IMAGES/OBJECTS/BLOCKS/MushroomBlockRed.png";
const imageBrownMushroom = new Image();imageBrownMushroom.src = "IMAGES/OBJECTS/BLOCKS/MushroomBrown.png";
const imageRedMushroom = new Image();imageRedMushroom.src = "IMAGES/OBJECTS/BLOCKS/MushroomRed.png";
const imageDOSapling = new Image();imageDOSapling.src = "IMAGES/OBJECTS/BLOCKS/DarkOakSapling.png";
const imageDOLeaves = new Image();imageDOLeaves.src = "IMAGES/OBJECTS/BLOCKS/darkoakleaves.png";
const imageCactus = new Image();imageCactus.src = "IMAGES/OBJECTS/BLOCKS/cactus.png";
const imageGrassTall = new Image();imageGrassTall.src = "IMAGES/OBJECTS/BLOCKS/grass1.png";
const imageLilyOfTheValley = new Image();imageLilyOfTheValley.src = "IMAGES/OBJECTS/BLOCKS/LilyoftheValley.png";
const imageAllium = new Image();imageAllium.src = "IMAGES/OBJECTS/BLOCKS/Allium.png";
const imageOxeyeDaisy = new Image();imageOxeyeDaisy.src = "IMAGES/OBJECTS/BLOCKS/OxeyeDaisy.png";
const imageRose = new Image();imageRose.src = "IMAGES/OBJECTS/BLOCKS/Rose.png";

const ImageSculkOff = new Image();ImageSculkOff.src = "IMAGES/OBJECTS/BLOCKS/sculk_off.png";
const ImageSculkOn = new Image();ImageSculkOn.src = "IMAGES/OBJECTS/BLOCKS/sculk_On.png";
const ImageSculkBlock = new Image();ImageSculkBlock.src = "IMAGES/OBJECTS/BLOCKS/sculkBlock.png";
const ImageSculkVein = new Image();ImageSculkVein.src = "IMAGES/OBJECTS/BLOCKS/sculkvein.png";
const ImageSculkShrieker = new Image();ImageSculkShrieker.src = "IMAGES/OBJECTS/BLOCKS/sculkShrieker.png";
const ImageSculkBone = new Image();ImageSculkBone.src = "IMAGES/OBJECTS/BLOCKS/sculkbone.png";

const imageDOLog = new Image();imageDOLog.src = "IMAGES/OBJECTS/BLOCKS/darkoak.png";
const imageDOPlanks = new Image();imageDOPlanks.src = "IMAGES/OBJECTS/BLOCKS/darkoakplanks.png";
const imageLadders = new Image();imageLadders.src = "IMAGES/OBJECTS/BLOCKS/ladders.png";
const imageTorch = new Image();imageTorch.src = "IMAGES/OBJECTS/BLOCKS/torch.png";
const imageChest = new Image();imageChest.src = "IMAGES/OBJECTS/BLOCKS/chest.png";

const imageGrave = new Image();imageGrave.src = "IMAGES/OBJECTS/BLOCKS/grave.png";
// const imageBarrel = new Image();imageBarrel.src = "IMAGES/OBJECTS/BLOCKS/barrel.png";

const imagesCampfire = [];
var campfire;
for (let i = 1; i < 5; i++) {
    campfire = new Image();campfire.src = "IMAGES/OBJECTS/BLOCKS/campfire/"+String(i)+".png";
    imagesCampfire.push(campfire)
}
const ImageCampfireOutline = new Image(); ImageCampfireOutline.src = "IMAGES/OBJECTS/BLOCKS/campfire/outline.png"
const imageRod = new Image(); imageRod.src = "IMAGES/PARTICLES/Rod.png"


const imageMycelium = new Image();imageMycelium.src = "IMAGES/OBJECTS/BLOCKS/Mycelium.png";
const imageGrass = new Image();imageGrass.src = "IMAGES/OBJECTS/BLOCKS/grass.png";
const imageDirt = new Image();imageDirt.src = "IMAGES/OBJECTS/BLOCKS/dirt.png";
const imageSand = new Image();imageSand.src = "IMAGES/OBJECTS/BLOCKS/sand.png";
const imageRedSand = new Image();imageRedSand.src = "IMAGES/OBJECTS/BLOCKS/redSand.png";
const imageClay = new Image();imageClay.src = "IMAGES/OBJECTS/BLOCKS/clay.png";

const imageWater = new Image();imageWater.src = "IMAGES/OBJECTS/BLOCKS/water.png";
const imageWaterLeft = new Image();imageWaterLeft.src = "IMAGES/OBJECTS/BLOCKS/waterleft.png";
const imageWaterRight = new Image();imageWaterRight.src = "IMAGES/OBJECTS/BLOCKS/waterRight.png";

const imageLava = new Image();imageLava.src = "IMAGES/OBJECTS/BLOCKS/Lava.png";
const imageLavaLeft = new Image();imageLavaLeft.src = "IMAGES/OBJECTS/BLOCKS/Lavaleft.png";
const imageLavaRight = new Image();imageLavaRight.src = "IMAGES/OBJECTS/BLOCKS/LavaRight.png";

const imageCoalOre = new Image();imageCoalOre.src = "IMAGES/OBJECTS/BLOCKS/ore_coal.png";
const imageIronOre = new Image();imageIronOre.src = "IMAGES/OBJECTS/BLOCKS/ore_iron.png";
const imageGoldOre = new Image();imageGoldOre.src = "IMAGES/OBJECTS/BLOCKS/ore_gold.png";
const imageNetherGoldOre = new Image();imageNetherGoldOre.src = "IMAGES/OBJECTS/BLOCKS/ore_goldNether.png";
const imageQuartzOre = new Image();imageQuartzOre.src = "IMAGES/OBJECTS/BLOCKS/ore_Quartz.png";
const imageDiamondOre = new Image();imageDiamondOre.src = "IMAGES/OBJECTS/BLOCKS/ore_diamond.png";

const imageFurnace_OFF = new Image();imageFurnace_OFF.src = "IMAGES/OBJECTS/BLOCKS/furnaceUnlit.png";
const imageFurnace_ON = new Image();imageFurnace_ON.src = "IMAGES/OBJECTS/BLOCKS/furnaceLit.png";

const imageNetherrack = new Image();imageNetherrack.src = "IMAGES/OBJECTS/BLOCKS/Netherrack.png";
const imageDiorite = new Image();imageDiorite.src = "IMAGES/OBJECTS/BLOCKS/diorite.png";
const imageGranite = new Image();imageGranite.src = "IMAGES/OBJECTS/BLOCKS/granite.png";
const imageAndesite = new Image();imageAndesite.src = "IMAGES/OBJECTS/BLOCKS/andesite.png";
const imageDioritePolished = new Image();imageDioritePolished.src = "IMAGES/OBJECTS/BLOCKS/dioritePolished.png";
const imageGranitePolished = new Image();imageGranitePolished.src = "IMAGES/OBJECTS/BLOCKS/granitePolished.png";
const imageAndesitePolished = new Image();imageAndesitePolished.src = "IMAGES/OBJECTS/BLOCKS/andesitePolished.png";
const imageStone = new Image();imageStone.src = "IMAGES/OBJECTS/BLOCKS/stone.png";
const imageGlowstone = new Image();imageGlowstone.src = "IMAGES/OBJECTS/BLOCKS/Glowstone.png";
const imageMagma = new Image();imageMagma.src = "IMAGES/OBJECTS/BLOCKS/Magma.png";
const imageQuartz = new Image();imageQuartz.src = "IMAGES/OBJECTS/BLOCKS/Quartz.png";
const imageQuartzBricks = new Image();imageQuartzBricks.src = "IMAGES/OBJECTS/BLOCKS/QuartzBricks.png";
const imageQuartzChiseled = new Image();imageQuartzChiseled.src = "IMAGES/OBJECTS/BLOCKS/QuartzChiseled.png";
const imageQuartzPillar = new Image();imageQuartzPillar.src = "IMAGES/OBJECTS/BLOCKS/QuartzPillar.png";
const imageQuartzSmooth = new Image();imageQuartzSmooth.src = "IMAGES/OBJECTS/BLOCKS/QuartzSmooth.png";
const imageStoneBricks = new Image();imageStoneBricks.src = "IMAGES/OBJECTS/BLOCKS/stoneBricks.png";
const imageSmoothStone = new Image();imageSmoothStone.src = "IMAGES/OBJECTS/BLOCKS/smoothstone.png";
const imageBricks = new Image();imageBricks.src = "IMAGES/OBJECTS/BLOCKS/Bricks.png";
const imageCobbleStone = new Image();imageCobbleStone.src = "IMAGES/OBJECTS/BLOCKS/cobblestone.png";
const imageTerracottaRegular = new Image();imageTerracottaRegular.src = "IMAGES/OBJECTS/BLOCKS/terracottaReg.png";
const imageTerracottaWhite = new Image();imageTerracottaWhite.src = "IMAGES/OBJECTS/BLOCKS/terracottawhite.png";
const imageTerracottaYellow = new Image();imageTerracottaYellow.src = "IMAGES/OBJECTS/BLOCKS/terracottayellow.png";
const imageTerracottaRed = new Image();imageTerracottaRed.src = "IMAGES/OBJECTS/BLOCKS/terracottared.png";
const imageTerracottaBrown = new Image();imageTerracottaBrown.src = "IMAGES/OBJECTS/BLOCKS/terracottabrown.png";
const imageBedrock = new Image();imageBedrock.src = "IMAGES/OBJECTS/BLOCKS/bedrock.png";
const imageWool = new Image();imageWool.src = "IMAGES/OBJECTS/BLOCKS/Wool.png";
const imageSnow = new Image();imageSnow.src = "IMAGES/OBJECTS/BLOCKS/Snow.png";
const imagePumpkin = new Image();imagePumpkin.src = "IMAGES/OBJECTS/BLOCKS/Pumpkin.png";
const imageTNT = new Image();imageTNT.src = "IMAGES/ObJECTS/blocks/TNT.png";
const imageGravel = new Image();imageGravel.src = "IMAGES/ObJECTS/blocks/Gravel.png";

const imageGlass = new Image();imageGlass.src = "IMAGES/OBJECTS/BLOCKS/glass.png";

const imageRawIronBlock = new Image();imageRawIronBlock.src = "IMAGES/OBJECTS/BLOCKS/rawironblock.png";
const imageRawGoldBlock = new Image();imageRawGoldBlock.src = "IMAGES/OBJECTS/BLOCKS/rawgoldblock.png";

const imageCoalBlock = new Image();imageCoalBlock.src = "IMAGES/OBJECTS/BLOCKS/coalBlock.png";
const imageIronBlock = new Image();imageIronBlock.src = "IMAGES/OBJECTS/BLOCKS/IronBlock.png";
const imageGoldBlock = new Image();imageGoldBlock.src = "IMAGES/OBJECTS/BLOCKS/GoldBlock.png";
const imageDiamondBlock = new Image();imageDiamondBlock.src = "IMAGES/OBJECTS/BLOCKS/diamondBlock.png";

const imageUI = new Image();imageUI.src = "IMAGES/GUI/UI.png";
const imageSlot = new Image();imageSlot.src = "IMAGES/GUI/invslot.png";
const imageSelectedSlot = new Image();imageSelectedSlot.src = "IMAGES/GUI/invslotselected.png";
const imageSlothotbar = new Image();imageSlothotbar.src = "IMAGES/GUI/selectedslot.png";
const imageSelectedSlothotbar = new Image();imageSelectedSlothotbar.src = "IMAGES/GUI/slot.png";
const imageCraftButton = new Image();imageCraftButton.src = "IMAGES/GUI/CraftButton.png";
const imageArrowGUI = new Image();imageArrowGUI.src = "IMAGES/GUI/Arrow.png";
const imageShieldGUI = new Image();imageShieldGUI.src = "IMAGES/GUI/Shield.png";
const imageHelmetGUI = new Image();imageHelmetGUI.src = "IMAGES/GUI/Helmet.png";
const imagePantsGUI = new Image();imagePantsGUI.src = "IMAGES/GUI/Pants.png";
const imageBootsGUI = new Image();imageBootsGUI.src = "IMAGES/GUI/Boots.png";

const imageMissing = new Image();imageMissing.src = "IMAGES/GUI/missing.png";

const imageGlint = new Image();imageGlint.src = "IMAGES/particles/glint.png";

const imageBlank = new Image();

const imageHaunch = new Image();imageHaunch.src = "IMAGES/gui/HAUNCH.png";
const imageHaunchE = new Image();imageHaunchE.src = "IMAGES/gui/HAUNCHEmp.png";
const imageArmour = new Image();imageArmour.src = "IMAGES/gui/Armour.png";
const imageArmourE = new Image();imageArmourE.src = "IMAGES/gui/ArmourEmp.png";
const imageHeart = new Image();imageHeart.src = "IMAGES/gui/HEART.png";
const imageHeartE = new Image();imageHeartE.src = "IMAGES/gui/HEARTEmp.png";

const imageDiamond = new Image();imageDiamond.src = "IMAGES/ObJECTS/ITEMS/diamond.png";
const imageArrow2 = new Image();imageArrow2.src = "IMAGES/ObJECTS/ITEMS/Arrow.png";
const imageCoal = new Image();imageCoal.src = "IMAGES/ObJECTS/ITEMS/coal.png";
const imageCharcoal = new Image();imageCharcoal.src = "IMAGES/ObJECTS/ITEMS/charcoal.png";
const imageIron = new Image();imageIron.src = "IMAGES/ObJECTS/ITEMS/iron.png";
const imageIronRaw = new Image();imageIronRaw.src = "IMAGES/ObJECTS/ITEMS/Raw_Iron.png";
const imageGold = new Image();imageGold.src = "IMAGES/ObJECTS/ITEMS/gold.png";
const imageGoldNugget = new Image();imageGoldNugget.src = "IMAGES/ObJECTS/ITEMS/goldNugget.png";
const imageGlowstoneDust = new Image();imageGlowstoneDust.src = "IMAGES/ObJECTS/ITEMS/GlowstoneDust.png";
const imageGoldRaw = new Image();imageGoldRaw.src = "IMAGES/ObJECTS/ITEMS/Raw_Gold.png";
const imageStick = new Image();imageStick.src = "IMAGES/ObJECTS/ITEMS/stick.png";
const imageClayBall = new Image();imageClayBall.src = "IMAGES/ObJECTS/ITEMS/clayball.png";
const imageBrick = new Image();imageBrick.src = "IMAGES/ObJECTS/ITEMS/brick.png";
const imageApple = new Image();imageApple.src = "IMAGES/ObJECTS/ITEMS/apple.png";
const imageMusicDisc = new Image();imageMusicDisc.src = "IMAGES/ObJECTS/ITEMS/messenger.png";
const imageSoul = new Image();imageSoul.src = "IMAGES/ObJECTS/ITEMS/soul.png";
const imageBow = new Image();imageBow.src = "IMAGES/ObJECTS/ITEMS/Bow.png";
const imageShield = new Image();imageShield.src = "IMAGES/ObJECTS/ITEMS/Shield.png";
const imageTotemOfUndying = new Image();imageTotemOfUndying.src = "IMAGES/ObJECTS/ITEMS/TotemOfUndying.png";
const imageBlazeRod = new Image();imageBlazeRod.src = "IMAGES/ObJECTS/ITEMS/BlazeRod.png";
const imageLeather = new Image();imageLeather.src = "IMAGES/ObJECTS/ITEMS/Leather.png";
const imageQuartzItem = new Image();imageQuartzItem.src = "IMAGES/ObJECTS/ITEMS/Quartz.png";
const imageFeather = new Image();imageFeather.src = "IMAGES/ObJECTS/ITEMS/Feather.png";
const imageString = new Image();imageString.src = "IMAGES/ObJECTS/ITEMS/String.png";
const imageGunpowder = new Image();imageGunpowder.src = "IMAGES/ObJECTS/ITEMS/Gunpowder.png";
const imageFlintAndSteel = new Image();imageFlintAndSteel.src = "IMAGES/ObJECTS/ITEMS/FlintAndSteel.png";
const imageBone = new Image();imageBone.src = "IMAGES/ObJECTS/ITEMS/Bone.png";
const imageFlint = new Image();imageFlint.src = "IMAGES/ObJECTS/ITEMS/Flint.png";
const imageLead = new Image();imageLead.src = "IMAGES/ObJECTS/ITEMS/Lead.png";

const imageChicken_Raw = new Image();imageChicken_Raw.src = "IMAGES/ObJECTS/ITEMS/Chicken_Raw.png";
const imageChicken_Cooked = new Image();imageChicken_Cooked.src = "IMAGES/ObJECTS/ITEMS/Chicken_Cooked.png";

const imagePorkchop_Raw = new Image();imagePorkchop_Raw.src = "IMAGES/ObJECTS/ITEMS/Porkchop_Raw.png";
const imagePorkchop_Cooked = new Image();imagePorkchop_Cooked.src = "IMAGES/ObJECTS/ITEMS/Porkchop_Cooked.png";

const imageBeef_Raw = new Image();imageBeef_Raw.src = "IMAGES/ObJECTS/ITEMS/Beef_Raw.png";
const imageBeef_Cooked = new Image();imageBeef_Cooked.src = "IMAGES/ObJECTS/ITEMS/Beef_Cooked.png";

const imageMutton_Raw = new Image();imageMutton_Raw.src = "IMAGES/ObJECTS/ITEMS/Mutton_Raw.png";
const imageMutton_Cooked = new Image();imageMutton_Cooked.src = "IMAGES/ObJECTS/ITEMS/Mutton_Cooked.png";

const imageRottenFlesh = new Image();imageRottenFlesh.src = "IMAGES/ObJECTS/ITEMS/rottenFlesh.png";
const imageGoatHorn = new Image();imageGoatHorn.src = "IMAGES/ObJECTS/ITEMS/GoatHorn.png";

const imageBucket = new Image();imageBucket.src = "IMAGES/ObJECTS/ITEMS/bucket.png";
const imageWaterBucket = new Image();imageWaterBucket.src = "IMAGES/ObJECTS/ITEMS/waterbucket.png";
const imageLavaBucket = new Image();imageLavaBucket.src = "IMAGES/ObJECTS/ITEMS/Lavabucket.png";

const imageWSword = new Image();imageWSword.src = "IMAGES/ObJECTS/ITEMS/woodensword.png";
const imageWPickaxe = new Image();imageWPickaxe.src = "IMAGES/ObJECTS/ITEMS/woodenpickaxe.png";
const imageWShovel = new Image();imageWShovel.src = "IMAGES/ObJECTS/ITEMS/woodenshovel.png";
const imageWAxe = new Image();imageWAxe.src = "IMAGES/ObJECTS/ITEMS/woodenaxe.png";

const imageSSword = new Image();imageSSword.src = "IMAGES/ObJECTS/ITEMS/stonesword.png";
const imageSPickaxe = new Image();imageSPickaxe.src = "IMAGES/ObJECTS/ITEMS/stonepickaxe.png";
const imageSShovel = new Image();imageSShovel.src = "IMAGES/ObJECTS/ITEMS/stoneshovel.png";
const imageSAxe = new Image();imageSAxe.src = "IMAGES/ObJECTS/ITEMS/stoneaxe.png";

const imageISword = new Image();imageISword.src = "IMAGES/ObJECTS/ITEMS/ironsword.png";
const imageIPickaxe = new Image();imageIPickaxe.src = "IMAGES/ObJECTS/ITEMS/ironpickaxe.png";
const imageIShovel = new Image();imageIShovel.src = "IMAGES/ObJECTS/ITEMS/ironshovel.png";
const imageIAxe = new Image();imageIAxe.src = "IMAGES/ObJECTS/ITEMS/ironaxe.png";

const imageGSword = new Image();imageGSword.src = "IMAGES/ObJECTS/ITEMS/goldsword.png";
const imageGPickaxe = new Image();imageGPickaxe.src = "IMAGES/ObJECTS/ITEMS/goldpickaxe.png";
const imageGShovel = new Image();imageGShovel.src = "IMAGES/ObJECTS/ITEMS/goldshovel.png";
const imageGAxe = new Image();imageGAxe.src = "IMAGES/ObJECTS/ITEMS/goldaxe.png";
const imageLostAxe = new Image();imageLostAxe.src = "IMAGES/ObJECTS/ITEMS/Lostaxe.png";

const imageDSword = new Image();imageDSword.src = "IMAGES/ObJECTS/ITEMS/diamondsword.png";
const imageDPickaxe = new Image();imageDPickaxe.src = "IMAGES/ObJECTS/ITEMS/diamondpickaxe.png";
const imageDShovel = new Image();imageDShovel.src = "IMAGES/ObJECTS/ITEMS/diamondshovel.png";
const imageDAxe = new Image();imageDAxe.src = "IMAGES/ObJECTS/ITEMS/diamondaxe.png";    

const imageDiamondArmour = new Image();imageDiamondArmour.src = "IMAGES/ObJECTS/ITEMS/Armourdiamond.png";
const imageGoldArmour = new Image();imageGoldArmour.src = "IMAGES/ObJECTS/ITEMS/armourgold.png";
const imageIronArmour = new Image();imageIronArmour.src = "IMAGES/ObJECTS/ITEMS/armourIron.png";
const imageLeatherArmour = new Image();imageLeatherArmour.src = "IMAGES/ObJECTS/ITEMS/armourLeather.png";
const imageFire = particleMaker("",32);

const BreakArray = [];

for (let i = 0; i < 10; i++) {
    var brim = new Image();brim.src = "IMAGES/GUI/Break/destroy_stage_"+ (9-i).toString() +".png";
    BreakArray.push(brim);    
}

function particleMaker(str,n){
    var abcde = [];
    for (let i = 1; i < n+1; i++) {
        var imagePtest = new Image();imagePtest.src = "IMAGES/particles/"+str+i+".png";   
        abcde.push(imagePtest) 
    }
    return abcde;
}