# Finance App - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-3C22B4?style=for-the-badge&logo=mqtt&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)

Este é o módulo frontend de uma aplicação de controle financeiro pessoal, desenvolvida para gerenciar despesas compartilhadas e visualizar dados em tempo real. O projeto foi construído com foco em performance, experiência do usuário e uma **arquitetura de comunicação via protocolo MQTT**.

## Funcionalidades Principais

* **Dashboard Inteligente:** Visualização rápida de renda total, despesas e saldo restante.
* **Análise de Gastos:** Gráficos interativos (Pizza e Barras) detalhando gastos por categoria e por comprador.
* **Gestão de Contas:** Listagem completa de despesas com filtros avançados por comprador, banco e período.
* **Sincronização em Tempo Real:** Criação, edição e exclusão de contas com atualizações instantâneas via middleware MQTT.
* **Controle de Renda:** Interface dedicada para atualização da receita mensal e visualização da porcentagem de contribuição de cada membro.

## Tecnologias Utilizadas

* **React + Vite:** Ambiente de desenvolvimento ultra-rápido e otimizado.
* **MQTT.js:** Cliente para comunicação assíncrona com o broker.
* **Recharts:** Renderização de gráficos dinâmicos para análise de dados.
* **React Router:** Gerenciamento de navegação SPA (Single Page Application).
* **Lucide-React & FontAwesome:** Biblioteca de ícones modernos.
* **React Toastify:** Sistema de notificações para feedback do usuário.

## Arquitetura do Sistema

O grande diferencial deste projeto é a sua arquitetura de rede. Como não há um servidor backend exposto publicamente, utilizamos um **Broker MQTT** como ponte de comunicação:

1.  **Frontend (React):** Captura as ações do usuário e publica mensagens JSON em tópicos específicos.
2.  **Middleware (MQTT Broker):** Faz o roteamento das mensagens entre o navegador e o servidor local.
3.  **Backend (Java MVC):** Subscreve aos tópicos, processa a regra de negócio e persiste os dados no **MySQL**.

---
🔹 *Projeto desenvolvido com o propósito de estudo de arquiteturas de software e controle financeiro pessoal.*
