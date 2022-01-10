import React from 'react';
import Nav from './Nav';

const Header = ({dateDisplay, onNext, onBack}) => {
    return (
        <>
            <header>
                <img src="./Poop_Emoji.png"/>
                <h1>Caguei?</h1>
            </header>

            <Nav 
                dateDisplay={dateDisplay}
                onNext={onNext}
                onBack={onBack}
            />
        </>
    )
}

export default Header
