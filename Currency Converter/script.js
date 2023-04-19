// Kullanacağımız dövizler
const currencies = ["USD", "EUR", "JPY", "GBP", "DKK", "NOK"];

// API anahtarı
const apiURL = "https://api.exchangerate.host/latest?base=TRY";

// API'den verileri almak için AJAX isteği gönderdim
$.ajax({
  url: apiURL,
  method: "GET",
  dataType: "json",
  success: function (data) {
    // AJAX isteği başarılı olursa, döviz kurlarını yazdırıcaz
    currencies.forEach(function (currency) {
      // Döviz kuru bilgileri
      const rate = data.rates[currency];
      const buyPrice = rate.toFixed(4); // Alış fiyatı
      const sellPrice = (1 / rate).toFixed(4); // Satış fiyatı

      // Döviz kuru bilgilerini ekrana yazdırdım
      $(`#${currency.toLowerCase()}-buy`).text(buyPrice);
      $(`#${currency.toLowerCase()}-sell`).text(sellPrice);
    });
  },
});

// // // Döviz Çevirici
// $(document).ready(function () {
//   $("#amount, #currency").on("input", function () {
//     var amount = $("#amount").val();
//     var currency = $("#currency").val();
//     var apiURL = "https://api.exchangerate.host/latest?base=" + currency;

//     $.ajax({
//       url: apiURL,
//       success: function (data) {
//         var rate = data.rates["TRY"];
//         var tlAmount = amount * rate;
//         $("#tl-amount").val(
//           tlAmount.toLocaleString("tr-TR", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })
//         );
//       },
//     });
//   });
// });

//2

//

// Kullanıcı miktarı, kaynak para birimi ve hedef para birimi girerken işlem yapılacak fonksiyonu tanımlıyorum.
$(document).ready(function () {
  $("#amount, #from-currency, #to-currency").on("input", function () {
    var amount = $("#amount").val();
    var fromCurrency = $("#from-currency").val();
    var toCurrency = $("#to-currency").val();
    // Değişim butonuna tıklandığında para birimlerini değiştiriyoruz.
    $("#exchange-btn").on("click", function () {
      var temp = fromCurrency;
      fromCurrency = toCurrency;
      toCurrency = temp;

      $("#from-currency").val(fromCurrency);
      $("#to-currency").val(toCurrency);
    });

    // API URL'sini oluşturup, AJAX isteğiyle veriyi alıyoruz.
    var apiURL = "https://api.exchangerate.host/latest?base=" + fromCurrency;

    $.ajax({
      url: apiURL,
      success: function (data) {
        var rate = data.rates[toCurrency];
        var toAmount = amount * rate;

        // Sonuç değerini input kutusuna yazdırıyoruz.
        $("#to-amount").val(toAmount.toLocaleString("tr-TR"));
      },
    });
  });
});

$(document).ready(function () {
  // Para birimi dizisini tanımlıyoruz.
  const currencies = ["USD", "EUR", "JPY", "GBP", "DKK", "NOK", "TRY"];

  // Seçeneklerin yerleştirileceği select kutularını belirliyoruz ve para birimlerini dolduruyoruz.
  currencies.forEach((currency) => {
    $("<option>")
      .val(currency)
      .text(currency)
      .appendTo("#from-currency, #to-currency");
  });

  // Değişim butonu tıklandığında para birimlerini değiştiriyoruz.
  $("#exchange-btn").on("click", function () {
    var fromCurrency = $("#from-currency").val();
    var toCurrency = $("#to-currency").val();
    $("#from-currency").val(toCurrency);
    $("#to-currency").val(fromCurrency);
  });

  // Kullanıcı miktarı, kaynak para birimi veya hedef para birimi değiştiğinde, işlem yapılacak fonksiyonu çağırıyoruz.
  $("#amount, #from-currency, #to-currency").on("input", function () {
    var amount = $("#amount").val();
    var fromCurrency = $("#from-currency").val();
    var toCurrency = $("#to-currency").val();
    // API URL'sini oluşturup, AJAX isteğiyle veriyi alıyoruz.
    var apiURL = "https://api.exchangerate.host/latest?base=" + fromCurrency;

    $.ajax({
      url: apiURL,
      success: function (data) {
        var rate = data.rates[toCurrency];
        var toAmount = amount * rate;

        // Sonuç değerini input kutusuna yazdırıyoruz ve para birimini belirliyoruz.
        $("#to-amount").val(
          toAmount.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    });
  });
});
