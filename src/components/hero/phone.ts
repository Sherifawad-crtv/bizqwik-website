/**
 * Geometry of public/devices/iphone-frame.webp (980 x 2000 px, transparent screen),
 * measured from the file's alpha channel. The app UI is built in a 390-wide
 * "design space" (the product's mobile width) and scaled to fit the screen.
 */
export const FRAME = { w: 980, h: 2000 } as const;

export const SCREEN = {
  /** Screen rectangle as a fraction of the frame. */
  left: 51 / 980,
  top: 45 / 2000,
  width: 878 / 980,
  height: 1910 / 2000,
  /** Corner radius as a fraction of the frame width (~135px of 980). */
  radius: 135 / 980,
} as const;

/** Design space: 390 wide, height follows the screen's aspect ratio (~848). */
export const DESIGN = { w: 390, h: Math.round((1910 / 878) * 390) } as const;

/** Frame edge distance from the screen edge, in design px (for scatter maths). */
export const FRAME_MARGIN = (51 / 878) * 390;

export type PieceId =
  | "greeting"
  | "avatar"
  | "range"
  | "revenue"
  | "profit"
  | "payouts"
  | "subscribers"
  | "wallet"
  | "chart"
  | "nav";

export interface PieceLayout {
  /** Docked position and size inside the 390 x 848 design space. */
  left: number;
  top: number;
  w: number;
  h: number;
  /** Scatter: which side of the phone, how far out (0 near, 1 far), height (0 top, 1 bottom of the visible phone). */
  side: -1 | 1;
  reach: number;
  fy: number;
  rot: number;
  scale: number;
  /** Order in which pieces settle (0 first). */
  order: number;
}

export const PIECES: Record<PieceId, PieceLayout> = {
  greeting: { left: 20, top: 72, w: 230, h: 36, side: -1, reach: 1, fy: 0.04, rot: -8, scale: 1.1, order: 0 },
  avatar: { left: 306, top: 64, w: 64, h: 64, side: 1, reach: 0.85, fy: 0.02, rot: 12, scale: 1.1, order: 1 },
  range: { left: 20, top: 138, w: 350, h: 44, side: 1, reach: 1, fy: 0.08, rot: 7, scale: 1.05, order: 2 },
  revenue: { left: 20, top: 192, w: 350, h: 132, side: -1, reach: 0.15, fy: 0.22, rot: -11, scale: 1.1, order: 3 },
  profit: { left: 20, top: 332, w: 170, h: 120, side: -1, reach: 1, fy: 0.6, rot: 12, scale: 1.08, order: 4 },
  payouts: { left: 200, top: 332, w: 170, h: 120, side: 1, reach: 1, fy: 0.62, rot: -8, scale: 1.08, order: 5 },
  subscribers: { left: 20, top: 462, w: 170, h: 120, side: -1, reach: 0.3, fy: 0.88, rot: -6, scale: 1.1, order: 6 },
  wallet: { left: 200, top: 462, w: 170, h: 120, side: 1, reach: 0.35, fy: 0.9, rot: 14, scale: 1.08, order: 7 },
  chart: { left: 20, top: 592, w: 350, h: 164, side: 1, reach: 0.15, fy: 0.3, rot: 13, scale: 1.1, order: 8 },
  nav: { left: 20, top: 768, w: 350, h: 64, side: 1, reach: 0, fy: 1, rot: 0, scale: 1, order: 9 },
};
