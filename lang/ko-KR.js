registerLanguage("ko-KR", {
    postposition: true,
    layer: {
        "w": {
            resource: "단어",
            baseResource: "글자",
            objectivePostposition: "를",
            assistantPostposition: "는",
            nominativePostposition: "가",
            companionPostposition: "와",

            upgrades: {
                11: {
                    title: "환영 인사",
                    description: "초당 1 글자를<br>생성합니다"
                },
                12: {
                    title: "입력중...",
                    description: "글자 획득량을<br>2배로 증가시킵니다"
                },
                13: {
                    title: "기계식 키보드",
                    description: "단어 획득량을<br>2배로 증가시킵니다"
                },
                14: {
                    title: "타자 연습",
                    description: "보유한 단어가 글자<br>획득량을 증가시킵니다"
                },
                21: {
                    title: "빠른 타자",
                    description: "단어 획득량을<br>또 2배로 늘립니다",
                },
                22: {
                    title: "속기사",
                    description: "<b>타자 연습</b>의 지수를<br>0.25 → 0.5로<br>변경합니다",
                },
                23: {
                    title: "빅 데이터",
                    description: "구매한 단어 업그레이드의<br>개수에 비례하여<br>글자 생성량이 증가합니다",
                },
                24: {
                    title: "스불재",
                    description: "글자가 자기 자신의<br>생산량을 증가시킵니다",
                }
            }
        }
    },
    system: {
        challenge: {
            completed: "완료",
            exitEalry: "중단하기",
            finish: "끝내기",
            goal: "목표",
            start: "시작하기",
            reward: "보상",
        },
        normal: {
            achievementDefault: "해냈어요!",
            achievementLockDefault: "잠김",
            aboveBaseEffect: ". ",
            baseAmount: "현재",
            baseAmountAfter: " 보유중입니다.",
            best: "가장 많았던",
            bestAfter: " 입니다.",
            bestIs: "의 개수는",
            buttonDefault: "클릭!",
            currently: "현재",
            passiveGen: "현재 초당",
            passiveGenAfter: "",
            passiveGenPerSecond: " 보유중입니다.",
            respec: "재분배",
            respecDisableConfirmation: "재분배 경고창을 비활성화합니다.",
            sellAll: "모두 판매",
            sellOne: "1개 판매",
            total: "현재 누적",
            totalAfter: " 생성했습니다.",
        },
        prestige: {
            next: "",
            nextAfter: "",
            nextAt: "다음",
            nextAtAfter: "",
            req: "필요:",
            reqAfter: "",
            resetFor: "",
            resetForAfter: " 얻고 리셋합니다."  
        },
        upgrade: {
            cost: "가격",
        }
    }
})