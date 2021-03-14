const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

  (function engine(i) {
    setTimeout(function() {
      var list_length = ($('#lottotable li').length + 1);
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
        // val[j][0] = dice(1, 45, 0);

        function roll(n) {
          if (j == 0) {
            val[j][0] = n;
          } else {
            for (l = 0; l < j; l++) {
              // console.log(n);
              if (n == val[l][0]) {
                roll(dice(1, 45, 0));
              } else {
                val[j][0] = n;
              }
            }
          }
        }
        roll(dice(1, 45, 0));

        // console.log("No." + (list_length) + ": " + val);
        for (m = 0; m < 6; m++) {
          if (val[j][0] == data.nums[m]) {
            val[j][1] = 1;
            match++;
          }
        }
        // console.log("No." + (list_length) + ": " + val);
        if (val[j][0] == data.bnum) {
          val[j][1] = 2;
          match_b = 1;
        }
      }
      // console.log("before sort: "+val);
      val.sort(numberSort);
      // console.log("after sort: "+val);


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
            num_class = "c5 ";
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
        // console.log(match);
      }
      var win_class;
      if (match == 6) {
        win_class = 'win win1';
        win1++;
        console.log('win1');
      } else if (match == 5 && match_b == 1) {
        win_class = 'win win2';
        win2++;
        console.log('win2');
      } else if (match == 5) {
        win_class = 'win win3';
        win3++;
        console.log('win3');
      } else if (match == 4) {
        win_class = 'win win4';
        win4++;
        console.log('win4');
      } else if (match == 3) {
        win_class = 'win win5';
        win5++;
        console.log('win5');
      }
      $('#stats').html(
        '1등: ' + win1 + "<span class='translation'>(" + (win1 / list_length * 100).toFixed(2) + "%)</span>" +
        ' | 2등: ' + win2 + "<span class='translation'>(" + (win2 / list_length * 100).toFixed(2) + "%)</span>" +
        ' | 3등: ' + win3 + "<span class='translation'>(" + (win3 / list_length * 100).toFixed(2) + "%)</span>" +
        ' | 4등: ' + win4 + "<span class='translation'>(" + (win4 / list_length * 100).toFixed(2) + "%)</span>" +
        ' | 5등: ' + win5 + "<span class='translation'>(" + (win5 / list_length * 100).toFixed(2) + "%)</span>" +
        " | 총당첨율: " + ((win1 + win2 + win3 + win4 + win5) / list_length * 100).toFixed(2) + "%" +
        '<br><progress value="' + list_length + '" max="' + totalbuy + '"></progress>'
      );
      $('#lottotable').append('<li class="' + win_class + '">' + list + '</li>');
      // break;
      if (--i) engine(i);
    }, 0)
  })($('#inputnum').val());

  var totalmatch = (win1 + win2 + win3 + win4 + win5)
  var totalbuy = $('#inputnum').val();
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

function loadlot_2(a) {
  $("#lottok").html('제 ' + a.feed.entry[0].gsx$drwno.$t + '회차 당첨 결과 (' + a.feed.entry[0].gsx$drwnodate.$t + ')'); // + '<br/>' +
  a.nums = Array(7);
  a.nums[0] = a.feed.entry[0].gsx$drwtno1.$t;
  a.nums[1] = a.feed.entry[0].gsx$drwtno2.$t;
  a.nums[2] = a.feed.entry[0].gsx$drwtno3.$t;
  a.nums[3] = a.feed.entry[0].gsx$drwtno4.$t;
  a.nums[4] = a.feed.entry[0].gsx$drwtno5.$t;
  a.nums[5] = a.feed.entry[0].gsx$drwtno6.$t;
  a.nums[6] = a.feed.entry[0].gsx$bnusno.$t;
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
  data = a;
}

document.getElementById("year").innerHTML = new Date().getFullYear();
context_menu();
