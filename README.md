![BugBank Automation](https://capsule-render.vercel.app/api?type=waving&height=300&color=A723DE&text=BugBank%20Automation&reversal=false&textBg=false&animation=fadeIn&fontAlignY=40&fontColor=FFFFFF&desc=Henrick%20Borba)

# BugBank QA - Testes Automatizados com Playwright

Este projeto foi desenvolvido aplicando os conhecimentos que adquiri durante minha atuação na CJ Tech, juntamente com os aprendizados obtidos em meus estudos diários por meio de cursos. Ele tem como objetivo automatizar os testes da aplicação [BugBank](https://bugbank.netlify.app/) utilizando o framework [Playwright](https://playwright.dev/). Os testes abrangem os principais fluxos de cadastro e login, validando mensagens de erro, regras de negócio e diferentes cenários de uso.

## Tecnologias Utilizadas

<p align="left">
  <a href="https://playwright.dev/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" alt="Playwright" width="40" height="40"/>
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  </a>
  <a href="https://github.com/motdotla/dotenv" target="_blank">
    <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="Dotenv" width="40" height="40"/> 
  </a>
</p>

- **[Playwright](https://playwright.dev/):** Framework para automação de testes end-to-end.
- **[Node.js](https://nodejs.org/pt):** Ambiente de execução para JavaScript.
- **[@faker-js/faker](https://fakerjs.dev/):** Geração de dados fake para testes dinâmicos.
- **csv-parse:** Leitura e manipulação de arquivos CSV para data-driven testing.
- **dotenv:** Gerenciamento de variáveis de ambiente.
- **@types/node:** Tipagens para Node.js (desenvolvimento).
- **Playwright Test Runner:** Execução, paralelização e geração de relatórios dos testes.

## Estrutura do Projeto

```
tests/
  web/
    examples/         # Arquivos CSV com dados de teste
    pages/            # Page Objects (mapeamento e ações das telas)
    specs/            # Especificações dos testes (cenários)
features/             # Documentação dos cenários de teste
```

## Cenários de Teste Cobertos

### Login

Os cenários de login estão descritos em [features/login.txt](features/login.txt) e automatizados em [tests/web/specs/login/](tests/web/specs/login/):

- **Login com campos de e-mail e senha vazios:**  
  Valida a exibição da mensagem "É campo obrigatório".
- **Login com usuário e senha inválidos:**  
  Garante que o acesso é negado e não há redirecionamento.
- **Login com usuário e senha válidos:**  
  Usuário é redirecionado para a página de home após login bem-sucedido.

### Cadastro

Os cenários de cadastro estão descritos em [features/register.txt](features/register.txt) e automatizados em [tests/web/specs/register/](tests/web/specs/register/):

- **Tentar cadastrar sem preencher o nome:**  
  Exibe mensagem "Nome não pode ser vazio".
- **Tentar cadastrar sem preencher o e-mail:**  
  Exibe mensagem "Email não pode ser vazio".
- **Tentar cadastrar sem preencher a senha:**  
  Exibe mensagem "Senha não pode ser vazio".
- **Tentar cadastrar sem preencher confirmação de senha:**  
  Exibe mensagem "Confirmar senha não pode ser vazio".
- **Tentar cadastrar com senhas diferentes:**  
  Exibe mensagem de erro sobre senhas diferentes.
- **Cadastrar com saldo ativado:**  
  Conta criada com saldo inicial de R$ 1.000,00.
- **Cadastrar com saldo desativado:**  
  Conta criada com saldo inicial de R$ 0,00.

### Validações Extras

- **Testes data-driven:**  
  Utilização de arquivos CSV para testar múltiplos cenários automaticamente.
- **Mensagens de erro:**  
  Validação de todas as mensagens de erro exibidas pela aplicação conforme regras de negócio.

## Como Executar os Testes

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure a variável de ambiente `URL_BUGBANK` no arquivo `.env`:
   ```
   URL_BUGBANK=https://bugbank.netlify.app/
   ```
3. Execute os testes:
   ```sh
   npx playwright test
   ```
4. Para abrir o relatório HTML dos testes:
   ```sh
   npx playwright show-report
   ```

## Observações

- Os testes utilizam o padrão **Page Object Model** para melhor organização e manutenção.
- O projeto suporta execução paralela e geração de relatórios automáticos.
- Os dados de teste podem ser facilmente alterados nos arquivos CSV em `tests/web/examples/`.

---

**Autor:**  
LinkedIn: [Henrick Borba](https://www.linkedin.com/in/henrick-brb/)

**Licença:**  
[MIT](LICENSE)