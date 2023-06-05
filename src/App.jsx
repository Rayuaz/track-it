import React, { useState, useEffect, createContext } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import ConfigDialog from "./components/ConfigDialog";

export const ConfigContext = createContext();

export default function App() {
    const [activeMonth, setActiveMonth] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState("");
    const [trackedItems, setTrackedItems] = useState(
        localStorage.getItem("trackedItems") ? JSON.parse(localStorage.getItem("trackedItems")) : []
    );
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [appEmoji, setAppEmoji] = useState(localStorage.getItem("emoji") || "1f3af");
    const [appTitle, setAppTitle] = useState(localStorage.getItem("title") || "");
    const [hasConfig, setHasConfig] = useState(localStorage.getItem("hasConfig") || false);

    const trackedItemsOnDate = (date) =>
        trackedItems.find((e) => e.date === date) ? trackedItems.find((e) => e.date === date).trackedItems : 0;

    useEffect(() => {
        if (!hasConfig) {
            openConfig();
            setHasConfig("true");
            localStorage.setItem("hasConfig", "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("trackedItems", JSON.stringify(trackedItems));
    }, [trackedItems]);

    useEffect(() => {
        const date = new Date();

        if (activeMonth !== 0) {
            date.setMonth(new Date().getMonth() + activeMonth);
        }

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });

        setDateDisplay(`${date.toLocaleDateString("en-us", { month: "long" })} ${year}`);

        const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

        const daysArr = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    trackedItem: trackedItemsOnDate(dayString),
                    isCurrentDay: i - paddingDays === day && activeMonth === 0,
                    date: dayString,
                });
            } else {
                daysArr.push({
                    value: "padding",
                    trackedItem: null,
                    isCurrentDay: false,
                    date: "",
                });
            }
        }

        setDays(daysArr);
    }, [trackedItems, activeMonth]);

    function openConfig() {
        document.querySelector("#config").showModal();
    }

    return (
        <ConfigContext.Provider value={{ appEmoji, appTitle, setAppEmoji, setAppTitle }}>
            <Header
                openConfig={openConfig}
                dateDisplay={dateDisplay}
                onNext={() => setActiveMonth(activeMonth + 1)}
                onBack={() => setActiveMonth(activeMonth - 1)}
                appTitle={appTitle}
                appEmoji={appEmoji}
            />
            <Calendar
                days={days}
                weekdays={weekdays}
                trackedItems={trackedItems}
                updateTrackedItems={setTrackedItems}
            />
            <div className="instructions">
                <p>How to use:</p>
                <ul>
                    <li>Tap to add</li>
                    <li>Tap and hold to subtract</li>
                </ul>
            </div>
            <ConfigDialog />
        </ConfigContext.Provider>
    );
}
