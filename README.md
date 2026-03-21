# Task Prioritizer
O Task Prioritizer é um organizador de tarefas inteligentes criado com Vibe Coding, que usa Inteligência Artificial para ajudar o usuário a calcular a importância e urgência de cada tarefa. Com isso, a IA ordena as tarefas inseridas pelo usuário, de acordo com scores de 1 a 10 (urgência/impacto).

## 🛠️ Tecnologias e Ferramentas

### 🖥️ Front-end:
Ferramenta utilizada: Lovable.
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### 🧠 LLM (IA) utilizada: 
Gemini 3 Flash Preview.

### 🪡 Lógica/Refinamento:
Cursor e Copilot.

### 📦 Deploy: 
Vercel.

## 📅 Datas úteis
| Data | Versão | Descrição | Horário |
| :--- | :--- | :--- | :--- |
| 09/03/2026 | 1.0.0 | Lançamento inicial | - |

## 📝 Prompts utilizados
Para ter acesso a documentação de prompts, vá em README-prompts ou [clique aqui](https://github.com/becanmc/task-prioritizer/blob/main/README-prompts.md)

## ⚙️ Funcionalidades

### 1. CRUD de tarefas via API ✅
- **Adicionar** novas tarefas com título e descrição
- **Editar** tarefas existentes
- **Deletar** tarefas
- Marcar tarefas como **concluídas**

### 2. Processar e categorizar a urgência/impacto ✅
- Análise automática usando LLM (Supabase Functions)
- Scores de Urgência e Impacto (1-10)
- Interface não-bloqueante (usuário pode adicionar enquanto IA analisa)
- Recomendação de ordem de execução baseada em scores combinados

### 3. Exibir os resultados em um Dashboard funcional e intuitivo ✅
- Lista organizada de tarefas pendentes numeradas
- Seção separada de tarefas concluídas
- Destaque da tarefa recomendada para começar
- Gráfico de pizza mostrando conclusão vs pendentes

### 4. Contextualização para IA ✅
- Painel de contexto personalizável (key: value)
- Adicionar/editar/deletar contextos
- Contextos influenciam os scores da IA

### 5. Categorias de Tarefas ✅
- Criar categorias com cores personalizáveis
- Atribuir categorias às tarefas
- Visualizar tarefas por categoria

### 6. Light/Dark mode ✅
- Interface responde ao botão de toggle light no header

### 7. Usabilidade Avançada ✅
- Drag-and-drop para reordenar tarefas
- Persistência em localStorage (tarefas, contextos, categorias)
- Minimização da seção de nova tarefa com animação e abertura de nav-bars horizontais (contextualização e categorias)

### 8. Interface Refinada ✅
- Site responsivo e acessível em celulares
- Ícones consistentes em todas as seções
- Separação visual entre form e items nos painéis
- Tema minimalista e limpo
- Suporte a operações sem recarregar a página

## 🌐 Acesse o projeto
[Clique aqui](https://teste-tecnico-lyfiti.vercel.app/) para acessar o respositório ou copie e cole no seu navegador o seguinte link: https://teste-tecnico-lyfiti.vercel.app/

## 🏠 Rode o código localmente
Para rodar o projeto localmente é necessário ter Node.js & npm instalado - [Instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga esses passos:
```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone https://github.com/becanmc/teste-tec-lyfiti

# Passo 2: Navegue até o diretório do projeto.
cd test-tec-lyfiti

# Etapa 3: Instale as dependências necessárias.
npm i

# Etapa 4: Inicie o servidor.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Editar" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça as alterações e confirme-as.

**Use o GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Código" (botão verde) próximo ao canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "Novo codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e confirme e envie suas alterações quando terminar.

## Autor
#### Feito originalmente por Rebeca Costa.
[Github](https://github.com/becanmc) | [LinkedIn](https://www.linkedin.com/in/becanmc/) | [WhatsApp](https://wa.me/5531986765308) | rebecanmcosta@gmail.com
