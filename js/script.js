$('#userInput').keypress(function(key) {
  if (key.which == 13) {
    wikiSearch();
    $('.box').removeClass('hidden');
  }
});

$('#userInput').focus(function() {
  $('#closeForm').removeClass('fa fa-times');
});
$('#userInput').blur(function() {
  $('#closeForm').addClass('fa fa-times');
});
$('#closeForm').click(function() {
  $('#openSearch').delay(200).fadeIn(200);
  $('#searchForm').fadeOut(200);
  $('.box').addClass('hidden');
  $('h3').delay(200).fadeIn(200);
});
$('#openSearch').click(function() {
  $('#searchForm').delay(200).fadeIn(200);
  $('#openSearch').fadeOut(200);
  $('#searchForm').removeClass('hidden');
  $('h3').fadeOut(200);
});

function wikiSearch() {
  input = document.getElementById("userInput").value;
  $.ajax({
    dataType: 'jsonp',
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&gsrsearch=' + input + '&exintro&explaintext&exsentences=2&exlimit=max&&pilimit=max&prop=extracts&callback=?',
    success: function(data) {
      $('ul').empty();
      var results = data.query.pages;
      var ul = $('<ul>');
      for (var x in results) {
        ul.append($('<li class = wikiTitle>').text(results[x].title));
        ul.append($('<li>').text(results[x].extract));
        var link = 'https://en.wikipedia.org/?curid=' + results[x].pageid;
        ul.append($('<a href =' + link + '>' + '<i class="fa fa-wikipedia-w fa-lg" aria-hidden="true"></i>' + '</a>'));
        ul.append('<hr>');
      }
      $('.box').append(ul);
    }
  });
}