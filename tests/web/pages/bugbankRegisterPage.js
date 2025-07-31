const { expect } = require("@playwright/test");

class bugbankRegisterPage {

    // Mapeamento dos elementos
    constructor (page) {
        this.page = page;
        this.registerButtom = page.getByRole('button', { name: 'Registrar' });
        this.fieldEmail = page.getByPlaceholder('Informe seu e-mail').nth(1);
        this.fieldName = page.getByRole('textbox', { name: 'Informe seu Nome' });
        this.fieldPassword = page.getByPlaceholder('Informe sua senha').nth(1);
        this.fieldConfirmPassword = page.getByRole('textbox', { name: 'Informe a confirmação da senha' });
        this.toggleButtom = page.locator('#toggleAddBalance');
        this.buttomCreatAccont = page.getByRole('button', { name: 'Cadastrar' });
        this.messageMandatory = page.locator('div').filter({ hasText: /^E-mailÉ campo obrigatório$/ }).getByRole('paragraph');
        this.messageMandatoryError = page.getByText('É campo obrigatório');
        this.errorScreenName = page.getByText('Nome não pode ser vazio.');
        this.errorScreenPassword = page.getByText('As senhas não são iguais.');
    }

    async ClickButtomRegister() {
        console.log('Clicking the register button');
        await this.registerButtom.click();
    }

    async RegisterAccount(record) {
        console.log('Filling in fields');
        await this.fieldEmail.fill(record.fieldEmail || "");
        await this.fieldName.fill(record.fieldName || "");
        await this.fieldPassword.fill(record.fieldPassword || "");
        await this.fieldConfirmPassword.fill(record.fieldConfirmPassword || "");
        if (record.toggleAddBalance === 'true') {
            await this.toggleButtom.click();
            console.log('Toggle checked');
        } else {
            console.log('Toggle unchecked')
        }
    }

    async validateMessage(record) {
        //Valida mensagem de erro do campo Email
        if (record.fieldEmail === "") {
            console.log('Validating email field');
            await expect(this.messageMandatory).toBeVisible();
            await expect(this.messageMandatoryError).toHaveCount(1);
        }

        //Valida mensagem de erro do campo Nome
        if (record.fieldName === "") {
            console.log('Validating name field');
            await expect(this.errorScreenName).toBeVisible();
        }

        //Valida mensagem de erro do campo Senha
        if (record.fieldPassword === "") {
            console.log('Validating password field');
            await expect(this.messageMandatoryError.nth(0)).toBeVisible();
            await expect(this.messageMandatoryError).toHaveCount(1);
        }

        //Valida mensagem de erro do campo Confirmar Senha
        if (record.fieldConfirmPassword === "") {
            console.log('Validating confirm password field');
            await expect(this.messageMandatoryError.nth(0)).toBeVisible();
            await expect(this.messageMandatoryError).toHaveCount(1);
        }
    }

    async validateMessagePassword(record) {
        // Valida mensagem de erro quando as senhas não são iguais
        if(record.fieldPassword !== record.fieldConfirmPassword) {
            console.log('Validating different password fields');
            await expect(this.errorScreenPassword).toBeVisible();
        } 
    }

    async CreatAccontButtom() {
        console.log('Create Account');
        await this.buttomCreatAccont.click();
    }
}

module.exports = { bugbankRegisterPage };
