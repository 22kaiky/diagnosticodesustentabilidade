```javascript id="1v8nxf"
// Seleciona elementos do DOM
const btnCalcular = document.querySelector('#calcularScore');
const resultadoScore = document.querySelector('#resultadoScore');
const recomendacoes = document.querySelector('#recomendacoes');

btnCalcular.addEventListener('click', () => {
    // Captura valores da propriedade
    const nomePropriedade = document.querySelector('#nomePropriedade').value.trim();
    const tamanhoPropriedade = parseFloat(document.querySelector('#tamanhoPropriedade').value);
    const tipoProducao = document.querySelector('#tipoProducao').value.trim();

    // Captura valores dos inputs de ESG
    const usoAgua = parseInt(document.querySelector('#usoAgua').value);
    const manejoResiduos = parseInt(document.querySelector('#manejoResiduos').value);
    const energiaRenovavel = parseInt(document.querySelector('#energiaRenovavel').value);

    const condicoesTrabalho = parseInt(document.querySelector('#condicoesTrabalho').value);
    const envolvimentoComunidade = parseInt(document.querySelector('#envolvimentoComunidade').value);
    const capacitacao = parseInt(document.querySelector('#capacitacao').value);

    const gestaoFinanceira = parseInt(document.querySelector('#gestaoFinanceira').value);
    const registroProcessos = parseInt(document.querySelector('#registroProcessos').value);
    const conformidadeLegal = parseInt(document.querySelector('#conformidadeLegal').value);

    // Validação de dados estrita
    if (!nomePropriedade || !tipoProducao || isNaN(tamanhoPropriedade) || tamanhoPropriedade <= 0) {
        alert('Por favor, preencha corretamente o nome, tipo de produção e tamanho da propriedade.');
        return;
    }

    const esgInputs = [
        usoAgua, manejoResiduos, energiaRenovavel,
        condicoesTrabalho, envolvimentoComunidade, capacitacao,
        gestaoFinanceira, registroProcessos, conformidadeLegal
    ];

    for (let i = 0; i < esgInputs.length; i++) {
        if (isNaN(esgInputs[i]) || esgInputs[i] < 0 || esgInputs[i] > 3) {
            alert('Todos os campos ESG devem estar entre 0 e 3.');
            return;
        }
    }

    // Calcula o score total e médio
    const totalScore = esgInputs.reduce((acc, val) => acc + val, 0);
    const maxScore = esgInputs.length * 3;
    const percentual = ((totalScore / maxScore) * 100).toFixed(1);

    // Determina faixa de sustentabilidade
    let faixa;
    if (percentual <= 30) {
        faixa = 'Baixa Sustentabilidade';
    } else if (percentual <= 60) {
        faixa = 'Sustentabilidade Média';
    } else {
        faixa = 'Alta Sustentabilidade';
    }

    // Sugestões automáticas baseadas nos pilares
    const sugestoes = [];
    // Ambiental
    const ambientalScore = usoAgua + manejoResiduos + energiaRenovavel;
    if (ambientalScore < 5) {
        sugestoes.push('• Investir em manejo de resíduos e práticas de economia de água e energia renovável.');
    }
    // Social
    const socialScore = condicoesTrabalho + envolvimentoComunidade + capacitacao;
    if (socialScore < 5) {
        sugestoes.push('• Melhorar condições de trabalho, capacitação e interação com a comunidade.');
    }
    // Governança
    const governancaScore = gestaoFinanceira + registroProcessos + conformidadeLegal;
    if (governancaScore < 5) {
        sugestoes.push('• Organizar registros, gestão financeira e assegurar conformidade legal.');
    }

    // Renderiza resultado na tela
    resultadoScore.innerHTML = `
        <strong>${nomePropriedade}</strong><br>
        Tipo de Produção: <em>${tipoProducao}</em><br>
        Tamanho: ${tamanhoPropriedade} ha<br>
        Score ESG: <strong>${percentual}%</strong> - ${faixa}
    `;

    recomendacoes.innerHTML = sugestoes.length > 0 
        ? `<h3>Recomendações de Melhoria:</h3><ul>${sugestoes.map(s => `<li>${s}</li>`).join('')}</ul>` 
        : '<h3>Parabéns! Sua fazenda apresenta boas práticas de sustentabilidade.</h3>';
});
```

