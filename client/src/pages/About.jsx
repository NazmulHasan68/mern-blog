
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import about from '../assets/about.jpg'
import client1 from '../assets/client1.jpg'
import client2 from '../assets/client2.jpg'
import client3 from '../assets/client3.jpg'

const About = () => {
  // Slider settings for testimonials
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="about-page bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200  mx-auto">
      
      {/* 1. Middle Section with Background Image */}
      <section 
        className="middle-section bg-cover bg-center text-center py-24 md:py-48"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${about})`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white"><span className='text-green-500'>Welcome</span> <br></br>to Our Bike World</h1>
        <p className="text-lg md:text-xl text-gray-300">Discover the thrill and freedom of biking, shared through our passionate journey.</p>
      </section>

      {/* 2. Testimonial Section with Client Image */}
      <section className="testimonial-section py-32 md:py-42 bg-gray-200 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <Slider {...settings} className="testimonial-slider max-w-2xl mx-auto">
          <div className="testimonial p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <img src={client1} alt="Client 1" className="w-16 h-16 rounded-full mx-auto mb-4"/>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              "This blog is a goldmine for bikers! Their detailed insights have made me a better rider."
            </p>
            <h4 className="text-lg font-semibold mt-4">- Alex G.</h4>
          </div>
          <div className="testimonial p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <img src={client3} alt="Client 2" className="w-16 h-16 rounded-full mx-auto mb-4"/>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              "I love their reviews. They helped me choose the perfect bike for my long-distance tours."
            </p>
            <h4 className="text-lg font-semibold mt-4">- Maria L.</h4>
          </div>
          <div className="testimonial p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <img src={client2} alt="Client 3" className="w-16 h-16 rounded-full mx-auto mb-4"/>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              "The best blog for bike enthusiasts! Their passion is contagious, and their tips are spot on."
            </p>
            <h4 className="text-lg font-semibold mt-4">- John D.</h4>
          </div>
        </Slider>
      </section>

      {/* 3. Thanks Section */}
      <section className="thanks-section bg-gray-400 dark:bg-gray-300 text-white text-center py-32">
        <h2 className="text-3xl font-bold mb-4">Thank You for Riding with Us!</h2>
        <p className="text-xs md:text-sm sm::w-[50%] w-[80%] mx-auto">
          Your support keeps us rolling. Keep exploring, keep riding, and we look forward to sharing more with you!
        </p>
      </section>
    </div>
  );
};

export default About;
