const { expect } = require("@playwright/test");

class bugbankLoginPage {

    // Mapeamento dos elementos
    constructor (page) {
        this.page = page;
        this.fieldEmail = page.getByPlaceholder('Informe seu e-mail').first();
        this.fieldPassword = page.getByPlaceholder('Informe sua senha').first();
        this.accessButtom = page.getByRole('button', { name: 'Acessar' });
    }

    async loginInvalid(record) {
        console.log('Filling in the fields and sending');
        await this.fieldEmail.fill(record.fieldEmail);
        await this.fieldPassword.fill(record.fieldPassword);
        await this.accessButtom.click();
    }

    async clickButtonAccess() {
        console.log('Clicking on the "access" button');
        await this.accessButtom.click();
    }

    async messageLoginInvalid() {
        console.log('Checking Invalid Username or Password Message');
        await expect(this.page.getByText('Usuário ou senha inválido.')).toBeVisible();
    }

    async validateMessage() {
        console.log('Checking Message if it has 2 "This is a mandatory field" messages and if they are visible');
        const mensagens = this.page.getByText('É campo obrigatório');

        // Verifica se existem 2 mensagens
        await expect(mensagens).toHaveCount(2);

        // Verifica se as duas estão visíveis individualmente
        await expect(mensagens.nth(0)).toBeVisible();
        await expect(mensagens.nth(1)).toBeVisible();
    }

}

module.exports = { bugbankLoginPage };
