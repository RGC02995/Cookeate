import { useEffect, useRef, useState } from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { VscChevronRight } from "react-icons/vsc";
import { VscChevronLeft } from "react-icons/vsc";
import Logo from '../../img/Wallpaper.jpg'

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(
    "hacer con axios una llamada la back para obtener las imagenes(get)"
  );

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (direction === "next") {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="main_container">
      <div className="left_Arrow" onClick={() => scrollToImage("prev")}>
        <VscChevronLeft />
      </div>
      <div className="right_Arrow" onClick={() => scrollToImage("next")}>
        <VscChevronRight />
      </div>
      <div className="slider_container">
        <div className="container_images">
          <img src={Logo} alt={`Image`} width={'100%'} height={'100%'} style={{margin:0}} />
            {/* {data.map((item) => (
              <li key={item.id}>
                <img src={item.img} alt={`Image ${item.id}`} width={'100%'} height={'100%'} />
              </li>
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default Slider;
