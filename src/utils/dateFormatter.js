import { format, parseISO } from "date-fns";

export default function dateFormatter(dateString) {
  return format(parseISO(dateString), "MMM d, yyyy h:mm a");
}
