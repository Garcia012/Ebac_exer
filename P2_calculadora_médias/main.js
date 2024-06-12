const form = document.getElementById('form-atividade');
const btnLimparTabela = document.getElementById('limpar-tabela');
const imgAprovado = '<img src="./aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./reprovado.png" alt="Emoji decepcionado" />';
let notas = []; // Array para armazenar as notas

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    const nomeAtividade = inputNomeAtividade.value.trim(); // Remove espaços em branco extras
    const nota = parseFloat(inputNotaAtividade.value);

    // Verifica se o nome da atividade já existe
    const atividadeExistente = notas.find(atividade => atividade.nome === nomeAtividade);
    if (atividadeExistente) {
        alert('Atividade com o mesmo nome já existe! Por favor, insira um nome diferente.');
        return; // Sai da função para evitar a adição da atividade duplicada
    }

    // Adiciona a nova atividade ao array
    notas.push({ nome: nomeAtividade, nota: nota });

    let linha = '<tr>';
    linha += `<td>${nomeAtividade}</td>`;
    linha += `<td>${nota.toFixed(2)}</td>`;
    linha += `<td>${nota >= 7 ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    linhas += linha;

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;

    // Calcula a média das notas
    const media = calcularMedia(notas);
    
    // Atualiza a média final na tabela
    const mediaFinalTd = document.querySelector('tfoot td:nth-child(2)');
    mediaFinalTd.textContent = media.toFixed(2);

    // Atualiza o status de aprovação
    const resultadoSpan = document.querySelector('tfoot .resultado');
    if (media >= 7) {
        resultadoSpan.textContent = 'Aprovado';
        resultadoSpan.classList.add('aprovado');
        resultadoSpan.classList.remove('reprovado');
    } else {
        resultadoSpan.textContent = 'Reprovado';
        resultadoSpan.classList.add('reprovado');
        resultadoSpan.classList.remove('aprovado');
    }

    // Limpa os campos de entrada
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
});

// Função para calcular a média
function calcularMedia(notas) {
    const soma = notas.reduce((acc, nota) => acc + nota.nota, 0); // Somente soma as notas
    return soma / notas.length;
}

// Função para limpar a tabela e reiniciar os dados
btnLimparTabela.addEventListener('click', function() {
    // Limpa o array de notas
    notas = [];
    linhas = '';

    // Limpa o conteúdo da tabela
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = '';

    // Reseta a média final e o status de aprovação
    const mediaFinalTd = document.querySelector('tfoot td:nth-child(2)');
    mediaFinalTd.textContent = '0';
    const resultadoSpan = document.querySelector('tfoot .resultado');
    resultadoSpan.textContent = '---';
    resultadoSpan.classList.remove('aprovado');
    resultadoSpan.classList.remove('reprovado');
});