export default async function GetIso() {
    const countryList = fetch("https://countriesnow.space/api/v0.1/countries/iso").then((response) => response.json())
    const data = await countryList.then((data) => data.data)

    return data
}