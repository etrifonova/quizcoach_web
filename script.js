fetch("https://db.chgk.info/xml")
  .then((response) => response.text())
  .then((text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/xml");
    const nodesQ = doc.querySelectorAll("Question");
    const nodesA = doc.querySelectorAll("Answer");
    let questions = [];
    for (const nodeQ of nodesQ) {
      const question = nodeQ.innerHTML;
      questions.push(question);
    }
    let answers = [];
    for (const nodeA of nodesA) {
      const answer = nodeA.innerHTML;
      answers.push(answer);
    }
    console.log(questions.length);
    console.log(answers.length);

    const arrQA = [];

    for (let i = 0; i < 50; i++) {
      arrQA.push({question: '', answer: ''});
      arrQA[i].question = questions[i];
      arrQA[i].answer = answers[i];
      console.log(arrQA);
    }

    let questionDisplay = document.querySelector(".question-out");
    let scoreBlock = document.querySelector(".score-block-result");
    let showBlock = document.querySelector(".show-answer-block-result");
    const generateButton = document.querySelector(".generate");
    const checkButton = document.querySelector(".check-button");
    const showButton = document.querySelector(".show-button");
    let randomElement;
    let randomQuestion;
    let correctAnswer;

    generateButton.onclick = function genQuestion() {
      if (arrQA.length === 0) {
        questionDisplay.innerHTML = "Вопросы закончились";
      } else {
        randomElement = arrQA.map((element) => element)[
          Math.floor(Math.random() * arrQA.length)
        ];
        randomQuestion = randomElement.question;
        questionDisplay.innerHTML = randomQuestion;
        message.innerHTML = "";
        userInput.value = "";
        correctAnswer = randomElement.answer.trim().slice(0, randomElement.answer.length - 1).toLowerCase();
      }
    };

    let userInput = document.querySelector(".user-answer-input");
    let message = document.querySelector(".out-2");
    let score = 0;

    checkButton.onclick = function checkForms() {
      if (userInput.value.trim().toLowerCase() === correctAnswer) {
        message.innerHTML = "Верно!";
        score++;
        scoreBlock.innerHTML = score;
        questions.splice(questions.indexOf(randomElement), 1);
        setTimeout(genQuestion, 1500);
        // genQuestion();
      } else {
        message.innerHTML = "Неверно!";
      }
    }

    userInput.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        checkForms();
      }
    });

    // Show Answer Function
    showButton.onclick = function showAnswer() {
      showBlock.innerHTML = correctAnswer;
    }

    // function getddl() {
    //   let x = formid.ddlselect[formid.ddlselect.selectedIndex].value;
    //   document.getElementById("select-block-label").innerHTML =
    //     "Выбранная категория: " +
    //     formid.ddlselect[formid.ddlselect.selectedIndex].text;
    //   console.log(x);
    //   switch (x) {
    //     case "cat1":
    //       questions = CAT_ONE;
    //       break;

    //     case "cat2":
    //       questions = CAT_TWO;
    //       break;

    //     case "cat3":
    //       questions = CAT_THREE;
    //       break;

    //     case "cat4":
    //       questions = CAT_FOUR;
    //       break;

    //     case "cat5":
    //       questions = CAT_FIVE;
    //       break;

    //     case "cat6":
    //       questions = CAT_SIX;
    //       break;

    //     case "cat7":
    //       questions = CAT_SEVEN;
    //       break;

    //     default:
    //       questions = PART_ONE;
    //   }
    // }
  });
