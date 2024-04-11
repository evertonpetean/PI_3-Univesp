import { useState } from "react";


function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value)

  }

  //chamada da API
  const handleSearch = () => {
    if (city) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfc844e87500429f992194636233010&q=${city}&days=7&lang=pt`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na solicitação');
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setWeatherData(null);
        });
    }
  }

  return (
    <div>
      <nav class="navbar navbar-expand-md w-auto bg-success text-white mb-4 d-flex justify-content-start align-items-center">
        <a class="navbar-brand" href="https://www.piacatu.sp.gov.br/">
          <img src="https://piacatu.sp.gov.br/images/brasao_sic.png" width="60" height="60" alt='' />
        </a>
        <h5>Sistema de Consulta de Dados Climáticos - Municipio de Piacatu</h5>
      </nav>
      <main class="container">
        <div class='jumbotron'>
          <h2>
            Verifique a previsão do tempo em sua cidade!
          </h2>
          <p class='lead '>
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>
          <p class=''>
            <em>Para visualizar o histórico de dados climáticos do Município de Piacatu.
              <a class='' href='https://piacatu.sp.gov.br'>(CLIQUE AQUI)</a></em>
          </p>
          <div class='row mb-3'>
            <div class='col-md-5'>
              <input
                onChange={handleChange}
                class='form-control' value={city} />
            </div>
          </div>
          <button onClick={handleSearch} class='btn btn-success'>
            Pesquisar
          </button>

          {error && <p class="text-danger mt-1">{error}</p>}
          {weatherData && (
            <div class='weather-data mt-4 d-flex flex-column ' >
              <div class='current d-flex flex-column align-items-center'>
                <p class='h4'>Agora em {weatherData.location.name}, {weatherData.location.region} - {weatherData.location.country}</p>
                <span class='mt-1 mb-0'>
                  <img src={weatherData.current.condition.icon} alt='' />
                  <span class='h4'>{weatherData.current.temp_c} °C </span>
                </span>
                <div class='lead d-flex flex-column font-weight-bold font-italic '>
                  <p class='h6 font-weight-bold'>Umidade do ar: {weatherData.current.humidity}%</p>
                  <p class='h6 font-weight-bold'>Vento: {weatherData.current.wind_dir} - {weatherData.current.wind_kph} km/h </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 mt-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Previsão Hoje </h5>
                      <img src={weatherData.forecast.forecastday[0].day.condition.icon} alt='' />
                      <p class="card-text">Máxima: {weatherData.forecast.forecastday[0].day.maxtemp_c} °C </p>
                      <p class="card-text">Minima: {weatherData.forecast.forecastday[0].day.mintemp_c} °C</p>
                      <p class="card-text">Condição: {weatherData.forecast.forecastday[0].day.condition.text}. </p>
                      <p class="card-text">Chuva: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}% - {weatherData.forecast.forecastday[0].day.totalprecip_mm}mm </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mt-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Previsão Amanhã</h5>
                      <img src={weatherData.forecast.forecastday[1].day.condition.icon} alt='' />
                      <p class="card-text">Máxima: {weatherData.forecast.forecastday[1].day.maxtemp_c} °C </p>
                      <p class="card-text">Minima: {weatherData.forecast.forecastday[1].day.mintemp_c} °C</p>
                      <p class="card-text">Condição: {weatherData.forecast.forecastday[1].day.condition.text}. </p>
                      <p class="card-text">Chuva: {weatherData.forecast.forecastday[1].day.daily_chance_of_rain}% - {weatherData.forecast.forecastday[0].day.totalprecip_mm}mm </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>


          )}



        </div>

      </main>

    </div >
  );
}

export default App;
