// tests/saucedemo.spec.ts
import { test, expect } from '@playwright/test';

test('SauceDemo 成功登录测试', async ({ page }) => {
  // 1. 打开目标网站
  console.log('正在打开 saucedemo 主页...');
  await page.goto('https://www.saucedemo.com/');

  // 2. 定位并输入用户名
  // 这里使用的是 ID 选择器，saucedemo 的输入框 ID 很规范
  await page.fill('#user-name', 'standard_user');

  // 3. 定位并输入密码
  await page.fill('#password', 'secret_sauce');

  // 4. 点击登录按钮
  await page.click('#login-button');

  // 5. 断言/验证：确认是否登录成功
  
  // 验证点 A: URL 应该包含 'inventory.html'
  await expect(page).toHaveURL(/.*inventory.html/);

  // 验证点 B: 页面上应该出现 "Products" 的标题
  // .title 是登录后商品列表页左上角的 class 名
  const pageTitle = page.locator('.title');
  await expect(pageTitle).toBeVisible();
  await expect(pageTitle).toHaveText('Products');

  console.log('登录验证成功！');
});