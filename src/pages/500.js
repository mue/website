import Head from '../components/Head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Link from 'next/link';

export default function Error() {
  return (
    <>
      <Head title="500" />
      <main>
        <Navbar />
        <header className="full">
          <div className="promotion">
            <span>500</span>
            <br />
            <span className="two">AN ERROR OCCURRED</span>
            <br />
            <Link href="/">
              <a>
                <button className="filled umami--click--error-home">Go back to the homepage</button>
              </a>
            </Link>
          </div>
        </header>
        <div style={{ marginTop: '100vh' }} className="content" />
        <Footer />
      </main>
    </>
  );
}
