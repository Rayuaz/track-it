import React, { useContext } from "react";
import useLongPress from "../../hooks/useLongPress";
import { Emoji } from "emoji-picker-react";
import { ConfigContext } from "../../App";

const Day = ({ day, addTrackedItem, removeTrackedItem }) => {
    const configContext = useContext(ConfigContext);

    // Mouse events

    const onLongPress = () => {
        if (day.value !== "padding") {
            removeTrackedItem(day.date, day.trackedItem);
        }
    };

    const onClick = () => {
        if (day.value !== "padding") {
            addTrackedItem(day.date, day.trackedItem);
        }
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 300,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    // Class Names

    const className = `day ${day.value === "padding" ? "padding" : ""} ${day.isCurrentDay ? "currentDay" : ""} ${
        day.trackedItem ? "hasTrackedItem" : ""
    }`;

    const trackedItemClassName = `trackedItemIcon ${day.trackedItem > 0 ? "hasTrackedItem" : ""}`;
    const badgeClassName = `trackedItemBadge ${day.trackedItem > 1 ? "manyTrackedItem" : ""}`;

    return (
        <button className={className} {...longPressEvent}>
            {day.value === "padding" ? "" : day.value}

            <div className={trackedItemClassName}>
                <Emoji unified={configContext.appEmoji} size="100%" />
                <span className={badgeClassName}>{day.trackedItem}</span>
            </div>
        </button>
    );
};

export default Day;
