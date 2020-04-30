//f744fde82d0b52476b93f7d394a00850

$(document).ready(function () {

  $("#search-button").on("click", function () {
    var searchValue = $("#city-input").val();
    searchWeather(searchValue);
    $("#city-input").empty();
    addHistory(searchValue);

  });
  $(".history").on("click","li", function(){
    searchWeather($(this).text())
  })
  function addHistory(text) {
    var li = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(li)
  }

   function searchWeather(value) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      $("#today").empty();
      var card = $("<p>").text("Current Weather");
      var body = $("<div>").addClass("card-body");
      var title = $("<h2>").addClass("card-title").text(response.name);
      var temp = Math.round(response.main.temp);
      var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
      var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
      var tempDisplay = $("<p>").addClass("card-text").text("Temp: " + temp +String.fromCharCode(176))
      console.log(response);
     
      body.append(title, tempDisplay, wind, humidity);
      card.append(body);
      $("#today").append(card);
    
      
    
      getUVIndex(response.coord.lat, response.coord.lon);
      getForecast(response.coord.lat, response.coord.lon);

    })
  }

  //Function for UV Index
  function getUVIndex(lat, lon) {
    //Ajax call 
    $.ajax({
      type: "GET",
      //API call link with id for UV Index
      url: `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=f744fde82d0b52476b93f7d394a00850&lat=${lat}&lon=${lon}`,
      dataType: "json",
      //function to color code UV index
    }).then(function (res) {
      var uv = $("<p>").text("UV Index: ");
      var btn = $("<span>").addClass("btn btn-sm").text(res[0].value)
      //if UV index is below 3, the button color will be green
      if (res[0].value < 3) {
        btn.addClass("btn-success");
        //if UV index is below 7, the button color will be yellow
      } else if(res[0].value < 7) {
        btn.addClass("btn-warning");
        //if UV index is greater than 7, the button color will be red
      } else {
        btn.addClass("btn-danger");
      }
        //
      $("#today .card-body").append(uv.append(btn));
    })
  }
  function getForecast(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (data) {
      $("#forecast").empty();
      //var dayArray = data.daily;
      //var fiveDayArray = dayArray.splice(-1, 3);
      
        for (var i = 1; i < data.daily.length; i++) {
        var col = $("<div>").addClass("col-lg-2");
        var card = $("<div>").addClass("card");
        var body = $("<div>").addClass("card-body"); 
        var minTemp = $("<p>").addClass("card-text").text(data.daily[i].temp.min);
        var maxTemp = $("<p>").addClass("card-text").text(data.daily[i].temp.max);
        var dateTime = $("<p>").addClass("card-text").text(moment.unix(data.daily[i].dt).format("MM/DD"));

        body.append(dateTime, minTemp, maxTemp);
        $("#forecast").append(col.append(card.append(body)))
      }
      
    })
  }
});



