import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel 스타일을 적용하기 위한 CSS 파일
import './mainPage.css';
const MainPage: React.FC = () => {
  return (
    <>
      <Carousel autoPlay infiniteLoop interval={5000}>
        <div>
          <img src="/images/main/AHS2000.png" alt="image1" />
        </div>
        <div>
          <img src="/images/main/kor22.png" alt="image2" />
        </div>
        <div>
          <img src="/images/main/LP2000.png" alt="image3" />
        </div>
        <div>
          <img src="/images/main/OYF2000.png" alt="image4" />
        </div>
        <div>
          <img src="/images/main/PP2000.png" alt="image5" />
        </div>
      </Carousel>
    </>
  );
};

export default MainPage;
