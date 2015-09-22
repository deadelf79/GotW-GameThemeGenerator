$.extend({
  selectAllGenres: function(){
    $(".genre-select").prop("checked",true);
  },
  selectNoneGenres: function(){
    $(".genre-select").removeAttr("checked");
  },
  selectAllResults: function(){
    var firstLine = $('#gen-result div').text().split("\n");
    console.log(firstLine[1]);
  },
  selectText: function() {
    var doc = document, text = doc.getElementById("gen-result-text"), range, selection;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  },
  generateGameTheme: function(){
    var resultContainer = $("#gen-result-text");
    var checkedArray = $("#site-content table input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();
    var checkMixGenres = $("#mix-genres").prop("checked");
    var genre;
    
    if (checkedArray.length>0){
      name = chooseProjectName();
      if (checkMixGenres){
        var arr =chooseTwoRandomGenres(checkedArray);
        genre = arr[0]+", "+arr[1];
      } else {
        genre =  chooseRandomGenre(checkedArray);
      }
      pluses = chooseThreePluses();
      minuses = chooseThreeMinuses();
      resultContainer.html(
                          "Название: "+name+"<br/>"+
                          "Жанр: "+genre+"<br/>"+
                          "<br/>"+
                          "Особенности:<br/>"+
                          "  - "+pluses[0]+"<br/>"+
                          "  - "+pluses[1]+"<br/>"+
                          "  - "+pluses[2]+"<br/>"+
                          "<br/>"+
                          "Недостатки:<br/>"+
                          "  - "+minuses[0]+"<br/>"+
                          "  - "+minuses[1]+"<br/>"+
                          "  - "+minuses[2]+"<br/>"
                          );
    } else {
      resultContainer.html("Ошибка: Вы ничего не выбрали!<br />Для корректной работы генератора нужно выбрать хотя бы один жанр");
    }
  }
});

function chooseRandomGenre(genreArray){
  return arr_random(genreArray);
}

function chooseTwoRandomGenres(genreArray){
  one = arr_random(genreArray);
  two = arr_random(genreArray);
  while (two===one){
    two = arr_random(genreArray);
  }
  arr = [
    one,
    two
  ];
  return arr;
}

var prName1=["Храм","Гора","Место","Высота","Крепость","Последнее пристанище",
            "Бункер"];
var prName2=["Оружие","Меч","Длань","Посох","Алебарда","Клинок","Трон",
            "Топор","Камень","Зелье","Машина"];
var prName3=["Судьбы","без имени","времени","магии","свершения желаний","желаний",
            "Несудьбы","безполезности","Небес","Ее Величества"];
var prName4=["справедливости","свободы","чести","равенства","правды","истины",
            "клана","короля","царя","царя и отечества","короны","Ее Величества",
            "капитализма","партии","славы","доброты","живых","невиновных",
            "ведьм","денег","любви","воскрешения","победы","боли","жизни",
            "добра","победы над злом"];
var prName5=["происходит","творится","вершится","торжествует"];
var prName6=["судьба человечества","выпечка печений","возвращение к истокам",
            "справедливая месть","борьба со злом","зло","добро",
            "справедливость","бой насмерть","охота на ведьм","испытание",
            "капитализм","священный ритуал","таинство бытия","священное таинство",
            "наивысшее злоедяние","ремонт квартиры","выражение недовольства",
            "высказывание оскорблений","священная война","разговор по душам"];
var prName7=["Желание","Освящение","Посвящение","Воровство",
            "Восстановление","Захват","Бой","Копать"];
var prName8=["прошло","наступит","приходит","настанет"];          
var prNameTemplate=["%2$s %3$s","%1$s, где %5$s %6$s","Во имя %4$s",
                   "Во благо %4$s","Тут %5$s %6$s","%7$s %4$s",
                   "Во славу %4$s","%7$s во имя %4$s",
                   "Когда %8$s время %4$s","Бросок %4$s"];

function chooseProjectName(){
  template = Math.floor(Math.random() * prNameTemplate.length);
 
  prn1 = arr_random(prName1);
  prn2 = arr_random(prName2);
  prn3 = arr_random(prName3);
  prn4 = arr_random(prName4);
  prn5 = arr_random(prName5);
  prn6 = arr_random(prName6);
  prn7 = arr_random(prName7);
  prn8 = arr_random(prName8);

  var s = sprintf(prNameTemplate[template],prn1,prn2,prn3,prn4,prn5,prn6,prn7,prn8);
  return s;
}

var prPlus=["Своя графика","Хорошая музыка","Графика из интернета",
            "Отличные диалоги","Вкусные подробности","Идеальный баланс",
            "Игра года, я чувствую это","Нелинейный сюжет",
            "Интересная игровая механика","Качественно проработанный мир",
            "Отличный маппинг","Средненький маппинг, но терпимый вполне",
            "Я очень старался, правда","FPS дойдет до небес"];
var prMinus=["Требуется RTP","Присутствует жестокость","Отсутствует хентай",
            "Присутствует насилие","Высокая сложность","Плохой баланс",
            "Плохая актерская игра","Не успел закончить, было мало времени",
            "Маппинг на уровне плинтуса","Маппинг твоя бабушка сделала бы лучше",
            "Кровь, кишки и прочие прелести","Арфаграфея зопинаится",
            "Возможны ошибки","Молитесь, чтобы не вылетело","FPS проседает",
            "Местами неоптимизировано"];

function chooseThreePluses(){
  one = arr_random(prPlus);
  two = arr_random(prPlus);
  three = arr_random(prPlus);
  while (two===one){
    two = arr_random(prPlus);
  }
  while ((three===two)||(three===one)){
    three = arr_random(prPlus);
  }
  arr = [
    one,
    two,
    three
  ];
  return arr;
}

function chooseThreeMinuses(){
  one = arr_random(prMinus);
  two = arr_random(prMinus);
  three = arr_random(prMinus);
  while (two===one){
    two = arr_random(prMinus);
  }
  while ((three===two)||(three===one)){
    three = arr_random(prMinus);
  }
  arr = [
    one,
    two,
    three
  ];
  return arr;
}

function arr_random(array){
  return array[Math.floor(Math.random() * array.length)];
}