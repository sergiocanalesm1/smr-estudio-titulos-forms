// take a camel case string and parse it into a readable string: first letter uppercased and spaces between words
export const parseCamelCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (s) => s.toUpperCase());
}