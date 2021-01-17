// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

export default function App() {
	const [timer, setTimer] = useState("0:0:0");
	const [interv, setInterv] = useState();
	const [startTimer, setStartTimer] = useState(true);

	const streamFunc = () => {
		const thisDate = new Date();
		return interval(1000).pipe(
			map(() => {
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
		if (startTimer) {
			const subscribe = streamFunc().subscribe();
			setInterv(subscribe);
			setStartTimer(false);
		} else {
			setTimer("0:0:0");
			interv.unsubscribe();
			setStartTimer(true);
		}
	};

	const handlerWait = () => {};

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
				onClick={handlerWait}
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
