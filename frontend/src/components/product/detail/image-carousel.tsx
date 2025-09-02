import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

interface IProps {
  images: string[];
}

const ImageCarousel: React.FC<IProps> = ({images}) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed:2500,
  };
  return (
    <div className="w-full aspect-square ">
      <Slider className="h-full" {...settings}>
       {
        images.map(images=>(
          <div className="h-full w-full pointer-events-none cursor-pointer">
            <img 
            src={images} 
            alt={'product detail image'} 
            className="h-full w-full object-contain"
            />
          </div>
        ))
       }
      </Slider>
    </div>
  );
};

export default ImageCarousel;
