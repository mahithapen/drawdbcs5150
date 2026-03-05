import { expect, test } from "@playwright/test";

test("landing page renders core hero content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Draw, Copy, and Paste" }),
  ).toBeVisible();
  await expect(page.getByText("No sign up")).toBeVisible();
});

test("editor page renders menubar categories", async ({ page }) => {
  await page.goto("/editor/templates/blank");
  await expect(page.getByText("File")).toBeVisible();
  await expect(page.getByText("Edit")).toBeVisible();
  await expect(page.getByText("View")).toBeVisible();
});

test("sample data export opens modal and handles empty DB", async ({ page }) => {
  await page.goto("/editor/templates/blank");

  await page.getByText("File").click();
  await page.getByText("Export as").hover();
  await page.getByText("Sample Data (SQL)").click();

  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Export")).toBeVisible();
  await expect(
    page.getByText("-- No tables found. Add tables to generate sample data."),
  ).toBeVisible();
});
