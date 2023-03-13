window.addEventListener("load", () => {

    const possibleChoices = ["rock", "paper", "scissors"];
    const resultText = document.querySelector("div#result h4");
    const userChoiceContainer = document.querySelector("div#user-choice");
    const computerChoiceContainer = document.querySelector("div#computer-choice");
    const choiceButtons = userChoiceContainer.querySelectorAll("button");
    const scoreText = document.querySelector("div#result span#score");
    const historyContainer = document.querySelector("div#history");
    let scoreCount = 0;

    function getRandomChoice() {
        return possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
    }

    function clearSelectedChoices() {
        choiceButtons.forEach((button) => {
            button.classList.remove("selected-choice");
        });
        computerChoiceContainer.querySelectorAll("button").forEach((button) => {
            button.classList.remove("selected-choice");
        });
    }

    function clearAll() {

        let message;

        if (scoreCount > 2) {
            message = "Vous avez gagné la partie !";
        } else {
            message = "Vous avez perdu la partie !";
        }

        scoreCount = 0;
        resultText.textContent = "";
        scoreText.textContent = "0";
        while (historyContainer.firstChild) {
            historyContainer.removeChild(historyContainer.lastChild);
        }

        clearSelectedChoices();

        return message;
    }

    choiceButtons.forEach((button) => {

        button.addEventListener("click", (e) => {

            e.preventDefault();

            const userChoice = button.dataset.choice;
            const computerChoice = getRandomChoice();

            clearSelectedChoices();

            button.classList.add("selected-choice");
            computerChoiceContainer.querySelector("button." + computerChoice).classList.add("selected-choice");

            const historyBlock = document.createElement("div");
            historyBlock.classList.add("history-block");

            if (userChoice === computerChoice) {
                resultText.classList.remove("text-success");
                resultText.classList.remove("text-danger");
                resultText.textContent = "Egalité !";
                historyBlock.style.backgroundColor = "#9e9e9e";
                historyBlock.textContent = "N";
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                resultText.classList.remove("text-danger");
                resultText.classList.add("text-success");
                resultText.textContent = "Gagné !";
                scoreCount++;
                historyBlock.style.backgroundColor = "#2be061";
                historyBlock.textContent = "G";
            } else {
                resultText.classList.remove("text-success");
                resultText.classList.add("text-danger");
                resultText.textContent = "Perdu :(";
                scoreCount--;
                historyBlock.style.backgroundColor = "#e0372b";
                historyBlock.textContent = "P";
            }

            scoreText.textContent = scoreCount.toString();

            historyContainer.append(historyBlock);

            if (scoreCount > 2 || scoreCount < -2) {
                setTimeout(() => {
                    alert(clearAll());
                }, 50);
            }
        });
    });
});
