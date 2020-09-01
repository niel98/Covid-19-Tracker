import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const getData = async (country) => {
    let changeableUrl = url

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl)

        return { confirmed, recovered, deaths, lastUpdate }
    } catch (err) {
        console.error(err.message)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifiedData = data.map(dailydata => ({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate
        }))

        return modifiedData
    } catch (err) {
        console.error(err.message)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map(country => country.name)
    } catch (err) {
        console.error(err.message)
    }
}