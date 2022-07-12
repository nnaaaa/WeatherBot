const {
  default: axios
} = require('axios');
const {
  MessageClient,
  MarkdownBuilder
} = require('disney.js');

const key = '589f71e9a8e3406d99034020221207';

class WeatherClient extends MessageClient {
  async getToday(country) {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${country}&days=7`)
      const getIcon = () => {
        switch (res.data.current.condition.text) {
          case 'Sunny':
            return '☀️';
          case 'Cloudy':
            return '☁️';
          case 'Rain':
            return '🌧';
          case 'Snow':
            return '🌨';
          case 'Thunderstorm':
            return '⛈';
          case 'Mist':
            return '🌫';
          default:
            return '🌧';
        }
      }
      this.message.send({
        content: MarkdownBuilder.tag`
          ### ${res.data.location.name} ${getIcon()}
          Current temperature is ${res.data.current.temp_c}°C
        `,
      })
    } catch (e) {
      console.error(e)
    }
  }
}


const client = new WeatherClient();

await client.login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6ImQ5YTA2NmNmLTdkYzUtNGNiNy04YWY5LTQ2ZDk1YWM0YWUzZCIsImlhdCI6MTY1NzU5ODIzN30.qyaGWlf2tyC5vNKGyjvjmz-o7KvOZr1W8khpOuTFLes');