import { format } from 'date-fns';

// https://date-fns.org/
// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

const formatDate = date => {
	const newDate = format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'MM/DD/YYYY');
	return newDate;
};

export default formatDate;
