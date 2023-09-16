
let questionDisplay = document.querySelector('.question-out');
let scoreBlock = document.querySelector('.score-block-result');
let showBlock = document.querySelector('.show-answer-block-result');
let questions;
let randomElement;
let randomQuestion;
let correctAnswer;

const PART_ONE = [
  {question: 'Для Пушкина ИМ был Данзас. А кто был ИМ для Гарри в первой книге?', answer: 'Рон Уизли'},
  {question: 'Сначала был “капут драконис”, а потом?', answer: 'поросячий пятачок'},
  {question: 'Несмотря на свое латинское название Mucus ad Nauseam, ЭТО ЗАКЛИНАНИЕ было переведено на русский не самым очевидным образом. Одно из слов отсылает к тому, что было у каждого факультета. Назовите ЭТО ЗАКЛИНАНИЕ двумя словами, начинающимися на одну и ту же букву.', answer: 'проклятие призраков'},
  {question: 'Данный персонаж упоминается в первой и последних книгах. Про него известно, что он в эпоху раннего средневековья держал в страхе всю Южную Англию.', answer: 'Эмерик Отъявленный'},
  {question: 'Олух! Пузырь! Остаток! Уловка! - кому принадлежат эти слова?', answer: 'Альбус Дамблдор'},
  {question: 'О ком это: “Тощее пыльно-серое создание с выпученными горящими глазами”?', answer: 'Миссис Норрис'},
  {question: 'По мнению близнецов, один из преподавателей носил под одеждой ЕГО в целях защиты. Назовите ЕГО.', answer: 'чеснок'},
  {question: 'Какой факультет набрал 352 балла?', answer: 'Пуффендуй'},
  {question: 'Для избавления от чего предназначено зелье со следующим составом: змеиные зубы, рогатый слизень, иглы дикобраза?', answer: 'прыщи'},
  {question: 'Некое животное является патронусом для волшебника, близкому Гарри, хоть и не одной крови. Также однажду Гарри отверг бутерброд с его мясом. Назовите это животное.', answer: 'горностай'},
  {question: 'Какой персонаж загадан в этом описании? "Крошечный человечек в высоком фиолетовом цилиндре. По словам профессора Макгонагалл, не отличается особым умом. Но Альбус Дамблдор считает его весьма полезным."', answer: 'Дедалус Дингл'},
]

const PART_TWO = [
  {question: 'Сколько маглов погубило проклятое ожерелье из "Горбин и Бэркес"?', answer: '19'},
  {question: 'Как называется процедура избавления от гномов?', answer: 'дегномизация'},
  {question: 'Сколько машин Ford Anglia было разбито на съемках "Тайной комнаты"?', answer: '14'},
  {question: 'Что и где появилось у Флитвика из-за сломанной палочки Рона?', answer: 'бородавка на носу'},
  {question: 'Во что играли Гарри и Рон с близнецами в тот день, когда они отправились в Запретный лес за пауками?', answer: 'взрывающиеся карты'},
  {question: 'Какого цвета форма любимой команды Рона (в именительном падеже)?', answer: 'оранжевый'},
  {question: 'Описание какого персонажа: "Жёлтые волосы, зеленоватая кожа. Любит завывать и барабанить по трубам"?', answer: 'Упырь Уизли'},
  {question: 'Описание какого заведения: "Двухэтажное здание, существует с 1654 года. Здесь Гарри встретился с одним из преподавателей по ЗОТИ. На товары этого заведения наложено Проклятие воришки."?', answer: 'Флориш и Блоттс'},
  {question: '"Заправь рубашку, неряха!" С каким элементом интерьера связана данная фраза?', answer: 'Зеркало'},
  {question: 'Какое полное имя у Почти Безголового Ника?', answer: 'Сэр Николас де Мимси-Дельфингтон'},
  {question: 'Однокурсник Гарри говорит, что родители хотели отдать его в Итон. Как зовут этого однокурсника?', answer: 'Джастин Финч-Флетчли'},
  {question: 'Миссис Норрис, Колин Криви, Джастин Финч-Флетчли, Пенелопа Кристал, Гермиона. Кто отсутствует в этом списке?', answer: 'Почти Безголовый Ник'},
  {question: '"риктусемпра, ПРОПУСК, фините инкантатем". Это заклинания из сцены дуэли между Гарри и Драко. Что пропущено?', answer: 'таранталлегра'},
  {question: 'Кто дразнил Плаксу Миртл, когда она была жива?', answer: 'Оливия Хорнби'},
  // {question: '', answer: ''},
  // {question: '', answer: ''},
  // {question: '', answer: ''},
  // {question: '', answer: ''}
]

const PART_THREE = [
  {question: 'Как называется магический прибор, используемый волшебниками для предупреждения об опасности?', answer: 'вредноскоп'},
  {question: 'Набор по уходу за чем подарила Гермиона Гарри на день рождения?', answer: 'метла'},
  {question: 'Какой учебник читает Гарри в начале "Узника Азкабана"?', answer: 'история магии'},
  {question: 'Сколько раз была сожжена на костре Венделина Странная?', answer: '47'},
  {question: 'Сколько галлеонов выиграл Артур Уизли от "Ежедневного пророка"?', answer: '700'},
]

const PART_FOUR = [
  {question: 'В каком городке находится особняк Рэддлов?', answer: 'Литтл Хэнглтон'},
  {question: 'Как называется магловский трактир в Литтл Хэнглтоне?', answer: 'висельник'},
  {question: 'Как зовут садовника Рэддлов?', answer: 'Фрэнк Брайс'},
]

const PART_FIVE = [
  {question: 'Нимфадора Тонкс воспользовалась ИМ  в доме Дурслей, чтобы убрать из клетки Букли помет и перья. ИМ же воспользовалась Джинни Уизли, чтобы убрать Смердящий сок с лица и груди Гарри Поттера. Догадавшись, о чем речь, напишите слово для его вызова.', answer: 'Экскуро'},
  {question: 'Как называется заклинание для передвижения предметов по воздуху?', answer: 'локомотор'},
  {question: 'Какое заклятие Миссис Уизли наложила на кухонную дверь?', answer: 'заклятие недосягаемости'},
]

const PART_SIX = [
  {question: 'Некоему персонажу из первой части книги пришлось значительно больше времени проводить дома по этой причине. Назовите эту причину двумя словами.', answer: 'заклятие империус'},
  {question: 'ОН назван в честь некоего города в английском графстве Девоне, на левой стороне маленькой реки Аксе. Также известно, что ОН пострадал от некоторых действий Корнелиуса Фаджа. Назовите ЕГО.', answer: 'Аксминстерский ковер'},
  {question: 'Кто так описан: «В густой гриве рыжевато-каштановых волос и в кустистых бровях виднелись седые пряди, из-за очков в проволочной оправе смотрели пронзительные желтые глаза, а в движениях, хоть он и прихрамывал, сквозила своеобразная гибкая, размашистая грация.»', answer: 'Руфус Скримджер'},
]

const PART_SEVEN = [
  {question: 'Какую метлу получил Рон за то, что стал старостой?', answer: 'Чистомет-11'},
  {question: '«музыкальная шкатулка, ___________, несколько старинных печатей; и, наконец, орден Мерлина первой степени». Что пропущено в этом списке?', answer: 'медальон'},
  {question: '«Похоже, что ОНО читает мысли или, по крайней мере, настроение своей владелицы, поскольку владелица ЕМУ ничего не диктует.» Назовите ЕГО тремя словами.', answer: 'прытко пишущее перо'},
]


function getddl() {
  let x = formid.ddlselect[formid.ddlselect.selectedIndex].value;
  document.getElementById('lblmess').innerHTML=("Выбранная категория: " + formid.ddlselect[formid.ddlselect.selectedIndex].text);
  console.log(x);
  switch(x) {
    case 'part1':
      questions = PART_ONE;
      break;
  
    case 'part2':
      questions = PART_TWO;
      break;
  
    case 'part3':
      questions = PART_THREE;
      break;
  
    case 'part4':
      questions = PART_FOUR;
      break;
  
    case 'part5':
      questions = PART_FIVE;
      break;
  
    case 'part6':
      questions = PART_SIX;
      break;
  
    case 'part7':
      questions = PART_SEVEN;
      break;
  
    default:
      questions = PART_ONE;
  }
}

function genQuestion() {

  if (questions.length === 0) {
    questionDisplay.innerHTML = 'Вопросы закончились'
  } else {
    randomElement = questions.map(element => element)[Math.floor(Math.random()*questions.length)];
    randomQuestion = randomElement.question;
    questionDisplay.innerHTML = randomQuestion;
    message.innerHTML = '';
    userInput.value = '';
    correctAnswer = randomElement.answer.trim().toLowerCase();
  }
  }

  let userInput = document.querySelector('.user-answer-input');
  let message = document.querySelector('.out-2');
  let score = 0;
  

  function checkForms() {
    
    // correctAnswer = questions.find((element) => {
    //   return element.question == randomQuestion
    // }).answer.trim().toLowerCase();
    
    if (userInput.value.trim().toLowerCase() === correctAnswer) {
        message.innerHTML = 'Верно!';
        score++;
        scoreBlock.innerHTML = score;
        console.log(questions.indexOf(randomElement))
        questions.splice(questions.indexOf(randomElement), 1);
    } else {
      console.log(userInput.value)
        message.innerHTML = 'Неверно!'
    }
}

// solution found here https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
userInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    checkForms();
  }
});

// Show Answer Function
function showAnswer() {
  showBlock.innerHTML = correctAnswer;
}
