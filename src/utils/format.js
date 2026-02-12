const formatNumber = (num, decimals = 2) => {
    let numStr;
    if (decimals < 0) {
        return num.toFixed(2); //default
    }
    return num.toFixed(decimals);
}

const formatCurrency = (amount, symbol = '$') => {
    amount.toFixed(2);
    const symbolRef = {
        '$': ['en-us', 'USD'],
        '£': ['en-gb', 'GBP'],
        '€': ['it-it', 'EUR'],
        '₹': ['en-in', 'INR'],
    }
    if (symbol in symbolRef) {
        return Intl.NumberFormat(symbolRef[symbol][0], { style: 'currency', currency: symbolRef[symbol][1] }).format(amount);
    }
    return Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(amount);
}

const formatPercent = (value, decimals = 1) => {
    return formatNumber(value * 100, decimals) + '%';
}

const truncate = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength)
}

const padString = (text, width, align = 'left') => {
    switch (align) {
        case 'right':
            return text.padStart(width, ' ');
        case 'center':
            const totalPad = width - text.length;
            const leftPad = Math.floor(totalPad / 2);
            const rightPad = totalPad - leftPad;
            return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
        case 'left':
        default:
            return text.padEnd(width, ' ');

    }
}

const createLabel = (key, value, width = 20) => {
    const valueStr = value.toString();  // Convert first!
    const totalNeeded = key.length + 2 + valueStr.length;

    if (totalNeeded >= width) {
        return `${key}: ${valueStr}`;
    }

    const valueWidth = width - key.length - 2;
    const paddedVal = padString(valueStr, valueWidth, 'right');
    return `${key}: ${paddedVal}`;
}

export { formatNumber, formatCurrency, formatPercent, truncate, padString, createLabel }
