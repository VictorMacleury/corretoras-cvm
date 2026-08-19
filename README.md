# Corretoras CVM

Aplicação em Next.js para consultar as corretoras de valores registradas na CVM, com
dados da [Brasil API](https://brasilapi.com.br/docs#tag/Corretoras).

Permite listar todas as corretoras, buscar por nome comercial, razão social ou CNPJ,
filtrar por situação e abrir uma página com os detalhes completos de cada uma.
Desenvolvida como desafio técnico de front-end.

## Rodando o projeto

Requisitos: Node 20+ e npm.

```bash
npm install
npm run dev
```

A aplicação fica disponível em http://localhost:3000.

Build de produção:

```bash
npm run build
npm start
```

Scripts auxiliares: `npm run lint` (ESLint) e `npm run test:run` para os testes
(`npm test` roda em modo watch).

## Stack

- Next.js 16 (App Router) + TypeScript
- Material UI na interface
- Jotai para o estado global (lista, busca, filtro e página)
- Axios para o consumo da API
- Vitest + Testing Library nos testes

## Organização

```
src/
├── app/            # rotas (App Router), layout e providers
│   └── corretoras/[cnpj]/   # página de detalhe
├── components/     # UI — cards, busca, filtro, paginação, footer...
│   └── feedback/   # loading, erro e estado vazio
├── hooks/          # useCorretoras, useCorretora (carregamento + erro)
├── services/       # cliente axios e chamadas à Brasil API
├── store/          # átomos Jotai (lista, busca, situação, página)
├── theme/          # tema do MUI e estilos compartilhados
├── types/          # tipos
└── utils/          # formatação, filtro e paginação (com os testes ao lado)
```

As responsabilidades ficam separadas: `services` isola o acesso HTTP, os `hooks`
cuidam do estado de carregamento/erro, o `store` mantém o estado global e os
componentes ficam focados na apresentação.

## Decisões técnicas

**Busca e filtro no cliente.** Como a API retorna todas as corretoras de uma vez, a
busca e o filtro por situação são executados em memória, sobre a lista completa. A
busca é parcial, ignora acento e caixa e, no CNPJ, compara apenas os dígitos (com ou
sem máscara). O resultado passa por átomos derivados do Jotai com `useMemo`, mantendo
a resposta imediata.

**Ordem busca → filtro → paginação.** A paginação é a última etapa e fatia o resultado
já filtrado, de modo que a busca encontra uma corretora mesmo que ela estivesse fora
da página atual. Ao alterar a busca ou a situação, a paginação retorna à primeira
página.

**Reaproveitamento no detalhe.** A lista carregada é mantida no átomo do Jotai. Ao
abrir o detalhe a partir de um card, os dados são reutilizados sem nova requisição; no
acesso direto pela URL, a corretora é buscada pelo endpoint de CNPJ.

**Tratamento dos dados.** A base da CVM retorna alguns CNPJs duplicados, removidos na
camada de serviço. Datas, CNPJ, CEP, telefone e valores são formatados na exibição.

**Cards de altura uniforme.** Para manter o grid estável (e o rodapé fixo entre as
páginas), os cards têm altura fixa e o nome/razão social são truncados em duas linhas
— o nome completo aparece na tela de detalhe.

## Testes

Cobrem as funções puras (formatação, normalização de texto, filtro e paginação) e um
componente de feedback, com Vitest + Testing Library:

```bash
npm run test:run
```

## Identidade visual

A interface foi alinhada à identidade visual do PagueVeloz/Serasa para aproximar o
projeto do contexto do desafio: fonte Roboto, magenta nos destaques e botões escuros
que passam a magenta no hover. O rodapé segue o mesmo estilo, com dados fictícios.

## Variáveis de ambiente

Opcional (há um `.env.example` de referência):

- `NEXT_PUBLIC_BRASIL_API_URL` — URL base da Brasil API. Padrão:
  `https://brasilapi.com.br/api`.

## Endpoints

- `GET /cvm/corretoras/v1` — lista as corretoras
- `GET /cvm/corretoras/v1/{cnpj}` — detalhe de uma corretora
