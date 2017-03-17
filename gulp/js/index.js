$(function(){
  function onMsg(msg){
    if($("#cmTips").length){
      clearTimeout(_timer);
      $("#cmTips").remove();
    };
    var oHtml = [];
    oHtml.push('<section id="cmTips" class="cmTips dbox cm-ts">');
    oHtml.push('  <p class="msg-tx">'+msg+'</p>');
    oHtml.push('</section>');

    $("body").append(oHtml.join("")).find("#cmTips").addClass('show');
    _timer = setTimeout(function(){
      $("#cmTips").remove();
    },4000);
  }

  setTimeout(function(){
    $('.loader-inner').hide();
  },1000)

  $('.btn').click(function(){
    onMsg('按钮')
  })

});