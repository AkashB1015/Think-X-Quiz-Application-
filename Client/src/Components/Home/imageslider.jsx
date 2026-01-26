import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide1 from "../../assets/Slider/slide1.png";
import Slide2 from "../../assets/Slider/slide2.png";
import Slide3 from "../../assets/Slider/slide3.png";

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  function ImageStyle({ text, src }) {
    const style = {

      height: "400px",
      background: src
        ? `url(${src}) center/cover no-repeat`
        : "linear-gradient(90deg, rgba(113, 204, 240, 1) 0%, rgba(240, 252, 247, 0.72) 0%, rgba(0, 0, 0, 1) 100%)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      userSelect: "none",
      textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
      borderRadius: "5px",
      width: "100%",
      maxwidth: "400px",

    };

    return <div style={style}>{text}</div>;
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>

      <Carousel.Item>

        <ImageStyle src={Slide1} />

      </Carousel.Item>

      <Carousel.Item>

        <ImageStyle src={Slide2} />

      </Carousel.Item>

      <Carousel.Item>

        <ImageStyle src={Slide3} />

      </Carousel.Item>
    </Carousel>
    
  );
}
