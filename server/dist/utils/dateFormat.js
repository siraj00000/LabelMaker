const getDates = (date, months) => {
    /// Calculate start and end dates for the given month
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() - months);
    return { startDate, endDate };
};
export default getDates;
//# sourceMappingURL=dateFormat.js.map