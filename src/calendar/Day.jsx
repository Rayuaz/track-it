import React from "react";
import useLongPress from "../useLongPress";

const Day = ({ day, addPoop, removePoop }) => {
    // Mouse events

    const onLongPress = () => {
        if (day.value !== "padding") {
            removePoop(day.date, day.poop);
        }
    };

    const onClick = () => {
        if (day.value !== "padding") {
            addPoop(day.date, day.poop);
        }
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    // Class Names

    const className = `day ${day.value === "padding" ? "padding" : ""} ${day.isCurrentDay ? "currentDay" : ""} ${
        day.poop ? "hasPoop" : ""
    }`;

    const poopClassName = `poopIcon ${day.poop > 0 ? "hasPoop" : ""}`;
    const badgeClassName = `poopBadge ${day.poop > 1 ? "manyPoop" : ""}`;

    return (
        <button className={className} {...longPressEvent}>
            {day.value === "padding" ? "" : day.value}

            <div className={poopClassName}>
                <img src="./Poop_Emoji.png" alt="Done" />
                <span className={badgeClassName}>{day.poop}</span>
            </div>
        </button>
    );
};

export default Day;
