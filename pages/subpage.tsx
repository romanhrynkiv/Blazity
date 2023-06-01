import Breadcrumbs from '../components/Breadcrumbs';
import Image from "next/image";
import Head from "next/head";
import LRUCache from 'lru-cache';

const cache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60,
});

const Subpage = ({ serverData }: any) => {
    const imageLoader = ({ src }: { src: any }) => {
        return 'http://dynamikfabrikken.com.nt26.unoeuro-server.com' + serverData.content.media.url;
    };

    return (
        <div className="">
            <Head>
                <title>{serverData.alias}</title>
            </Head>
            <div className="container mx-auto px-4 py-2">
                <Breadcrumbs breadcrumbs={serverData.navigation.breadcrumb} />
                <div className="flex items-center flex-col justify-center">
                    <h1 className="text-3xl mt-4 text-center">{serverData.content.title}</h1>
                    <div
                        className="mt-4 prose px-5"
                        dangerouslySetInnerHTML={{ __html: serverData.content.htmlString }}
                    ></div>
                    <img
                        className='rounded-md mt-4'
                        // loader={imageLoadereLoaderader}
                        src={
                            'https://hilarious-parfait-8876c0.netlify.app/topimg.jpeg'
                        }
                        width={serverData.content.media.width}
                        alt={serverData.content.media.name}
                        height={serverData.content.media.height}
                    />
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const cacheKey = 'subpage';

    if (cache.has(cacheKey)) {
        return {
            props: {
                serverData: cache.get(cacheKey),
            },
        };
    }

    try {
        const response = await fetch('http://dynamikfabrikken.com.nt26.unoeuro-server.com/subpage/', {
            headers: {
                'Cache-Control': 'max-age=3600',
            },
        });
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


export default Subpage;
