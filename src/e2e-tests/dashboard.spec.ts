import { test, expect } from '@playwright/test'

test.describe('Page - Dashboard', () => {
  test('should redirect "/" to "/dashboard"', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.mouse.move(200, 400)

    await expect(page).toHaveURL(/dashboard/)
    await expect(page.getByText('Consumo Anual')).toBeVisible()
    await expect(page.getByText('Medição Horária (Por Dia)')).toBeVisible()
  })

  test('should render correctly anual chart data"', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.mouse.move(200, 400)

    await expect(page.getByText('Consumo Anual')).toBeVisible()
    await expect(page.getByText('2021 : 68970.0054639999 MWh')).toBeVisible()
    await expect(page.getByText('2022 : 69125.77538799998 MWh')).toBeVisible()
  })

  test.describe('Hourly Measurement Chart', () => {
    test('should render with default date informations', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.move(800, 500)
      await expect(page.getByText('31/12 às 4h')).toBeVisible()
      await expect(page.getByText('113.994852 MWh')).toBeVisible()
    })

    test('should filter hourly measurement', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.getByRole('button', { name: '31' }).click()
      await page.getByRole('option', { name: '22' }).click()
      await page.waitForLoadState('networkidle')

      await page.getByRole('button', { name: 'Dez' }).click()
      await page.getByRole('option', { name: 'Out' }).click()
      await page.waitForLoadState('networkidle')

      await page.getByRole('button', { name: '2022' }).click()
      await page.getByRole('option', { name: '2021' }).click()
      await page.waitForLoadState('networkidle')

      await expect(page.getByRole('button', { name: '22' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Out' })).toBeVisible()
      await expect(page.getByRole('button', { name: '2021' })).toBeVisible()

      await page.mouse.move(800, 500)
      await expect(page.getByText('22/10 às 4h')).toBeVisible()
      await expect(page.getByText('108.689682 MWh')).toBeVisible()
    })
  })

  test('should render correct historical measurement', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'networkidle' })

    await page.mouse.wheel(0, 500)

    await expect(page.getByText('Medição Histórica')).toBeVisible()

    await page.mouse.move(500, 300)
    await expect(page.getByText('111.324968')).toBeVisible()
  })

  test.describe('Measurements Table', () => {
    test('should render correct measurements table', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.wheel(0, 1100)

      await expect(page.getByText('Medições', { exact: true })).toBeVisible()
      await expect(
        page.getByRole('gridcell', { name: '1', exact: true }),
      ).toBeVisible()
    })

    test('should filter by date range', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.wheel(0, 1100)

      await page.getByPlaceholder('Busca por datas').click()
      await page.getByLabel('Choose quarta-feira, 6 de').click()
      await page.getByLabel('Choose quinta-feira, 7 de').click()

      await page.waitForLoadState('networkidle')

      const text = await page
        .locator('td:nth-child(3) > span')
        .first()
        .textContent()

      expect(text).toEqual('06/01/2021')
    })

    test('should render correct measurements totalizer', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.wheel(0, 1100)

      await page.getByPlaceholder('Busca por datas').click()
      await page.getByLabel('Choose quinta-feira, 7 de').click()
      await page.getByLabel('Choose quinta-feira, 7 de').click()

      await page.waitForLoadState('networkidle')

      await expect(page.getByText('Exibindo 10 de 24 itens')).toBeVisible()
    })

    test('should change table page', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.wheel(0, 1100)
      await page.getByRole('button', { name: 'Próximo' }).click()

      await page.waitForLoadState('networkidle')

      await expect(
        page.getByRole('gridcell', { name: '11', exact: true }),
      ).toBeVisible()
    })

    test('should change table sort', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'networkidle' })

      await page.mouse.wheel(0, 1100)

      await page.getByRole('columnheader', { name: 'Hora' }).click()
      await page.waitForLoadState('networkidle')

      await page.waitForTimeout(3000)
      await page.getByRole('columnheader', { name: 'Hora' }).click()
      await page.waitForLoadState('networkidle')

      const text = await page
        .locator('td:nth-child(4) > span')
        .first()
        .textContent()

      expect(text).toEqual('24')
    })
  })
})
