import { Children } from "react";

export const Button = ({onClick, children}) => {
    return <button onClick={(e) => {
        e.preventDefault();
        onClick();
    }}
    >{children}</button>
}