var Content;
var renderBeehiveData = function (){
  for (HoneycumbNum in BeehiveData) {
    Content.append(
      renderHoneycumb({
        title: BeehiveData[HoneycumbNum].name,
        titlecolor: BeehiveData[HoneycumbNum].color,
        honeycell: BeehiveData[HoneycumbNum].data
      })
    )
  }
};
var renderHoneycumb = function (data){
  var title = data.title; // Заголовок соты
  var titlecolor = data.titlecolor; // Цвет заголовка соты
  var honeycell = data.honeycell; // Содержимое соты
  var out = ''; // Вывод седржимого соты будет тут

  if ($.isEmptyObject(honeycell)) {
    // Если содержимое соты пусто
    out = '<div class="HoneycumbContentEmpty">cота пуста</div>';
  }else{
    // Если сота не пуста
    for (cellnum in honeycell){
      out += renderHoneycell({name: honeycell[cellnum].name, url: honeycell[cellnum].url, honey: honeycell[cellnum].data});//content[cellnum];
    }
    out += '<div class="HoneycumbContentEmpty">cота пуста</div>';
  }

  if ( titlecolor == undefined ) titlecolor = '#CCCCCC';
  return '\
  <div class="Honeycumb clzd">\
    <div class="HoneycumbColumnL" style="background: ' + titlecolor + ';"></div>\
    <div class="HoneycumbColumnR" style="background: ' + titlecolor + ';"></div>\
    <div class="HoneycumbHeader">\
      <div class="HoneycumbTitle" style="color: ' + titlecolor + '">' + title + '</div>\
    </div>\
    <div class="HoneycumbContent">' + out + '</div>\
  </div>';
}

var renderHoney = function(data){
  //console.log('Мы внутри renderHoney');
  if (data[2] == undefined){
    return '\
    <div class="Honey">\
      <input type="text" class="HoneyName" value="' + data[0] + '">\
      <input type="password" class="HoneyGold" value="' + data[1] + '">\
      <div class="showHoneyComment nth"></div>\
    </div>\
    ';
  }else{
    return '\
    <div class="Honey">\
      <input type="text" class="HoneyName" value="' + data[0] + '">\
      <input type="password" class="HoneyGold" value="' + data[1] + '">\
      <div class="showHoneyComment clzd" tabindex="0"></div>\
      <div class="HoneyComment" tabindex="0">' + data[2] + '</div>\
    </div>\
    ';
  }
}
var renderHoneycell = function (data){
  var name = data.name;
  var url = data.url;
  var honey = data.honey;
  var out = '', prot = 'http://';
  for (honeynum in honey){
    out += renderHoney(honey[honeynum]);
  };
  if( url.indexOf('https://') +1 || url.indexOf('http://') +1 || url.indexOf('ftp://') +1 ){
    prot = '';
  }
  return '\
  <div class="Honeycell">\
    <div class="HoneycellHeader"><a href="' + prot + url + '" target="_blank">' + name + '</a></div>\
    <div class="HoneycellContent">' + out + '</div>\
  </div>\
  ';
}
$(function(){
  $('#BeekeeperKey').focus();
  var loginTrue = function(){ /*<button id="findHoney">srch</button>*/
    $('body').html('\
    <div id="Beehive">\
      <div id="BeehiveSrch">\
        <input placeholder="Поиск" id="BeehiveSrchInp">\
        <div id="BeehiveSrchresult"><div class="content"></div></div>\
      </div>\
      <div id="BeehiveData"></div><div id="BeehiveCopy">Beehive ver. 2.2.4</div>\
      </div>');
      $('#BeehiveSrchInp').focus();
      Content = $('#BeehiveData');
      renderBeehiveData();
  };

  $(document).on('keyup', '#BeekeeperKey', function (){
    var bkval = $(this).val();
    if (bkval == Beekeeper) {
        loginTrue();
    }
  });
  /* ОТКРЫТЬ СКРЫТЬ СОТУ */
  $(document).on('click', '.clzd .HoneycumbTitle', function (){
    $('.Honeycumb').switchClass('opnd', 'clzd', 250);
    $(this).parents('.Honeycumb').switchClass('clzd', 'opnd', 250);
  });
  $(document).on('click', '.opnd .HoneycumbTitle', function (){
    $(this).parents('.Honeycumb').switchClass('opnd', 'clzd', 100);
  });
  /* /ОТКРЫТЬ СКРЫТЬ СОТУ */

  /* ПОКАЗАТЬ СКРЫТЬ КОММЕНТ */
  $(document).on('click', '.showHoneyComment.clzd', function (){
    $('.showHoneyComment.opnd').switchClass('opnd', 'clzd');
    $('.HoneyComment').hide('blind');
    $(this).next('.HoneyComment').show('blind');
    $(this).switchClass('clzd', 'opnd');
  });
  $(document).on('click', '.showHoneyComment.opnd', function (){
    $('.HoneyComment').hide('blind');
    $(this).switchClass('opnd', 'clzd');
  });
  /* /ПОКАЗАТЬ СКРЫТЬ КОММЕНТ */

  $(document).on('focus', '.HoneyGold', function (){
    $(this).attr('type', 'text');
  });
  $(document).on('focusout', '.HoneyGold', function (){
    $(this).attr('type', 'password');
  });
  $(document).on('mouseup', '.Honey input', function (){
    $(this).select();
  });
  
  /* ПОИСК */
  $(document).on('keyup', '#BeehiveSrchInp', function (){
    var srchval = $(this).val().toLowerCase();
    $('#BeehiveSrchresult .content').html('');
    for(k in BeehiveData){
      var Honeycumb = BeehiveData[k];
      for(k in Honeycumb.data){
        var honeycell = Honeycumb.data[k];
        if(honeycell.name.toLowerCase().indexOf(srchval) + 1 && srchval != '') {
          var out = renderHoneycell({name: honeycell.name, url: honeycell.url, honey: honeycell.data});
          $('#BeehiveSrchresult .content').append(out);
        }
      }
    };
  });
  /* /ПОИСК */
});

