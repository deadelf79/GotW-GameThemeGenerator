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
        genre = chooseTwoRandomGenres(checkedArray);
      } else {
        genre = chooseRandomGenre(checkedArray);
      }
      resultContainer.html(
                          "Название: "+name+"<br/>"+
                          "Жанр: "+genre+"<br/>"+
                          "<br/>"+
                          "Особенности:<br/>"+
                          "  - <br/>"+
                          "  - <br/>"+
                          "  - <br/>"+
                          "<br/>"+
                          "Недостатки:<br/>"+
                          "  - <br/>"+
                          "  - <br/>"+
                          "  - <br/>"
                          );
    } else {
      resultContainer.html("Ошибка: Вы ничего не выбрали!<br />Для корректной работы генератора нужно выбрать хотя бы один жанр");
    }
  }
});

function chooseRandomGenre(genreArray){
  return genreArray[Math.floor(Math.random() * genreArray.length)];
}

function chooseTwoRandomGenres(genreArray){
  one = arr_random(genreArray);
  two = arr_random(genreArray);
  while (two===one){
    two = arr_random(genreArray);
  }
  return genreArray[one]+", "+genreArray[two];
}

var prName1=["Храм","Гора"];
var prName2=["Оружие","Меч","Длань"];
var prName3=["Судьбы","без названия","времени"];
var prName4=["справедливости","свободы","чести","равенства","правды","истины",
            "клана","короля","царя","царя и отечества","короны"];
var prName5=["происходит","творится","вершится"];
var prName6=["судьба человечества","выпечка печений","возвращение к истокам",
            "справедливая месть","победа над злом","зло","добро",
            "справедливость","бой насмерть"];
var prNameTemplate=["%2$s %3$s","%1$s, где %5$s %6$s","Во имя %4$s",
                   "Во благо %4$s %3$s","Тут %5$s %6$s"];

function chooseProjectName(){
  template = Math.floor(Math.random() * prNameTemplate.length);
 
  prn1 = arr_random(prName1);
  prn2 = arr_random(prName2);
  prn3 = arr_random(prName3);
  prn4 = arr_random(prName4);
  prn5 = arr_random(prName5);
  prn6 = arr_random(prName6);

  var s = sprintf(prNameTemplate[template],prn1,prn2,prn3,prn4,prn5,prn6);
  return s;
}

function arr_random(array){
  return array[Math.floor(Math.random() * array.length)];
}