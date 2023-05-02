let newQ = document.querySelector("#newQ");
newQ.addEventListener("click", generateNewQuestion);

let prevQ = 0;
let quoteSelector = 0;

function generateNewQuestion()
{
    prevQ = quoteSelector;
    while (prevQ == quoteSelector)
    {
        quoteSelector = (Math.floor(Math.random() * quotes.length));
    }
    document.querySelector("#quoteBox").innerText = '"' + quotes[quoteSelector].quoteText + '"';
    document.querySelector("#authorBox").innerText = quotes[quoteSelector].quoteAuthor;
}

let quotes = 
[
    {
        quoteText: "Recipe for success: Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.",
        quoteAuthor: "Andy Liu"
    },
    {
        quoteText: "If you think you are going to lose, you are going to lose. If you think you are going to win, you are going to win.",
        quoteAuthor: "John Paul Rodriguez"
    },
    {
        quoteText: "I never freeze.",
        quoteAuthor: "Andy Liu"
    },
    {
        quoteText: "In the ninja world, those who don't follow the rules are trash. But, those who abandon their friends are even worse than trash.",
        quoteAuthor: "Obito Uchiha"
    },
    {
        quoteText: "I, Giorno Giovanna, have a dream!",
        quoteAuthor: "Giorno Giovanna"
    },
    {
        quoteText: "When you run, you gain one by not losing. But if you move forward, you gain two!",
        quoteAuthor: "Prospera Mercury"
    },
    {
        quoteText: "My grandfather's deck has no pathetic cards, Kaiba. But it does contain…the unstoppable Exodia!",
        quoteAuthor: "Yugi Muto"
    },
    {
        quoteText: "I'd rather trust and regret, than doubt and regret.",
        quoteAuthor: "Kazuto Kirigaya"
    }
]