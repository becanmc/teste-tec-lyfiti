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

Prompt Inicial:
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

Após primeiro refinamento, o gráfico ainda não me agradou então sugeri mudança: