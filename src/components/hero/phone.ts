/**
 * Geometry of public/devices/iphone-frame.webp (980 x 2000 px, transparent screen),
 * measured from the file's alpha channel. Its screen has the aspect ratio of an
 * iPhone Pro Max (440 x 956 pt), so the app UI is built in exactly that logical
 * size, with the product's real dimensions, and scaled to fit the frame's screen.
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

/** iPhone Pro Max logical screen, in points. */
export const DESIGN = { w: 440, h: 957 } as const;

/** iOS safe areas on that device: Dynamic Island top, home indicator bottom. */
export const SAFE = { top: 62, bottom: 34 } as const;

/** Frame bezel thickness in design points (for scatter maths). */
export const FRAME_MARGIN = (51 / 878) * DESIGN.w;

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
  | "nav"
  | "fab";

/**
 * Scatter only. Where each piece docks is whatever the real layout gives it
 * (measured from the DOM), so nothing here can drift from the app's dimensions.
 */
export interface PieceScatter {
  /** Side of the phone, how far out (0 near, 1 far), height (0 top, 1 bottom of the visible phone). */
  side: -1 | 1;
  reach: number;
  fy: number;
  rot: number;
  scale: number;
  /** Order in which pieces settle (0 first). */
  order: number;
}

export const SCATTER: Record<Exclude<PieceId, "nav" | "fab">, PieceScatter> = {
  greeting: { side: -1, reach: 0.5, fy: 0.02, rot: -8, scale: 1.1, order: 0 },
  avatar: { side: 1, reach: 0.85, fy: 0.22, rot: 9, scale: 1.1, order: 1 },
  range: { side: 1, reach: 0.1, fy: 0.02, rot: 5, scale: 1.05, order: 2 },
  revenue: { side: -1, reach: 0.15, fy: 0.22, rot: -11, scale: 1.1, order: 3 },
  profit: { side: -1, reach: 1, fy: 0.6, rot: 12, scale: 1.08, order: 4 },
  payouts: { side: 1, reach: 1, fy: 0.62, rot: -8, scale: 1.08, order: 5 },
  subscribers: { side: -1, reach: 0.3, fy: 0.88, rot: -6, scale: 1.1, order: 6 },
  wallet: { side: 1, reach: 0.35, fy: 0.9, rot: 14, scale: 1.08, order: 7 },
  chart: { side: 1, reach: 0.15, fy: 0.42, rot: 11, scale: 1.1, order: 8 },
};

/** The hero's polaroid prop: frame size and the square photo inside (points). The photo morphs into the round avatar. */
export const POLAROID = { w: 126, h: 152, photo: 106, pad: 10 } as const;
