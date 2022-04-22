import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ARContext } from '../context/ARContext';

const Content = ({ title }) => {
    
    const { activateAR } = useContext(ARContext)

    return ( 
        <div className="container">
            <nav>
                <FontAwesomeIcon icon={faAngleLeft} size='2x' className='btn'/>
                <h1>{title}</h1>
                <div></div>
            </nav>
            <section id="content">
                <div className="content-img"></div>
                <div className="content-text">
                    <p>
                        a very long text. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere cum ipsam ea voluptatibus minus minima recusandae ratione, optio explicabo quidem.
                    </p>
                    <p>
                        second paragraph. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis sint eum rem, tenetur cupiditate optio aperiam voluptate. Quisquam corporis nam dicta sed pariatur.
                    </p>
                </div>
                <button className='AR-btn' onClick={activateAR}>Lihat Rangkaian</button>
            </section>
        </div>
     );
}
 
export default Content;