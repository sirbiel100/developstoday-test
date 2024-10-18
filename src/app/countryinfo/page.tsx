"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BarChart } from '@mui/x-charts/BarChart';
import style from './countryinfo.module.scss'
interface CountryNameAndFlag {
    data: any
    name: string;
    flag: string;
}

interface Border {
    name: string;
    code: string;
}

interface Population {
    count: number;
}

export default function CountryPage() {
    const countryAPI = process.env.NEXT_PUBLIC_COUNTRY_NAME_AND_FLAG
    const borderAPI = process.env.NEXT_PUBLIC_COUNTRY_BORDER
    const populationAPI =  process.env.NEXT_PUBLIC_COUNTRY_POPULATION
    const searchParams = useSearchParams()
    const iso2 = searchParams.get('iso2')
    const iso3 = searchParams.get('iso3')
    const [countryNameAndFlag, setCountryNameAndFlag] = useState<CountryNameAndFlag | null>(null)
    const [bordersOfCountry, setBordersOfCountry] = useState<Border[] | null>(null)
    const [countryPopulation, setCountryPopulation] = useState<Population | null>(null)
    const [countryError, setCountryError] = useState<boolean>()
    const [borderError, setBorderError] = useState<boolean>()



    useEffect(() => {
        const fetchCountryNameAndFlag = async () => {
            try {
                const data = await fetch(`${countryAPI}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        iso2: iso2,
                    })
                })
                if (data.ok) {
                    const response = await data.json()
                    setCountryNameAndFlag(response.data)
                    setCountryError(false)
                } else {
                    console.error('Promise resolved but HTTP status failed')
                    setCountryError(true)
                }

            }

            catch {
                console.error('Promise rejected');
                setCountryError(true)
            }
        }
        fetchCountryNameAndFlag()
    }, [iso2])

    useEffect(() => {
        const fetchBordersOfCountry = async () => {
            try {
                const data = await fetch(`${borderAPI}/${iso2}`)
                if (data.ok) {
                    const response = await data.json()
                    setBordersOfCountry(response.borders)
                    setBorderError(false)
                } else {
                    console.error('Promise resolved but HTTP status failed')
                    setBorderError(true)
                }
            }
            catch {
                console.error('Promise rejected');
                setBorderError(true)
            }
        }

        fetchBordersOfCountry()
    }, [iso2])

    useEffect(() => {
        const fetchCountryPopulation = async () => {
            try {
                const response = await fetch(`${populationAPI}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        iso3: iso3,
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    setCountryPopulation(data.data.populationCounts)
                } else {
                    console.error('Promise resolved but HTTP status failed')
                }
            }
            catch {
                console.error('Promise rejected');
            }
        }
        fetchCountryPopulation()
    }, [iso3])

    if (countryError || borderError) return <div>Something went wrong</div>
    if (!countryNameAndFlag || !bordersOfCountry) return <div>Loading...</div>

    const seriesData = Array.isArray(countryPopulation)
        ? countryPopulation.map((item: any) => item.value)
        : [];

    const xAxisData = Array.isArray(countryPopulation)
        ? countryPopulation.map((item: any) => item.year)
        : [];




    return (
        <section className={style.infoPage}>
            <div>
                <h2>{countryNameAndFlag?.name}</h2>
                <Image
                    src={countryNameAndFlag?.flag}
                    alt={countryNameAndFlag?.data?.name || "Country Flag"}
                    width={100}
                    height={100}
                />

            </div>
            <ul>
                <h3>Borders:</h3>
                {bordersOfCountry?.map((border: any) => (
                    <Link href={`/countryinfo?iso2=${border.countryCode}`}>
                        <li key={border.countryCode}>
                            {border.commonName}
                        </li>
                    </Link>
                ))}
            </ul>

            <BarChart
                xAxis={[{ scaleType: 'band', data: xAxisData, dataKey: 'year' }]}
                series={[{ data: seriesData }]}
                width={500}
                height={300}
            />

        </section>
    );
}