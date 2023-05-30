import Breadcrumbs from '../components/Breadcrumbs';
import Image from "next/image";
import Head from "next/head";

const Subpage = ({serverData}) => {
    const imageLoader = ({src}) => {
         return 'http://dynamikfabrikken.com.nt26.unoeuro-server.com' + serverData.content.media.url
    }
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

                <Image
                    className='rounded-md mt-4 '
                    loader={imageLoader}
                    src={
                        'http://dynamikfabrikken.com.nt26.unoeuro-server.com' +
                        serverData.content.media.url
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
    const response = await fetch('http://dynamikfabrikken.com.nt26.unoeuro-server.com/subpage/');
    const data = await response.json()
    return {
        props: {
            serverData: data
        }
    }
}

export default Subpage;
