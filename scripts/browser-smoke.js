async (page) => {
  const base = new URL(page.url()).origin;
  const results = [],
    errors = [],
    posts = [];
  const check = (condition, message) => {
    if (!condition) throw new Error(message);
    results.push(message);
  };
  const onError = (error) => errors.push(error.message);
  const onRequest = (request) => {
    if (request.method() === "POST" && request.url().startsWith(base + "/api/"))
      posts.push(request.url());
  };
  page.on("pageerror", onError);
  page.on("request", onRequest);
  const go = (path) =>
    page.goto(base + path, { waitUntil: "domcontentloaded" });
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await go("/");
    const servicePaths = await page
      .locator("#uslugi .ep-service-card")
      .evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
    const paths = [
      "/",
      "/ceny/",
      "/kalkulyator/",
      "/raboty/",
      "/o-nas/",
      "/kontakty/",
      "/privacy/",
      "/consent/",
      ...servicePaths,
      "/raboty/plitka-v-vannoy/",
    ];
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of paths) {
        const response = await go(path);
        await page.locator("h1").waitFor();
        check(response.status() === 200, `${width} ${path}: HTTP 200`);
        check(
          (await page.locator("h1").count()) === 1,
          `${width} ${path}: one h1`,
        );
        check(
          (await page.locator('link[rel="canonical"]').getAttribute("href")) ===
            "https://elit-plit.ru" + path,
          `${width} ${path}: canonical`,
        );
        check(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width} ${path}: no horizontal overflow`,
        );
      }
    }
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", "/kalkulyator/", "/ceny/", "/kontakty/"]) {
        await go(path);
        check(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width} ${path}: no horizontal overflow`,
        );
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go("/");
    const menuButton = page.getByRole("button", {
      name: "Открыть меню",
      exact: true,
    });
    await menuButton.click();
    const menu = page.getByRole("dialog", { name: "Навигация", exact: true });
    check(await menu.isVisible(), "Mobile navigation opens by pointer");
    await menu.locator("summary").click();
    check(
      (await menu.locator("nav details a").count()) === 10,
      "All 10 service links are in mobile submenu",
    );
    await page.keyboard.press("Escape");
    check(!(await menu.isVisible()), "Escape closes navigation");
    check(
      await menuButton.evaluate(
        (element) => element === document.activeElement,
      ),
      "Dialog restores focus to opener",
    );
    await page.keyboard.press("Enter");
    check(await menu.isVisible(), "Keyboard opens navigation");
    await menu.getByRole("button", { name: "Закрыть", exact: true }).click();
    await go("/ceny/");
    await page
      .getByLabel("Поиск по операциям", { exact: true })
      .fill("ступени");
    check(
      (await page.locator(".ep-price-table tbody tr").count()) === 1,
      "Price search filters rows",
    );
    check(
      new URL(page.url()).searchParams.get("query") === "ступени",
      "Search is synchronized with URL",
    );
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByLabel("Поиск по операциям", { exact: true }).waitFor();
    await page.waitForFunction(
      () => document.querySelector('input[type="search"]').value === "ступени",
    );
    check(
      (await page.locator(".ep-price-table tbody tr").count()) === 1,
      "Price filter survives reload",
    );
    await page.getByLabel("Поиск по операциям", { exact: true }).fill("");
    const stairs = page
      .locator(".ep-price-table tr")
      .filter({ hasText: "Укладка ступени" });
    await stairs
      .getByRole("button", { name: "+ в расчёт", exact: true })
      .click();
    await page
      .getByLabel("Укладка ступени, пог. м", { exact: true })
      .fill("2,5");
    check(
      (await page.locator(".ep-price-summary output").innerText())
        .replace(/\s/g, "")
        .includes("12375"),
      "Stairs price uses linear metres and website discount",
    );
    await page
      .getByRole("link", { name: "Открыть в калькуляторе", exact: true })
      .click();
    await page.getByLabel("Укладка ступени, пог. м", { exact: true }).waitFor();
    check(
      (await page
        .getByLabel("Укладка ступени, пог. м", { exact: true })
        .inputValue()) === "2,5",
      "Price selection transfers into calculator",
    );
    await page
      .getByRole("button", { name: "Сохранить расчёт", exact: false })
      .click();
    check(
      await page.locator(".ep-calc__saved").isVisible(),
      "Saved version exposes ID and price date",
    );
    const savedHref = await page
      .getByRole("link", { name: "Открыть сохранённую версию", exact: true })
      .getAttribute("href");
    await go(savedHref);
    await page.getByLabel("Укладка ступени, пог. м", { exact: true }).waitFor();
    check(
      (await page
        .getByLabel("Укладка ступени, пог. м", { exact: true })
        .inputValue()) === "2,5",
      "Saved version restores its parameters",
    );
    const downloadEvent = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Скачать файл расчёта", exact: true })
      .click();
    check(
      (await downloadEvent).suggestedFilename().startsWith("elit-plit-"),
      "Saved calculation downloads a versioned file",
    );
    await page
      .getByRole("button", {
        name: "Получить предварительный расчёт",
        exact: true,
      })
      .click();
    const form = page.getByRole("dialog", {
      name: "Получить предварительный расчёт",
      exact: true,
    });
    check(await form.isVisible(), "Estimate CTA opens existing lead form");
    check(
      (await form
        .getByLabel("Телефон", { exact: true })
        .getAttribute("required")) !== null,
      "Existing phone requirement is preserved",
    );
    await page.keyboard.press("Escape");
    await go("/kalkulyator/");
    await page.getByLabel("Длина, м", { exact: true }).fill("3");
    await page.getByLabel("Ширина, м", { exact: true }).fill("2");
    await page.getByLabel("Высота, м", { exact: true }).fill("2,5");
    await page.getByLabel("Стена B", { exact: true }).uncheck();
    await page.getByLabel("Стена D", { exact: true }).uncheck();
    await page
      .getByRole("group", { name: "Материал", exact: true })
      .getByRole("radio", { name: /^Плитка/ })
      .press("Space");
    const total = () => page.locator(".ep-calc__total").innerText();
    check(
      (await total()).replace(/\s/g, "").includes("43650"),
      "Selected walls and door calculate correctly in browser",
    );
    await page.getByLabel("Основание", { exact: true }).selectOption("unknown");
    await page.getByLabel("Запил под 45°, пог. м", { exact: true }).fill("3");
    check(
      (await total()).replace(/\s/g, "").includes("43650"),
      "Unpriced operations do not inflate subtotal",
    );
    check(
      (await page
        .locator(".ep-calc__unknown")
        .getByText("по смете", { exact: true })
        .count()) >= 3,
      "Unknown operations stay explicit",
    );
    await page
      .getByRole("radio", { name: "Количество плитки", exact: true })
      .check();
    check(
      (await total()).includes("60 шт"),
      "Tile quantity rounds up with reserve",
    );
    await page.getByRole("radio", { name: "Подробный", exact: true }).check();
    check(
      (await page.getByLabel("Длина, м", { exact: true }).inputValue()) === "3",
      "Switching modes preserves geometry",
    );
    await page.getByLabel("Длина, м", { exact: true }).fill("-1");
    await page.getByLabel("Ширина, м", { exact: true }).focus();
    check(
      (await page.getByRole("alert").count()) > 0 && (await total()) === "—",
      "Negative dimensions show an error after blur",
    );
    await go("/raboty/");
    await page.getByRole("button", { name: "Ванная", exact: true }).click();
    check(
      new URL(page.url()).searchParams.get("room") === "vannaya",
      "Portfolio room filter updates URL",
    );
    check(
      (await page.locator(".ep-project-card").count()) === 3,
      "Portfolio room filter uses real project data",
    );
    await page.getByRole("button", { name: "до 5 м²", exact: true }).click();
    check(
      await page
        .getByRole("heading", {
          name: "Нет работ с такими параметрами",
          exact: true,
        })
        .isVisible(),
      "Unknown project areas are not invented",
    );
    await go("/kontakty/");
    await page
      .getByLabel("Адрес объекта", { exact: true })
      .fill("Москва, тестовый адрес");
    await page.getByLabel("Этаж", { exact: true }).fill("5");
    await page
      .getByRole("button", { name: "Уточнить условия выезда", exact: true })
      .click();
    check(
      (
        await page.locator(".ep-address-form__prepared pre").innerText()
      ).includes("Этаж: 5"),
      "Address form prepares a Telegram message without a phone",
    );
    for (const [from, to] of [
      ["/index.html", "/"],
      ["/styling.html", "/ceny/"],
      ["/bathroom.html", "/uslugi/ukladka-plitki-v-vannoy/"],
      ["/phototile.html", "/ceny/"],
      ["/confidentiality.html", "/privacy/"],
    ]) {
      const response = await page.request.get(
        base + from + "?utm_source=test",
        { maxRedirects: 0 },
      );
      check(
        response.status() === 301 &&
          response.headers().location === to + "?utm_source=test",
        `${from}: 301 preserves query`,
      );
    }
    const missing = await go("/missing-handoff-check/");
    check(
      missing.status() === 404 &&
        (await page
          .getByRole("heading", { name: "Страница не найдена", exact: true })
          .isVisible()),
      "Unknown route returns real HTTP 404",
    );
    check(errors.length === 0, "No runtime or hydration errors");
    check(posts.length === 0, "Browser checks did not send live leads");
    return { checks: results.length, results, errors, posts };
  } finally {
    page.off("pageerror", onError);
    page.off("request", onRequest);
  }
};
