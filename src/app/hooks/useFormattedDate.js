import { parseISO,format } from "date-fns";

export default function useFormattedDate(dateString) {
    try {
        return format(parseISO(dateString), "dd/MM/yyyy");
    }   catch (error) {
        console.error("Error parsing date:", error);
        return null;
    }
}
