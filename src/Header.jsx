import { Link } from "react-router-dom";

function Header() {
    return (
    <header className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Productivity Dashboard</h1>
        <nav className="flex justify-center gap-6 mt-4">
            <Link to="/form" className="text-gray-600 hover:text-blue-600 font-medium">Form</Link>
            <Link to="/viewdata" className="text-gray-600 hover:text-blue-600 font-medium">View data</Link>
            <Link to="/list" className="text-gray-600 hover:text-blue-600 font-medium">Tasks</Link>
            <Link to="/pokemon" className="text-gray-600 hover:text-blue-600 font-medium">Pokemon</Link>
        </nav>
    </header>
    );
}

export default Header;