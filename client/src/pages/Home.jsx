import Navbar from '../components/Navbar';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Projects from '../components/Projects';


const Home = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Hero Section" className="mb-16">
          <Hero />
        </section>

        <section aria-label="About Me Section" className="mb-16">
          <About />
        </section>

        <section aria-label="Projects Section" className="mb-16">
          <Projects />
        </section>

        <section aria-label="Contact Section" className="mb-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
