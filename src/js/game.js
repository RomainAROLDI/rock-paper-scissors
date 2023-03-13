window.addEventListener("load", () => {

    const possibleChoices = ["Rock", "Paper", "Scissors"];
    const resultText = document.querySelector("div#result h3");
    const choiceContainer = document.querySelector("div#choice");
    const choiceButtons = choiceContainer.querySelectorAll("button");

    function getRandomChoice() {
        return possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
    }

    choiceButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const userChoice = button.dataset.choice;
            const computerChoice = getRandomChoice();
            if (userChoice === computerChoice) {
                resultText.classList.remove("text-success");
                resultText.classList.remove("text-danger");
                resultText.textContent = "Egalité !";
            } else if (
                (userChoice === "Rock" && computerChoice === "Scissors") ||
                (userChoice === "Paper" && computerChoice === "Rock") ||
                (userChoice === "Scissors" && computerChoice === "Paper")
            ) {
                resultText.classList.remove("text-danger");
                resultText.classList.add("text-success");
                resultText.textContent = "Vous avez gagné !";
            } else {
                resultText.classList.remove("text-success");
                resultText.classList.add("text-danger");
                resultText.textContent = "Vous avez perdu !";
            }
        });
    });
});
