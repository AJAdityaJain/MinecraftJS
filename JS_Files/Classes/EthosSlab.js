class SLABPLANK extends PLANKS{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABSTONE extends STONE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class ETHOSLAB extends SMOOTHSTONE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABSTONEBRICKS extends STONEBRICKS{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABBRICKS extends BRICKS{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABANDESITE extends ANDESITE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABDIORITE extends DIORITE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABGRANITE extends GRANITE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABCOBBLESTONE extends COBBLESTONE{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABQUARTZ extends QUARTZBLOCK{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}

class SLABQUARTZSMOOTH extends QUARTZSMOOTHBLOCK{
    constructor(x, y, block, commanded){
        super(x, y, block, commanded);
        Mod.CreateSlab(this);
    }
    render(){
        this.quasiRender();
    }
}


window.setTimeout(function(){
    Mod.CreateSlabRecipe(SLABPLANK,PLANKS);
    Mod.CreateSlabRecipe(SLABSTONE,STONE);
    Mod.CreateSlabRecipe(ETHOSLAB,SMOOTHSTONE);
    Mod.CreateSlabRecipe(SLABSTONEBRICKS,STONEBRICKS);
    Mod.CreateSlabRecipe(SLABBRICKS,BRICKS);
    Mod.CreateSlabRecipe(SLABANDESITE,ANDESITE);
    Mod.CreateSlabRecipe(SLABDIORITE,DIORITE);
    Mod.CreateSlabRecipe(SLABGRANITE,GRANITE);
    Mod.CreateSlabRecipe(SLABCOBBLESTONE,COBBLESTONE);
    Mod.CreateSlabRecipe(SLABQUARTZ,QUARTZBLOCK);
    Mod.CreateSlabRecipe(SLABQUARTZSMOOTH,QUARTZSMOOTHBLOCK);
},2000);