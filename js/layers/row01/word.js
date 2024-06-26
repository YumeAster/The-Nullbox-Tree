addLayer("w", {
    name: "Word", 
    symbol: "W", 
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#c2c2c2",
    resource(){ return getLangData("w.resource") }  , // Name of prestige currency
    hotkeys: [
        {key: "w", description: "W: Reset for Word", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    // 자연스러운 번역
    objectivePostposition(){ return getLangData("w.objectivePostposition") },
    assistantPostposition(){ return getLangData("w.assistantPostposition") },
    nominativePostposition(){ return getLangData("w.nominativePostposition") },
    companionPostposition(){ return getLangData("w.companionPostposition") },

    baseResource(){ return getLangData("w.baseResource") }, // Name of resource prestige is based on
    baseAmount() { return player.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(2), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent: 0.5, // Prestige currency exponent

    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone('m', 0) && resettingLayer == 'm') keep.push("upgrades");
        if (hasMilestone('e', 0) && resettingLayer == 'e') keep.push("upgrades");
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
        if(hasUpgrade('w', 31)) mult = mult.times(3)
        if(player.m.unlocked) mult = mult.times(tmp.m.effect);
        if(hasUpgrade('m', 12)) mult = mult.times(upgradeEffect('m', 12));
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    layerShown(){ return true },

    passiveGeneration() { return hasMilestone('m', 1) ? 0.5 : 0},

    upgrades: {
        11: {
            title(){ return getLangData("w.upgrades.11.title") },
            description(){ return getLangData("w.upgrades.11.description") },
            cost: new Decimal(1)
        },
        12: {
            title(){ return getLangData("w.upgrades.12.title") },
            description(){ return getLangData("w.upgrades.12.description") },
            cost: new Decimal(5),
            unlocked(){
                return hasUpgrade('w', 11)
            },
        },
        13: {
            title(){ return getLangData("w.upgrades.13.title") },
            description(){ return getLangData("w.upgrades.13.description") },
            cost: new Decimal(10),
            unlocked(){
                return hasUpgrade('w', 12)
            }
        },
        14: {
            title(){ return getLangData("w.upgrades.14.title") },
            description(){ return getLangData("w.upgrades.14.description") },
            cost: new Decimal(20),
            unlocked(){
                return hasUpgrade('w', 13)
            },
            effect() {
                let eff = player['w'].points.plus(1)
                let exp = new Decimal(0.25)

                if(hasUpgrade('w', 22)) exp = new Decimal(0.5)
                if(hasUpgrade('w', 34)) exp = new Decimal(0.75)
                
                eff = eff.pow(exp);
                return eff;
            },
            effectDisplay(){ return boldText(format(upgradeEffect('w', 14)) + "x"); }
        },
        21: {
            title(){ return getLangData("w.upgrades.21.title") },
            description(){ return getLangData("w.upgrades.21.description") },
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('m', 13) && hasUpgrade('w', 14) }
        },
        22: {
            title(){ return getLangData("w.upgrades.22.title") },
            description(){ return getLangData("w.upgrades.22.description") },
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade('m', 13) && hasUpgrade('w', 21) }
        },
        23: {
            title(){ return getLangData("w.upgrades.23.title") },
            description(){ return getLangData("w.upgrades.23.description") },
            cost: new Decimal(7.5e4),
            unlocked(){ return hasUpgrade('m', 13) && hasUpgrade('w', 22) },
            effect() {
                let eff = new Decimal(1.5)
                eff = eff.pow(player.w.upgrades.length)
                
                return eff
            },
            effectDisplay() { return boldText(format(upgradeEffect('w', 23)) + "x") }
        },
        24: {
            title(){ return getLangData("w.upgrades.24.title") },
            description(){ return getLangData("w.upgrades.24.description") },
            cost: new Decimal(1.5e5),
            unlocked(){ return hasUpgrade('m', 13) && hasUpgrade('w', 23) },
            effect() {
                let eff = player.points.plus(1).log10()

                let exp = new Decimal(0.8)
                if(hasUpgrade('w', 32)) exp = new Decimal(1)

                eff = eff.pow(exp).plus(1)
                
                return eff
            },
            effectDisplay(){ return boldText(format(upgradeEffect('w', 24)) + "x") }
        },
        31: {
            title(){ return getLangData("w.upgrades.31.title") },
            description(){ return getLangData("w.upgrades.31.description") },
            cost: new Decimal(1e12),
            unlocked(){ return hasUpgrade('e', 13) && hasUpgrade('w', 24) },
        },
        32: {
            title(){ return getLangData("w.upgrades.32.title") },
            description(){ return getLangData("w.upgrades.32.description") },
            cost: new Decimal(1e14),
            unlocked(){ return hasUpgrade('e', 13) && hasUpgrade('w', 31) },
        },
        33: {
            title(){ return getLangData("w.upgrades.33.title") },
            description(){ return getLangData("w.upgrades.33.description") },
            cost: new Decimal(1e16),
            unlocked(){ return hasUpgrade('e', 13) && hasUpgrade('w', 32) },
        },
        34: {
            title(){ return getLangData("w.upgrades.34.title") },
            description(){
                return getLangData("w.upgrades.34.description")
                    + (hasUpgrade('w', 22) ? "0.5" : "0.25")
                    + getLangData("w.upgrades.34.descriptionAfter")
            },
            cost: new Decimal(1e18),
            unlocked(){ return hasUpgrade('e', 13) && hasUpgrade('w', 33) },
        },
    }
})