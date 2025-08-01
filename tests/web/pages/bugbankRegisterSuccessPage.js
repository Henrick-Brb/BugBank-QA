const { expect } = require("@playwright/test");

class bugbankRegisterSuccessPage {

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
        this.fieldLoginEmail = page.getByPlaceholder('Informe seu e-mail').first();
        this.fieldLoginPassword = page.getByPlaceholder('Informe sua senha').first();
        this.closebuttom = page.getByText('Fechar');
        this.accessButtom = page.getByRole('button', { name: 'Acessar' });
        this.textAccountBalanceFalse = page.getByText('Saldo em conta R$ 0,00');
        this.textAccountBalanceTrue = page.getByText('Saldo em conta R$ 1.000,00');
    }

    async ClickButtomRegister() {
        console.log('Clicking the register button');
        await this.registerButtom.click();
    }

    async RegisterAccount(record) {
        console.log('Filling in fields');
        await this.fieldEmail.fill(record.fieldEmail);
        await this.fieldName.fill(record.fieldName);
        await this.fieldPassword.fill(record.fieldPassword);
        await this.fieldConfirmPassword.fill(record.fieldConfirmPassword);
        if (record.toggleAddBalance === 'true') {
            await this.toggleButtom.click();
            console.log('Toggle checked');
        } else {
            console.log('Toggle unchecked');
        }
    }

    async CreatAccontButtom() {
        console.log('Create Account');
        await this.buttomCreatAccont.click();
    }

    async closeButtom() {
        console.log('Clicking the close button');
        await this.closebuttom.click();
        await expect(this.closebuttom).not.toBeVisible();
    }

    async loginValid(record) {
        console.log('Filling in the fields and sending');
        await this.fieldLoginEmail.fill(record.fieldEmail);
        await this.fieldLoginPassword.fill(record.fieldPassword);
        await this.accessButtom.click();
    }

    async validateAccountBalance(record) {
        console.log('Valid account was created with balance');
        if (record.toggleAddBalance === 'true') {
            await expect(this.textAccountBalanceTrue).toBeVisible();
        } else {
            await expect(this.textAccountBalanceFalse).toBeVisible();
        }
    }
}

module.exports = { bugbankRegisterSuccessPage };
