const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var data;

function dice(n, s, b) {
  var out = 0;
  for (var i = 0; i < n; i++) {
    out += Math.ceil(s * Math.random());
  }
  return out + b;
}

function count() {
  // console.log($('#inputnum').val());
  $('#stats').removeClass('hide').addClass('show');
  var totalbuy = $('#inputnum').val();

  var numberSort = function(a, b) {
    return a[0] - b[0];
  };
  $('#lottotable').html(""); //초기화
  var win1 = 0;
  var win2 = 0;
  var win3 = 0;
  var win4 = 0;
  var win5 = 0;

  $('#stats .stat_money_1').text(numberWithCommas(data.money_1win) + " 원");
  $('#stats .stat_money_2').text(numberWithCommas(data.money_2win = Math.round(data.money_1win * data.many_1win * 125 / 750 / (data.money_sell / 1000 / 1357510))) + " 원");
  $('#stats .stat_money_3').text(numberWithCommas(data.money_3win = Math.round(data.money_1win * data.many_1win * 125 / 750 / (data.money_sell / 1000 / 35724))) + " 원");

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
        if (val[j][0] == data.nums[6]) {
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

      $('#stats .win1').html(win1 + "<span class='translation'>(" + (win1 / list_length * 100).toFixed(2) + "%)</span>");
      $('#stats .win2').html(win2 + "<span class='translation'>(" + (win2 / list_length * 100).toFixed(2) + "%)</span>");
      $('#stats .win3').html(win3 + "<span class='translation'>(" + (win3 / list_length * 100).toFixed(2) + "%)</span>");
      $('#stats .win4').html(win4 + "<span class='translation'>(" + (win4 / list_length * 100).toFixed(2) + "%)</span>");
      $('#stats .win5').html(win5 + "<span class='translation'>(" + (win5 / list_length * 100).toFixed(2) + "%)</span>");

      $('#stats .money1').html(numberWithCommas(win1 * data.money_1win) + " 원");
      $('#stats .money2').html(numberWithCommas(win2 * data.money_2win) + " 원");
      $('#stats .money3').html(numberWithCommas(win3 * data.money_3win) + " 원");
      $('#stats .money4').html(numberWithCommas(win4 * 50000) + " 원");
      $('#stats .money5').html(numberWithCommas(win5 * 5000) + " 원");

      $('#stats .winall').html((winall = win1 + win2 + win3 + win4 + win5) + "<span class='translation'>(" + ((win1 + win2 + win3 + win4 + win5) / list_length * 100).toFixed(2) + "%)</span>");
      $('#stats .moneyall').html(numberWithCommas(moneyall = win1 * data.money_1win + win2 * data.money_2win + win3 * data.money_3win + win4 * 50000 + win5 * 5000) + " 원");

      $('.msg').text("구매금액 " + numberWithCommas(totalbuy * 1000) + " 원 / 누적당첨금 " + numberWithCommas(moneyall) + " 원 / 수익률 " + (moneyall / (totalbuy * 1000) * 100 - 100).toFixed(1) + "%");

      // $('#stats').html(
      //   '1등: ' + win1 + "<span class='translation'>(" + (win1 / list_length * 100).toFixed(2) + "%)</span>" +
      //   ' / 2등: ' + win2 + "<span class='translation'>(" + (win2 / list_length * 100).toFixed(2) + "%)</span>" +
      //   ' / 3등: ' + win3 + "<span class='translation'>(" + (win3 / list_length * 100).toFixed(2) + "%)</span>" +
      //   ' / 4등: ' + win4 + "<span class='translation'>(" + (win4 / list_length * 100).toFixed(2) + "%)</span>" +
      //   ' / 5등: ' + win5 + "<span class='translation'>(" + (win5 / list_length * 100).toFixed(2) + "%)</span>" +
      //   " / 총당첨율: " + ((win1 + win2 + win3 + win4 + win5) / list_length * 100).toFixed(2) + "%" +
      //   '<br><progress value="' + list_length + '" max="' + totalbuy + '"></progress>'
      // );

      $('#stats progress').attr({
        'value': list_length,
        'max': totalbuy
      });
      if ((totalbuy - i) % 300 == 0) {
        console.log("ad inserted");
        $('#lottotable').append('<div class="ad"><!-- LOGE 반응형 --><ins class="adsbygoogle"     style="display:block"     data-ad-client="ca-pub-8175591114279139"     data-ad-slot="6892768087"     data-ad-format="auto"     data-full-width-responsive="true"></ins><script>     (adsbygoogle = window.adsbygoogle || []).push({});</script></div>')
      }
      $('#lottotable').append('<li class="' + win_class + '">' + list + '</li>');
      // break;
      if (--i) engine(i);
    }, 0)
  })($('#inputnum').val());

  // var totalmatch = winall;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadlot_2(a) {
  $("#winner .lotto_round").text(a.gno = a.feed.entry[0].gsx$drwno.$t + "회");
  $("#winner .lotto_date").text(a.gdate = a.feed.entry[0].gsx$drwnodate.$t);

  $("#winner .info_Totsellamnt").text(numberWithCommas(a.money_sell = a.feed.entry[0].gsx$totsellamnt.$t));
  $("#winner .info_Firstwinamnt").text(numberWithCommas(a.money_1win = a.feed.entry[0].gsx$firstwinamnt.$t));
  $("#winner .info_Firstprzwnerco").text(a.many_1win = a.feed.entry[0].gsx$firstprzwnerco.$t);

  a.nums = Array(7);
  a.nums[0] = a.feed.entry[0].gsx$drwtno1.$t;
  a.nums[1] = a.feed.entry[0].gsx$drwtno2.$t;
  a.nums[2] = a.feed.entry[0].gsx$drwtno3.$t;
  a.nums[3] = a.feed.entry[0].gsx$drwtno4.$t;
  a.nums[4] = a.feed.entry[0].gsx$drwtno5.$t;
  a.nums[5] = a.feed.entry[0].gsx$drwtno6.$t;
  a.nums[6] = a.feed.entry[0].gsx$bnusno.$t; // bonus
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

$(window).on('load', function() {
  $("div#splash").fadeOut();
  context_menu();
  // console.log('splash removed: ' + (Date.now() - time.init0) + ' ms');
})
