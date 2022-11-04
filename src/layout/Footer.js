import Card from '../UI/Card'
import Styles from './Footer.module.css'

const Footer = () => {
    return (
        <Card>
            <div className={Styles.footer}>Copyright Webmaster &copy;</div>
        </Card>
    )
}

export default Footer