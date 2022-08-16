
const axios = require('axios')
const {MarkdownBuilder, MessageAction, MessageButton, MessageClient} = require('disney.js')

const key = '589f71e9a8e3406d99034020221207';

class WeatherClient extends MessageClient {
  async getToday() {
    const countries = ['Vietnam', 'Japan', 'China', 'Korea', 'Thailand', 'Singapore', 'Australia'];
    const action = new MessageAction()
    countries.forEach(c => action.addButton(new MessageButton().setName(c)))

    const message = await this.message.send({ content: '1234', action })

    action.onButtonClick(async (button) => {
      for (const country of countries) {
        if (button.name === country) {
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
          message.edit({
            content: MarkdownBuilder.tag`
              ### ${res.data.location.name} ${getIcon()}
              Current temperature is ${res.data.current.temp_c}°C
            `,
          })
        }
      }
    })
  }
}

const client = new WeatherClient();

client.login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6Ijk3NWNkZTdhLTBiMWItNDVjZC05OGI2LTg1YzNhMGEzMTVkZiIsImlhdCI6MTY2MDQ4MTQ5NH0.mxtlNbTwUOm7fG9CxEhvDePOYvGL0_Kqp39SV-0nQas');