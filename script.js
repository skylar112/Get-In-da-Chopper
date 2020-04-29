//f744fde82d0b52476b93f7d394a00850

$(document).ready(function () {

  $("#search-button").on("click", function () {
    var searchValue = $("#city-input").val();
    searchWeather(searchValue);
    $("#city-input").empty();





  })

  //API call for UV index -  http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}

  function searchWeather(value) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      var temp = Math.round(response.main.temp);
      var humidity = (response.main.humidity);
      var wind = (response.wind.speed);
      var card = $("<div>").addClass("card");
      var body = $("<div>").addClass("card-body");
      var title = $("<div>").addClass("card-title").text(response.name)
     

      body.append(title)
      card.append(body);
      $("#today").append(card);
      getUVIndex(response.coord.lat, response.coord.lon);
      getForecast(response.coord.lat, response.coord.lon);

    })
  }

  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=f744fde82d0b52476b93f7d394a00850&lat=${lat}&lon=${lon}`,
      dataType: "json",
    }).then(function (res) {
      var uv = $("<p>").text("UV Index: ");
      var btn = $("<span>").addClass("btn btn-sm").text(res[0].value)
      if (res[0].value < 3) {
        btn.addClass("btn-success");
      } else if(res[0].value < 7) {
        btn.addClass("btn-warning");
        
      } else {
        btn.addClass("btn-danger");
      }
      $("#today .card-body").append(uv.append(btn));
    })
  }
  function getForecast(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (data) {
      console.log(data);
      for (var i = 1; i < data.daily.length; i++) {
        var card = $("<div>").addClass("card");
        var body = $("<div>").addClass("card-body"); 
      }
      
    })
  }
});



