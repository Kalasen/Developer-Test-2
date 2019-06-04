using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeatherReport.Controllers
{
    [Route("api/OpenWeatherMapController")]
    public class OpenWeatherMapController : Controller
    {
        const string apiKey = "583bebf25e5677d021852f2d1e39f8fe";
        const string location = "Seattle,us"; // TODO: Let client pass location in the GET request, figure out location automatically on client end.
        readonly string currentWeatherUri = $"https://api.openweathermap.org/data/2.5/weather?q={location}&APPID={apiKey}";

        // GET api/OpenWeatherMapController/CurrentWeather
        [HttpGet("CurrentWeather")]
        public string Get()
        {
            using (var webClient = new WebClient())
            {
                return webClient.DownloadString(currentWeatherUri);                
            }
        }

        // TODO: Weekly forecast, etc.
    }
}
