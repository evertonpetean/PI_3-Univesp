import { useState } from "react";


function App() {
  const [city, setCity] = useState('')

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  //chamada da API
  const handlesearch = () => {
    fetch()
  }

  return (
    <div>
      <nav class="navbar navbar expand-md bg-success text-white mb-4 d-flex justify-content-start d-flex align-items-end" >
        <a class="" href="https://www.piacatu.sp.gov.br/">
          <img src="https://piacatu.sp.gov.br/images/brasao_sic.png" width="60" height="60" class="d-inline-block align-top" alt="" />
        </a>
        <h3>Municipio de Piacatu</h3>
      </nav>
      <main class="container">

        <div class='jumbotron'>
          <h1>
            Verifique agora a previsão do tempo em sua cidade!
          </h1>
          <p class='lead'>
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>

          <div class='row mb-4'>
            <div class='col-md-6'>
              <input
                onChange={handleChange}
                class='form-control' value={city} />
            </div>
            <div class='col md6' >
              Para visualizar o histórico de dados para o Município de Piacatu.
              <a class='' href='#'>(CLIQUE AQUI)</a> 
            </div>
          </div>
          <button class='btn btn-success btn-lg'>
            Pesquisar
          </button>

        </div>

      </main>

    </div >
  );
}

export default App;
