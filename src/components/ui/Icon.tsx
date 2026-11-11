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
import { AltArrowDownIcon } from "@solar-icons/react/linear/alt-arrow-down";
import { CheckCircleIcon } from "@solar-icons/react/linear/check-circle";
import { RestartIcon } from "@solar-icons/react/linear/restart";
import { CalendarMarkIcon } from "@solar-icons/react/linear/calendar-mark";
import { CardIcon } from "@solar-icons/react/linear/card";
import { TicketIcon } from "@solar-icons/react/linear/ticket";
import { UserRoundedIcon } from "@solar-icons/react/linear/user-rounded";
import { UploadMinimalisticIcon } from "@solar-icons/react/linear/upload-minimalistic";
import { ArrowUpIcon } from "@solar-icons/react/linear/arrow-up";
import { CalendarAddIcon } from "@solar-icons/react/linear/calendar-add";
import { SnowflakeIcon } from "@solar-icons/react/linear/snowflake";
import { PaletteIcon } from "@solar-icons/react/linear/palette";
import { LinkRoundIcon } from "@solar-icons/react/linear/link-round";
import { CalendarIcon } from "@solar-icons/react/linear/calendar";
import { HomeSmileIcon as HomeSmileSolidIcon } from "@solar-icons/react/bold-duotone/home-smile";

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
  calendar: CalendarIcon,
  "alt-arrow-down": AltArrowDownIcon,
  "check-circle": CheckCircleIcon,
  "calendar-mark": CalendarMarkIcon,
  restart: RestartIcon,
  "user-rounded": UserRoundedIcon,
  "upload-minimalistic": UploadMinimalisticIcon,
  "arrow-up": ArrowUpIcon,
  "calendar-add": CalendarAddIcon,
  snowflake: SnowflakeIcon,
  palette: PaletteIcon,
  "link-round": LinkRoundIcon,
  card: CardIcon,
  ticket: TicketIcon,
} as const;

export type IconName = keyof typeof ICONS;

/** Active bottom-nav tabs use the filled (bold duotone) glyph, as in the product. Only "home-smile" is wired so far. */
const SOLID: Partial<Record<IconName, typeof HomeSmileIcon>> = { "home-smile": HomeSmileSolidIcon };

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.7,
  solid = false,
  ...rest
}: { name: IconName; size?: number; strokeWidth?: number; solid?: boolean } & SVGProps<SVGSVGElement>) {
  const Glyph = (solid && SOLID[name]) || ICONS[name];
  return <Glyph size={size} strokeWidth={solid ? undefined : strokeWidth} aria-hidden {...rest} />;
}
