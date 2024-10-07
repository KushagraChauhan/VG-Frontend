import React, {useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Pagination, Autoplay } from 'swiper/modules'; 
import './css/UserTestimonial.css'; 
import './css/ScrollAnimation.css';

const UserTestimonials = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-element');
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
          element.classList.add('scroll-in-view');
        } else {
          element.classList.remove('scroll-in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className='testimonial-section py-6 bg-light-primary'>
      <div className="col-md-12">
      <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>User Testimonials</h3>
        <div className="row">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 9000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]} 
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="testimonial">
                  <div className="pic">
                    <img
                      src="https://vibegurukul.s3.ap-south-1.amazonaws.com/testimonials/varun-jamwaal.jpg"
                      alt="Varun Jamwaal"
                    />
                  </div>
                  <div className="testimonial-content">
                    <p>The COURSES are highly knowledgeable, guiding us with patience and passion, making even complex concepts easy to grasp. The course structure is well-organized, offering flexibility in learning, which is perfect for those with busy schedules.</p>
                  </div>
                  <h3 className="testimonial-title">
                    <h3>Varun Jamwaal</h3>
                    <br></br>
                    <small>Govt. Pleader, High Court</small>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial">
                  <div className="pic">
                    <img
                      src="https://vibegurukul.s3.ap-south-1.amazonaws.com/testimonials/finding-temples.jpg"
                      alt="Finding Temples"
                    />
                  </div>
                  <div className="testimonial-content">
                    <p>I highly recommend the Gurukul online courses offered by Vibe Gurukul to anyone looking for a meaningful and transformative educational experience. These courses provide a wonderful opportunity to stay connected to our cultural roots while embracing a modern approach to learning and personal growth!</p>
                  </div>
                  <h3 className="testimonial-title">
                    <h3>Ankur Agarwal</h3>
                    <br></br>
                    <small>Finding Temples</small>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial">
                  <div className="pic">
                    <img
                      src="https://vibegurukul.s3.ap-south-1.amazonaws.com/testimonials/ishaan+sharma.jpeg"
                      alt="Ishaan Sharma"
                    />
                  </div>
                  <div className="testimonial-content">
                    <p>I strongly suggest trying the Gurukul online courses by Vibe Gurukul if you’re looking for a valuable and life-changing learning experience. These courses offer a great chance to stay connected to our cultural heritage while also adopting a modern way of learning and growing personally!</p>
                  </div>
                  <h3 className="testimonial-title">
                    <h3>Ishaan Sharma</h3>
                    <br></br>
                    <small>Indian Civil Servant </small>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial">
                  <div className="pic">
                    <img
                      src="https://vibegurukul.s3.ap-south-1.amazonaws.com/testimonials/sunita+singh.jpeg"
                      alt="Sunita Singh"
                    />
                  </div>
                  <div className="testimonial-content">
                    <p>The courses in this Gurukul are a treasure trove of ancient wisdom. With every lesson, I feel more connected to the timeless teachings of our scriptures. Highly recommend for anyone seeking deeper knowledge.</p>
                  </div>
                  <h3 className="testimonial-title">
                    <h3>Sunita Singh</h3>
                    <br></br>
                    <small>Woman Entrepreneur & journalist</small>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial">
                  <div className="pic">
                    <img
                      src="https://vibegurukul.s3.ap-south-1.amazonaws.com/testimonials/srikant+pratyush.jpeg"
                      alt="Srikant Pratyush"
                    />
                  </div>
                  <div className="testimonial-content">
                    <p>ये कोर्स बहुत ही ज्ञानपूर्ण हैं, जो हमें पूरे धैर्य और उत्साह के साथ सिखाते हैं, जिससे कठिन चीजें भी आसानी से समझ में आ जाती हैं। कोर्स का ढांचा भी बहुत व्यवस्थित है, जिससे हमें अपनी सुविधा के अनुसार पढ़ने का मौका मिलता है, जो व्यस्त लोगों के लिए बहुत बढ़िया है। मुझे खासकर ये अच्छा लगता है कि ये प्लेटफॉर्म सिर्फ पढ़ाई ही नहीं, बल्कि हमारे चरित्र और आध्यात्मिक विकास पर भी ध्यान देता है।
                    </p>
                  </div>
                  <h3 className="testimonial-title">
                    <h3>Srikant Pratyush</h3>
                    <br></br>
                    <small>Senior journalist, Founder - City Post </small>
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
