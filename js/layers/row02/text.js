addLayer("t", {
    name: "Text", 
    symbol: "T", 
    row: 1,
    position: 0, 
    branches: ['w'],
    color: "#f0f0f0",
    resource: "Text", // Name of prestige currency

    baseResource: "Word", // Name of resource prestige is based on
    baseAmount() { return player.w.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(50), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent() {
        let exp = new Decimal(1.05);
        if(player.t.points.gte(new Decimal(10))) exp = new Decimal(1.12);
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
        if(hasUpgrade('t', 22)) mult = mult.div(upgradeEffect('t', 22));

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    hotkeys: [
        {key: "t", description: "T: Reset for Text", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){
        return hasUpgrade('w', 11) || player.t.unlocked;
    },

    canBuyMax(){ return hasMilestone('t', 2) }, 

    effect(){
        let eff = new Decimal(1.125).pow(player.t.points)

        eff = eff.times(upgradeEffect('t', 21))
        
        return eff;
    },

    effectDescription(){
        return "which are boosting your word gain by " + layerText("h2", "t", format(tmp.t.effect)) + "x";
    },

    upgrades: {
        11: {
            title: "#general",
            description: "Text boost your Character generation.",
            cost: new Decimal(2),
            unlocked(){
                return player.t.unlocked;
            },
            effect() {
                let eff = player.t.points.plus(4).pow(0.66);
                
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('t', 11)) + "x"; }
        },
        12: {
            title: "Autocomplete",
            description: "Text boost your Word generation.",
            cost: new Decimal(3),
            unlocked(){
                return hasUpgrade('t', 11);
            },
            effect(){
                let eff = player.t.points.plus(2)
                let exp = new Decimal(0.66)
                
                if(hasUpgrade('t', 23)) exp = new Decimal(0.75)

                eff = eff.pow(exp)
                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('t', 12)) + "x"; }
        },
        13: {
            title: "Additional Keyboard",
            description: "Unlock 4 new Word upgrades.",
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('t', 12);
            }
        },
        21: {
            title: "Fimally!",
            description: "Best Texts boost Text effect",
            cost: new Decimal(11),
            unlocked(){
                return hasUpgrade('t', 13);
            },
            effect(){
                let eff = player.t.best.plus(1).pow(0.2)

                return eff;
            },
            effectDisplay(){ return format(upgradeEffect('t', 21)) + "x" }
        },
        22: {
            title: "Discord Nitro",
            description: "Texts are cheaper based on your characters.",
            cost: new Decimal(16),
            effect(){
                let eff = player.points.add(1).log(10).add(1).pow(2.75)

                return eff
            },
            effectDisplay(){ return "/" + format(upgradeEffect('t', 22))},
            unlocked(){
                return hasUpgrade('t', 13)
            }
        },
        23: {
            title: "AI-Base Autocomplete",
            description: "Change Exponent of <b>Autocomplete</b> 0.66 -> 0.75",
            cost: new Decimal(21),
            unlocked(){
                return hasUpgrade('t', 13)
            }
        }
    },

    milestones: {
        0: {
            requirementDescription: "5 Texts",
            done(){ return player.t.best.gte(5) },
            effectDescription: "Keep Word Upgrades on reset.",
            unlocked(){ return player.t.unlocked; }
        },
        1: {
            requirementDescription: "13 Texts",
            done() { return player.t.best.gte(13) },
            effectDescription: "Gain 50% of Word every second.",
            unlocked(){ return player.t.unlocked; }
        },
        2: {
            requirementDescription: "20 Texts",
            done() {return player.t.best.gte(20) },
            effectDescription: "You can buy max Texts.",
            unlocked(){ return player.t.unlocked; }
        }
    }
})