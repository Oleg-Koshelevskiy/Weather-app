import {createContext} from 'react'

const LanguageContext = createContext({
    language: 'ukr',
    languageHandler: () => {},

})

export const LanguageContextProvider = (props) => {
    return <LanguageContext.Provider>{props.children}</LanguageContext.Provider>
}

export default LanguageContext
