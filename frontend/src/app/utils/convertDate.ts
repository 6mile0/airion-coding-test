import { zeroPad } from "./zeroPad";

export const convertDate = (timestamp: string, isViewTime: boolean = true): string => {
    const dateObj = new Date(Number(timestamp));
    if(isViewTime){
        return `${zeroPad(dateObj.getFullYear(), 4)}/${zeroPad(dateObj.getMonth() + 1, 2)}/${zeroPad(dateObj.getDate(), 2)} ${zeroPad(dateObj.getHours(), 2)}:${zeroPad(dateObj.getMinutes(), 2)}`;
    }else{
        return `${zeroPad(dateObj.getFullYear(), 4)}/${zeroPad(dateObj.getMonth() + 1, 2)}/${zeroPad(dateObj.getDate(), 2)}`;
    }
}
