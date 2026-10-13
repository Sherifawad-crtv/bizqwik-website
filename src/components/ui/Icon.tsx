import type { SVGProps } from "react";
import { BanknoteIcon } from "@solar-icons/react/linear/banknote";
import { CalculatorIcon } from "@solar-icons/react/linear/calculator";
import { ChartSquareIcon } from "@solar-icons/react/linear/chart-square";
import { ClipboardListIcon } from "@solar-icons/react/linear/clipboard-list";
import { ClockCircleIcon } from "@solar-icons/react/linear/clock-circle";
import { HomeSmileIcon } from "@solar-icons/react/linear/home-smile";
import { QrCodeIcon } from "@solar-icons/react/linear/qr-code";
import { SmartphoneIcon } from "@solar-icons/react/linear/smartphone";
import { TagIcon } from "@solar-icons/react/linear/tag";
import { UsersGroupRoundedIcon } from "@solar-icons/react/linear/users-group-rounded";
import { UsersGroupTwoRoundedIcon } from "@solar-icons/react/linear/users-group-two-rounded";
import { WalletIcon } from "@solar-icons/react/linear/wallet";
import { AddIcon } from "@solar-icons/react/linear/add";

/**
 * Solar icon set, Linear weight (same set as the product apps). Only icons
 * the site uses are imported, so the bundle stays small. Add new ones here.
 * Names match the brief's icon table (content/apps.ts uses these keys).
 */
const ICONS = {
  "chart-square": ChartSquareIcon,
  calculator: CalculatorIcon,
  "qr-code": QrCodeIcon,
  "users-group-two-rounded": UsersGroupTwoRoundedIcon,
  smartphone: SmartphoneIcon,
  wallet: WalletIcon,
  banknote: BanknoteIcon,
  "users-group-rounded": UsersGroupRoundedIcon,
  "home-smile": HomeSmileIcon,
  tag: TagIcon,
  "clipboard-list": ClipboardListIcon,
  "clock-circle": ClockCircleIcon,
  add: AddIcon,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 22, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const Glyph = ICONS[name];
  return <Glyph size={size} strokeWidth={1.7} aria-hidden {...rest} />;
}
