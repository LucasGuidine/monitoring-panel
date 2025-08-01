# 📹 Painel de Monitoramento com IA

Este projeto é um painel de controle para um sistema de **monitoramento por vídeo com inteligência artificial**, desenvolvido em **React.js** com foco em interatividade, componentização e uma boa experiência de usuário (UX).

## 🚀 Funcionalidades

- 📺 Visualização de múltiplos feeds de câmeras
- 📍 Localização das câmeras via mapa interativo (Leaflet)
- ✏️ Desenho de áreas sobre os vídeos (React-Konva)
- ⚠️ Exibição de alertas de IA (EPI ausente, invasão, etc.)
- 📊 Tela de estatísticas com gráficos e clustering de alertas
- 🛠️ CRUD de câmeras simuladas com dados mockados
- 🧠 Armazenamento local de áreas desenhadas por câmera (localStorage)

---

## 🧰 Tecnologias Utilizadas

- **React**
- **TypeScript**
- **styled-components**
- **React Router DOM**
- **React-Konva** – para desenho sobre vídeos
- **Leaflet** – para o mapa interativo
- **Recharts** – para gráficos
- **uuid** – para IDs únicos simulados
- **moment** – para manipulação de datas

---

## 📦 Requisitos

- [Node.js 20.19.4](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/) (gerenciador de dependências)

---

## ▶️ Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/LucasGuidine/monitoring-panel.git

# Acesse a pasta
cd monitoring-panel

# Instale as dependências
yarn

# Inicie o servidor de desenvolvimento
yarn start
```

A aplicação estará disponível em:  
👉 http://localhost:3000

---

## 🧱 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── data/                # Tipos e mocks simulando backend
├── mockApi/             # Funções simulando chamadas de API
├── pages/               # Páginas principais do app (Dashboard, Detalhes etc)
├── routes/              # Configuração de rotas
├── hooks/               # Hooks personalizados para carregar e gerenciar dados
```

---

## 🧠 Decisões de Arquitetura

- Separação clara entre **componentes**, **páginas**, **hooks** e **dados simulados**.
- Uso de **React-Konva** para desenhar sobre `<video>`, persistindo por câmera no `localStorage`.
- Design responsivo com **styled-components**.
- Integração com mapas (Leaflet) para localização e visualização espacial dos alertas.
- Sistema de rotas com **React Router DOM**, incluindo rota dinâmica `/cameras/:id`.
