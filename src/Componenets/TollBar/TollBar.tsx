import {NavLink} from "react-router-dom";

const TollBar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <NavLink className="navbar-brand text-black fw-bold" to="/">Quotes Central</NavLink>
                    <div>
                        <NavLink className="text-decoration-none text-black me-4 p-4 border border-dark border border-top-0 border border-bottom-0 border border-start-0" to="/">Quotes</NavLink>
                        <NavLink  className="text-decoration-none text-black" to="/new-quote">Submit new quote</NavLink>
                    </div>
                </div>
            </nav>
            <hr/>
        </div>
    );
};

export default TollBar;