addLayer("w", {
    name: "Word", 
    symbol: "W", 
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#c2c2c2",
    resource: "Word", // Name of prestige currency
    hotkeys: [
        {key: "w", description: "W: Reset for Word", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    baseResource: "characters", // Name of resource prestige is based on
    baseAmount() { return player.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(2), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent: 0.5, // Prestige currency exponent

    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("c", 0) && resettingLayer == "c") keep.push("upgrades");
        if (layers[resettingLayer].row > this.row) layerDataReset("w", keep)
    },

    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('w', 13)) mult = mult.times(2)
        if(hasUpgrade('w', 21)) mult = mult.times(2)
        if(player.c.unlocked) mult = mult.times(tmp.c.effect);
        if(hasUpgrade('c', 12)) mult = mult.times(upgradeEffect('c', 12));
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    layerShown(){ return true },

    passiveGeneration() { return hasMilestone("c", 1) ? 0.5 : 0},

    upgrades: {
        11: {
            title: "Welcome Message",
            description: "Generate 1 character every second.",
            cost: new Decimal(1)
        },
        12: {
            title: "Typing",
            description: "Double your character gain.",
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('w', 11)
            },
        },
        13: {
            title: "Mechanical Keyboard",
            description: "Double your word gain.",
            cost: new Decimal(10),
            unlocked(){
                return hasUpgrade('w', 12)
            }
        },
        14: {
            title: "Typing Practice",
            description: "Word boost Character generation.",
            cost: new Decimal(20),
            unlocked(){
                return hasUpgrade('w', 13)
            },
            effect() {
                let eff = player['w'].points.plus(1)
                let exp = new Decimal(0.25)

                if(hasUpgrade('w', 22)) exp = new Decimal(0.5)
                
                eff = eff.pow(exp);
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('w', 14)) + "x"; }
        },
        21: {
            title: "Fast Typing",
            description: "Double your word gain, again.",
            cost: new Decimal(1000),
            unlocked() {
                return hasUpgrade('c', 13)
            }
        },
        22: {
            title: "Typing Master",
            description: "Change Exponent of <b>Typing Practice</b> 0.25 -> 0.5",
            cost: new Decimal(5000),
            unlocked() {
                return hasUpgrade('c', 13)
            }
        },
        23: {
            title: "Big Data",
            description: "Character generation is faster based on your Word upgrade bought.",
            cost: new Decimal(7.5e4),
            unlocked(){
                return hasUpgrade('c', 13)
            },
            effect() {
                let eff = new Decimal(1.5)
                eff = eff.pow(player.w.upgrades.length)
                
                return eff
            },
            effectDisplay() { return format(upgradeEffect('w', 23)) + "x" }
        },
        24: {
            title: "Selfmade Disaster",
            description: "Character boost their own generation.",
            cost: new Decimal(1.5e5),
            unlocked(){
                return hasUpgrade('c', 13)
            },
            effect() {
                let eff = player.points.plus(1).log10().pow(0.8).plus(1)
                
                return eff
            },
            effectDisplay(){ return format(upgradeEffect('w', 24)) + "x" }
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
    baseAmount() { return player.w.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(50), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent() {
        let exp = new Decimal(1.05);
        if(player.c.points.gte(new Decimal(10))) exp = new Decimal(1.12);
        return exp;
    }, // Prestige currency exponent

    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('c', 22)) mult = mult.div(upgradeEffect('c', 22));

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

    canBuyMax(){ return hasMilestone('c', 2) }, 

    effect(){
        let eff = new Decimal(1.125).pow(player.c.points)

        eff = eff.times(upgradeEffect('c', 21))
        
        return eff;
    },

    effectDescription(){
        return "which are boosting your word gain by " + layerText("h2", "c", format(tmp.c.effect)) + "x";
    },

    upgrades: {
        11: {
            title: "#general",
            description: "Chat boost your Character generation.",
            cost: new Decimal(2),
            unlocked(){
                return player.c.unlocked;
            },
            effect() {
                let eff = player.c.points.plus(4).pow(0.66);
                
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('c', 11)) + "x"; }
        },
        12: {
            title: "Autocomplete",
            description: "Chat boost your Word generation.",
            cost: new Decimal(3),
            unlocked(){
                return hasUpgrade('c', 11);
            },
            effect(){
                let eff = player.c.points.plus(2)
                let exp = new Decimal(0.66)
                
                if(hasUpgrade('c', 23)) exp = new Decimal(0.75)

                eff = eff.pow(exp)
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('c', 12)) + "x"; }
        },
        13: {
            title: "Additional Keyboard",
            description: "Unlock 4 new Word upgrades.",
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('c', 12);
            }
        },
        21: {
            title: "Fimally!",
            description: "Best Chats boost Chat effect",
            cost: new Decimal(11),
            unlocked(){
                return hasUpgrade('c', 13);
            },
            effect(){
                let eff = player.c.best.plus(1).pow(0.2)

                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('c', 21)) + "x" }
        },
        22: {
            title: "Discord Nitro",
            description: "Chats are cheaper based on your characters.",
            cost: new Decimal(16),
            effect(){
                let eff = player.points.add(1).log(10).add(1).pow(2.75)

                return eff
            },
            effectDisplay(){ return "/" + format(upgradeEffect('c', 22))},
            unlocked(){
                return hasUpgrade('c', 13)
            }
        },
        23: {
            title: "AI-Base Autocomplete",
            description: "Change Exponent of <b>Autocomplete</b> 0.66 -> 0.75",
            cost: new Decimal(21),
            unlocked(){
                return hasUpgrade('c', 13)
            }
        }
    },

    milestones: {
        0: {
            requirementDescription: "5 Chats",
            done(){ return player.c.best.gte(5) },
            effectDescription: "Keep Word Upgrades on reset.",
            unlocked(){ return player.c.unlocked; }
        },
        1: {
            requirementDescription: "13 Chats",
            done() { return player.c.best.gte(13) },
            effectDescription: "Gain 50% of Word every second.",
            unlocked(){ return player.c.unlocked; }
        },
        2: {
            requirementDescription: "20 Chats",
            done() {return player.c.best.gte(20) },
            effectDescription: "You can buy max Chats.",
            unlocked(){ return player.c.unlocked; }
        }
    }
})
