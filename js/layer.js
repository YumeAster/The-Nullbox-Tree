addLayer("w", {
    name: "Word", 
    symbol: "W", 
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#c2c2c2",
    resource: "Word", // Name of prestige currency

    baseResource: "characters", // Name of resource prestige is based on
    baseAmount() { return player.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(2), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent: 0.5, // Prestige currency exponent

    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('w', 13)) mult = mult.times(2)
        if(player.c.unlocked) mult = mult.times(tmp.c.effect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Mute Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Welcome Message",
            description: "Generate 1 character every second.",
            cost: new Decimal(1)
        },
        12: {
            title: "Fast Typing",
            description: "Double your character gain.",
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('w', 11)
            },
        },
        13: {
            title: "Mechanical Keyboard",
            description: "Double your word gain.",
            cost: new Decimal(15),
            unlocked(){
                return hasUpgrade('w', 12)
            }
        },
        14: {
            title: "Autocomplete",
            description: "Word boost Character generation.",
            cost: new Decimal(25),
            unlocked(){
                return hasUpgrade('w', 13)
            },
            effect() {
                let eff = player['w'].points.plus(1).pow(0.4);
                
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('w', 14)) + "x"; }
        }
    }
})

addLayer("c", {
    name: "Chat", 
    symbol: "C", 
    row: 1,
    position: 0, 
    branches: ["w"],
    color: "#f0f0f0",
    resource: "Chat", // Name of prestige currency

    baseResource: "Word", // Name of resource prestige is based on
    baseAmount() { return player.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(100), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent: 0.5, // Prestige currency exponent

    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    hotkeys: [
        {key: "c", description: "C: Reset for Mute Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){
        return hasUpgrade('w', 11) || player.c.unlocked;
    },

    effect(){
        let eff = new Decimal(1.05);
        eff = eff.pow(player.c.points)
        return eff;
    },

    effectDescription(){
        return "which are boosting your word gain by " + layerText("h2", "c", format(tmp.c.effect)) + "x";
    },

    upgrades: {

    }
})
