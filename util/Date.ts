import { DateValue } from "@nextui-org/react";
import moment from "moment";

export const getFormateDateOfINtDate = (date:DateValue) => {
    return moment(`${date.month}/${date.day}/${date.year}`).toDate()
    
}