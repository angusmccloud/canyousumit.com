const dateInfo = () => {
    const today = new Date();
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
	const year = today.getFullYear();
	const month = today.getMonth();
	const date = today.getDate();
	const seed = year.toString() + (month < 9 ? '0' : '') + (month + 1).toString() + (date < 10 ? '0' : '') + date.toString();
    const dt = {year, month, day: date};
    const yesterdayDt = {year: yesterday.getFullYear(), month: yesterday.getMonth(), day: yesterday.getDate()};

    const result = {
        fullString: today,
        seed,
        dayOfWeek: today.getDay(), // 0 = Sunday, 1 = Monday, etc.
        today: dt,
        yesterday: yesterdayDt,
    }

    console.log('-- Date Result --', result);
    return result;
}

export default dateInfo;