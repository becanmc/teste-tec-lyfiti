# Teste Técnico Lyfiti
MVP funcional de um sistema de priorização inteligente feito por Rebeca Costa.

💻 O Desafio: The Hybrid Architect (AI-Priority Middleware)

1. Receber solicitações via API (JSON com título e descrição da tarefa).
2. Processar e categorizar a urgência/impacto (Score de 1 a 10) usando uma LLM (OpenAI/Anthropic).
3. Exibir os resultados em um Dashboard funcional e intuitivo.

## Tecnologias

### > Front-end:
Ferramenta utilizada: Lovable.
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### > Lógica/Refinamento:
Cursor e Copilot.

### > Deploy: 
Vercel.

### > Datas úteis:
| Data | Versão | Descrição | Horário |
| :--- | :--- | :--- | :--- |
| 09/03/2026 | 1.0.0 | Lançamento inicial | - |
| 11/03/2026 | 1.0.0 | Limite máximo para entrega | 23:59 (GMT-3) |

## Funcionalidades

### Requisitos alcançados:
### 1. CRUD de tarefas via API
- **Adicionar** novas tarefas com título e descrição
- **Editar** tarefas existentes
- **Deletar** tarefas
- Marcar tarefas como **concluídas**

### 2. Processar e categorizar a urgência/impacto 
- Análise automática usando LLM (Supabase Functions)
- Scores de Urgência e Impacto (1-10)
- Interface não-bloqueante (usuário pode adicionar enquanto IA analisa)
- Recomendação de ordem de execução baseada em scores combinados

### 3. Exibir os resultados em um Dashboard funcional e intuitivo
- Lista organizada de tarefas pendentes numeradas
- Seção separada de tarefas concluídas
- Destaque da tarefa recomendada para começar
- Gráfico de pizza mostrando conclusão vs pendentes


### Funcionalidades extras:
### 4. Contextualização para IA
- Painel de contexto personalizável (key: value)
- Adicionar/editar/deletar contextos
- Contextos influenciam os scores da IA

### 5. Categorias de Tarefas
- Criar categorias com cores personalizáveis
- Atribuir categorias às tarefas
- Visualizar tarefas por categoria

### 6. Light/Dark mode
- Interface responde ao botão de toggle light no header

### 7. Usabilidade Avançada
- Drag-and-drop para reordenar tarefas
- Persistência em localStorage (tarefas, contextos, categorias)
- Minimização da seção de nova tarefa com animação e abertura de nav-bars horizontais (contextualização e categorias)

### 8. Interface Refinada
- Ícones consistentes em todas as seções
- Separação visual entre form e items nos painéis
- Tema minimalista e limpo
- Suporte a operações sem recarregar a página

## Acesse o projeto
[Clique aqui](https://) para acessar o respositório ou copie e cole no seu navegador o seguinte link: ""

## Rode o código localmente
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
[Github](https://github.com/becanmc) | [LinkedIN](https://www.linkedin.com/in/becanmc/) | [WhatsApp](https://wa.me/5531986765308) | rebecanmcosta@gmail.com