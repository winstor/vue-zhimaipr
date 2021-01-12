import moment from "moment";

export function dateTimeFormat(row, column) {
    let date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export function dateFormat(row, column) {
    let date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD");
}