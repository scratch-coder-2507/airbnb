import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData, cardsData}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* Header */}
      <Header/>

      {/* Banner */}
      <Banner/>

      <main className="z-30 max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from the server - API Endpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:pt-2 md:pb-2 md:pr-2 rounded-xl shadow-xl">
            {exploreData?.map(({img, location, distance}) => (
              <SmallCard
              key={img}
              img={img}
              location={location}
              distance={distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          {/* Pull some data from the server - API Endpoints */}
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({img, title}) => (
              <MediumCard
              key={img}
              img={img}
              title={title}
              />
            ))}
          </div>
        </section>

        <LargeCard
        img="https://airbnb-pi.vercel.app/_next/image?url=https%3A%2F%2Flinks.papareact.com%2F4cj&w=1920&q=75"
        title="The Greatest Outdoors"
        description="Wishlists curated by Airbnb"
        buttonText="Get Inspired"
        />

        <Footer/>
      </main>

    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/FXAA').then(
    (res) => res.json()
  );

  const cardsData = await fetch('https://jsonkeeper.com/b/7SA5').then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    }
  }
}
