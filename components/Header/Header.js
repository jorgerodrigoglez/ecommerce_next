// TopBar
import TopBar from '../../components/Header/TopBar';
// Menu
import MainMenu from '../../components/Header/Menu';

export default function Header() {
    return (
        <div className="header">
            <TopBar />
            <MainMenu />
        </div>
    )
}
