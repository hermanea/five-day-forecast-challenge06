$(document).ready(() => {

    var clickBtn = $('#clickBtn');
    var previousSearch = [];
    createPriorList();

    //Function that runs displayWeather function on search button click.
    clickBtn.on('click', function(event){
        event.preventDefault();
        var input = $('#getCity');
        displayWeather(input.val());

    })


    //Function displays weather of a valid city input. Returns weather of input. If city is invalid, user is alerted. For loop runs through desired length of days.
    

    function displayWeather(cityName){
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=7a516f1ed38e70e2b0299f025745f5d6")
        .then(function (response) {
            if(response.status > 400 ){
                alert("invalid entry. Please search again");
            } else {
                var hidden = $('#hideThis')
                hidden.attr("class","col-12 col-lg-9");
                return response.json();

            }
        })
        .then(function(data) {
            $('#city').text(data.city.name);
            for(var i = 0; i<6; i++){
                var skip = i * 7;
                $('.date').eq(i).text(dayjs.unix(data.list[skip].dt).format('MM/DD/YYYY'));
                console.log(dayjs.unix(data.list[skip].dt).format('MM/DD/YYYY'));
                console.log(data.list[skip].dt);
                $('.icon').eq(i).attr("src","http://openweathermap.org/img/wn/"+ data.list[i+1].weather[0].icon +".png");
                $('.temp').eq(i).text("Temp: " + data.list[skip].main.temp + " °F");
                $('.wind').eq(i).text("Wind: " + data.list[skip].wind.speed + " MPH");
                $('.humid').eq(i).text("Humidity: " + data.list[skip].main.humidity + "%"); 
            }
            if(!priorSearch.includes(data.city.name)){
                priorSearch.push(data.city.name);
            }
            localStorage.setItem("priorCity", JSON.stringify(priorSearch));
            createPriorList();
        })
    }

    // Function displays previously searched cities.
        function createPriorList(){
        priorSearch = JSON.parse(localStorage.getItem("priorCity")) || [];
        $('#priorList').empty();
        for(var i = 0; i<priorSearch.length; i++){
            var newList = $("<li>");
            var newButton =$("<button>")
            newButton.text(priorSearch[i]);
            newButton.attr("cityname", priorSearch[i]);
            newButton.attr("class", "w-100")
            newButton.on("click",function(){
                displayWeather($(this).attr("cityname"));
            });
            newList.append(newButton);
            $('#priorList').append(newList);
        }
    }       
})

  


//   http://api.openweathermap.org/geo/1.0/direct?q=seattle&appid=7a516f1ed38e70e2b0299f025745f5d6


//   https://api.openweathermap.org/data/2.5/forecast?lat=47.6038321&lon=-122.330062&appid=7a516f1ed38e70e2b0299f025745f5d6


// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}