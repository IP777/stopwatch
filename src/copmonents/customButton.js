import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import { buffer, debounceTime, filter } from "rxjs/operators";

export default function CustomButton({ click, value, trottleTime }) {
	useEffect(() => {
		const btnStop = document.querySelector("#btnStop");
		const clicks$ = fromEvent(btnStop, "click");
		const doubleClick$ = clicks$.pipe(
			buffer(clicks$.pipe(debounceTime(trottleTime))),
			filter((clickArray) => clickArray.length > 1)
		);
		const sub = doubleClick$.subscribe(click);

		return () => sub.unsubscribe();
	}, [click, value, trottleTime]);

	return <input type="button" value={value} id="btnStop" />;
}
