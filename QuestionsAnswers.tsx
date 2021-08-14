export interface OnboardingQuestion {
    type: String;

    id: number;

    message: String;
}


export interface OnboardingAnswer {
    type: String;

    questionId: number | null;

    message: String;

    nextQuestionId: number | null;
}

 export const onboardingQs : Map<number, OnboardingQuestion> = new Map([
    [
      1, {
        type: 'question',
        id: 1,
        message: 'Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?',
      }
    ],
    [
      2, {
        type: 'question',
        id: 2,
        message: 'Well maybe you should get some bitches.',
      }
    ],
    [
      3, {
        type: 'question',
        id: 3,
        message: "Alright, we're gonna queue up a random text to send to a random contact, or you're going to take a shot. But first, are any contacts off limits?"
      }
    ],
    [
      4, {
        type: 'question',
        id: 4,
        message: "yEs, s0me oF mY c0ntactS aRe oFf liMiTs -- do you think we honestly care? Sucks for you, let’s get into it",
      }
    ],
    [
      5, {
        type: 'question',
        id: 5,
        message: "Fantastic. Let's get into it.",
      }
    ],
]);

export const onboardingAs : Map<number, Array<OnboardingAnswer>> = new Map([
    [
      1, [
        {
          type: 'answer',
          questionId: 1,
          message: 'Hell yes.',
          nextQuestionId: 3,
        },
        {
          type: 'answer',
          questionId: 1,
          message: "I'm still in my mom's basement...",
          nextQuestionId: 2,
        },
      ]
    ],
    [
      2, [
        {
          type: 'answer',
          questionId: 2,
          message: "Let's restart this.",
          nextQuestionId: 1,
        }
      ]
    ],
    [
      3, [
        {
          type: 'answer',
          questionId: 3,
          message: "Nah.",
          nextQuestionId: 5,
        },
        {
          type: 'answer',
          questionId: 3,
          message: "Yes. I don't want to text my ex.",
          nextQuestionId: 4,
        }
      ]
    ],
    [
      4, [
        {
          type: 'answer',
          questionId: 4,
          message: "Let's go.",
          nextQuestionId: null,
        }
      ]
    ],
    [
      5, [
        {
          type: 'answer',
          questionId: 5,
          message: "Let's go.",
          nextQuestionId: null,
        }
      ]
    ],
]);

export const successResponses = [
    "Damnnnnn, you're crazier than my old english teacher. Let's see if you can keep it up.",
    "Anything for family though right? Alright next one?",
    "Yoooooo chill chill, you're crazy. We don't even know if we're ready for your next text.",
    "Eh, I'll give it to you--but that one wasn't THAT BAD. I mean we'd probably sent it too. Ready for a harder one??",
    "**Proceeds to slow clap** Want a cookie? Look if we're being honest, we don't even like sweet stuff, so let's move onto something a bit more sour.",
    "Ah yes, the same text I sent to my kindergarden teacher a few years back. Good times. Next one?",
    "Ready for ANOTHER ONE? (DJ KHALED! WE THE BEST MUSIC...continued)",
    "lol no way I just sent that to my ex, hope she sees it 🙏 again though??",
    "Uh oh! Stinkyy! Let's get some febreeze up in here and send another one.",
    "😳 🥵 🥶 sheeeeeeeeeeeeeeeeeeeeeeeeeeeeeesh!!! What about another one?",
    "👁👅👁 yes. Next?",
    "👁👄👁..............Down for another?",
    "🤌🏻 such a spicy pizza, let's whip another one up",
    "😮😮😮😮, time to take this to another level 😼"
]


  // Not successful
export const failResponses = [
    "I bet if you went to McDonald's and you ordered a 6 piece chicken nugget and you only got 5, you'd be too afraid to ask for the extra one. Anyways let's go to the next one, MAYBE you'll get that one.",
    "I bet you sleep with a nightlight. Time to redeem yourself.",
    "me to u rn: 😀🤛 Imma give you another try though",
    "I feel like this me 🤰 THE WAY YOU'RE FUCKING ME! GET THAT SCORE UPPPPPP!",
    "🗣 your friends definitely talk shit about you. Next one dude, c'mon.",
    "🏋🏼‍♂️ <- your friends trying to pick up your lame ass, next one!",
    "🤪 so quirky not sending that, bet you like pineapple on your pizza, but we're not judging you....well actually we are but here's another chance.",
    "😞 when you hit that button it feels so good though, please?",
    "👿 CMON, YOU SHOULD'VE SENT ITTTT. Next one though at least right??"
]

  // sayings
export const sayings = [
    "Let's see the text",
    "Fuck it, let's go",
    "Let's see it",
    "Show me it",
    "I got nothing to lose",
    "Show the text",
    "Just show it already",
    "I'm ready to go",
    "? let's go already"
]