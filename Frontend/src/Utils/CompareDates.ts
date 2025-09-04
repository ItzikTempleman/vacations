import { notify } from "./Notify";

export function validateReturnAfterDeparture(departureDate?: string,returnDate?: string): boolean | string {
  const departure = new Date((departureDate || "").replace(" ", "T"));
  const  ret= new Date((returnDate || "").replace(" ", "T"));
  const message = "Return must be after departure";

  if (!(ret > departure)) {
    notify.error(message);
    return message; 
  }

  return true; 
}