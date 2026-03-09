# Front-end:
Ferramenta: Lovable
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

Prompt inicial:
Preciso gerar uma interface agradável simples e minimalista para: 
1. Receber títulos e descrições de tarefa como solicitação via API (JSON com título e descrição da tarefa); 
2. Processar e categorizar a urgência/impacto (Score de 1 a 10) usando uma LLM (OpenAI/Anthropic); 
3. Exibir os resultados em um Dashboard funcional e intuitivo (Incluir à direita: uma To-do list com cards que ficam cinza quando você realizou a tarefa).

Como pedido nas intruções técnicas, apenas iniciei o projeto com Lovable para refiná-lo mais tarde no Cursor.

# Refinamento
Ferramenta: Cursor

1. Prompt Inicial:
```txt
O front-end faz aquilo que pedi:
Interface agradável simples e minimalista para: 
1. Receber títulos e descrições de tarefa como solicitação via API (JSON com título e descrição da tarefa); 
2. Processar e categorizar a urgência/impacto (Score de 1 a 10) usando uma LLM (OpenAI/Anthropic); 
3. Exibir os resultados em um Dashboard funcional e intuitivo (Incluir à direita: uma To-do list com cards que ficam cinza quando você realizou a tarefa).

O modelo me gerou esse código. Porém existem algumas alterações que quero fazer:

- Preciso verificar se a API utilizada (meta) é a mais adequada para a tarefa solicitada;
- A to-do list está lenta. É necessário esperar a resposta do modelo. Porém, ao esperar, a interface inteira precisa aguardar. Não quero que isso aconteça. Preciso que o modelo gere a ordem de prioridade APÓS os produtos estarem na TO-DO list. Então enquanto o modelo avalia a prioridade e classifica, o usuário pode continuar escrevendo e adicionando demandas.
- O Dashboard está muito simples. Gostaria de um gráficos com análise de tarefas concluídas, onde mostre as "Done" e as "To-do" com cores diferentes.
- Quero que os scores melhorem, pois URGENCY e IMPORTANCE podem bagunçar a  cabeça do usuário ao terem que utilizar do senso crítico qual tarefa começar. Quero que na seção de "Análise de prioridade", a IA mostre a "recomendação" de ordem de demandas.
- Edição de to-do list. Mostrar um card para editar (logicamente com reavaliação do modelo) e excluir demandas.
```

Após primeiro refinamento, tive uma nova ideia de feature e o gráfico ainda não me agradou então sugeri mudanças:
```txt
2. Segundo prompt:
> Dashboard:
Preciso que o gráfico seja pizza com cores verde (concluídas) e amarelas (pendentes) e esteja abaixo do to-do list, para que a seção de análise de prioridade esteja embaixo de adicionar tarefa. 

> Melhorias adicionais:
Quero que a seção de adicionar tarefa possa ser minimizada.

> Nova feature:
Quero que exista um ambiente de contextualização apra IA,onde possa adicionar contexto, exemplo: 
```
key: Outlier
content: plataforma de freelance para ganhar dinheiro em dólar
-
key: Chiara
content: Minha cachorra maltês que nasceu em agosto de 2013
-
key: Mãe 
content: Veram trabalha como professora e chega as 22h em casa todos os dias úteis
```
O contexto para IA tem que ser um botão no canto superior da tela que abre uma nav-bar a direita do To-do e mostre todos os contextos atuais, para que o usuário possa editá-lo e visualizá-los melhor.
```

Realizei mais alguns pequenos ajustes e adicionei as funcionalidades de mudança de ordem de tarefa e aba "Categorias", só que agora, com o Copilot, já que Cursor limitou minhas ações.

3. Terceiro prompt:
```txt
Ajustes visuais:
- Os ícones de edição de Contexto estão na vertical, coloque-os na horizontal.
- As seções de nova tarefa e resumo do progressso, não tem um ícone como as seções de "To-do" e "Análise de Prioridade". Coloque icónes no mesmo padrão.
- O "minimizar" da seçao do nova tarefa está sem animação e quando a seção está minimizada o texto não fica centralizao com a seta.
- O header está sem vida. Adicione um ícone que faça sentido com o Task Prioriteizer (Este ícone tem que ser o mesmo ícone do `og:image` que fica na aba do navegador.)

Melhorias:
- Salve o hsitórico e as tarefas do usuário para ele não precisar recolocar em nenhuma reinicialização da API.

Novas funcionalidades:
- O usuário pode querer mudar a ordem das tarefas, adicione a funcionalidade de clicar e arrastar na to-do list, apra editar a ordem de tarefa.
- Coloque uma nova funcionalidade e "Categorias" com o mesmo padrão "Contexto da IA", onde o usuário poderá atribuir cores as categorias criadas por ele, e atribuir essas mesmas categorias ao CRUD de tarefas.
```

Após esses prompts, o copilot travou meu código mudando nomes de atributos de 'types' criados anteriorente, então fiz alguns ajustes manuais para consertar. Sugeri alterações visuais novamente.

4. Quarto prompt:
```txt
Fiz alguns ajustes no seu código:

1. Erro  nos valores de `SelectItem`
Todos os
```tsx
<SelectItem value="">Nenhuma categoria</SelectItem>
```
para
```tsx
<SelectItem value="none">Nenhuma categoria</SelectItem>
```

2. Inicializei as variáveis 'pending' e 'completed' no `TodoList`:
```tsx
const pending = tasks.filter(task => !task.isCompleted);
const completed = tasks.filter(task => task.isCompleted);
```

Ademais quero que faça os seguintes ajustes visuais:
1. Coloque o select de categorias na seção "Nova tarefa" do LADO do título da tarefa, e ajuste esles para a linha que possui os dois ficar da mesma largura da text area descrição da tarefa e coloque a cor do placeholder igual dos outros inputs da seção;
2. Quando marca "done" e acumula as tarefas concluídas na to-do list, elas ficam se encostando. Adicione um espaço entrel elas;
3. O input type color nas categorias está um poco desagradável, faça com que a cor preencha o input todo com a mesma altura do input de nome da categoria;
4. Qaundo minimiza a seção de "Nova tarefa" coloque o título com o ícone e a seta alinhados horizontalmente;
5. A seção de contexto da IA, corta parte do último card no scroll, certifique que todos os cards sejam mostrados até o final. Além disso, separe o card de form dessa seção, com os cards que mostram os contextos existentes. (Mesma coisa para seção de categoria).
```

Ajustes finais:
5. Quinto prompt:
```txt
Quero que o gráfico fique fixed e a to-do fique mais compacta com scroll e as tarefas concluídas no to-do list também tem que ficar concluídas no "Análise de prioridades", reorganizando a nova lista.
```