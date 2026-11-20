import { duration, ease } from "@/motion/tokens";
import { grow, swap, typeText, type TL } from "./demo-kit";
import { phoneKit, type PhoneColors } from "./phone-motion";

/*
 * The "Front desk and CRM" scene (iPhone frame, slides up and stays put), four steps:
 *   1 Desk       New client: name, phone, email typed, a plan picked, the app invite on, registered
 *   2 Bookings   book her into Strength at 6:00 PM
 *   3 Clients    find "Mona", open her one record (a sub-page), ZOOM IN on the CRM card
 *   4 Renew      Renew, pick InstaPay, approve the receipt (ZOOM IN), the app's success sheet
 * Same rules as business-motion.ts: `to` for repeated properties, lazy pointer, times are timeline positions.
 */

type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };
const ZOOM = { record: 1.38, pay: 1.28 };

export function buildFrontDesk(tl: TL, _stage: HTMLElement, c: PhoneColors, q: Q) {
  const { one, all } = q;
  const k = phoneKit(tl, c, q);
  const { phone, page, tapAt, countTo, push, navVisible, navTo, sheetUp, sheetDown, zoomIn, zoomOut } = k;
  const val = (n: string) => one(`[data-val="${n}"]`);
  const layer = (n: string) => one(`[data-layer="${n}"]`);
  const sheet = (n: string) => one(`[data-sheet="${n}"]`);

  /* ---------- start state ---------- */
  k.reset(["desk", "bookings", "clients", "record"]);
  tl.set(sheet("new"), { autoAlpha: 0, y: 580 }, 0);
  tl.set(sheet("book"), { autoAlpha: 0, y: 490 }, 0);
  tl.set(sheet("pay"), { autoAlpha: 0, y: 620 }, 0);
  tl.set(layer("n1"), { opacity: 1, x: 0 }, 0);
  tl.set([layer("n2"), layer("n3")], { opacity: 0, x: 40 }, 0);
  tl.set(one("[data-plan-ring]"), { opacity: 0 }, 0);
  tl.set(one("[data-method-ring]"), { opacity: 0 }, 0);
  k.okReset("n");
  tl.set(one("[data-receipt]"), { height: 0, opacity: 0 }, 0);
  tl.set(one("[data-newchip]"), { scale: 0 }, 0);
  tl.add(() => {
    val("checked").textContent = "0";
    val("dropins").textContent = "0";
    val("active").textContent = "0";
    val("booked").textContent = "8";
    one('[data-type="name"]').textContent = "";
    one('[data-type="phone"]').textContent = "";
    one('[data-type="email"]').textContent = "";
    one('[data-type="search"]').textContent = "";
  }, 0.01);
  /* ---------- the phone slides up, the desk's numbers count up ---------- */
  k.enter(0.05);
  countTo(val("checked"), 0, 39, 1.0, duration.count);
  countTo(val("dropins"), 0, 6, 1.0, duration.count);
  countTo(val("active"), 0, 11, 1.0, duration.count);

  /* ---------- 1. New client ---------- */
  let land = tapAt(one('[data-tap="newclient"]'), 1.9);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("new"), land + 0.1);
  typeText(tl, one('[data-type="name"]'), "Mona Khaled", land + 0.7, duration.base);
  typeText(tl, one('[data-type="phone"]'), "01012345678", land + 1.2, duration.base);
  typeText(tl, one('[data-type="email"]'), "mona@example.com", land + 1.7, duration.base);
  land = tapAt(one('[data-tap="next1"]'), land + 2.3);
  tl.to(layer("n1"), { opacity: 0, x: -40, duration: duration.base, ease: ease.standard }, land + 0.1);
  tl.to(layer("n2"), { opacity: 1, x: 0, duration: duration.base, ease: ease.enter }, land + 0.2);
  land = tapAt(one('[data-tap="plan"]'), land + 0.7);
  tl.to(one("[data-plan-ring]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land);
  land = tapAt(one('[data-tap="register"]'), land + 0.6);
  tl.to(layer("n2"), { opacity: 0, x: -40, duration: duration.base, ease: ease.standard }, land + 0.1);
  tl.to(layer("n3"), { opacity: 1, x: 0, duration: duration.base, ease: ease.enter }, land + 0.25);
  k.okPlay("n", land + 0.35);
  sheetDown(sheet("new"), 580, land + 1.6);
  navVisible(true, land + 1.7);

  /* ---------- 2. Bookings: book her into Strength ---------- */
  land = tapAt(one('[data-tab="bookings"]'), land + 2.1);
  push(page("desk"), page("bookings"), land);
  navTo(1, land);
  land = tapAt(one('[data-tap="book"]'), land + duration.scene + 0.35);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("book"), land + 0.1);
  land = tapAt(one('[data-tap="bookmona"]'), land + 0.8);
  swap(tl, phone, "bookmona", land + 0.05);
  sheetDown(sheet("book"), 490, land + 0.7);
  navVisible(true, land + 0.8);
  tl.to(one("[data-newchip]"), { scale: 1, duration: duration.base, ease: ease.spring }, land + 1.0);
  countTo(val("booked"), 8, 9, land + 1.0, duration.base);

  /* ---------- 3. Clients: find her, open the record, zoom on it ---------- */
  land = tapAt(one('[data-tab="clients"]'), land + 1.6);
  push(page("bookings"), page("clients"), land);
  navTo(2, land);
  const typed = land + duration.scene + 0.2;
  typeText(tl, one('[data-type="search"]'), "Mona", typed, duration.base);
  all("[data-res]").forEach((el) => {
    tl.to(el, { height: 0, opacity: 0, duration: duration.slow, ease: ease.standard }, typed + 0.6);
  });
  land = tapAt(one('[data-tap="mona"]'), typed + 1.5);
  push(page("clients"), page("record"), land);
  navVisible(false, land, duration.fast);
  const z1 = land + duration.scene + 0.1;
  zoomIn(() => one("[data-crmcard]"), ZOOM.record, z1, duration.count);
  const zo = z1 + duration.count + 1.2;
  zoomOut(zo, duration.count);

  /* ---------- 4. Renew: InstaPay, approve the receipt, a full confirmation ---------- */
  land = tapAt(one('[data-tap="renew"]'), zo + duration.count * 0.6);
  sheetUp(sheet("pay"), land + 0.1);
  land = tapAt(one('[data-tap="instapay"]'), land + 0.9);
  tl.to(one("[data-method-ring]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land);
  grow(tl, one("[data-receipt]"), land + 0.25);
  const z2 = land + 0.8;
  zoomIn(() => one("[data-receipt]"), ZOOM.pay, z2, duration.count);
  land = tapAt(one('[data-tap="approve"]'), z2 + duration.count + 0.05);
  swap(tl, phone, "approve", land + 0.05);
  sheetDown(sheet("pay"), 620, land + 0.7);
  const cf = land + 0.9;
  zoomOut(cf, duration.count);
  k.done(cf + 0.2);
}
