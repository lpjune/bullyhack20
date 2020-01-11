import React from "react";
import ClassCard from "./ClassCard";

export default function ClassCardList(cards) {
    const cardsArray = cards.map(cards => (
        <ClassCard
            className={cards.className}
            dept={cards.dept}
            code={cards.code}
            section={cards.section}
            teacherName={cards.teacherName}
        />
    ));

    return <div>{cardsArray}</div>;
}

ClassCardList.propTypes = {
    cards: React.PropTypes.array.isRequired
};
