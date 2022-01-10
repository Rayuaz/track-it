import React from 'react'

const Day = ({ day, onClick }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''} ${day.poop ? 'hasPoop' : ''}`;

    const poopClassName = `poopIcon ${day.poop > 0 ? 'hasPoop' : ''}`
    const badgeClassName = `poopBadge ${day.poop > 1 ? 'manyPoop' : ''}`

    return (
        <button className={className} onClick={onClick}>
            {day.value === 'padding' ? '' : day.value}

            <div className={poopClassName}>
                <img src="./Poop_Emoji.png"/>
                <span className={badgeClassName}>{day.poop}</span>
            </div>
        </button>
    )
}

export default Day
