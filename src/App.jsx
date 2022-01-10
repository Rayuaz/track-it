import React, {useState, useEffect} from 'react';
import Calendar from './calendar';
import Header from './header';

export default function App() {

    const [nav, setNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [poops, setPoops] = useState(
        localStorage.getItem('poops') ? JSON.parse(localStorage.getItem('poops')) : []
    );
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const poopsOnDate = date => poops.find(e => e.date === date) ? poops.find(e => e.date === date).poops : 0;

    useEffect(() => {
        localStorage.setItem('poops', JSON.stringify(poops));
    }, [poops]);

    useEffect(() => {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();        

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);

        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    poop: poopsOnDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString,
                });
                
                console.log(poopsOnDate(dayString))
            } else {
                daysArr.push({
                    value: 'padding',
                    poop: null,
                    isCurrentDay: false,
                    date: '',
                });
            }
        }

        setDays(daysArr);

    }, [poops, nav]);

    return (<>
        <Header
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav+1)}
            onBack={() => setNav(nav-1)}
        />
        <Calendar 
            days={days} 
            weekdays={weekdays}
            poops={poops}
            updatePoops={setPoops}
        />
    </>);
};