import './App.css'
import Body from './Components/Body.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
    // ✅ ADD THIS USEEFFECT HOOK
    React.useEffect(() => {
        // This effect runs only once when the app first loads
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // If a token is found in the URL:
            // 1. Save it to this app's localStorage
            localStorage.setItem('adminAccessToken', token);

            // 2. Clean the URL by removing the token parameter
            // This prevents the token from being bookmarked or shared
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: newUrl }, '', newUrl);

            // Optional: You could show a "Welcome!" toast here
            // toast.success("Admin session started!");
        }
    }, []); // The empty dependency array ensures this runs only once on mount
    return (
        <>
            <Body />
            <Toaster />
        </>
    )

}

export default App
