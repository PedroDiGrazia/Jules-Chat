import React, { useState } from 'react';
import Regraschat from './Regraschat';
import axios from 'axios';

const Home = () => {
    const [showRegraschat, setShowRegraschat] = useState(true);
    const [mensagemUsuario, setMensagemUsuario] = useState('');
    const [response, setResponse] = useState('');

    const hideRegraschat = () => {
        setShowRegraschat(false);
    };

    const handleMensagemChange = (e) => {
        setMensagemUsuario(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEnviarClick();
        }
    };

    const handleEnviarClick = () => {
        console.log('Mensagem enviada:', mensagemUsuario);
        axios
            .post("http://localhost:3000/chat", { mensagemUsuario })
            .then((res) => {
                setResponse(res.data);
                
            })
            .catch((err) => {
                console.error("Erro na requisição:", err.response || err);
            });
            setMensagemUsuario('');
    };

    return (
        <>
            <div className="home-container">
                <center>
                    <h1>
                        Aprenda Francês com IA 🤖
                    </h1>
                </center>
            </div>
            <img id='orangeguy' src={require('./images/orangeguy.png')} alt="Orange Guy" />
            <div className='chat-area'>
                {showRegraschat ? (
                    <Regraschat onClose={hideRegraschat} />
                ) : (
                    <>
                        <div id='msg-inicio'>
                            <p>Bem vindo! Eu sou Jules a IA que irá te ajudar a falar francês, para começar basta digitar a situação
                                <br /> que deseja conversar comigo, como por exemplo: Conversas típicas em uma padaria, restaurantes,
                                <br /> festas... sinta-se livre para escolher qualquer coisa
                            </p>
                        </div>
                        <div id='msg-user'>
                            <p> Ola Jules, vamos simular uma conversa onde você é um padeiro.
                            </p>
                        </div>
                        <div id='campo-texto'>
                            <textarea
                                id='campo-texto-area'
                                value={mensagemUsuario}
                                onChange={handleMensagemChange}
                                onKeyDown={handleKeyDown}
                                placeholder='Digite aqui'
                            />
                        </div>
                        <button id='enviar-button' onClick={handleEnviarClick}>
                            Enviar
                        </button>
                        <div id='msg-inicio'>
                            <p>
                                {response}
                            </p>
                        </div>
                    </>
                )}
            </div>
            <button id='como-funciona' onClick={() => setShowRegraschat(true)}>Como Funciona?</button>
        </>
    );
};

export default Home;
