# Dashboard de Clientes

Este projeto é um dashboard React para gerenciar clientes e suas vendas. Ele consome uma API (mockada ou real) e exibe informações relevantes, com funcionalidades para adicionar clientes e visualizar dados de vendas.

---

## Funcionalidades

- Listagem e visualização de clientes com seus dados pessoais e vendas.
- Normalização e tratamento de dados da API, incluindo agrupamento de clientes duplicados.
- Gráfico de vendas por dia.
- Painel de destaques com maior volume, média e frequência de vendas.
- Formulário para adicionar clientes com validação manual.
- Layout responsivo para desktop e mobile.
- Autenticação simulada com login/logout.
- Componentização e estilização com Sass.

---

## Tecnologias

- React + Vite + TypeScript
- Sass (SCSS)  
- Chart.js para gráficos  
- json-server para API fake  
- React Router para navegação  
- Context API para autenticação simulada  

---

## Como executar

1. Clone o repositório:  
   ```bash
   git clone https://github.com/adiefco/desafio-avantsoft.git
   cd desafio-avantsoft
2. Instale as dependências
   ```bash
   npm install
3. Inicie o servidor fake da API (json-server):
   ```bash
   npm run start:api
4. Inicie a aplicação React:
   ```bash
   npm run dev
5. Acesse no navegador:
   ```bash
   http://localhost:5173

---

## Estrutura do projeto

- src/components — Componentes React reutilizáveis
- src/utils — Funções auxiliares e normalização de dados
- src/context — Context API para autenticação
- src/styles — Arquivos Sass
- db.json — Mock da API (json-server)

---

## Contato

Desenvolvido por Adriana Evangelista.
Site: https://adrianaevangelista.com
Email: adiefco@gmail.com
