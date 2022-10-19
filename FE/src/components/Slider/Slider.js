import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from 'styled-components'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { NavLink } from "react-router-dom";

  

  const Container = styled.div`
  .mySwiper {
    width: 100%;
    height: 100%;
    
  } 
  .swiper-slider {
 
    text-align: center;
    font-size: 18px;
    background: transparent;
    border-radius: 10px; 
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    
  }
 
  `
  const SilderImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-radius: 10px;
  `


export default function App() {
  return (
    <Container>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slider">
          <NavLink to={'/slider'}>
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/a/4/a/3/a4a3a47822a3717b7c6caa2b5fe14673.jpg" />
          </NavLink>

            </SwiperSlide>
        <SwiperSlide className="swiper-slider">
            <NavLink to={'/sliderBar'}>
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/2/5/f/f/25ff09320e00b735a2ef29ff44cc6e1c.jpg" />
            </NavLink>
            </SwiperSlide>
        <SwiperSlide className="swiper-slider">
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/2/8/1/6/2816f852668828ba4b889ba3cd1cb390.jpg" />
            </SwiperSlide>
        <SwiperSlide className="swiper-slider">
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/4/1/5/1/4151f31b70c9231c2a03d582638855af.jpg" />
            </SwiperSlide>
        <SwiperSlide className="swiper-slider">
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/2/9/b/6/29b6309a9726b7453b5e18dcef6e99bb.jpg" />
            </SwiperSlide>
        <SwiperSlide className="swiper-slider">
            <SilderImage src="https://photo-zmp3.zmdcdn.me/banner/a/4/a/3/a4a3a47822a3717b7c6caa2b5fe14673.jpg" />
            </SwiperSlide>
      </Swiper>
    </Container>
  );
}
