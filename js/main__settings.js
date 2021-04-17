function setting() {

  var item = [
    "no_sort"
  ];

  function check_setting() {

    $("#context_menu .setting_item input").prev("i").remove();

    for (i = 0; i < item.length; i++) {
      if (localStorage[item[i]] == "true") {
        $("#" + item[i] + " input").attr("checked", true);
      } else {
        $("#" + item[i] + " input").attr("checked", false);
      }
    };

    $("#context_menu input[checked]").before("<i class='material-icons'>check_box</i>");
    $("#context_menu input:not([checked]):not([failed])").before("<i class='material-icons'>check_box_outline_blank</i>");

    $("#context_menu input").next().next().next(".off").removeClass("hide");
    $("#context_menu input").next().next(".on").removeClass("hide");
    $("#context_menu input[checked]").next().next().next(".off").addClass("hide");
    $("#context_menu input:not([checked])").next().next(".on").addClass("hide");

    function css_option() {
      for (var i = 0; i < arguments.length; i++) {
        if (localStorage[arguments[i]] == "true") {
          $('body').addClass(arguments[i]);
        } else {
          $('body').removeClass(arguments[i]);
        }
      }
    }
    // 개별 적용
    css_option("no_sort");

  }
  check_setting();

  $("#context_menu_bt").on("click", function() {
    // $(this).css("color",color.material_500[color.i]);
    $('#tooltip_nav').css({
      'visibility': 'hidden',
      'opacity': "0"
    });
    $("#context_menu, #context_menu_bg").toggleClass("on");
    $("#context_menu").css({
      "top": $("#context_menu_bt").offset().top - pageYOffset,
      "left": $("#nav").width() - 16
    });
    check_setting();
  });

  $("#context_menu .setting_item").on("click", function() {
    // console.log($(this).hasClass("disabled"));
    if (!$(this).hasClass("disabled")) {
      var i = $("#context_menu .setting_item").index(this);
      if (localStorage[item[i]] == "true") {
        localStorage[item[i]] = "false"
      } else {
        localStorage[item[i]] = "true"
      }
      console.log("설정이 저장되었습니다.");
      // toast("설정이 저장되었습니다.", "save");

      if ($(this)[0] == $("#theme_color")[0] && localStorage.theme_color == "true") {
        localStorage.theme_color__i = color.i;
      }

      // 개별 적용 (클릭 즉시 적용)
      if (localStorage.general__dark_auto == "true") { //다크 모드 자동 적용
        var hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
          localStorage.general__dark = "true";
        } else {
          localStorage.general__dark = "false";
        }
      }

      // filter();
      // columns();
      check_setting();
    }
  });

}

$(document).ready(function() {
  // browser_alert();
  // contextmenu();

  if (localStorage.general__dark_auto == undefined || localStorage.general__dark_auto == "true") {
    localStorage.general__dark_auto = "true";
    var hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      localStorage.general__dark = "true";
    } else {
      localStorage.general__dark = "false";
    }
  }

  setting();

});
