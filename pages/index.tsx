import Head from "next/head";

const Home = ({serverData}) => {
    return (
        <>
            <Head>
                <title>{serverData.alias}</title>
            </Head>
            <div className='container mx-auto px-4 py-2'>
                <p className="text-4xl font-bold text-center pt-4">{serverData.content.title}</p>
            </div>
        </>

    );
};

export async function getServerSideProps() {
    const response = await fetch('http://dynamikfabrikken.com.nt26.unoeuro-server.com/');
    const data = await response.json()
    return {
        props: {
            serverData: data
        }
    }
}
export default Home;
