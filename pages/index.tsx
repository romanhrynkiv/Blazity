import Head from "next/head";
import Link from "next/link";
import {getServerSideCache} from "../ustils/cache";

const Home = ({serverData}) => {
    return (
        <>
            <Head>
                <title>{serverData.alias}</title>
            </Head>
            <div className='container mx-auto px-4 py-2'>
                <p className="text-4xl font-bold text-center pt-4">{serverData.content.title}</p>
            </div>
            <Link  href={'/subpage'}>TAK</Link>
        </>

    );
};


export async function getServerSideProps() {
    const cache = getServerSideCache();

    const cacheKey = 'Home';

    if (cache.has(cacheKey)) {
        return {
            props: {
                serverData: cache.get(cacheKey),
            },
        };
    }

    try {
        const response = await fetch('http://dynamikfabrikken.com.nt26.unoeuro-server.com/');
        const data = await response.json();

        cache.set(cacheKey, data);

        return {
            props: {
                serverData: data,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                serverData: null,
            },
        };
    }
}

export default Home;
