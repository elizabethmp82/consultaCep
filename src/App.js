import './styles.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Buscar from './assets/search.svg'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import api from './services/api'

function App() {

  const [input, setInput]=useState('');
  const [cep, setCep] = useState({}); //armazena o retorno da chamada

 async function handleSearch(){
    
//    01310930/json/
   if(input === ''){
    toast.warn("Preencha o CEP")
     return
   }  
   try{
       const response = await  api.get(`${input}/json`);

       setCep(response.data)
       setInput("")

   }catch{
    toast.error("Erro");
     setInput("");
   }
}

  return (
    <div className="conteiner">
  <ToastContainer autoClose={5500}/>
    <div className='box'>  
      <h1 className='title'>Consulta CEP</h1>
   
      <div className='conteinerInput'>
        <input
           type='text'
           placeholder='Digite o seu cep..'
           value={input}
           onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          < FiSearch size={30} />   
        </button>
      </div>


{Object.keys(cep).length > 0 && (
  <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>Bairro:{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf} </span>
    </main>
)}   
</div>
    </div>
  );
}

export default App;
