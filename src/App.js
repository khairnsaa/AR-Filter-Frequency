import './App.css';
import LowPassFilter from './pages/LowPassFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { ARContextProvider } from './context/ARContext';

function App() {
    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.openBtn').classList.toggle('btn-opened-menu')
    }

    return (
        <div id='app' className="App">
            <ARContextProvider>
                <FontAwesomeIcon icon={faXmark} size='2x' className='btn close-btn' />
                <LowPassFilter />
                <div className="model-menu">
                    <button className="openBtn btn" onClick={openMenu}><FontAwesomeIcon icon={faBars} size='xl' className='btn'/></button> 
                    <div className="model-nav hidden">
                        <span>Rangkaian 1</span>
                        <span>Rangkaian 2</span>
                        <span>Rangkaian 3</span>
                        <span>Rangkaian 4</span>
                        <span>Rangkaian 5</span>
                        <span>Rangkaian 6</span>
                    </div>
                </div>
            </ARContextProvider>
        </div>
    );
}

export default App;
