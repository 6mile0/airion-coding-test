export const convertDate = (timestamp: string): string => {
    const dateObj = new Date(Number(timestamp));
    return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
}
