import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "images", "projects");
const legacyDir = path.join(root, "public", "images");

/** Seed known-good assets before live capture */
const FALLBACK = {
  "degn-dapp.png": "degn-buy-dapp.png",
  "degn-website.png": "degn-website.png",
  "best-version-1.png": "best-version-1.png",
  "synovo-labs.png": "synovo-labs.png",
  "hb-sub-noor.png": "paper-company.png",
  "voxity.png": "splendid.png",
  "softlogix.png": "software-company-website.png",
  "ibs.png": "inventory-management-system.png",
  "shestrends.png": "stationary-ecommerce.png",
  "altitude-arena.png": "real-estate-management-system.png",
  "exalted.png": "erp-saas-solution.png",
  "wingz-impex.png": "strikers-gear.png",
  "payday-express.png": "accounting-system.png",
  "dispatching-company-website.png": "dispatching-company-website.png",
  "everx-node.png": "everx-node.png",
  "arena-sol.png": "table-tennis-backend.jpeg",
  "punjab-ac.png": "mern-stack-cms.png",
  "hypelet.png": "juice-company.jpeg",
  "ak-traders.jpeg": "ak-traders.jpeg",
  "tekvers.png": "tekvers.png",
  "noblepos.png": "pos-system.png",
};

const captures = [
  { file: "vellay-pro.png", url: "https://vellay.pro", waitMs: 4000, skipIfLogin: true },
  { file: "vellay-app.png", url: "https://vellay.app", waitMs: 6000 },
  { file: "flex-fuel.jpeg", url: "https://frontend-repo-umber.vercel.app", type: "jpeg", waitMs: 5000 },
  { file: "best-version-1.png", url: "https://bestversion1.com", waitMs: 6000 },
  { file: "synovo-labs.png", url: "https://slabs-eight.vercel.app", waitMs: 6000 },
  { file: "hb-sub-noor.png", url: "https://hbsubnoor.com", waitMs: 6000 },
  { file: "voxity.png", url: "https://voxity.io", waitMs: 6000 },
  { file: "softlogix.png", url: "https://softlogixconsultancy.com", waitMs: 6000 },
  { file: "ibs.png", url: "https://ibs-jade.vercel.app", waitMs: 6000 },
  { file: "shestrends.png", url: "https://shestrends.com", waitMs: 6000 },
  { file: "altitude-arena.png", url: "https://altitudearena.ae", waitMs: 6000 },
  { file: "exalted.png", url: "https://exalted-lovat.vercel.app", waitMs: 6000 },
  { file: "wingz-impex.png", url: "https://wingsimpex.com", waitMs: 6000 },
  { file: "payday-express.png", url: "https://paydayexpress.ca", waitMs: 6000 },
  { file: "dispatching-company-website.png", url: "https://freightslogistic.com", waitMs: 6000 },
  { file: "everx-node.png", url: "https://everxnode.com", waitMs: 6000 },
  { file: "arena-sol.png", url: "https://arenastudio.fun", waitMs: 6000 },
  { file: "punjab-ac.png", url: "https://punjabac.com", waitMs: 6000 },
  { file: "hypelet.png", url: "https://hypelet.pro", waitMs: 6000 },
  { file: "ak-traders.jpeg", url: "https://aktraders.pk", type: "jpeg", waitMs: 6000 },
  { file: "tekvers.png", url: "https://tekvers.com", waitMs: 6000 },
  { file: "noblepos.png", url: "https://noblepos.com", waitMs: 6000 },
];

fs.mkdirSync(outDir, { recursive: true });

for (const [dest, src] of Object.entries(FALLBACK)) {
  const from = path.join(legacyDir, src);
  const to = path.join(outDir, dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Seeded ${dest} ← ${src}`);
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const item of captures) {
  const page = await context.newPage();
  try {
    console.log(`Capturing ${item.file} from ${item.url}`);
    await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(item.waitMs ?? 5000);
    if (item.waitFor) {
      await page.waitForSelector(item.waitFor, { timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(1500);
    }

    const bodyText = await page.locator("body").innerText();
    if (item.skipIfLogin && /sign in|log in|password/i.test(bodyText) && !/overview|dashboard/i.test(bodyText)) {
      console.log(`  ↷ skipped ${item.file} (login wall — keeping existing screenshot)`);
      continue;
    }

    await page.screenshot({
      path: path.join(outDir, item.file),
      type: item.type === "jpeg" ? "jpeg" : "png",
      fullPage: false,
    });
    console.log(`  ✓ saved ${item.file}`);
  } catch (error) {
    console.error(`  ✗ failed ${item.file}:`, error.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done.");
