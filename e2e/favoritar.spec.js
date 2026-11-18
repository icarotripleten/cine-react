const { test, expect } = require('@playwright/test');

test('Usuário cria a conta, favorita um filme e o favorito continua após recarregar a página', async ({ page }) => {
    const email = `e2e-${Date.now()}@xpto.com`;

    // 1. Criar a conta
    await page.goto('/signup');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Senha').fill('123456');
    await page.getByRole('button', { name: 'Cadastrar' }).click()

    await expect(page).toHaveURL('/')
    await expect(page.getByText('Favoritos: 0')).toBeVisible()


    // 2. Favoritar
    const cardInterestelar = page.getByRole("listitem").filter({ hasText: 'Interestelar' })
    await cardInterestelar.getByRole('button', { name: 'Favoritar' }).click();

    await expect(cardInterestelar.getByRole('button'), "Remover dos favoritos").toBeVisible();
    await expect(page.getByText('Favoritos: 1')).toBeVisible();

    // 3. Após reload manter o filme como favorito
    await page.reload();
    await expect(cardInterestelar.getByRole('button'), "Remover dos favoritos").toBeVisible();
    await expect(page.getByText('Favoritos: 1')).toBeVisible();
})