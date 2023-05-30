import Link from 'next/link';

interface MenuProps {
    breadcrumbs: {
        name: string;
        url: string;
    }[]
}
const Breadcrumbs = ({breadcrumbs}: MenuProps) => {
    return (
        <nav className="py-2">
            <ul className="flex space-x-4">
                {
                    breadcrumbs.map((breadcrumb, index)=>(
                        <li key={index}>
                            <Link href={breadcrumb.url} className="text-blue-500 hover:underline">
                                {breadcrumb.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
