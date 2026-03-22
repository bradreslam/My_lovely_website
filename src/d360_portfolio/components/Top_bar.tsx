import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

const TopBar:React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = (pageName:string) => {
        navigate(pageName);
    }

    return (
        <div className="top_bar">
            <button onClick={() => redirect("/personal_expedition")} hidden={location.pathname == "/personal_expedition"}>Persoonlijke expeditie</button>
            <button onClick={() => redirect("/")} hidden={location.pathname == "/"}>Hoofd pagina</button>
        </div>)
}

export default TopBar;