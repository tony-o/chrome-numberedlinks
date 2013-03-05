$(document).on("ready",function(){(function($){
  var on = false;
  var current = "";
  var fallback = 1;
  var observer; 
  var show = function(){
    $("a > .removable").show();
    current = "";
    on = true;
    $("input, select").attr("disabled",true).attr("readonly",true);
  };
  var hide = function(){
    $("a > .removable").hide();
    on = false;
    $("input, select").attr("disabled",false).removeAttr("readonly");
  };

  $(document).keypress(function(e){
    if(e.which == 2){
      if(!on){
        show();
      }else{
        hide();
      }
    }
    if(on){
      if(e.which == 10 || e.which == 13){
        $("a[__numberedlink='"+current+"']")[0].click();
        current = "";
      }else{
        var l = String.fromCharCode(e.which).match(/^\d$/g);
        if(l && l.length){
          current += String.fromCharCode(e.which);
        }
      }
      return false;
    }
  });
  $(document).keyup(function(e){
    if(e.which == 27){ hide(); }
  });
  var id = 0;
  var filter = function(){
    console.log("filter");
    var templ = "<span style=\"background:#000;color:#FFF;font-weight:bold;\" class=\"removable\">[[num]]</span>";
    $("a").each(function(a){
      if($(this).find(".removable").length){ 
        return;
      }
      $(this).append($(templ).clone().text(id)).find(".removable").hide();
      $(this).attr("__numberedlink",id++);
    });
    if(on){show();}else{hide();}
  };
  filter();
  observer = new (window.MutationObserver || window.WebKitMutationObserver)(function(){
    try{
      filter();
    }catch(e){ }
  });
    observer.observe(document.body, {
      childList: true, 
      //attributes: true, 
      //characterData: true, 
      subtree: true, 
      //attributeOldValue: true, 
      //characterDataOldValue: true, 
      //attributeFilter: true
  });
})($ || jQuery);});
