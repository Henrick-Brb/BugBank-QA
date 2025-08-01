const { test } = require('@playwright/test');
const { bugbankRegisterSuccessPage } = require('../../pages/bugbankRegisterSuccessPage.js');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Testes automatizados para a tela de cadastro do BugBank.
 */
test.describe('Creating the account with and without credit', () => {

    /**
     * Antes de cada teste, navega para a tela de login do BugBank.
     */
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`TC: ${testInfo.title}`);
        console.log('Starting tests...');
        console.log(`Accessing URL: ${process.env.URL_BUGBANK}`);
        await page.goto(process.env.URL_BUGBANK);
    });

    /**
     * O teste lê dados inválidos de um arquivo CSV e, para cada caso, tenta registrar uma conta no 
     * BugBank verificando se o sistema exibe as mensagens de erro esperadas.
     */
    const records = parse(fs.readFileSync(path.join(__dirname, '../../examples/bugbankRegisterSuccessExample.csv')), {
        columns: true,
        skip_empty_lines: false,
        trim: true
    });

    records.forEach((record, idx) => {
        test(`Making the complete record with the toggle checked and unchecked - Test ${idx + 1}`, async ({ page }) => {
            // Istancia a classe de BugBankLogin
            const BugBankRegisterSuccessPage = new bugbankRegisterSuccessPage(page);

            // Clica no botão de Registrar
            await BugBankRegisterSuccessPage.ClickButtomRegister();
    
            // Faz o registro da nova conta de acordo com os dados do CSV
            await BugBankRegisterSuccessPage.RegisterAccount(record);

            // Clica no botão de Cadastrar
            await BugBankRegisterSuccessPage.CreatAccontButtom();

            // Clica no botão de Fechar após cadastrar
            await BugBankRegisterSuccessPage.closeButtom();

            // Faz o login com os dados do CSV
            await BugBankRegisterSuccessPage.loginValid(record);

            // Valida se a conta está com saldo ou não de acordo com o CSV
            await BugBankRegisterSuccessPage.validateAccountBalance(record);
        });
    });

});
