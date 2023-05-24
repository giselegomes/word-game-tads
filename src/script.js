// Array de palavras-alvo
var palavrasAlvo = ["tecnologia", "computador", "internet", "programação", "software"];

var palavrasDigitadas = [];
var acertos = 0;
var erros = 0;
var tempoRestante = 60;
var intervaloTemporizador;
var ranking = [];

function contarPalavras() {
    var entradaUsuario = document.getElementById("entrada").value; // Obtém a entrada do usuário
    var palavraAtual = entradaUsuario.trim(); // Remove espaços em branco no início e no fim da palavra

    if (palavraAtual !== "") {
        palavrasDigitadas.push(palavraAtual); // Adiciona a palavra atual ao array de palavras digitadas
        document.getElementById("entrada").value = ""; // Limpa o campo de entrada

        if (palavrasAlvo.includes(palavraAtual)) {
            acertos++;
        } else {
            erros++;
        }
    }

    atualizarResultado();
}

function verificarTecla(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // Impede o comportamento padrão de avançar para a próxima linha
        contarPalavras();
    }
}

function iniciarJogo() {
    palavrasDigitadas = [];
    acertos = 0;
    erros = 0;
    tempoRestante = 10;
    document.getElementById("entrada").disabled = false;
    document.getElementById("entrada").value = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("entrada").focus();

    clearInterval(intervaloTemporizador);
    intervaloTemporizador = setInterval(atualizarTemporizador, 500);
}

function atualizarTemporizador() {
    tempoRestante--;
    document.getElementById("resultado").innerHTML = "Tempo restante: " + tempoRestante + "s";

    if (tempoRestante <= 0) {
        clearInterval(intervaloTemporizador);
        document.getElementById("entrada").disabled = true;
        mostrarModal();
    }
}

function atualizarResultado() {
    document.getElementById("resultado").innerHTML = "Você acertou " + acertos + " palavra(s) e errou " + erros + " palavra(s).";
}

function mostrarModal() {
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function salvarPontuacao() {
    var nickName = document.getElementById("nickName").value;
    var pontuacao = acertos;

    ranking.push({ nickName: nickName, pontuacao: pontuacao });
    ranking.sort(function(a, b) {
        return b.pontuacao - a.pontuacao;
    });

    exibirRanking();
    salvarNoLocalStorage();
}

function exibirRanking() {
    var resultado = "Ranking de Pontuações:<br>";
    for (var i = 0; i < ranking.length; i++) {
        resultado += (i + 1) + ". " + ranking[i].nickName + " - Pontuação: " + ranking[i].pontuacao + "<br>";
    }

    document.getElementById("resultado").innerHTML = resultado;
}

function salvarNoLocalStorage() {
    var rankingString = JSON.stringify(ranking);
    localStorage.setItem("ranking", rankingString);
}
