/*
 * Guards the content rules that must never regress (from the brief).
 * Run: npm run check:content   (Node strips the types, no extra dependency)
 */
import { addonGroups } from "../src/content/addons.ts";
import { faq } from "../src/content/faq.ts";
import { plans } from "../src/content/plans.ts";

const fail: string[] = [];
const check = (ok: boolean, msg: string) => ok || fail.push(msg);

const price = Object.fromEntries(plans.map((p) => [p.id, p.priceEgpMonthly]));
check(price.solopreneur === 1290 && price.grow === 4990 && price.scale === 14990, "plan prices must be 1,290 / 4,990 / 14,990");
check(price.enterprise === null, "Enterprise must have no price");
check(plans.map((p) => p.name).join() === "Solopreneur,Grow,Scale,Enterprise", "plan names/order");
check(plans.filter((p) => p.tag).length === 1 && plans[1].tag === "Best fit for studios", "only Grow carries a badge");

const enterprise = JSON.stringify(plans.find((p) => p.id === "enterprise"));
check(!/\d/.test(enterprise.replace('"priceEgpMonthly":null', "")), "Enterprise must not contain any number");

const addons = JSON.stringify(addonGroups);
check(!/\d|EGP|coming soon/i.test(addons), "add-ons: no prices, numbers or 'coming soon'");

const copy = JSON.stringify([plans, faq, addonGroups]);
check(!/discount|free trial|testimonial|cancel anytime|most popular/i.test(copy), "forbidden claims found in copy");

if (fail.length) {
  console.error("Content check failed:\n- " + fail.join("\n- "));
  process.exit(1);
}
console.log("Content check passed.");
