export default async function GetIso() {
    const isoAPI = process.env.NEXT_PUBLIC_COUNTRY_ISO_CODE
    const countryList = fetch(`${isoAPI}`).then((response) => response.json())
    const data = await countryList.then((data) => data.data)

    return data
}