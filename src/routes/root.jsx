import { Link, Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
        <nav>
            <h2>
                <a href={`/vite-project813/`}>👋</a>
                <Link to={`App`}>App</Link>
                <Link to={`Clock`}>Clock</Link>
                <Link to={'DelayFetcher'}>DelayFetcher</Link>
                <Link to={'hello'}>Hello</Link>
                <Link to={`ApiFetcher`}>API Fetcher</Link>
                <Link to={`NamePicker`}>Name Picker</Link>
                <Link to={`Names`}>Names</Link>
                <Link to={`SCalculator`}>Calculator</Link>
            </h2>
        </nav>
        <hr/>
        <div>
            <Outlet />
        </div>
        </>
    );
}