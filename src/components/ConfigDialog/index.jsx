import React, { useState, useContext, useEffect } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { ConfigContext } from "../../../App";

const ConfigDialog = () => {
    const configContext = useContext(ConfigContext);
    const [title, setTitle] = useState(configContext.appTitle);
    const [selectedEmoji, setSelectedEmoji] = useState(configContext.appEmoji);
    const [isEmojiPanelOpen, setEmojiPanelOpen] = useState(false);

    function changeTitle(e) {
        e.preventDefault();

        setTitle(e.target.value);
    }

    function changeEmoji(newEmoji) {
        setSelectedEmoji(newEmoji.unified);
        setEmojiPanelOpen(false);
    }

    function toggleEmojiPanel() {
        setEmojiPanelOpen(!isEmojiPanelOpen);
    }

    function submit() {
        setEmojiPanelOpen(false);
        document.querySelector("#config").close("dismiss");

        configContext.setAppTitle(title);
        configContext.setAppEmoji(selectedEmoji);

        localStorage.setItem("title", title);
        localStorage.setItem("emoji", selectedEmoji);
    }

    function closeDialog(e) {
        if (e.target.nodeName === "DIALOG") {
            e.target.close("dismiss");
        }
    }

    function closeEmojiPanel(e) {
        if (e.target.id == "emojiPickerPanel") {
            setEmojiPanelOpen(false);
        }
    }

    return (
        <dialog id="config" onClick={(e) => closeDialog(e)}>
            <label className="title" htmlFor="title">
                What do you want to track?
            </label>

            <div className="input-wrapper">
                <button id="emojiPickerButton" onClick={toggleEmojiPanel}>
                    {selectedEmoji ? <Emoji unified={selectedEmoji} /> : null}
                </button>
                <input
                    type="text"
                    name="title"
                    className="text-input"
                    id="title"
                    value={title}
                    placeholder="Ex: gym, pills, studying..."
                    onChange={changeTitle}
                />
            </div>

            <button id="save" onClick={submit}>
                Save
            </button>

            <div id="emojiPickerPanel" className={isEmojiPanelOpen ? "open" : ""} onClick={(e) => closeEmojiPanel(e)}>
                <EmojiPicker width="100%" onEmojiClick={changeEmoji} />
            </div>
        </dialog>
    );
};

export default ConfigDialog;
