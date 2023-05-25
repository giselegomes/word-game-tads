const words = ["tecnologia", "computador", "internet", "programação", "software"];

let typedWords = [];
let right = 0;
let wrong = 0;
let timeLeft = 60;
let timerInterval;
let ranking = [];

function countWords() {
    // pega as entradas do input
    const inputWord = document.getElementById("entry").value;

    // converte para letras minusculas
    var currentWord = inputWord.trim().toLowerCase();

    if (currentWord !== "") {
        // adiciona a palavra do input, num array com as palavras digitadas
        typedWords.push(currentWord); 
        // "limpa" o input
        document.getElementById("entry").value = ""; 

        if (words.includes(currentWord)) {
            if (!typedWords.slice(0, -1).includes(currentWord)) {
                right++;
            } else {
                wrong++;
            }
        } else {
            wrong++;
        }
    }

    updateResult();
}

function checkKey(event) {
    if (event.keyCode === 13) {
        // Impede o comportamento padrão de avançar para a próxima linha
        event.preventDefault(); 
        countWords();
    }
}

function iniciarJogo() {
    typedWords = [];
    right = 0;
    wrong = 0;
    timeLeft = 5;
    document.getElementById("entry").disabled = false;
    document.getElementById("entry").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("entry").focus();

    clearInterval(timerInterval);
    timerInterval = setInterval(atualizarTemporizador, 1000);
}

function atualizarTemporizador() {
    timeLeft--;
    document.getElementById("timer").innerHTML = "Tempo restante: " + timeLeft + "s";

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById("entry").disabled = true;
        mostrarModal();
    }
}

function updateResult() {
    document.getElementById("result").innerHTML = "acertos: " + right + " erros: " + wrong ;
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
    var pontuacao = right;

    ranking.push({ nickName: nickName, pontuacao: pontuacao });
    ranking.sort(function(a, b) {
        return b.pontuacao - a.pontuacao;
    });

    exibirRanking();
    salvarNoLocalStorage();
}

function exibirRanking() {
    var tabela = "<table><h2>Ranking</h2>";
    tabela += "<tr><th></th></th><th>Name</th><th>Score</th></tr>";

    for (var i = 0; i < ranking.length; i++) {
        tabela += "<tr>";
        tabela += "<td>" + "#" + (i + 1) + "</td>";
        tabela += "<td>" + ranking[i].nickName + "</td>";
        tabela += "<td>" + ranking[i].pontuacao + "</td>";
        tabela += "</tr>";
    }

    tabela += "</table>";

    document.getElementById("ranking").innerHTML = tabela;
}


function salvarNoLocalStorage() {
    var rankingString = JSON.stringify(ranking);
    localStorage.setItem("ranking", rankingString);
}
