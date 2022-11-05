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

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(250), // 1개의 재화를 얻는 데 드는 양 (해금하는 양도 포함)
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
        return new Decimal(1.05).pow(player.c.points);
    },

    effectDescription(){
        return "which are boosting your word gain by <h2 style='color: #f0f0f0; text-shadow: #ded9ff 0px 0px 10px;'>" + format(player.c.effect) + "</h2>x";
    },

    upgrades: {
        11: {
            title: "Welcome Message",
            description: "Generate 1 character every second.",
            cost: new Decimal(1)
        }
    }
})
