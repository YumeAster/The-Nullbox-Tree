addLayer("e", {
    name: "Emoji", 
    symbol: "E", 
    row: 1,
    position: 1, 
    branches: ['w'],
    color: "#e8e651",
    resource(){ return getLangData("e.resource") }, // Name of prestige currency
    hotkeys: [
        {key: "e", description: "E: Reset for Emoji", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    // 자연스러운 번역
    objectivePostposition(){ return getLangData("e.objectivePostposition") },
    assistantPostposition(){ return getLangData("e.assistantPostposition") },
    nominativePostposition(){ return getLangData("e.nominativePostposition") },
    companionPostposition(){ return getLangData("e.companionPostposition") },

    baseResource(){ return getLangData("e.baseResource") }, // Name of resource prestige is based on
    baseAmount() { return player.w.points }, // 기본적으로 해당 레이어에 보여질 재화 식

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(1e9), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
    exponent() {
        let exp = new Decimal(2);
        return exp;
    }, // Prestige currency exponent

    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        thinking: new Decimal(0),
    }},

    // Gain
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('e', 21)) mult = mult.div(upgradeEffect('e', 21));

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    
    
    layerShown(){
        return hasUpgrade('w', 11) || player.m.unlocked;
    },

    canBuyMax(){ return false }, 

    // Emoji
    effectBase(){
        let eff = player.e.points

        return eff;
    },

    effectExp() {
        let eff = new Decimal(1)

        return eff;
    },

    effectMult() {
        let eff = new Decimal(1)

        if(hasUpgrade('e', 12)) eff = eff.times(upgradeEffect('e', 12))

        return eff
    },


    effect(){
        return this.effectBase().pow(this.effectExp()).times(this.effectMult());
    },

    // Thinking (🤔)
    thinkingBase(){
        let eff = player.e.thinking;

        return eff;
    },

    thinkingMult(){
        let eff = new Decimal(1)

        return eff;
    },

    thinkingExp() {
        let eff = new Decimal(1)

        return eff;
    },

    thinkingEff() {
        return this.thinkingBase().times(this.thinkingMult()).pow(this.thinkingExp())
    },

    // Update
    update(diff) {
        if(player.e.unlocked) player.e.thinking = player.e.thinking.plus(tmp.e.effect.times(diff))
    },

    // Display
    effectDescription(){
        return getLangData("e.effectDescription") + layerText("h2", "e", format(tmp.e.effect)) + getLangData("e.effectDescriptionAfter");
    },

    tabFormat: [
        "main-display", // 재화량 표시
        "prestige-button", // 리셋 버튼
        "blank", // 매우 아름다운 공백
        ["display-text",
            function() {
                return getLangData("e.thinking.resourceDisplay")
                    + " "
                    + layerText("h2", "e", format(player.e.thinking))
                    + getLangData("e.thinking.resource")
                    + getLangData("e.thinking.resourceDisplayAfter")
                    + getLangData("e.thinking.effectDescription")
                    + layerText("h2", "e", format(tmp.e.thinkingEff) + "x")
                    + getLangData("e.thinking.effectDescriptionAfter")
            }
        ],
        "blank",
        "milestones",
        "blank",
        "upgrades",
    ],

    // Upgrades
    upgrades: {
        11: {
            title(){ return getLangData("e.upgrades.11.title") },
            description(){ return getLangData("e.upgrades.11.description") },
            cost: new Decimal(2),
            unlocked(){
                return player.e.unlocked;
            },
            effect() {
                let eff = new Decimal(0.01).times(player.e.points)
                
                return eff;
            },
            effectDisplay(){ return boldText("+" + format(upgradeEffect('e', 11), 2)); }
        },
        12: {
            title(){ return getLangData("e.upgrades.12.title") },
            description(){ return getLangData("e.upgrades.12.description") },
            cost: new Decimal(3),
            unlocked(){
                return hasUpgrade('e', 11);
            },
            effect() {
                let eff = new Decimal(1.5).pow(player.e.points)

                return eff;
            },
            effectDisplay(){ return boldText(format(upgradeEffect('e', 12)) + "x"); }
        },
        13: {
            title(){ return getLangData("e.upgrades.13.title") },
            description(){ return getLangData("e.upgrades.13.description") },
            cost: new Decimal(4),
            unlocked(){ return hasUpgrade('e', 12) }
        },
        21: {
            title(){ return getLangData("e.upgrades.21.title") },
            description(){ return getLangData("e.upgrades.21.description") },
            cost: new Decimal(9),
            unlocked(){ return hasUpgrade('e', 13) },
            effect() {
                let eff = player.e.thinking.add(1).log10().add(1).pow(4.5)

                return eff;
            },
            effectDisplay() { return boldText("/ " + format(upgradeEffect('e', 21))) }
        }
    },

    // Milestones
    milestones: {
        0: {
            requirementDescription() { return getLangData("e.milestones.0.requirementDescription") },
            effectDescription() { return getLangData("e.milestones.0.effectDescription") },
            done(){ return player.e.best.gte(9) },
            unlocked(){ return player.e.unlocked; }
        },
    }
})