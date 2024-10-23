'use client';
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css'
import Autoplay from 'embla-carousel-autoplay'
import Test from '../motion/test';
import imageFlayer from "../../media/flayer.png";
export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 700000 })])


  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><Test></Test></div>
        <div className="embla__slide"><img src={imageFlayer} width="900px" height="900px" className="imageFlayer" alt="Profile Image"></img></div>
        <div className="embla__slide">Slide 3</div>
      </div>

    </div>
  )
}