import { test, expect, type Page } from "@playwright/test";

/** كل مسارات المنصة التي يجب أن يعمل زر الرجوع منها */
const PATHS = [
  "/cars",
  "/cars/compare",
  "/cars/toyota-camry-2026",
  "/offers",
  "/purchase",
  "/purchase/customers",
  "/purchase/companies",
  "/services",
  "/about-us",
  "/contact-us",
  "/blog",
  "/faq",
  "/jobs",
  "/privacy-policy",
  "/promotional-offers",
] as const;

/** يتحقق أن الصفحة ليست بيضاء/فارغة وأنها تستجيب للتفاعل (غير معلّقة) */
async function expectPageAlive(page: Page) {
  const main = page.locator("body");
  await expect(main).toBeVisible();

  const state = await page.evaluate(() => {
    const root = document.querySelector("main") ?? document.body;
    const text = (root.textContent ?? "").trim();
    const rect = root.getBoundingClientRect();
    const opacity = Number(getComputedStyle(root).opacity);
    return { textLength: text.length, height: rect.height, opacity };
  });

  expect(state.textLength).toBeGreaterThan(50);
  expect(state.height).toBeGreaterThan(100);
  expect(state.opacity).toBeGreaterThan(0);

  // الصفحة ليست معلّقة: JS ما زال يستجيب
  await expect
    .poll(async () => page.evaluate(() => 1 + 1), { timeout: 5000 })
    .toBe(2);
}

test.describe("الرجوع من كل مسار إلى الصفحة الرئيسية", () => {
  for (const path of PATHS) {
    test(`الرجوع من ${path} يعرض الصفحة الرئيسية بدون صفحة بيضاء`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));

      await page.goto("/", { waitUntil: "domcontentloaded" });
      await expectPageAlive(page);

      await page.evaluate((p) => window.history.pushState({}, "", p), path);
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expectPageAlive(page);

      await page.goBack({ waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(/\/(\?.*)?$/);
      await expectPageAlive(page);

      expect(errors, `أخطاء وقت التشغيل: ${errors.join(" | ")}`).toEqual([]);
    });
  }

  test("الرجوع المتكرر عبر عدة مسارات يبقي الصفحات ظاهرة", async ({ page }) => {
    const trail = ["/cars", "/cars/toyota-camry-2026", "/purchase", "/blog"];

    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const p of trail) {
      await page.goto(p, { waitUntil: "domcontentloaded" });
      await expectPageAlive(page);
    }

    for (let i = trail.length - 1; i >= 0; i--) {
      await page.goBack({ waitUntil: "domcontentloaded" });
      await expectPageAlive(page);
    }

    await expect(page).toHaveURL(/\/(\?.*)?$/);
    await expectPageAlive(page);
  });

  test("التنقل عبر روابط الواجهة ثم الرجوع لا يعلّق الصفحة الرئيسية", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: /السيارات/ }).first().click();
    await expect(page).toHaveURL(/\/cars/);
    await expectPageAlive(page);

    await page.goBack();
    await expect(page).toHaveURL(/\/(\?.*)?$/);
    await expectPageAlive(page);

    // التفاعل بعد الرجوع يعمل (لا تعليق)
    await page.getByRole("link").first().hover();
    await expectPageAlive(page);
  });
});
