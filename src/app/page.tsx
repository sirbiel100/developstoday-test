import Link from "next/link";
import styles from "./page.module.scss";
import GetIso from "./hooks/getIso";

export default async function Home() {
  const data = await GetIso()
  return (
    <section className={styles.page}>
      {data.map((country: any) => (
        <Link href={`/countryinfo?iso2=${country.Iso2}&iso3=${country.Iso3}`} key={country.name}>
          {country.name}
        </Link>
      ))}
    </section>
  );
}
