import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="not-found-main">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link to='/'>
                <button>Go to home page</button>
            </Link>
        </main>
    )
}