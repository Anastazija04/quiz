let baseUrl = `https://opentdb.com/api.php?amount=20`;
let btnStart = document.getElementById("btnStart");
let divStart = document.getElementById("divStart");
let divTrivia2 = document.getElementById("divTrivia2");
let divTrivia3 = document.getElementById("divTrivia3");
let divTrivia4 = document.getElementById("divTrivia4");
let mainTrivia = document.getElementById("mainTrivia");
let tryAgain = document.getElementById("tryAgain");
let totalAnswers = document.getElementById("totalAnswers");
console.log(totalAnswers);
let questioninHTML = document.getElementById("questioninHTML");
let category = document.getElementById("category");
let startOver = document.getElementById("startOver");
let containerForButtons = document.getElementById("containerForButtons");

document.getElementById("mainTrivia").style.display = "none";
divTrivia4.style.display = "none";

btnStart.addEventListener("click", function () {
  let counter = 0;
  let question = 0;
  location.hash = "question-" + question;
  divStart.style.display = "none";
  document.getElementById("mainTrivia").style.display = "block";

  window.addEventListener("hashchange", function (e) {
    e.preventDefault();
    if (question < 20) {
      fetch(baseUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          let apiQuestion = response.results[question];
          console.log(apiQuestion);
          questioninHTML.innerHTML = apiQuestion.question;
          let answer = apiQuestion.incorrect_answers;
          answer.push(apiQuestion.correct_answer);
          let buttonsArray = [];
          containerForButtons.innerHTML = "";
          startOver.addEventListener("click", function () {
            location.reload();
            location.hash = "";
            localStorage.setItem("score", 0);
          });
          answer.forEach((element) => {
            let button = document.createElement("button");
            button.innerHTML = element;
            button.style.margin = "5px";
            containerForButtons.appendChild(button);
            // buttonsArray = [button];
            button.addEventListener("click", function (e) {
              if (e.target.innerHTML == apiQuestion.correct_answer) {
                counter++;
              } else {
                counter;
              }
              question++;
              location.hash = "question-" + question;
              console.log(counter);
              localStorage.setItem("score", counter);
            });
          });
          category.innerHTML = apiQuestion.category;
          divTrivia3.innerHTML = `
          <h3>Completed: ${question} / 20</h3>
          `;
        });
    } else {
      mainTrivia.style.display = "none";
      divTrivia4.style.display = "block";
      totalAnswers.innerText = `Total correct andswers: ${localStorage.getItem(
        "score"
      )} / 20`;
      tryAgain.addEventListener("click", function () {
        location.reload();
        location.hash = "";
        localStorage.setItem("score", 0);
      });
    }
  });
});
