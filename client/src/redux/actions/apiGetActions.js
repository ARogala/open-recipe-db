import { CHANGE_STRING } from './types';

export const changeDummyData = () => {
	return {
		type: CHANGE_STRING,
		payload: 'Change boiler plate redux text'
	};
};