import React, { useState } from 'react';

const Regraschat = ({ onClose }) => {
  const [showMessage, setShowMessage] = useState(true);

  const hideMessage = () => {
    setShowMessage(false);
    onClose();
  };

  return (
    showMessage && (
      <div id='fundo-regra'>
      <center>
      <div id='regras-chat'>
        <h2>Regras</h2>
        <p>Sinta-se livre para escrever tanto em português e francês, Jules entendera os dois</p>
        <p>Para enviar a mensagem basta clicar em enviar</p>
        <p>Tente manter a conversa com respeito (SEM PALAVRÕES ❌)</p>
        <p>DIVIRTA-SE E BONS ESTUDOS ✏️</p>
        <button id='botao-regra' onClick={hideMessage}>Fechar</button>
      </div>
      </center>
      </div>
    )
  );
};

export default Regraschat;