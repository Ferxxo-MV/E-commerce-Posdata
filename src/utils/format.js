const currencyFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
});

export function formatPrice(amount) {
    return currencyFormatter.format(amount);
}