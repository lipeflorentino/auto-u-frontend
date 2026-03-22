# ⚛️ Auto-U Frontend: Interface Inteligente para Triagem de E-mails

Este é o frontend do **Auto-U**, uma Single Page Application (SPA) desenvolvida para gerenciar o fluxo de classificação de e-mails. A interface foi projetada para ser intuitiva, permitindo que os usuarios visualizem as decisões da IA, editem respostas e processem documentos com feedback em tempo real.

## 🛠️ Decisões Técnicas & Ecossistema

A escolha da stack priorizou a velocidade de desenvolvimento (DX) e a organização do código em produção.

### 1. Core: React + TypeScript
Optei pelo **TypeScript** para garantir uma arquitetura "type-safe". 
* **Tipagem Estrita:** O uso de interfaces complexas para os retornos da API (categorias, scores de confiança e sugestões) evita erros em tempo de execução e facilita o refactoring.
**React** pela sua capacidade de criar interfaces de usuário (UI) rápidas, modulares e reativas usando componentes reutilizáveis.

### 2. Build & Performance: Vite
Em substituição ao antigo Create React App, utilizei o **Vite** pela praticidade e inicio rapido de desenvolvimento.

### 3. Estilização: Tailwind CSS
A interface utiliza **Tailwind CSS** para um design system utilitário e pela velocidade de desenvolvimento.
* **Performance:** O CSS gerado é mínimo, contendo apenas as classes realmente utilizadas.
* **Design Responsivo:** Facilita a adaptação da dashboard para diferentes resoluções sem a necessidade de media queries complexas em arquivos separados.

---

## 🏗️ Arquitetura do Frontend

O projeto segue princípios de **Clean Architecture** adaptados ao ecossistema React, promovendo a separação de responsabilidades:

* **Components (UI):** Componentes granulares e "burros" (S.O.L.I.D.). Exemplos: `UploadBox`, `ResultCard`, `FileUploader`.
* **Services (Infrastructure):** Camada isolada para comunicação via HTTP. Utiliza `FormData` para integração nativa com o endpoint de extração de PDF do FastAPI.
* **Styles/Utils (Domain/Logic):** Centralização de constantes de design (`style.ts`) e funções de normalização de dados (remoção de acentos e espaços para chaves de configuração).
* **Hooks (Application):** Lógica de estado complexa e efeitos colaterais encapsulados para manter os componentes limpos.

---

## 🚦 Funcionalidades de Destaque

| Funcionalidade | Implementação Técnica | Benefício |
| :--- | :--- | :--- |
| **Drag & Drop** | Drag and drop nativo | UX fluida para upload de arquivos sem depender de libs pesadas. |
| **Barras de progresso** | XMLHttpRequest (XHR) | Barra de progresso real baseada no upload de bytes para o servidor. |
| **Estilização dinamica** | Mapped Types & StatusConfig | A interface muda de cor (Green/Amber) dinamicamente baseada na categoria da IA. |
| **Botão copiar** | Clipboard | Copia a resposta sugerida com feedback visual temporário de sucesso. |

---

## ☁️ Deploy & CI/CD

### Vercel (Cloud Deployment)
Escolhi a **Vercel** para o deploy do frontend devido ao seu ecossistema otimizado para React/Vite.
* **Edge Network:** Garante que os assets estáticos sejam servidos do nó mais próximo do usuário.
* **Preview Deployments:** Cada Pull Request gera uma URL de visualização única, facilitando a revisão de código e QA.
* **Desacoplamento:** O frontend opera de forma totalmente independente do backend (GCP), comunicando-se via fetchAPI

### GitHub Actions
Pipeline automatizado que executa:
1.  **Linter & Type-Check:** Garante que nenhum código quebre as regras de tipagem ou estilo.
2.  **Build Check:** Valida se a aplicação compila corretamente antes do merge na `main`.

---

## ⚙️ Como Executar

**Pré-requisitos:** Node.js v19+ e um gerenciador de pacotes (NPM/Yarn/pnpm).

1.  Clone o repositório.
2.  Crie um arquivo `.env` com a URL do seu backend:
    ```env
    VITE_API_URL=http://localhost:8000
    ```
3.  **Instalação:**
    ```bash
    pnpm install
    ```
4.  **Execução Local:**
    ```bash
    pnpm start
    ```
5.  **Build de Produção:**
    ```bash
    pnpm build
    ```

---
*Desenvolvido por Filipe F. Lima - Fullstack Developer*