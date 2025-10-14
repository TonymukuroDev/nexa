export const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    console.log(digits);
    return `${digits.startsWith("8") ? digits.slice(0, 1) : "+".concat(digits.slice(0, 1))} (${digits.slice(1, 4)}) ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 11)}`;
};


export const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
};