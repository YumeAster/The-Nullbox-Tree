registerLanguage("en-US", {
    postposition: false,
    layer: {
        "w": {
            resource: "Word",
            baseResource: "Character",

            upgrades: {
                11: {
                    title: "Welcome Message",
                    description: "Generate 1 character every second.",
                },
                12: {
                    title: "Typing",
                    description: "Double your character gain.",
                },
                13: {
                    title: "Mechanical Keyboard",
                    description: "Double your word gain.",
                },
                14: {
                    title: "Typing Practice",
                    description: "Word boost Character generation.",
                },
                21: {
                    title: "Fast Typing",
                    description: "Double your word gain, again.",
                },
                22: {
                    title: "Typing Master",
                    description: "Change Exponent of <b>Typing Practice</b> 0.25 -> 0.5",
                },
                23: {
                    title: "Big Data",
                    description: "Character generation is faster based on your Word upgrade bought.",
                },
                24: {
                    title: "Selfmade Disaster",
                    description: "Character boost their own generation.",
                }
            }
        }
    },
    system: {
        challenge: {
            completed: "Completed",
            exitEalry: "Exit Ealry",
            finish: "Finish",
            goal: "Goal",
            start: "Start",
            reward: "Reward",
        },
        normal: {
            achievementDefault: "You did it!",
            achievementLockDefault: "LOCKED",
            aboveBaseEffect: ", ",
            baseAmount: "You have",
            baseAmountAfter: "",
            best: "Your best",
            bestAfter: "",
            bestIs: " is",
            buttonDefault: "Click me!",
            currently: "Currently",
            passiveGen: "You are gaining",
            passiveGenAfter: "",
            passiveGenPerSecond: "per second",
            respec: "Respec",
            respecDisableConfirmation: "Disable respec confirmation",
            sellAll: "Sell All",
            sellOne: "Sell One",
            total: "You have made a total of",
            totalAfter: "",
        },
        prestige: {
            next: "Next:",
            nextAfter: "",
            nextAt: "Next at",
            nextAtAfter: "",
            req: "Req:",
            reqAfter: "",
            resetFor: "Reset for",
            resetForAfter: "" // 
        },
        upgrade: {
            cost: "Cost",
        }
    }
})