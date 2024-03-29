interface localeJson {
    [key: string]: string | localeJson;
}

function addNestedValues(obj: localeJson, key: string, value: string) {
    if (key.includes('.')) {
        const [parentKey, childKey] = key.split('.')

        if (!Object.keys(obj).includes(parentKey))
            obj[parentKey] = {} as localeJson

        (obj[parentKey] as localeJson)[childKey] = value

    } else obj[key] = value
}

function tsvToJson(tsv: string): localeJson {
    const en: localeJson = {}
    const ru: localeJson = {}

    for (let line of tsv.split('\r\n').slice(1)) {
        const [key, enValue, ruValue] = line.split('\t')

        addNestedValues(en, key, enValue)
        addNestedValues(ru, key, ruValue)
    }

    return { en, ru }
}

function localesFromGSheet(): Promise<localeJson> {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvdaFvqr6gxdixvsKGtL6B7YbKxTeEuV3h2P-9xelyw8Q0uorxO_Shqos8IDT-FOZ616LmRnhtCEju/pub?gid=0&single=true&output=tsv'

    return fetch(sheetUrl)
        .then(response => response.text())
        .then(text => tsvToJson(text))

}

export default localesFromGSheet()
