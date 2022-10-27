import { useContext } from 'react'
import styles from './Header.module.css'
import LanguageContext from '../store/language-context'

const Header = () => {

    const ctx = useContext(LanguageContext)

    return (
    <div className={styles.header}>
        <h1 >Погода & карта</h1>
        <button className={styles.button}>УКР</button>
    </div>
    )
}

export default Header