const words = [
    "tecnologia",
    "computador",
    "internet",
    "programação",
    "software",
    "algoritmo",
    "API",
    "aplicativo",
    "arduino",
    "banco de dados",
    "big data",
    "blockchain",
    "byte",
    "cibersegurança",
    "cloud computing",
    "código",
    "computação",
    "CSS",
    "dados",
    "data center",
    "deep learning",
    "design",
    "desenvolvimento",
    "DNS",
    "docker",
    "firewall",
    "framework",
    "front-end",
    "full stack",
    "git",
    "hacker",
    "HTML",
    "Inteligência Artificial",
    "Ambiente de Desenvolvimento Integrado",
    "Internet das Coisas",
    "Java",
    "JavaScript",
    "linguagem de programação",
    "Linux",
    "machine learning",
    "malware",
    "memória",
    "mobile",
    "MongoDB",
    "MySQL",
    "Node.js",
    "open source",
    "PHP",
    "Python",
    "RAID",
    "React",
    "realidade aumentada",
    "rede",
    "robótica",
    "Ruby",
    "Scrum",
    "SEO",
    "servidor",
    "software",
    "SQL",
    "stack",
    "Swift",
    "sistemas operacionais",
    "segurança",
    "testes",
    "UI",
    "UX",
    "virtualização",
    "VPN",
    "Windows",
    "XML",
    "algoritmo de ordenação",
    "automação",
    "backup",
    "chatbot",
    "cloud storage",
    "compilador",
    "criptografia",
    "data science",
    "DOM",
    "escalabilidade",
    "Ethernet",
    "firewall",
    "gateway",
    "inovação",
    "inteligência de negócios",
    "interface",
    "JVM",
    "microcontrolador",
    "middleware",
    "nanotecnologia",
    "nuvem híbrida",
    "Programação Orientada a Objetos",
    "pipeline",
    "plataforma",
    "realidade virtual",
    "rede neural",
    "SDK",
    "serviços web",
    "stack overflow"
];

let typedWords = [];
let right = 0;
let wrong = 0;
let timeLeft = 60;
let timerInterval;
let ranking = [];

function countWords() {
    // Pega as entradas do input
    const inputWord = document.getElementById("entry").value;

    // Converte para letras minúsculas
    const currentWord = inputWord.trim().toLowerCase();

    if (currentWord !== "") {
        // Adiciona a palavra do input em um array com as palavras digitadas
        typedWords.push(currentWord);
        // "Limpa" o input
        document.getElementById("entry").value = "";

        if (words.map(word => word.toLowerCase().replace(/\s/g, "")).includes(currentWord.toLowerCase().replace(/\s/g, ""))) {
            if (!typedWords.slice(0, -1).map(word => word.toLowerCase().replace(/\s/g, "")).includes(currentWord.toLowerCase().replace(/\s/g, ""))) {
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
    timeLeft = 60;
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
        showModal();
    }
}

function updateResult() {
    document.getElementById("result").innerHTML = "acertos: " + right + " erros: " + wrong;
}

function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function saveScore() {
    modal.style.display = "none";
    var nickName = document.getElementById("nickName").value;
    var pontuacao = right;

    ranking.push({ nickName: nickName, pontuacao: pontuacao });
    ranking.sort(function (a, b) {
        return b.pontuacao - a.pontuacao;
    });

    showRanking();
    salvarNoLocalStorage();
}

function showRanking() {
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
