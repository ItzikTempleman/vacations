import { Copyrights } from "../../Screens/Copyrights/Copyrights";
import { Header } from "../../Screens/Header/Header";
import { Routing } from "../Routing/Routing";
import "./MainLayout.css";

export function MainLayout() {
    return (
        <div className="MainLayout">
            <header>
                <Header/>
            </header>
            <main>
                <Routing/>
            </main>
            <footer>
                <Copyrights/>
            </footer>
        </div>
    );
}
