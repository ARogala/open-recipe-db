import React from 'react';

class Paginator extends React.Component {
	render() {
		return (
			<div className="appBtnContainer">
				<button className="appBtn" type="button">
					Previous
				</button>
				<button className="appBtn" type="button">
					Next
				</button>
			</div>
		);
	}
}

export default Paginator;
