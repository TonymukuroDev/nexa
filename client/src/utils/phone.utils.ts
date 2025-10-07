const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    console.log(digits);
    
    // Format based on length
    if (digits.length <= 1) return digits;
    if (digits.length <= 4) return `${digits.startsWith("8") ? digits.slice(0, 1) : "+".concat(digits.slice(0, 1))} (${digits.slice(1, 4)})`;
    if (digits.length <= 6) return `${digits.startsWith("8") ? digits.slice(0, 1) : "+".concat(digits.slice(0, 1))} (${digits.slice(1, 3)}) ${digits.slice(3)}`;
    return `${digits.startsWith("8") ? digits.slice(0, 1) : "+".concat(digits.slice(0, 1))} (${digits.slice(1, 4)}) ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 11)}`;
};


export const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
};