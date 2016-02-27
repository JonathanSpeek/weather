$(document).ready(function ($) {
    $.ajax({
        url: "http://ipinfo.io",
        dataType: 'jsonp',
        success: function (ipInfo) {

            $.ajax({
                url: "http://api.wunderground.com/api/7377c002f8b742ea/conditions/q/" + ipInfo.loc + ".json",
                dataType: "jsonp",
                success: function (response) {
                    var conditions = response.current_observation;
                    var tempF = conditions.temp_f;
                    var tempC = conditions.temp_c;
                    var weatherIcon = conditions.icon_url;
                    var weatherAlt = conditions.icon;
                    var city = conditions.observation_location.city.split(', ')[1];
                    var state = conditions.observation_location.state;
                    var weather = conditions.weather;
                    var wind = conditions.wind_mph + 'mph, ' + conditions.wind_dir;

                    console.log(conditions);
                    $('#weather-icon').attr({
                        src: weatherIcon,
                        alt: weatherAlt
                    });

                    $('#temp').append(tempF + '° F');
                    $('#city').append(city + ', ' + state);
                    $('#weather').append(weather);
                    $('#wind').append(wind);

                    var myColors = ["#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c",
                        "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#7f8c8d"];
                    var num = Math.floor(Math.random() * myColors.length);
                    var color = myColors[num];
                    document.getElementById("color1").style.backgroundColor = color;
                    document.getElementById("color2").style.color = color;
                    document.getElementById("color3").style.color = color;
                    document.getElementsByClassName("color4")[0].style.color = color;
                    document.getElementsByClassName("color5")[0].style.color = color;
                    document.getElementsByClassName("color6")[0].style.backgroundColor = color;

                    $('#temp-btn').click(function () {

                        if ($('#temp').hasClass('cel')) {
                            $('#temp').removeClass('cel');
                            $('#temp').addClass('far');
                            $('#temp').empty().append(tempF + '° F');
                        } else if ($('#temp').hasClass('far')) {
                            $('#temp').removeClass('far');
                            $('#temp').addClass('cel');
                            $('#temp').empty().append(tempC + '° C');
                        }

                    });

                }
            });

        }
    });
});
