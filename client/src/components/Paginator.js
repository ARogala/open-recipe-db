import React from 'react';
//NOTE: limit of 20 recipes per page is fixed on the server
class Paginator extends React.Component {
	render() {
		console.log(this.props.count);
		const count = this.props.count;
		const pages = Math.ceil(count/20);
		console.log(pages);
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
