import React from "react";
import { Button } from "../atoms/Button";

export const Header = () => {
    return(
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl">My App</h1>
            <Button>Click me</Button>
        </header> 
    )
}