import React from "react";
import Nav from "./Nav";
import { Emoji } from "emoji-picker-react";

const Header = ({ dateDisplay, onNext, onBack, openConfig, appTitle, appEmoji }) => {
    return (
        <>
            <header onClick={openConfig}>
                <Emoji unified={appEmoji} size={64} />

                <h1>{appTitle || "Track it"}</h1>
            </header>

            <Nav dateDisplay={dateDisplay} onNext={onNext} onBack={onBack} />
        </>
    );
};

export default Header;
