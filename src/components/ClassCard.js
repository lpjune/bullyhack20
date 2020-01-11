import React from "react";
import { Card } from "react-bootstrap";

export default function ClassCard(props) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Img
                    variant="top"
                    src="https://dummyimage.com/600x400/000/fff.jpg"
                ></Card.Img>
                <Card.Title>{props.className || "Class Name"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.dept || "Dept"} {props.code || "Code"}{" "}
                    {props.section || "Section"}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.teacherName || "Teacher Name"}
                </Card.Subtitle>
                <Card.Link href="#">Class Details</Card.Link>
                <Card.Link href="#">Add Class</Card.Link>
            </Card.Body>
        </Card>
    );
}
