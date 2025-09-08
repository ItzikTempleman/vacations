import { notify } from "./Notify";

export function validateReturnAfterIsDeparture(departureDate?: string, returnDate?: string): boolean | string {
  const departure = new Date((departureDate || "").replace(" ", "T"));
  const ret = new Date((returnDate || "").replace(" ", "T"));
  const now = Date.now();
  if (Number(departure) < now || Number(ret) < now) {
    const msg = "Selected dates cannot be in the past";
    notify.error(msg);
    return msg;
  }

  if (!(ret > departure)) {
    const msg = "Return must be after departure";
    notify.error(msg);
    return msg;
  }

  return true;
}