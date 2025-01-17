import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/tax-preparer-form'); // Redirect to the form route
    }, [router]);

    return null; // Render nothing while redirecting
};

export default Home;
