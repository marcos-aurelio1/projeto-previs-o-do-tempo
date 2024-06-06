const key = "f5c6b6b674bfd18bb228d1bbe222f7e9";

function colocarDadosNaTela(dados) {
    console.log(dados);

    if (dados.cod === 200) {
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description || "Descrição não disponível";
        document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    } else {
        document.querySelector(".cidade").innerHTML = "Cidade não encontrada";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".texto-previsao").innerHTML = "";
        document.querySelector(".umidade").innerHTML = "";
    }
}

async function BuscarCidade(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const dados = await response.json();
        colocarDadosNaTela(dados);
    } catch (error) {
        console.error(error);
        document.querySelector(".cidade").innerHTML = "Erro ao buscar dados: " + error.message;
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".texto-previsao").innerHTML = "";
        document.querySelector(".umidade").innerHTML = "";
    }
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    BuscarCidade(cidade);
}

