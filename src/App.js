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
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfc844e87500429f992194636233010&q=${city}&lang=pt`)
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

      <main class="container ">
        <div class='jumbotron'>
          <p class='lead'>
            Periodo da manhã.
          </p>
          <div class=''>
            <iframe title="Report Section" width="800" height="300" 
            src="https://app.powerbi.com/view?r=eyJrIjoiZGNkMmMxZDItNTI4My00OTI0LTkzNzAtZWY3ZmQ3ZDBlYjIxIiwidCI6ImQwNGQzMzgzLWQ3YzctNGU0OC05NGU2LTUxODk2YjgxMjI5YSJ9" frameborder="0" allowFullScreen="true"></iframe>
          </div>

          <p class='lead'>
            Periodo da tarde.
          </p>
          <div class=''>
            <iframe title="Report Section" width="800" height="300"
              src="https://app.powerbi.com/view?r=eyJrIjoiZGU0NDMyOTYtZTRkNy00MjNlLTkyYzItZWI0YmZmODExYTYyIiwidCI6ImQwNGQzMzgzLWQ3YzctNGU0OC05NGU2LTUxODk2YjgxMjI5YSJ9" frameborder="0" allowFullScreen="true"></iframe>
          </div>

          <p class='lead'>
            Para consultar outro local, digite o nome da cidade no campo abaixo e clique em pesquisar.
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
            <div class='weather-data mt-4 d-flex flex-column align-items-center' >
              <p class='h4'>Agora em {weatherData.location.name}, {weatherData.location.region} - {weatherData.location.country}</p>
              <span class='mt-3 mb-0'><img src={weatherData.current.condition.icon} alt='' /></span>
              <div class='lead d-flex flex-column font-weight-bold font-italic '>
                <span class='h1'>{weatherData.current.temp_c} °C  </span>
                <span class=''>{weatherData.current.condition.text} </span>
                <span class=''>Umidade do ar: {weatherData.current.humidity}%</span>
                <span class=''>Vento: {weatherData.current.wind_kph} km/h </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div >
  );
}
export default App;
