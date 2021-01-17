// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

export default function App() {
	const [timer, setTimer] = useState("0:0:0");
	const [interv, setInterv] = useState();
	const [startTimer, setStartTimer] = useState(true);
	const [wait, setWait] = useState(false);
	const [stopTime, setStopTime] = useState({ sec: 0, min: 0, hours: 0 });

	const resetTime = {
		sec: 0,
		min: 0,
		hours: 0,
	};

	const streamFunc = (timeArgs = stopTime) => {
		let time = timeArgs;
		return interval(1000).pipe(
			map(() => {
				time.sec++;
				if (time.sec > 60) {
					time.min++;
					time.sec = 0;
				}
				if (time.min > 60) {
					time.hours++;
					time.min = 0;
				}
				setTimer(`${time.hours}:${time.min}:${time.sec}`);
				setStopTime(time);
			})
		);
	};

	const handlerStartStop = () => {
		if (startTimer) {
			if (wait) {
				const subscribe = streamFunc(stopTime).subscribe();
				setInterv(subscribe);
				setWait(false);
			} else {
				const subscribe = streamFunc(resetTime).subscribe();
				setInterv(subscribe);
			}
			setStartTimer(false);
		} else {
			setTimer("0:0:0");
			interv.unsubscribe();
			setStartTimer(true);
		}
	};

	const handlerWait = () => {
		if (!startTimer) {
			setStartTimer(true);
			setWait(true);
			interv.unsubscribe();
		}
	};

	const handlerReset = () => {
		setTimer("0:0:0");
		const startFunc = () => {
			const subscribe = streamFunc(resetTime).subscribe();
			setInterv(subscribe);
		};
		if (startTimer) {
			startFunc();
			setStartTimer(false);
		} else {
			interv.unsubscribe();
			startFunc();
			setStartTimer(false);
		}
	};

	return (
		<div className="App">
			<h1>{timer}</h1>
			{startTimer ? (
				<input
					id="btn"
					type="button"
					value="Start"
					onClick={handlerStartStop}
				/>
			) : (
				<input
					id="btn"
					type="button"
					value="Stop"
					onClick={handlerStartStop}
				/>
			)}

			<input
				type="button"
				value="Wait"
				id="btnStop"
				onDoubleClick={handlerWait}
			/>
			<input
				type="button"
				value="Reset"
				id="btnReset"
				onClick={handlerReset}
			/>
		</div>
	);
}
