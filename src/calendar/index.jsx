import React from 'react';
import Day from './Day';

export default function Calendar({days, weekdays, poops, updatePoops}) {

    function addPoop(date, poopCounter) {

        let newPoops = poops.filter(item => item.date != date);
        poopCounter++

        updatePoops([...newPoops, {date, poops: poopCounter}]);
    }
    
    return (
        <main className="calendar">
            <ul className="weekdays">
                { weekdays.map(weekday => <li key={weekday}>{weekday.substring(0, weekday.length - 1)}</li>) }
            </ul>

            <div className="days">
                {days.map((d, index) => (
                    <Day 
                        key={index}
                        day={d}
                        onClick={() => {
                            if (d.value !== 'padding') {
                                addPoop(d.date, d.poop)
                            }
                        }}
                    />
                ))}
            </div>
        </main>
    );
}
