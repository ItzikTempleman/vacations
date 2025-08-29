import { Copyrights } from "../../Screens/Copyrights/Copyrights";
import { Header } from "../../Screens/Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./MainLayout.css";


export function MainLayout() {
    return (
        <div className="MainLayout">
            <header>
                <Header/>
            </header>
            <aside>
                <Menu/>
            </aside>
            <main>
                <Routing/>
            </main>
            <footer>
                <Copyrights/>
            </footer>
        </div>
    );
}
