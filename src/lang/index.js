import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import ch from './ch'

export default (() => {
    return createI18n({
        locale: window.localStorage.getItem('lang') || 'en',
        messages: {
            en,
            zh,
            ch
        }
    })
})()