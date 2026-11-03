# EcoGuia - Motor de Reputação SoulUp

O EcoGuia é uma Single Page Application (SPA) que centraliza e comprova o histórico de ações ecológicas dos usuários por meio de um Motor de Reputação Social gamificado. As ações sustentáveis do usuário são reconhecidas no seu perfil da SoulUp, sem precisar postar no feed.

Projeto da equipe LuminaTech para a Sprint 4 de Front-End Design Engineering (Challenge FIAP). O site consome a API REST desenvolvida em Java pelo grupo.

## Tecnologias Utilizadas

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router DOM
- React Hook Form
- Fetch API (requisições para a API Java)
- Vercel (deploy)

## Estrutura de Pastas do Projeto

```text
Ecoguia-FIAP
├── README.md
└── ecoguia
    ├── public              # favicon e ícones
    ├── src
    │   ├── assets          # imagens (Alma Digital, fotos da equipe, prints)
    │   ├── components      # componentes reutilizáveis (Header, Footer, Button, Card...)
    │   ├── context         # contexto do usuário
    │   ├── pages           # páginas da aplicação
    │   ├── routes          # rotas (AppRoutes.tsx)
    │   ├── services        # chamadas à API Java
    │   ├── types           # tipos globais (index.ts)
    │   ├── utils           # funções auxiliares
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vercel.json
    └── vite.config.ts
```

## Autores e Créditos

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
| :---: | :--- | :--- | :--- | :--- | :--- |
| <img src="./ecoguia/src/assets/img/foto-ana.jpeg" alt="Ana" width="80" /> | Ana Paula Cunha Brum | 571359 | 1º TDSR | [abbrum](https://github.com/abbrum) | [LinkedIn](https://www.linkedin.com/in/ana-paula-brum/) |
| <img src="./ecoguia/src/assets/img/foto-gabriella.jpg" alt="Gabriella" width="80" /> | Gabriella Serni Ponzetta | 566296 | 1º TDSR | [gabriellaserni](https://github.com/gabriellaserni) | [LinkedIn](https://www.linkedin.com/in/gabriellaserni/) |
| <img src="./ecoguia/src/assets/img/foto-victor.jpg" alt="Victor" width="80" /> | Victor Felipe Silva Alencar | 574057 | 1º TDSR | [alencarVictor](https://github.com/alencarVictor) | [LinkedIn](https://www.linkedin.com/in/victor-alencar-58623a3ba/) |
| <img src="./ecoguia/src/assets/img/foto-julio.jpg" alt="Julio" width="80" /> | Julio Cesar Iwata de Oliveira Barros | 573723 | 1º TDSR | [IwaataNz3](https://github.com/IwaataNz3) | [LinkedIn](https://www.linkedin.com/in/julioiwata/) |
| <img src="./ecoguia/src/assets/img/foto-rafael.jpg" alt="Rafael" width="80" /> | Rafael Santos Dias | 574105 | 1º TDSR | [realrafaelsd](https://github.com/realrafaelsd) | [LinkedIn](https://www.linkedin.com/in/rafaelsd/) |

## Imagens e Ícones do Projeto

Alma Digital, o avatar que evolui com as ações ecológicas do usuário:

<img src="./ecoguia/src/assets/img/alma.png" alt="Alma Digital" width="160" />

Ícones dos marcos: 🏅 marco normal e 👑 marco lendário.

Página Inicial

![Home](./ecoguia/src/assets/img/home.png)

Painel do Usuário

![Painel do Usuário](./ecoguia/src/assets/img/dashboard.png)

Marcos

![Marcos](./ecoguia/src/assets/img/marcos.png)

## Como Usar

### Links

- Repositório do GitHub: https://github.com/IwaataNz3/Ecoguia-FIAP
- Deploy na Vercel: https://ecoguia-fiap.vercel.app/
- Vídeo de apresentação (YouTube): https://youtu.be/n0OeIjcxFZ0
- API Java publicada: https://ecoguia-api-rest.onrender.com

### Instalação e execução

Pré-requisitos: Node.js e Git.

```bash
git clone https://github.com/IwaataNz3/Ecoguia-FIAP.git
cd Ecoguia-FIAP/ecoguia
npm install
npm run dev
```

Depois, abra o endereço que aparece no terminal (normalmente http://localhost:5173).

A API está no plano gratuito do Render, então a primeira carga pode levar até 1 minuto.

## Contato

- E-mail geral: rm573723@fiap.com.br
- Suporte técnico: rm574057@fiap.com.br
