import { expect, test } from "@playwright/test";

test("proofline seeded workflow reaches a published buyer packet", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Proofline" })).toBeVisible();
  await page.getByLabel("Email").fill("demo@proofline.app");
  await page.getByLabel("Password").fill("proofline-demo");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(/\/questionnaires$/);
  await expect(
    page.getByRole("heading", { name: "Review Queue" }),
  ).toBeVisible();
  await expect(page.getByText("Acme Procurement Review")).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/questionnaires\/.+/),
    page.getByRole("link", { name: "Open Ready Review" }).click(),
  ]);
  await expect(
    page.getByRole("heading", { name: "Review Room" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Publish Packet" }),
  ).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/packets\/.+/),
    page.getByRole("button", { name: "Publish Packet" }).click(),
  ]);
  await expect(
    page.getByRole("heading", { name: "Buyer Packet" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Acme Procurement Review" }),
  ).toBeVisible();
});
