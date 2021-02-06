import zhLocale from '@/lang/zh-CN'

export function trans(key, locale) {
    if (zhLocale[key]) {
        return zhLocale[key]
    } else if (locale) {
        return locale
    } else {
        return key
    }
}