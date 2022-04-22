import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBookBookmark, faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons'

const AppMenu = () => {
    return ( 
        <div className='app-menu'>
            <FontAwesomeIcon icon={faHouse} size='xl' />
            <FontAwesomeIcon icon={faBookBookmark} size='xl' />
            <FontAwesomeIcon icon={faCircleInfo} size='xl' />
            <FontAwesomeIcon icon={faGear} size='xl' />
        </div>
     );
}
 
export default AppMenu;