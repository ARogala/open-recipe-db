import React from 'react';

import alarmSound from './alarmSound.ogg';
import './timer.scss';
class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: '0',
			minutes: '0',
			seconds: '0',
			hoursRemaining: '00:',
			minutesRemaining: '00:',
			secondsRemaining: '00',
			intervalID: null,
			soundIntervalID: null,
			audio: new Audio(alarmSound),
			displayOutput: false
		};
	}

	handleInputHoursChange(e) {
		this.setState({ hours: e.target.value });
	}

	handleInputMinutesChange(e) {
		this.setState({ minutes: e.target.value });
	}

	handleInputSecondsChange(e) {
		this.setState({ seconds: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ displayOutput: true });
		const hours = parseInt(this.state.hours);
		const minutes = parseInt(this.state.minutes);
		const seconds = parseInt(this.state.seconds);
		const totalSeconds = minutes * 60 + hours * 60 * 60 + seconds;
		this.startTimer(totalSeconds);
	}

	reset() {
		clearInterval(this.state.intervalID);
		clearInterval(this.state.soundIntervalID);
		this.state.audio.load();
		this.setState({
			hours: '0',
			minutes: '0',
			seconds: '0',
			hoursRemaining: '00:',
			minutesRemaining: '00:',
			secondsRemaining: '00',
			intervalID: null,
			soundIntervalID: null,
			displayOutput: false
		});
	}

	startTimer(totalSeconds) {
		const audio = this.state.audio;
		if (totalSeconds !== 0) {
			//set initial UI
			this.updateUI(totalSeconds);
			const intervalID = setInterval(() => {
				totalSeconds--;
				//update UI
				this.updateUI(totalSeconds);
				if (totalSeconds === 0) {
					clearInterval(intervalID);
					audio.play();
					//sound alarm until user presses reset 2 sec delay between audio
					const soundIntervalID = setInterval(() => {
						audio.play();
					}, 15000);
					this.setState({ soundIntervalID: soundIntervalID });
				}
			}, 1000);
			this.setState({ intervalID: intervalID });
		}
	}

	updateUI(totalSeconds) {
		let hoursRemaining, minutesRemaining, secondsRemaining;
		//convert the remaining seconds to hours
		hoursRemaining = Math.floor(totalSeconds / (60 * 60));
		//take remaining seconds (out of those remainin hours) and convert to remaining minutes
		minutesRemaining = Math.floor((totalSeconds % (60 * 60)) / 60);
		//calculate the remaining seconds
		secondsRemaining = Math.floor(totalSeconds % 60);

		//display hours remaining
		if (hoursRemaining < 10) {
			//display trailing 0
			this.setState({ hoursRemaining: `0${hoursRemaining}:` });
		} else if (hoursRemaining >= 10) {
			this.setState({ hoursRemaining: `${hoursRemaining}:` });
		}
		//display minutes remaining
		if (minutesRemaining < 10) {
			//display trailing 0
			this.setState({ minutesRemaining: `0${minutesRemaining}:` });
		} else if (minutesRemaining >= 10) {
			this.setState({ minutesRemaining: `${minutesRemaining}:` });
		}
		//display seconds remaining
		if (secondsRemaining < 10) {
			this.setState({ secondsRemaining: `0${secondsRemaining}` });
		} else if (secondsRemaining >= 10) {
			this.setState({ secondsRemaining: secondsRemaining });
		}
		//keep for future debug
		//console.log('secondsRemaining ' + totalSeconds);
	}

	render() {
		return (
			<div className="timer">
				{this.state.displayOutput ? (
					<div className="timer__output">
						<div className="timer__output-display">{this.state.hoursRemaining}</div>
						<div className="timer__output-display">{this.state.minutesRemaining}</div>
						<div className="timer__output-display">{this.state.secondsRemaining}</div>
						<div className="appBtnContainer">
							<button
								type="reset"
								value="Reset"
								id="reset"
								className="appBtn"
								onClick={() => this.reset()}
							>
								Reset
							</button>
						</div>
					</div>
				) : (
					<form className="timer__form" onSubmit={e => this.handleSubmit(e)}>
						<div>
							<input
								type="number"
								id="inputHours"
								className="timer__form-input"
								name="hours"
								min="0"
								value={this.state.hours}
								required={true}
								onChange={e => this.handleInputHoursChange(e)}
							/>
							<input
								type="number"
								id="inputMinutes"
								className="timer__form-input"
								name="minutes"
								min="0"
								value={this.state.minutes}
								required={true}
								onChange={e => this.handleInputMinutesChange(e)}
							/>
							<input
								type="number"
								id="inputSeconds"
								className="timer__form-input"
								name="seconds"
								min="0"
								value={this.state.seconds}
								required={true}
								onChange={e => this.handleInputSecondsChange(e)}
							/>
						</div>

						<div>
							<label htmlFor="inputHours" className="timer__form-label">
								Hours
							</label>
							<label htmlFor="inputMinutes" className="timer__form-label">
								Minutes
							</label>
							<label htmlFor="inputSeconds" className="timer__form-label">
								Seconds
							</label>
						</div>

						<div className="appBtnContainer">
							<button type="submit" value="Submit" id="submit" className="appBtn">
								Start
							</button>
							<button
								type="reset"
								value="Reset"
								id="reset"
								className="appBtn"
								onClick={() => this.reset()}
							>
								Reset
							</button>
						</div>
					</form>
				)}
			</div>
		);
	}
}

export default Timer;
