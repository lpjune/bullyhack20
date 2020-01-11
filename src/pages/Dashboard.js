import React from "react";
import { Navbar } from "react-bootstrap";
import NavBar from "../components/Navbar";
import ClassCard from "../components/ClassCard";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <ClassCard />
        </div>
    );
}
