const { test } = require('@playwright/test');
const { bugbankRegisterPage } = require('../../pages/bugbankRegisterPage.js');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

/**
 * Testes automatizados para a tela de cadastro do BugBank.
 */
test.describe('BugBank Register Screen', () => {

    /**
     * Antes de cada teste, navega para a tela de login do BugBank.
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.URL_BUGBANK);
    });

    /**
     * O teste lê dados inválidos de um arquivo CSV e, para cada caso, tenta registrar uma conta no 
     * BugBank verificando se o sistema exibe as mensagens de erro esperadas.
     */
    const records = parse(fs.readFileSync(path.join(__dirname, '../../examples/bugbankRegisterInvalidExample.csv')), {
        columns: true,
        skip_empty_lines: false,
        trim: true
    });

    records.forEach((record, index) => {
        test(`Register - Test ${index + 1}`, async ({ page }) => {
            // Istancia a classe de BugBankLogin
            const BugBankRegisterPage = new bugbankRegisterPage(page);
    
            // Clica no botão de Registrar
            await BugBankRegisterPage.ClickButtomRegister();
    
            // Faz o registro da nova conta
            await BugBankRegisterPage.RegisterAccount(record);

            // Clica no botão de Cadastrar
            await BugBankRegisterPage.CreatAccontButtom();

            // Verifica se informa que é campo obrigatótio e mensagem de erro
            await BugBankRegisterPage.validateMessage(record);
        });
    });

    /**
     * Testa a validação de senhas inválidas durante o cadastro usando dados de um arquivo CSV.
     */
    const recordsPassword = parse(fs.readFileSync(path.join(__dirname, '../../examples/bugbankRegisterPasswordInvalidExample.csv')), {
        columns: true,
        skip_empty_lines: false,
        trim: true
    });

    recordsPassword.forEach((record) => {
        test(`Register Password Validation`, async ({ page }) => {
            // Istancia a classe de BugBankLogin
            const BugBankRegisterPage = new bugbankRegisterPage(page);
    
            // Clica no botão de Registrar
            await BugBankRegisterPage.ClickButtomRegister();
    
            // Faz o registro da nova conta
            await BugBankRegisterPage.RegisterAccount(record);

            // Clica no botão de Cadastrar
            await BugBankRegisterPage.CreatAccontButtom();

            // Verifica se informa que os campos não são iguais
            await BugBankRegisterPage.validateMessagePassword(record);
        });
    });
});
