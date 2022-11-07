addLayer("m", {
    name: "Message", 
    symbol: "M", 
    row: 1,
    position: 0, 
    branches: ['w'],
    color: "#f0f0f0",
    resource(){ return getLangData("m.resource") }, // Name of prestige currency
    hotkeys: [
        {key: "m", description: "M: Reset for Text", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    // 자연스러운 번역
    objectivePostposition(){ return getLangData("m.objectivePostposition") },
    assistantPostposition(){ return getLangData("m.assistantPostposition") },
    nominativePostposition(){ return getLangData("m.nominativePostposition") },
    companionPostposition(){ return getLangData("m.companionPostposition") },

    baseResource(){ return getLangData("m.baseResource") }, // Name of resource prestige is based on
    baseAmount() { return player.w.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(50), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent() {
        let exp = new Decimal(1.05);
        if(player.m.points.gte(new Decimal(10))) exp = new Decimal(1.12);
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
        if(hasUpgrade('m', 22)) mult = mult.div(upgradeEffect('m', 22));

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    
    layerShown(){
        return hasUpgrade('w', 11) || player.m.unlocked;
    },

    canBuyMax(){ return hasMilestone('m', 2) }, 

    effect(){
        let eff = new Decimal(1.125)
        
        // Base
        if(player.e.unlocked) eff = eff.add(upgradeEffect('e', 11))

        // Exponent
        eff = eff.pow(player.m.points)

        // Mult
        eff = eff.times(upgradeEffect('m', 21))
        
        return eff;
    },

    effectDescription(){
        return getLangData("m.effectDescription") + layerText("h2", "m", format(tmp.m.effect) + "x") + getLangData("m.effectDescriptionAfter");
    },

    upgrades: {
        11: {
            title(){ return getLangData("m.upgrades.11.title") },
            description(){ return getLangData("m.upgrades.11.description") },
            cost: new Decimal(2),
            unlocked(){
                return player.m.unlocked;
            },
            effect() {
                let eff = player.m.points.plus(4).pow(0.66);
                
                return eff;
            },
            effectDisplay(){ return boldText(format(upgradeEffect('m', 11)) + "x"); }
        },
        12: {
            title(){ return getLangData("m.upgrades.12.title") },
            description(){ return getLangData("m.upgrades.12.description") },
            cost: new Decimal(3),
            unlocked(){
                return hasUpgrade('m', 11);
            },
            effect(){
                let eff = player.m.points.plus(2)
                let exp = new Decimal(0.66)
                
                if(hasUpgrade('m', 23)) exp = new Decimal(0.75)

                eff = eff.pow(exp)
                return eff;
            },
            effectDisplay(){ return boldText(format(upgradeEffect('m', 12)) + "x"); }
        },
        13: {
            title(){ return getLangData("m.upgrades.13.title") },
            description(){ return getLangData("m.upgrades.13.description") },
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('m', 12);
            }
        },
        21: {
            title(){ return getLangData("m.upgrades.21.title") },
            description(){ return getLangData("m.upgrades.21.description") },
            cost: new Decimal(11),
            unlocked(){
                return hasUpgrade('m', 13);
            },
            effect(){
                let eff = player.m.best.plus(1).pow(0.2)

                return eff;
            },
            effectDisplay(){ return boldText(format(upgradeEffect('m', 21)) + "x") }
        },
        22: {
            title(){ return getLangData("m.upgrades.22.title") },
            description(){ return getLangData("m.upgrades.22.description") },
            cost: new Decimal(16),
            effect(){
                let eff = player.points.add(1).log(10).add(1).pow(2.75)

                return eff
            },
            effectDisplay(){ return boldText("/ " + format(upgradeEffect('m', 22))) },
            unlocked(){
                return hasUpgrade('m', 13)
            }
        },
        23: {
            title(){ return getLangData("m.upgrades.23.title") },
            description(){ return getLangData("m.upgrades.23.description") },
            cost: new Decimal(21),
            unlocked(){
                return hasUpgrade('m', 13)
            }
        }
    },

    milestones: {
        0: {
            requirementDescription() { return getLangData("m.milestones.0.requirementDescription") },
            effectDescription() { return getLangData("m.milestones.0.effectDescription") },
            done(){ return player.m.best.gte(5) },
            unlocked(){ return player.m.unlocked; }
        },
        1: {
            requirementDescription() { return getLangData("m.milestones.1.requirementDescription") },
            effectDescription() { return getLangData("m.milestones.1.effectDescription") },
            done() { return player.m.best.gte(13) },
            unlocked(){ return player.m.unlocked; }
        },
        2: {
            requirementDescription() { return getLangData("m.milestones.2.requirementDescription") },
            effectDescription() { return getLangData("m.milestones.2.effectDescription") },
            done() {return player.m.best.gte(20) },      
            unlocked(){ return player.m.unlocked; }
        }
    }
})