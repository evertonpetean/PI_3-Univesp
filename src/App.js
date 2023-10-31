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
      fetch(`http://api.weatherapi.com/v1/current.json?key=cfc844e87500429f992194636233010&q=${city}&lang=pt`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na solicitação da API');
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
          <h1>
            Verifique agora a previsão do tempo em sua cidade!
          </h1>
          <p class='lead'>
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>
          <p>
            <em>Para visualizar o histórico de dados climáticos do Município de Piacatu.
              <a class='' href='https://piacatu.sp.gov.br'>(CLIQUE AQUI)</a></em>
          </p>
          <div class='row mb-2'>
            <div class='col-md-5'>
              <input
                onChange={handleChange}
                class='form-control' value={city} />
            </div>
          </div>
          <button onClick={handleSearch} class='btn btn-success'>
            Pesquisar
          </button>

          
          {error && <p class="text-danger">{error}</p>}
          {weatherData && (
              <div class='weather-data'>
                <p>Local: {weatherData.location.name}, {weatherData.location.region}-{weatherData.location.country}</p>
                <p>Temperatura: {weatherData.current.temp_c}°C</p>
                <p>Umidade do ar: {weatherData.current.humidity}%</p>
                <p>Hoje o dia está: {weatherData.current.condition.text}</p>
              </div>
          )}
          

        </div>

      </main>

    </div >
  );
}

export default App;
