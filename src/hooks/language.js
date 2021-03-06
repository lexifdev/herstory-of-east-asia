import React, { useContext } from 'react'
import style from './LanguageSelect.module.styl';


const LANGUAGES = [
    'English',
    'Traditional Chinese',
    'Simplified Chinese',
    'Japanese',
    'Korean',
]

const LANGUAGE_CODES = {
    'English': 'en_us',
    'Traditional Chinese': 'zh_tw',
    'Simplified Chinese': 'zh_cn',
    'Korean': 'ko_kr',
    'Japanese': 'ja_jp',
}

const LanguageContext = React.createContext({})

const LanguageProvider = ({ children, tagDict }) => {
    const [code, setCode] = React.useState(LANGUAGE_CODES[LANGUAGES[0]])

    const getI18n = (obj, key) => {
        const attr = (key, code) => key ? `${key}_${code}` : code

        if (obj[attr(key, code)]) {
            return obj[attr(key, code)]
        }

        for (const lang of LANGUAGES) {
            const code = LANGUAGE_CODES[lang]
            if (obj[attr(key, code)]) {
                return obj[attr(key, code)]
            }
        }
    }

    const getI18nTag = tag => tagDict[code][tag] || tag

    return (
        <LanguageContext.Provider value={{ code, setCode, getI18n, getI18nTag }}>
            {children}
        </LanguageContext.Provider>
    )
}


const LanguageSelect = () => {
    const { code, setCode } = useContext(LanguageContext)

    return (
        <div className={style.language}>
            <select value={code} onChange={event => { setCode(event.target.value) }}>
                {LANGUAGES.map(language => (
                    <option key={`lang-${LANGUAGE_CODES[language]}`} value={LANGUAGE_CODES[language]}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    )
}


const useLanguageContext = () => React.useContext(LanguageContext)


export {
    LanguageSelect,
    LanguageProvider,
    useLanguageContext,
}
