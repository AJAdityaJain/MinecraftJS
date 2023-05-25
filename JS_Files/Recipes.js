//SMELTING
new FURNACERECIPE(new RAWIRON(), new IRON());
new FURNACERECIPE(new RAWGOLD(), new GOLD());
new FURNACERECIPE(new LOG(), new CHARCOAL());
new FURNACERECIPE(new CLAY(), new TERRACOTTA());
new FURNACERECIPE(new CLAYBALL(), new BRICK());
new FURNACERECIPE(new COBBLESTONE(), new STONE());
new FURNACERECIPE(new STONE(), new SMOOTHSTONE());
new FURNACERECIPE(new SAND(), new GLASS());
new FURNACERECIPE(new REDSAND(), new GLASS());

new FURNACERECIPE(new RAWPORK(), new COOKEDPORK());
new FURNACERECIPE(new RAWBEEF(), new COOKEDBEEF());
new FURNACERECIPE(new RAWCHICKEN(), new COOKEDCHICKEN());
new FURNACERECIPE(new QUARTZBLOCK(), new QUARTZSMOOTHBLOCK());


//CRAFTING
new RECIPE(
    ["VOID", "VOID", "VOID",
     "VOID", "LOG", "VOID",
     "VOID", "VOID", "VOID"
    ], PLANKS,4
);

// new RECIPE(
//     ["VOID", "VOID", "VOID",
//      "VOID", imagequa, "VOID",
//      "VOID", "VOID", "VOID"
//     ], PLANKS,4
// );

new RECIPE(
    ["IRON", "VOID", "IRON",
     "VOID", "IRON", "VOID",
     "VOID", "VOID", "VOID"
    ], BUCKET,4
);

new RECIPE(
    ["VOID", "VOID", "VOID",
     "VOID", "SLABQUARTZ", "VOID",
     "VOID", "SLABQUARTZ", "VOID"
    ], QUARTZCHISELEDBLOCK,4
);

new RECIPE(
    ["VOID", "VOID", "VOID",
     "VOID", "QUARTZBLOCK", "VOID",
     "VOID", "QUARTZBLOCK", "VOID"
    ], QUARTZPILLARBLOCK,2
);

new RECIPE(
    ["VOID", "VOID", "VOID",
        "IRON", "VOID", "IRON",
        "VOID", "IRON", "VOID",
    ], BUCKET,4
);

new RECIPE(
    ["PLANKS", "IRON", "PLANKS",
        "PLANKS", "PLANKS", "PLANKS",
        "VOID", "PLANKS", "VOID",
    ], SHIELD,1
);

new RECIPE(
    ["VOID", "VOID", "VOID",
     "VOID", "PLANKS", "VOID",
     "VOID", "PLANKS", "VOID"
    ], STICK,4
);
new RECIPE(
    ["FLINT", "VOID", "VOID",
     "VOID", "IRON", "VOID",
     "VOID", "VOID", "VOID"
    ], FLINTANDSTEEL,1
);
new RECIPE(
    ["VOID", "VOID", "VOID",
     "FLINT", "IRON", "VOID",
     "VOID", "VOID", "VOID"
    ], FLINTANDSTEEL,1
);
new RECIPE(
    ["VOID", "FLINT", "VOID",
     "VOID", "STICK", "VOID",
     "VOID", "FEATHER", "VOID"
    ], ARROW,4
);
new RECIPE(
    ["VOID", "PLANKS", "VOID",
     "VOID", "PLANKS", "VOID",
     "VOID", "VOID", "VOID"
    ], STICK,4
);
new RECIPE(
    ["COBBLESTONE", "COBBLESTONE", "COBBLESTONE",
        "COBBLESTONE", "VOID", "COBBLESTONE",
     "COBBLESTONE", "COBBLESTONE", "COBBLESTONE"
    ], FURNACE,1
);
new RECIPE(
    ["STICK", "VOID", "STICK",
        "STICK", "STICK", "STICK",
        "STICK", "VOID", "STICK"
    ],LADDERS,3
);
new RECIPE(
    ["PLANKS", "PLANKS", "PLANKS",
        "PLANKS", "VOID", "PLANKS",
     "PLANKS", "PLANKS", "PLANKS"
    ], CHEST,1
);
new RECIPE(
    ["VOID", "STICK", "VOID",
        "STICK", "COAL", "STICK",
        "LOG", "LOG", "LOG"
    ], CAMPFIRE,1
);
new RECIPE(
    ["PLANKS", "STICK", "PLANKS",
        "PLANKS", "STICK", "PLANKS",
        "VOID", "VOID", "VOID"
    ], FENCES,3
);
new RECIPE(
    ["VOID", "COAL", "VOID",
        "VOID", "STICK", "VOID",
        "VOID", "STICK", "VOID"
    ], TORCH,4
);
new RECIPE(
    ["VOID", "VOID", "VOID",
        "WOOL", "WOOL", "WOOL",
        "PLANKS", "PLANKS", "PLANKS"
    ], BED,1
);

var BrickMatter = ["BRICK", "STONE", "CLAYBALL", "GRANITE", "DIORITE", "ANDESITE","GLOWSTONEDUST","QUARTZ", "QUARTZBLOCK","SNOWBALL"];
var BrickNum = [1, 4, 1,4,4,4,1,1, 4,1];
var BrickOut = [BRICKS, STONEBRICKS, CLAY,POLISHEDGRANITE, POLISHEDDIORITE, POLISHEDANDESITE,GLOWSTONE,QUARTZBLOCK, QUARTZBRICKSBLOCK,SNOW];

BrickMatter.forEach((el,ind) =>{
    new RECIPE(
        [el, el, "VOID",
        el, el, "VOID",
        "VOID", "VOID", "VOID"
        ], BrickOut[ind],BrickNum[ind]
    );
    new RECIPE(
        ["VOID", el, el,
        "VOID", el, el,
        "VOID", "VOID", "VOID"
        ], BrickOut[ind],BrickNum[ind]
    );
    new RECIPE(
        ["VOID", "VOID", "VOID",
        el, el, "VOID",
        el, el, "VOID"
        ], BrickOut[ind],BrickNum[ind]
    );
    new RECIPE(
        ["VOID", "VOID", "VOID",
        "VOID", el, el,
        "VOID", el, el
        ], BrickOut[ind],BrickNum[ind]
    );
})

//Compact BLocks recipies
var CompactItems = [[COAL,"COAL"], [RAWIRON,"RAWIRON"], [IRON,"IRON"],[RAWGOLD,"RAWGOLD"],[GOLD,"GOLD"],[GOLDNUGGET,"GOLDNUGGET"], [DIAMOND, "DIAMOND"]];
var CompactBlocks = [[COALBLOCK,"COALBLOCK"], [RAWIRONBLOCK,"RAWIRONBLOCK"], [IRONBLOCK,"IRONBLOCK"],[RAWGOLDBLOCK,"RAWGOLDBLOCK"],[GOLDBLOCK,"GOLDBLOCK"],[GOLD, "GOLD"], [DIAMONDBLOCK, "DIAMONDBLOCK"]];

CompactItems.forEach((el,ind) => {
    new RECIPE([el[1],el[1],el[1],el[1],el[1],el[1],el[1],el[1],el[1]], CompactBlocks[ind][0], 1);
});

CompactBlocks.forEach((el,ind) => {
    var emptyImageArray = ["VOID","VOID","VOID","VOID","VOID","VOID","VOID","VOID","VOID"]

    for (let i = 0; i < 9; i++) {
        emptyImageArray[i] = el[1];
        new RECIPE(emptyImageArray, CompactItems[ind][0], 9);
        emptyImageArray = ["VOID","VOID","VOID","VOID","VOID","VOID","VOID","VOID","VOID"]
    }

});

//tools n stuff
const matter = [
    ["PLANKS", WPICKAXE, WAXE, WSHOVEL, WSWORD],
    ["COBBLESTONE", SPICKAXE, SAXE, SSHOVEL, SSWORD],
    ["IRON", IPICKAXE, IAXE, ISHOVEL, ISWORD],
    ["GOLD", GPICKAXE, GAXE, GSHOVEL, GSWORD],
    ["DIAMOND", DPICKAXE, DAXE, DSHOVEL, DSWORD]
];
const matter2 = [
    ["LEATHER", LHELMET, LPANTS, LBOOTS],
    ["IRON", IHELMET, IPANTS, IBOOTS],
    ["GOLD", GHELMET, GPANTS, GBOOTS],
    ["DIAMOND", DHELMET, DPANTS, DBOOTS]
];

for (let i = 0; i < matter.length; i++) {
    var elArray = matter[i];
    var el = matter[i][0];

    new RECIPE(
        [el, el, el,
         "VOID", "STICK", "VOID",
         "VOID", "STICK", "VOID"
        ], elArray[1],1
    );

    
    new RECIPE(
        [el, el, "VOID",
        el, "STICK", "VOID",
        "VOID", "STICK", "VOID"
        ], elArray[2],1
    );
    
    new RECIPE(
        ["VOID", el, el,
            "VOID", "STICK", el,
        "VOID", "STICK", "VOID"
        ], elArray[2],1
    );
    
    
    new RECIPE(
        ["VOID", el, "VOID",
         "VOID", "STICK", "VOID",
         "VOID", "STICK", "VOID"
        ], elArray[3],1
    );    
    
    new RECIPE(
        ["VOID", el, "VOID",
         "VOID", el, "VOID",
         "VOID", "STICK", "VOID"
        ], elArray[4],1
    );
    new RECIPE(
        ["VOID", el, "VOID",
         "VOID", el, "VOID",
         "VOID", "VOID", "VOID"
        ], elArray[4],1
    );
}

for (let i = 0; i < matter2.length; i++) {
    var elArray = matter2[i];
    var el = matter2[i][0];
    
    new RECIPE(
        [el, el, el,
         el, "VOID", el,
         "VOID", "VOID", "VOID"
        ], elArray[1],1
    );

    
    new RECIPE(
        [el, el, el,
        el, "VOID", el,
        el, "VOID", el
        ], elArray[2],1
    );
    
    new RECIPE(
        ["VOID", "VOID", "VOID",
        el, "VOID", el,
        el, "VOID", el
        ], elArray[3],1
    );
    
}
