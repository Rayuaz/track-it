import React from "react";
import Day from "./Day";

export default function Calendar({ days, weekdays, trackedItems, updateTrackedItems }) {
    function addTrackedItem(date, trackedItemCounter) {
        let newTrackedItems = trackedItems.filter((item) => item.date !== date);
        trackedItemCounter++;

        updateTrackedItems([...newTrackedItems, { date, trackedItems: trackedItemCounter }]);
    }

    function removeTrackedItem(date, trackedItemCounter) {
        let newTrackedItems = trackedItems.filter((item) => item.date !== date);

        if (trackedItemCounter !== 0) {
            trackedItemCounter--;
        }

        updateTrackedItems([...newTrackedItems, { date, trackedItems: trackedItemCounter }]);
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
                    <Day key={index} day={day} addTrackedItem={addTrackedItem} removeTrackedItem={removeTrackedItem} />
                ))}
            </div>
        </main>
    );
}
