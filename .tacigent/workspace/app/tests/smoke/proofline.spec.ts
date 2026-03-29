import { expect, test } from "@playwright/test";

test("proofline seeded workflow reaches a published buyer packet", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Proofline" })).toBeVisible();
  await page.getByLabel("이메일").fill("demo@proofline.app");
  await page.getByLabel("비밀번호").fill("proofline-demo");
  await page.getByRole("button", { name: "로그인" }).click();

  await expect(page).toHaveURL(/\/questionnaires$/);
  await expect(
    page.getByRole("heading", { name: "심사 대기열" }),
  ).toBeVisible();
  await expect(page.getByText("Acme 구매 심사")).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/questionnaires\/.+/),
    page.getByRole("link", { name: "발행 가능 심사 열기" }).click(),
  ]);
  await expect(page.getByRole("heading", { name: "심사실" })).toBeVisible();
  await expect(page.getByRole("button", { name: "패킷 발행" })).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/packets\/.+/),
    page.getByRole("button", { name: "패킷 발행" }).click(),
  ]);
  await expect(
    page.getByRole("heading", { name: "바이어 패킷" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Acme 구매 심사" }),
  ).toBeVisible();
});
