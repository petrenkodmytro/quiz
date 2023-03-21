const questions = [
  {
    question: "Яка мова програмування працює у браузері?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Що означає CSS?",
    answers: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    correct: 2,
  },
  {
    question: "Що означає HTML?",
    answers: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
    correct: 1,
  },
  {
    question: "В якому році була створена мова JavaScript?",
    answers: ["1996", "1995", "1994", "немає правильної відповіді"],
    correct: 2,
  },
  {
    question: "Що робить метод Number.parseInt()?",
    answers: ["парсить з рядка дробове число", "перевіряє, чи вказане значення є NaN", "парсить з рядка ціле число", "округлює до найближчого цілого"],
    correct: 3,
  },
  {
    question: "Яким літералом оголошується массив у JavaScript?",
    answers: ["{}", "//", "()", "[]"],
    correct: 4,
  },
  {
    question: "JavaScript - однопотокова мова?",
    answers: ["Так", "Ні", "Не знаю", "Що таке JavaScript?"],
    correct: 1,
  },
  {
    question: "Що таке callback-функція?",
    answers: ["функція, яка приймає у якості параметрів інші функції", "передзвони мені", "це функція, яка передається іншій функції як аргумент", "функція, яка викликає саму себе"],
    correct: 3,
  },
  {
    question: "У яких станах може бути Promise?",
    answers: ["waiting, open, close", "pending, resolve, rejected", "then, catch, finally", "pending, fulfilled, rejected"],
    correct: 4,
  },
  {
    question: "Через які фази проходить подія (event) у браузері?",
    answers: ["swiming, catching, booling", "capturing, target, bubbling", "speaking, reading, writing", "searching, losing, catching"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0; // corect answer
let questionIndex = 0; // current question

submitBtn.addEventListener("click", checkAnawer);

showQuestion();

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  //   questions[questionIndex].question;
  //   questions[questionIndex].answers;

  console.log(questions[questionIndex].question);

  const headerTemplate = `<h2 class="title">${questions[questionIndex].question}</h2>`;
  headerContainer.innerHTML = headerTemplate;

  for (const [index, answer] of questions[questionIndex].answers.entries()) {
    const questionTemplate = `
		<li>
			<label>
				<input value="${index + 1}" type="radio" class="answer" name="answer" />
				<span>${answer}</span>
			</label>
		</li>`;

    listContainer.insertAdjacentHTML("beforeend", questionTemplate);
  }
}

function checkAnawer() {
  // находим выбранную радиокнопку
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

  if (!checkedRadio) {
	submitBtn.blur()
    // alert message
    return;
  }

  const userAnswer = Number(checkedRadio.value);
  console.log(userAnswer);

  if (userAnswer === questions[questionIndex].correct) {
    score += 1;
    // сделать сверху шкалу правильное - зеленым, неправильное - красным
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex += 1;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  let title, message;
  if (score === questions.length) {
    title = "Congratulations";
    message = "You have answered all the questions";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Very good";
    message = "You gave more than half of the correct answers";
  } else {
    title = "Not bad";
    message = "You have less than half of the correct answers";
  }

  const resultTemplate = `
	<h2 class="title">${title}</h2>
	<h3 class="summary">${message}</h3>
	<p class="result">${score} correct answer out of ${questions.length} questions</p>`;
  headerContainer.insertAdjacentHTML("beforeend", resultTemplate);

  // при клике делаем перезагрузку страницы
  submitBtn.innerHTML = "Try again";
  submitBtn.onclick = () => history.go();
}
