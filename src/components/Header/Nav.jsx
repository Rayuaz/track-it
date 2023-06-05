import React from 'react'

const Nav = ({dateDisplay, onNext, onBack}) => {
    return (
        <nav>
            <button className="back-btn" onClick={onBack}>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41Z" fill="#000"/></svg>
            </button>

            <span className="current-month">{dateDisplay}</span>

            <button className="next-btn" onClick={onNext}>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z" fill="#000"/></svg>
            </button>
        </nav>
    )
}

export default Nav
