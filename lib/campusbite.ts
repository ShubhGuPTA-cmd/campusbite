export const CURRENT_STUDENT_ID = "S001";

export function formatSlot(slotTime: string): string {
  const [hours, minutes] = slotTime.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}
