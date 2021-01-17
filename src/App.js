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
	const [stopTime, setStopTime] = useState();

	const streamFunc = (thisDate = new Date()) => {
		return interval(1000).pipe(
			map((e) => {
				const newDate = new Date() - thisDate;
				const sec = Math.abs(Math.floor(newDate / 1000) % 60); //sek
				const min = Math.abs(Math.floor(newDate / 1000 / 60) % 60); //min
				const hours = Math.abs(
					Math.floor(newDate / 1000 / 60 / 60) % 24
				); //hours
				setTimer(`${hours}:${min}:${sec}`);
			})
		);
	};

	const handlerStartStop = () => {
		console.log(wait);
		if (startTimer) {
			if (wait) {
				const subscribe = streamFunc(stopTime).subscribe();
				setInterv(subscribe);
				setWait(false);
			} else {
				const subscribe = streamFunc().subscribe();
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
			setStopTime(new Date());
			interv.unsubscribe();
		}
	};

	const handlerReset = () => {
		setTimer("0:0:0");
		const startFunc = () => {
			const subscribe = streamFunc().subscribe();
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
