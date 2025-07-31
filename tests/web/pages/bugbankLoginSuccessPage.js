const { expect } = require("@playwright/test");
const { faker } = require('@faker-js/faker');

class bugbankLoginSuccess {

    // Mapeamento dos elementos
    constructor (page) {
        this.page = page;
        this.registerButtom = page.getByRole('button', { name: 'Registrar' });
        this.accessButtom = page.getByRole('button', { name: 'Acessar' });
        this.fieldEmail = page.getByPlaceholder('Informe seu e-mail').nth(1);
        this.fieldName = page.getByRole('textbox', { name: 'Informe seu Nome' });
        this.fieldPassword = page.getByPlaceholder('Informe sua senha').nth(1);
        this.fieldConfirmPassword = page.getByRole('textbox', { name: 'Informe a confirmação da senha' });
        this.toggleButtom = page.locator('#toggleAddBalance');
        this.buttomCreatAccont = page.getByRole('button', { name: 'Cadastrar' });
        this.closebuttom = page.getByText('Fechar');
        this.fieldLoginEmail = page.getByPlaceholder('Informe seu e-mail').first();
        this.fieldLoginPassword = page.getByPlaceholder('Informe sua senha').first();
        this.textWelcome = page.getByText('bem vindo ao BugBank :)');
        this.textDigitalAccount = page.getByText('Conta digital:');
        this.textAccountBalance = page.getByText('Saldo em conta R$');
    }

    async loginValid() {
        console.log('Filling in the fields and sending');
        await this.fieldLoginEmail.fill(this.email);
        await this.fieldLoginPassword.fill(this.password);
        await this.accessButtom.click();
    }

    async closeButtom() {
        console.log('Clicking the close button');
        await this.closebuttom.click();
    }

    async ClickButtomRegister() {
        console.log('Clicking the register button');
        await this.registerButtom.click();
    }
    
    async RegisterAccount() {
        const email = faker.internet.email();
        const name = faker.person.firstName();
        const password = faker.internet.password();
        console.log('Filling in fields');
        await this.fieldEmail.fill(email);
        await this.fieldName.fill(name);
        await this.fieldPassword.fill(password);
        await this.fieldConfirmPassword.fill(password);
        this.email = email;
        this.password = password;
    }

    async CreatAccontButtom() {
        console.log('Create Account');
        await this.buttomCreatAccont.click();
    }

    async validateScreenHome() {
        console.log('Validating that you are on the Home screen')
        await expect(this.textWelcome).toBeVisible();
        await expect(this.textDigitalAccount).toBeVisible();
        await expect(this.textAccountBalance).toBeVisible();
    }
}

module.exports = { bugbankLoginSuccess };
