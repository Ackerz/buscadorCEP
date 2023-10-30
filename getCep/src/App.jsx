import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'
import './App.css'
import api from './services/Api';

function App() {
    let [input, setInput] = useState('');
    const [cep, setCep] = useState({});
    
    const handleSearch = async () => {
      if(input == ''){
        alert('Preencha o CEP');
        return;
      }

      try{
        input = input.replace('-', '')
        const response = await api.get(`${input}/json`)
        setCep(response.data);
        setInput('')
      }catch{
        alert('CEP Invalido')
        setInput('')
      }
    }
  return (
    <div className='container'>
      <h1 className='title'>Busca CEP</h1>

      <div className='containerInput'>

        <input type="text" value={input} placeholder='Digite o CEP...' onChange={(e) => setInput(e.target.value)}/>
        <button className='buttonSearch' onClick={handleSearch}><FiSearch size={25} color='#FFF'/></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>Cep: {cep.cep}</h2>

          <span>Rua {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App
