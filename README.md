# Imauv-1.1
> [!IMPORTANT]
> Protótipo desenvolvido para meu [Trabalho de Conclusão de Curso](https://drive.google.com/file/d/1BHLUOUSvqH_3lEKW6o44cipJ5zHOG9wh/view?usp=drive_link), que consiste num sistema georreferenciado para mapeamento de áreas urbanas vulneráveis, utilizando a API [Leaflet](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjv8LPfwbaRAxVbA7kGHbduAMsQFnoECBcQAQ&url=https%3A%2F%2Fleafletjs.com%2F&usg=AOvVaw1keCKYj9IpMCmxLWhUpXWv&opi=89978449).

> [!IMPORTANT]
> **OBS:** O documento acima abrange **apenas** a versão **1.0** do protótipo, mas a linha de raciocínio se mantém a mesma nas versões mais recentes. Para mais detalhes sobre o funcionamento do sistema, leia o TCC.

## Notas de atualização ## 
Chega então a versão **1.1**! Essa atualização visa cobrir o que ficou faltando na versão **1.0**, que teve seu desenvolvimento interrompido e consequentemente foi apresentada em fase beta, então considera-se a versão **1.1** como o lançamento devidamente oficial.

Nessa atualização chegaram mudanças importantes que deram a verdadeira face do protótipo, tais como:

* Mudanças de design da interface.
* Exibição de animações ao interagir com alguns elementos.
* Ajustes no CSS para melhor posicionamento.
* Correções de bugs, como a função de editar.
* Caixas pop-up de mensagem personalizadas.
* Mudanças de estado de pontos e cards de acordo com o prazo.

Como pode ser visto nos arquivos, o sistema se adaptou, saindo do modelo MVC para uma estrutura mais próxima de um projeto React, formato bastante utilizado no desenvolvimento web atualmente e que facilita a escalabilidade para futuras versões que serão lançadas com novas tecnologias. Espero que meu projeto possa servir de inspiração para desenvolvedores que queiram buscar soluções semelhantes. 

## Execução do programa ##
Para rodar o programa, primeiro é necessário instalar o XAMPP (neste exemplo, utilize uma IDE para banco de dados de sua escolha), abrir o PHP MyAdmin e executar o arquivo  `Imauv_1-1.sql` na aba de consultas SQL, certificando-se de aplicar todas as linhas na ordem correta. Após criar o banco de dados, execute o Apache na porta **80**/**443** e o MySQL na porta **3306**. O arquivo contém esse script:
```
CREATE DATABASE IF NOT EXISTS db_imauv;

USE db_imauv;

CREATE TABLE `agente` (
  `cpf` varchar(14) not null,
  `nome` varchar(50) not null,
  `endereco` varchar(25) not null,
  `email` varchar(30) unique not null,
  `senha` varchar(12) not null,
  primary key(`cpf`)
);

CREATE TABLE `ponto` (
  `id_ponto` int auto_increment not null,
  `n_agente` varchar(14),
  `cod_processo` varchar(20) unique not null,
  `data_inicio` date not null,
  `descricao` text not null,
  `localizacao` varchar(50) not null,
  `classificacao` enum('Baixo','Médio','Alto') not null,
  `etapa` enum('Processamento','Pendente','Concluída') not null,
  `prazo` int not null,
  `latitude` decimal(40, 30) not null,
  `longitude` decimal(40, 30) not null,
  primary key(`id_ponto`)
);

ALTER TABLE `ponto` ADD foreign key (`n_agente`) REFERENCES `agente` (`cpf`);
```

Depois abra o arquivo do Imauv 1.1 no Visual Studio Code e abra o terminal no diretório da pasta com o comando `cd` ou pela aba superior, como por exemplo `C:\Users\Programs\Imauv_1.1`, dependendo da organização dos seus arquivos. Em seguida, execute este comando:
```
node server.js
```

Irá aparecer um link http e você deverá abri-lo num navegador. Feito isso, poderá utilizar o Imauv, basta criar um cadastro e logo após fazer o login. Caso necessite, manipule os registros do banco de dados através do PHP MyAdmin.