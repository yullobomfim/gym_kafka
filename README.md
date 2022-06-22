# Gymnastic Management

## 📃 Sobre

Este projeto foi desenvolvido como avaliação da disciplina de Desenvolvimento Distribuido na Internet pelo Instituto Federal da Bahia IFBA-Vitória da Conquista ministrada pelo Professor Luis Paulo da Silva Caravlho, este projeto é estritamente didático, o código e as informações são de Autoria do Discente Yullo Costa Bomfim. O **objetivo** deste projeto é realizar uma COREOGRAFIA de microsserviços web containerizados que se comuniquem através de mensagens. Ele consiste na concretização de uma coreografia formada por QUATRO microsserviços web executados de forma independente. O primeiro serviço irá realizar o cadastro do aluno. O segundo irá enviar um email de confirmação com o codigo de acesso às aulas. O terceiro irá listar os exercicios referentes ao plano escolhido no cadastro. E o quarto será o serviço de email que irá criar os logs dos emails enviados. A aplicação **Gymnastic Management** foi desenvolvido por mim e não tem a pretensão de ser definitiva, mas apenas atender aos critérios da avaliação desta disciplina e o código fonte esta disponivel no GitHub [**yullobomfim**](https://github.com/yullobomfim/gym_kafka.git).

## Requisitos

Nenhum dos serviços pode ter a função de orquestrador. Todos eles devem funcionar de forma independente, sem que seja necessário que um “chame” o outro explicitamente. 
Qualquer comunicação entre eles deve ocorrer através de mensagens do APACHE KAFKA, que deve estar obrigatoriamente presente entre os serviços;
A solução desenvolvida deve disponibilizar, no mínimo, QUATRO serviços cujo escopo esteja relacionado ao tema escolhido.
Cada microsserviço deve realizar somente UMA coisa.
A execução dos serviços pode ser acionada por alguma ferramenta de testes de serviço, tal como, por exemplo, o INSOMNIA;
É muito importante que TODOS os microsserviços da composição sejam chamados/executados;
Cada um dos microsserviços deve ter um script ou programa do tipo “painel” que lista a chegada de mensagens ao KAFKA;
É realmente necessário que a arquitetura utilizada seja a de microsserviços e que estes estejam encapsulados em containers DOCKER.
Cada microsserviço da solução deve estar isolado dos demais em seu próprio container. Não serão admitidas entregas que não sejam baseadas em pares de
microsserviços e containers;

## 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:
- [**Visual Studio Code**](https://code.visualstudio.com/): um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS, recomendado para o desenvolvimento de aplicações web;
- [**Node.js**](https://nodejs.org/en/): um interpretador de JavaScript assíncrono com código aberto orientado a eventos;
- [**Docker Desktop**](https://www.docker.com/): O Docker Desktop é um aplicativo fácil de instalar que permite criar e compartilhar aplicativos e microsserviços em contêineres. Ele vem com ferramentas de contêiner como Kubernetes, Docker Compose, BuildKit e verificação de vulnerabilidades.

## 🔧 Instalação e Execução

Para poder executar esta aplicação, deve ter instalado em sua máquina o Git [**Git**](https://git-scm.com/) e o [**Docker Desktop**](https://www.docker.com/).
É importante verificar durante a configuração, se o Apache Kafka está devidamente configurado e, se as portas utilizadas estão livres. Como estou utilizando os microserviços nas portas 3001, é uma premissa que esta porta esteja livre para assim rodar a aplicação.

### Rodando o projeto

1. Faça um clone da aplicação do github e vá até a pasta raíz do repositório:
    ```bash
    $ git clone https://github.com/yullobomfim/gym_kafka.git
    ```
2. Execute o Build do Dockerfile na pasta raíz:
    ```bash
    $ docker build .
    ```
3. Execute o docker-compose na pasta raíz:
    ```bash
    $ docker-compose up -d
    ```
4. Abra o insomnia e execute um POST
    http://localhost:3001/sign/gym/1
    {
    "email":"yullo@teste.com"
    }

5. Monitore a execução dos eventos atráves dos Logs do docker-compose:
    ```bash
    $ docker-compose logs -f sign
    $ docker-compose logs -f code
    $ docker-compose logs -f workout
    $ docker-compose logs -f email


## 💡 Como contribuir

- Faça um **_fork_** desse repositório;
- Crie um **branch** para a sua feature: `git checkout -b minha-feature`;
- Faça um **commit** com suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça um **push** para o seu branch: `git push origin minha-feature`;
- Faça um **pull request** com sua feature;

Pull requests são sempre bem-vindos. Em caso de dúvidas ou sugestões, crie uma _**issue**_ ou entre em contato comigo.

## 📲 Contato

Entre em contato comigo pelo meu LinkedIn:
https://www.linkedin.com/in/yullo-bomfim-50434627/