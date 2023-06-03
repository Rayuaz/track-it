import React from "react";
import Day from "./Day";

export default function Calendar({ days, weekdays, poops, updatePoops }) {
    function addPoop(date, poopCounter) {
        let newPoops = poops.filter((item) => item.date !== date);
        poopCounter++;

        updatePoops([...newPoops, { date, poops: poopCounter }]);
    }

    function removePoop(date, poopCounter) {
        let newPoops = poops.filter((item) => item.date !== date);

        if (poopCounter !== 0) {
            poopCounter--;
        }

        updatePoops([...newPoops, { date, poops: poopCounter }]);
    }

    return (
        <main className="calendar">
            <ul className="weekdays">
                {weekdays.map((weekday) => (
                    <li key={weekday}>{weekday.substring(0, weekday.length - 1)}</li>
                ))}
            </ul>

            <div className="days">
                {days.map((day, index) => (
                    <Day key={index} day={day} addPoop={addPoop} removePoop={removePoop} />
                ))}
            </div>
        </main>
    );
}
