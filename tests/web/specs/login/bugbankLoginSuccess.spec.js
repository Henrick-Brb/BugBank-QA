const { test } = require('@playwright/test');
const { bugbankLoginSuccess } = require('../../pages/bugbankLoginSuccessPage.js');

/**
 * Testes automatizados para fazer cadastro com dados fakes e em seguida
 * fazer o login com os mesmos dados.
 */
test.describe('Registering an account and then logging in', () => {

    /**
     * Antes de cada teste, navega para a tela de login do BugBank.
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.URL_BUGBANK);
    });

    /**
     * Testa o fluxo completo de cadastro e login com dados gerados automaticamente no BugBank.
     */
    test('Creating an account and logging in successfully', async ({ page }) => {
        // Istancia a classe de BugBankLogin
        const BugBankLoginSuccessPage = new bugbankLoginSuccess(page);

        // Clica no botão de Registrar
        await BugBankLoginSuccessPage.ClickButtomRegister();
    
        // Faz o registro da nova conta
        await BugBankLoginSuccessPage.RegisterAccount();

        // Clica no botão de Cadastrar
        await BugBankLoginSuccessPage.CreatAccontButtom();

        // Clica no botão de Fechar após cadastrar
        await BugBankLoginSuccessPage.closeButtom();

        // Faz o login com os dados gerados
        await BugBankLoginSuccessPage.loginValid();

        // Valida que realmente entrou na tela de Home
        await BugBankLoginSuccessPage.validateScreenHome();
    });

});
