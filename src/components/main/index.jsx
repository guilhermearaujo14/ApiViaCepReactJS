import { useState } from 'react';
import axios from 'axios';
import './style.css';
import { BsSearch } from 'react-icons/bs';

function PaginaPrincipal(){
    const [cep, setCep] = useState('');
    const [txtCEP, setTxtCEP] = useState('')
    const [txtlogradouro, setTxtLogradrouro] = useState('')
    const [txtComplemento, setTxtComplemento] = useState('')
    const [txBairro, setTxBairro] = useState('')
    const [txtCidade, setTxtCidade] = useState('')
    const [txtUF, setTxtUF] = useState('')
    const [isExibeContainer, setisExibeContainer] = useState(false)

   
async function buscaDados(cep){

    await axios.get(`https://viacep.com.br/ws/${cep}/json`)
    .then((response) => {
        setTxtCEP(response.data.cep)
        setTxtLogradrouro(response.data.logradouro)
        setTxtComplemento(response.data.complemento)
        setTxBairro(response.data.bairro)
        setTxtCidade(response.data.localidade)
        setTxtUF(response.data.uf)
        setisExibeContainer(true)
        setCep('')
    }
    
    )
}
    
    return(

        <div className='container-principal'>
            <div className='container-titulo'>
                <h2> BUSCADOR DE CEP</h2>
            </div>
            <div className='container-pesquisa'>
                <input type='text' placeholder='Digite o CEP...' value={cep} onChange={(e) => {setCep(e.target.value)} } />
                <button type='submit' onClick={()=> buscaDados(cep)}> <BsSearch size={20}/> </button>
            </div>
              { isExibeContainer && (
                <div className='container-resultado-pesquisa' >
                    <h2>CEP: {txtCEP}</h2>
                    <span>Endereço: {txtlogradouro}</span>
                    <span>Complemento: {txtComplemento}</span>
                    <span>Bairro: {txBairro}</span>
                    <span>{txtCidade} - {txtUF} </span>
                </div>
            )}
        </div>        

        )
}

export default PaginaPrincipal;