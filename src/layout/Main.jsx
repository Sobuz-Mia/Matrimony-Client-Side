import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            This is a main layout
            <Outlet/>
        </div>
    );
};

export default Main;