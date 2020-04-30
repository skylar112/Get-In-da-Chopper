//f744fde82d0b52476b93f7d394a00850

$(document).ready(function () {

  $("#search-button").on("click", function () {
    var searchValue = $("#city-input").val();
    searchWeather(searchValue);
    $("#city-input").empty();





  })

   function searchWeather(value) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      var card = $("<p>").text("Current Weather");
      var body = $("<div>").addClass("card-body");
      var title = $("<div>").addClass("card-title").text(response.name);
      var temp = Math.round(response.main.temp);
      var humidity = $("<p>").text("Humidity:");
      var wind = $("<p>").text("Wind Speed:");
      console.log(response);
     
      body.append(title)
      card.append(body);
      $("#today").append(card);
      $("#today").append(card.append(temp));
      $("#today").append(humidity.append(response.main.humidity + "%"));
      $("#today").append(wind.append(response.wind.speed + "mph"));
      
    
      getUVIndex(response.coord.lat, response.coord.lon);
      getForecast(response.coord.lat, response.coord.lon);

    })
  }


// JS#67-69: we want to keep the forecast to just 5 days, (i = 1 already) splice the last 2 days off the 8 day forecast. Get the solution to Corey
// JS#67-39: get it into card id=Forecast, in a row 5 across formation
// Code in function in clear button to clear results
//convert TD into usable time through moment.JS
//localstorage for box on the left, look at day planner homework


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
    
      for (var i = 1; i < data.daily.length; i++) {
        var card = $("<div>").addClass("card");
        var body = $("<div>").addClass("card-body"); 
      }
      
    })
  }
});



