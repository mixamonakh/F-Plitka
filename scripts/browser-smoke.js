async (page) => {
  const base = new URL(page.url()).origin;
  const results = [];
  const errors = [];
  const requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (r.method() === "POST") requests.push(r.url());
  });
  const check = (condition, message) => {
    if (!condition) throw Error(message);
    results.push(message);
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    window.motionEvents = [];
    document.addEventListener("animationstart", (event) =>
      window.motionEvents.push({
        name: event.animationName,
        className: event.target.className,
      }),
    );
  });
  await page.goto(base + "/");
  await page.mouse.move(1430, 980);
  const first = await page
    .locator(".hero-slide:not([hidden])")
    .getAttribute("aria-label");
  await page.waitForFunction(
    (first) =>
      document
        .querySelector(".hero-slide:not([hidden])")
        .getAttribute("aria-label") !== first,
    first,
    { timeout: 8500 },
  );
  check(true, "Hero advances automatically");
  await page
    .getByRole("button", { name: "Остановить слайд-шоу", exact: true })
    .click();
  await page.locator(".services__title").scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    window.motionEvents.some((e) => e.name === "backInLeft"),
  );
  await page.locator(".services-picture").first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    window.motionEvents.some((e) => e.name === "zoomInLeft"),
  );
  const motion = await page.evaluate(() => window.motionEvents);
  check(motion.length >= 5, "Original CSS entrance effects fire on scroll");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const name of [
    "index",
    "bathroom",
    "phototile",
    "styling",
    "confidentiality",
  ]) {
    await page.goto(base + "/" + (name === "index" ? "" : name + ".html"));
    await page
      .getByRole("button", { name: "Открыть меню", exact: true })
      .click();
    const menu = page.getByRole("dialog", { name: "Навигация", exact: true });
    check(await menu.isVisible(), name + ": menu opens");
    await menu.locator("summary").click();
    check(
      await menu
        .getByRole("link", { name: "Укладка плитки на пол", exact: true })
        .isVisible(),
      name + ": service submenu opens",
    );
    await page.keyboard.press("Escape");
    check(
      await page
        .getByRole("button", { name: "Открыть меню", exact: true })
        .evaluate((e) => e === document.activeElement),
      name + ": Escape restores menu focus",
    );
    await page.locator(".hero-slide:not([hidden]) .promo__button").click();
    const dialog = page.getByRole("dialog", {
      name: "Оставить заявку",
      exact: true,
    });
    await dialog
      .getByLabel("Телефон", { exact: true })
      .fill("+7 999 111-22-33");
    check(
      await dialog
        .getByRole("button", { name: "Отправить", exact: true })
        .isDisabled(),
      name + ": form does not pretend to submit",
    );
    check(
      !(await dialog.getByRole("checkbox").isChecked()),
      name + ": consent is not preselected",
    );
    await page.keyboard.press("Escape");
    if (name !== "confidentiality") {
      const tabs = page.locator("#portfolio [role=tab]");
      for (let index = 0; index < (await tabs.count()); index++) {
        await tabs.nth(index).click();
        const panel = page.locator("#portfolio [role=tabpanel]:not([hidden])");
        await panel.locator("a").first().click();
        const lightbox = page.getByRole("dialog", {
          name: "Просмотр фотографии",
          exact: true,
        });
        const before = await lightbox.locator("img").getAttribute("src");
        await page.keyboard.press("ArrowRight");
        check(
          (await lightbox.locator("img").getAttribute("src")) !== before,
          name + ": gallery " + index + " advances",
        );
        await page.keyboard.press("Escape");
      }
    }
    if (name === "styling" || name === "phototile") {
      const calc = page.locator(".form-calc");
      await calc.getByRole("combobox").selectOption({ index: 1 });
      await calc.getByLabel("Введите площадь", { exact: true }).fill("15");
      check(
        (await calc.locator("output").textContent()).replace(/\s/g, "") ===
          (name === "styling" ? "21000руб." : "120000руб."),
        name + ": price is correct",
      );
      await calc
        .getByLabel("Введите купон для скидки", { exact: true })
        .fill("7778");
      check(
        (await calc.locator("output").textContent()).replace(/\s/g, "") ===
          (name === "styling" ? "18900руб." : "108000руб."),
        name + ": coupon is correct",
      );
      await calc.getByLabel("Введите площадь", { exact: true }).fill("0");
      check(
        (await calc.locator("output").textContent()) === "0 руб.",
        name + ": zero area is zero",
      );
      if (name === "styling") {
        await calc
          .getByRole("combobox")
          .selectOption({ label: "Укладка крупноформатного керамогранита" });
        check(
          (await calc.getByRole("combobox").inputValue()) ===
            "Укладка крупноформатного керамогранита",
          "Equal-price services stay distinct",
        );
      }
    }
    if (name === "phototile") {
      const solutions = page.locator("#solutions");
      await solutions
        .getByRole("tab", { name: "Природа", exact: true })
        .click();
      let image = await solutions
        .locator(
          "[role=tabpanel]:not([hidden]) .slider__wrapper:not([hidden]) img",
        )
        .getAttribute("src");
      await solutions
        .getByRole("button", { name: "Следующее решение", exact: true })
        .click();
      check(
        (await solutions
          .locator(
            "[role=tabpanel]:not([hidden]) .slider__wrapper:not([hidden]) img",
          )
          .getAttribute("src")) !== image,
        "Phototile slider advances",
      );
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/");
  check(
    (await page.locator(".motion-pending").count()) === 0,
    "Reduced motion keeps all content visible",
  );
  check(
    (await page
      .locator(".hero-slide:not([hidden])")
      .evaluate((e) => getComputedStyle(e).animationName)) === "none",
    "Reduced motion disables slide animation",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  check(requests.length === 0, "No POST requests were sent");
  check(errors.length === 0, "No JavaScript errors");
  return { passed: results.length, results, motion, errors, requests };
};
