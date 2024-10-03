import { Link } from "react-router-dom"
export default function Header() {

    const navItem = [
        {
            name: 'Home',
            slug: '/'
        },
        {
            name: 'Upload',
            slug: '/upload'
        },
        {
            name: 'Play',
            slug: '/play'
        }
    ]
    return (
        <div>
            <ul>
                {navItem.map((item) => <li className="nav" key={item.name}><Link className="nav-link" to={item.slug}>{item.name}</Link></li>)}
            </ul>
        </div>
    )
} 