//Weather image into forecast and weather cards
//clear history button


$(document).ready(function () {
//Click function for search button
  $("#search-button").on("click", function () {
    var searchValue = $("#city-input").val();
    searchWeather(searchValue);
    $("#city-input").val("");

  });
  //List added for searched cities
  $(".history").on("click","li", function(){
    searchWeather($(this).text());
  })
  //Function to add searched cities onto the list above
  function addHistory(text) {
    var li = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(li)
  }
  //Weather function
   function searchWeather(value) {
     //AJAX call to get current weather
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
     //Allows user to select weather based on the searched cities that are stored on the list
    }).then(function (response) {
      //Does not allow duplicate cities to be stored in the list
      if(history.indexOf(value) === -1) {
        history.push(value);
          //Placing searched cities to be placed into local storage
          window.localStorage.setItem("history", JSON.stringify(history));
          addHistory(value);
      }
      //Passing through current humidity, temp, wind speed into the current weather card
      $("#today").empty();
      //Inserted card for Current weather
      var card = $("<p>").text("Current Weather");
      var body = $("<div>").addClass("card-body");
      //Upon AJAX call, the city searched is pushed into card-body
      var title = $("<h2>").addClass("card-title").text(response.name);
      //Temperature is rounded to a whole number
      var temp = Math.round(response.main.temp);
      //Word humidity and % is placed onto the card-body
      var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
      //Words wind speed and mpg are placed onto the card-body
      var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
      //This added a farenheit symbol after the rounded up temperature
      var tempDisplay = $("<p>").addClass("card-text").text("Temp: " + temp +String.fromCharCode(176))
      
      //Append current city, temperature, wind speed and humidity to the card-body
      body.append(title, tempDisplay, wind, humidity);
      card.append(body);
      $("#today").append(card);
      //Append UV Index and 5 Day forecast by coordinates        
      getUVIndex(response.coord.lat, response.coord.lon);
      getForecast(response.coord.lat, response.coord.lon);

    })
  }

  //UV Index function
  function getUVIndex(lat, lon) {
    //Ajax call 
    $.ajax({
      type: "GET",
      //API call link with id for UV Index
      url: `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=f744fde82d0b52476b93f7d394a00850&lat=${lat}&lon=${lon}`,
      dataType: "json",
      //function to color code UV index, and changing color coded button to indicate UV intensity
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
        //Insert button for color display for UV Index
      $("#today .card-body").append(uv.append(btn));
    })
  }
  //5 day forecast function, using JSON to retrieve data from API 
  function getForecast(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f744fde82d0b52476b93f7d394a00850&units=imperial`,
      dataType: "json",
    }).then(function (data) {
      $("#forecast").empty();
      //For loop to display only 5 day forecast rather than 8 days
      for (var i = 1; i < 6; i++) 
        {
        //rounding up temp decimal to whole number for Min and Max  
        var minTemp = Math.round(data.daily[i].temp.min);
        var maxTemp = Math.round(data.daily[i].temp.max);
        //Classing forecast cards for styling
        var col = $("<div>").addClass("col-lg-2");
        var card = $("<div>").addClass("card").attr("style", "margin-bottom:10px");
        var body = $("<div>").addClass("card-body"); 
        var weatherDisplayEL = $("<p>").addClass("card-text")
        //classing Min and Max temp while farenheit symbol after temp
        var minTempEl = $("<p>").addClass("card-text").text("Min: " + minTemp +String.fromCharCode(176));
        var maxTempEl = $("<p>").addClass("card-text").text("Max: " + maxTemp +String.fromCharCode(176));
        //Displaying date for the projected 5 day forecast
        var dateTime = $("<p>").addClass("card-text").text(moment.unix(data.daily[i].dt).format("MMMM  DD"));
        //Append forecast projected date, max and min temp to the above classed card-body  
        body.append(dateTime, minTempEl, maxTempEl);
                $("#forecast").append(col.append(card.append(body)))
      }

         
    })
  }
  

  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  
  //if statement to 
  if(history.length > 0) {
    searchWeather(history[history.length]);
  }
  //For loop to keep the  searched cities to list while allowing to add more
  for (var i = 0; i < history.length; i++) {
     addHistory(history[i]);
  }

  


  
});


