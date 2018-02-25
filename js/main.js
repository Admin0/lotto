var data;

function dice(n, s, b) {
  var out = 0;
  for (i = 0; i < n; i++) {
    out += Math.ceil(s * Math.random());
  }
  return out + b;
}

function count() {
  // console.log($('#inputnum').val());

  var numberSort = function(a, b) {
    return a[0] - b[0];
  };
  $('#lottotable').html(""); //초기화
  var win1 = 0;
  var win2 = 0;
  var win3 = 0;
  var win4 = 0;
  var win5 = 0;
  for (k = 0; k < $('#inputnum').val(); k++) {
    var list = "";
    var val = [
      [0, 0], //[번호, 당첨여부]
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ];
    var match = 0; //몇개 숫자가 적중했나
    var match_b = 0; //보너스숫자가 적중했나

    for (j = 0; j < 6; j++) {
      val[j][0] = dice(1, 45 - j, 0);
      for (l = 0; l < j; l++) {
        if (val[j][0] == val[l][0]) {
          val[l][0]++;
        }
      }
      for (m = 0; m < 6; m++) {
        if (val[j][0] == data.nums[m]) {
          val[j][1] = 1;
          match++;
        }
      }
      if (val[j][0] == data.bnum) {
        val[j][1] = 2;
        match_b = 1;
      }
    }
    // console.log("before: "+val);
    val.sort(numberSort);
    // console.log("after : "+val);
    for (j = 0; j < 6; j++) {
      function setColorClass() {
        if (val[j][0] <= 10) {
          num_class = "c1 ";
        } else if (val[j][0] <= 20) {
          num_class = "c2 ";
        } else if (val[j][0] <= 30) {
          num_class = "c3 ";
        } else if (val[j][0] <= 40) {
          num_class = "c4 ";
        } else {
          num_class = "c4 ";
        }
        if (val[j][1] == 1) {
          num_class += "match ";
        } else if (val[j][1] == 2) {
          num_class += "match_b ";
        }
      }

      var num_class;
      setColorClass();
      list += '<div class="output ' + num_class + '">' + val[j][0] + '</div>';
      console.log(match);
    }
    if (match == 6) {
      list += "<span class='win w1'>1등!!!!!</span>";
      win1++;
    } else if (match == 5 && match_b == 1) {
      list += "<span class='win w1'>2등!!!!</span>";
      win2++;
    } else if (match == 5) {
      list += "<span class='win w1'>3등!!!</span>";
      win3++;
    } else if (match == 4) {
      list += "<span class='win w1'>4등!</span>";
      win4++;
    } else if (match == 3) {
      list += "<span class='win w1'>5등</span>";
      win5++;
    }
    $('#lottotable').append('<li>' + list + '</li>');
    // break;
  }
  var totalmatch = (win1 + win2 + win3 + win4 + win5)
  var totalbuy = $('#inputnum').val();
  $('#lottotable').prepend("<h3>결과</h3><p>1등: " + win1 + "번 | 2등: " + win2 + "번 | 3등: " + win3 + "번 | 4등: " + win4 + "번 | 5등: " + win5 + "번</p>" + "<p>총 당첨률 " + totalmatch + " / " + totalbuy + " = " + (totalmatch / totalbuy * 100).toFixed(2) + "%</p>");
}

// function loadlot(a) {
//   $("#lottok").html('제 ' + a.gno + '회차 당첨 결과(' + a.gdate + ')'); // + '<br/>' +
//   //a.nums + a.bnum;
//   a.nums[6] = a.bnum;
//   for (i = 0; i < 7; i++) {
//     $('#output' + i).text(a.nums[i]);
//   }
//   for (i = 0; i < 7; i++) {
//     if (a.nums[i] <= 10) {
//       $('#output' + i).addClass("c1");
//     } else if (a.nums[i] <= 20) {
//       $('#output' + i).addClass("c2");
//     } else if (a.nums[i] <= 30) {
//       $('#output' + i).addClass("c3");
//     } else if (a.nums[i] <= 40) {
//       $('#output' + i).addClass("c4");
//     } else {
//       $('#output' + i).addClass("c5");
//     }
//   }
//   data = a;
// }

$.ajax({
  url: "http://lotto.kaisyu.com/api?method=get&amp;callback=loadlot",
  dataType: 'jsonp',
  jsonpCallback: "loadlot",
  success: function(a) {
    console.log('성공 - ', a);
    $("#lottok").html('제 ' + a.gno + '회차 당첨 결과(' + a.gdate + ')'); // + '<br/>' +
    //a.nums + a.bnum;
    a.nums[6] = a.bnum;
    for (i = 0; i < 7; i++) {
      $('#output' + i).text(a.nums[i]);
    }
    for (i = 0; i < 7; i++) {
      if (a.nums[i] <= 10) {
        $('#output' + i).addClass("c1");
      } else if (a.nums[i] <= 20) {
        $('#output' + i).addClass("c2");
      } else if (a.nums[i] <= 30) {
        $('#output' + i).addClass("c3");
      } else if (a.nums[i] <= 40) {
        $('#output' + i).addClass("c4");
      } else {
        $('#output' + i).addClass("c5");
      }
    }
    data=a;
  },
  error: function(xhr) {
    console.log('실패 - ', xhr);
  }
});
