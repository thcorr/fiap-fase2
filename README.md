
### Aplicação dividia em três containers:

1. Backend: API fornecida pela FIAP.
2. Home: Área não logada.
3. Logged: Área logada.

### Requisitos implementados:

#### Listagem Transações:
- Filtro e Pesquisa: Implementar filtros avançados e funcionalidade de busca para facilitar a navegação nas transações. 
- Paginação e Scroll Infinito: Adicionar paginação ou scroll infinito para otimizar o carregamento de grandes volumes de dados.

#### Adicionar/Editar Transação:
- Validação Avançada: Implementar validação de entrada avançada.

#### Deploy:
- Conteinerização da aplicação e seus componentes, incluindo o frontend e backend.
- Uso de Docker Compose ou Kubernetes para orquestração de múltiplos contêineres.
- Deploy da aplicação utilizando GCP (Cloud Run).
- Micro Frontend (home e logged).
- Gestão de estado global via Zustand.
- Uso de server actions para chamada da API na área logada.

### Execução
1. docker compose compose build
2. docker compose run
