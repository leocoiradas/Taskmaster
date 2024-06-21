import { useState, useEffect } from "react";

function Carousel(imagesArr) {
    const [index, setIndex] = useState(0)
    const autoNextImage = () => {
        setIndex((actualImageIndex) => actualImageIndex++ > imagesArr.length ? 0 : actualImageIndex++)
    }
    useEffect(() => {
        const autoPages = setInterval(autoNextImage, 3000)
        return () => {
            clearInterval(autoPages)
        }
    }, [])
    
  return (
      <article className="flex w-[75dvw] h-[25dvvh]">
          <img src={index} alt="" className="w-full h-full object-cover" />
      </article>

  );
}

export default Carousel;