import { format } from 'date-fns';

// https://date-fns.org/
// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

export const formatMMDDYYYY = date => {
	const newDate = format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'MM/DD/YYYY');
	return newDate;
};

//special function just to properly format date for edit recipe form 
export const formatYYYYMMDD = date => {
	let newDate = format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'YYYY/MM/DD');
	newDate = newDate.replace(/\//g, '-');
	return newDate;
};
