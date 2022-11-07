registerLanguage("en-US", {
    postposition: false,
    layer: {
        base: {
            resource: "Characters",
        },
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
                    description: "Change Exponent of <b>Typing Practice</b> 0.25 → 0.5",
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
        },
        "m": {
            resource: "Message",
            baseResource: "Word",

            effectDescription: "which are boosting your word gain by ",
            effectDescriptionAfter: "",

            upgrades: {
                11: {
                    title: "#general",
                    description: "Message boost your Character generation.",
                },
                12: {
                    title: "Autocomplete",
                    description: "Message boost your Word generation.",
                },
                13: {
                    title: "Additional Keyboard",
                    description: "Unlock 4 new Word upgrades.",
                },
                21: {
                    title: "Fimally!",
                    description: "Best Messages boost Message effect",
                },
                22: {
                    title: "Discord Nitro",
                    description: "Messages are cheaper based on your Characters.",
                },
                23: {
                    title: "AI-Base Autocomplete",
                    description: "Change Exponent of <b>Autocomplete</b> 0.66 → 0.75",
                }
            },

            milestones: {
                0: {
                    requirementDescription: "5 Messages",
                    effectDescription: "Keep Word Upgrades on reset."
                },
                1: {
                    requirementDescription: "13 Messages",
                    effectDescription: "Gain 50% of Word every second.",
                },
                2: {
                    requirementDescription: "20 Messages",
                    effectDescription: "You can buy max Messages.",
                }
            }
        },
        "e": {
            resource: "Emoji",
            baseResource: "Word",

            effectDescription: "which are generate ",
            effectDescriptionAfter: " 🤔/s",

            thinking: {
                resource: "🤔",
                resourceDisplay: "You have",
                resourceDisplayAfter: "",

                effectDescription: ", which boosts Character generation by ",
                effectDescriptionAfter:"",
            },
            
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
            passiveGenPerSecond: " per second",
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
        },
        settings: {
            0: {
                0: "Save",
                1: "Autosave",
                2: "HARD RESET",
            },
            1: {
                0: "Export to clipboard",
                1: "Import",
                2: "Offline Prod",
            },
            2: {
                0: "Theme",
                1: "Show Milestone",
                2: "High-Quality Tree",
            },
            3: {
                0: "Completed Challenges",
                1: "Single-Tab Mode",
                2: "Shift-Click to Toggle Tooltips",
            },
            4: {
                0: "Language"
            }
        },
    }
})