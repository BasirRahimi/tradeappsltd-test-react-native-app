function formatSalary(salary) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(salary);
}

export { formatSalary };
