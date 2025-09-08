import { useSelector } from "react-redux";
import { Copyrights } from "../../Screens/Copyrights/Copyrights";
import { Header } from "../../Screens/Header/Header";
import { Menu } from "../../Screens/Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./MainLayout.css";
import { AppState } from "../../../Redux/Store";



export function MainLayout() {
     const user = useSelector((state: AppState) => state.user);

    return (
       <div className={`MainLayout ${user ? "with-aside" : "no-aside"}`}>
            <header>
                <Header />
            </header>

            {
            user && ( 
                <aside>
                    <Menu />
                </aside>
          )
   }
            <main>
                <Routing />
            </main>
            <footer>
                <Copyrights />
            </footer>
        </div>
    );
}
