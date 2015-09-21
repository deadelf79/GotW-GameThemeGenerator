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
      if (checkMixGenres){
        genre = chooseRandomGenre(checkedArray)+", "+
           chooseRandomGenre(checkedArray);
      } else {
        genre = chooseRandomGenre(checkedArray);
      }
      resultContainer.html(
                          "Название:<br/>"+
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
  return genreArray[(Math.floor(Math.random() * genreArray.length))];
}