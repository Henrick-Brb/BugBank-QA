const { test } = require('@playwright/test');
const { bugbankLoginPage } = require('../../pages/bugbankLoginPage.js');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Testes automatizados para a tela de login do BugBank.
 */
test.describe('BugBank Login Screen', () => {

    /**
     * Antes de cada teste, navega para a tela de login do BugBank.
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.URL_BUGBANK);
    });

    /**
     * O teste tenta fazer login no BugBank com campos de e-mail e senha vazios apartir de um arquivo CSV
     * verificando se a mensagem de erro apropriada é exibida.
     */
    const record = parse(fs.readFileSync(path.join(__dirname, '../../examples/bugbankLoginInvalidExample.csv')), {
        columns: true,
        skip_empty_lines: false
    });

    test('Trying to log in with empty email and password fields', async ({ page }) => {
        // Istancia a classe de BugBankLogin
        const BugBankLoginPage = new bugbankLoginPage(page);

        // Preenche o campo Email e Senha com dados inválidos e depois no botão de 'Acessar'
        await BugBankLoginPage.loginInvalid(record[0]);

        // Verifica se a Mensagem de email ou senha invalido aparece
        await BugBankLoginPage.messageLoginInvalid();
    });

    /**
     * Este teste ao tentar logar sem preencher email e senha, a mensagem de campo obrigatório é exibida.
     */
    test('Attempting to log in with empty email and password fields displays the message "This is a required field"', async ({ page }) => {
        // Istancia a classe de BugBankLogin
        const BugBankLoginPage = new bugbankLoginPage(page);

        // Clica no botão de 'Acessar' sem preencher os campos
        await BugBankLoginPage.clickButtonAccess();

        // Valida se a menssagem de campo orbrigatório fica visível
        await BugBankLoginPage.validateMessage();
    });
});
