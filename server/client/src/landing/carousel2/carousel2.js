"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel2.css";
import Autoplay from "embla-carousel-autoplay";
import Test from "../motion/test";
import imageFlayer from "../../media/doctores/vet_1.JPG";
import imageFlayer2 from "../../media/doctores/vet_2.JPG";
import imageFlayer3 from "../../media/doctores/vet_3.JPG";
import imageFlayer4 from "../../media/doctores/vet_4.JPG";
import imageFlayer5 from "../../media/doctores/vet_5.JPG";
import imageFlayer6 from "../../media/doctores/vet_6.JPG";
import imageFlayer7 from "../../media/doctores/vet_7.JPG";
import imageFlayer8 from "../../media/doctores/vet_8.JPG";
import imageFlayer9 from "../../media/doctores/vet_9.JPG";

import imageFlayer10 from "../../media/doctores/vet_10.JPG";
import imageFlayer11 from "../../media/doctores/vet_11.JPG";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  return (
    <div className="embla2" ref={emblaRef}>
      <div className="embla__container2">
        <div className="embla__slide2">
          <img
            src={imageFlayer}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide2">
          <img
            src={imageFlayer2}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide2">
          <img
            src={imageFlayer3}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer4}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer5}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer6}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer7}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer8}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer9}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer10}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
        <div className="embla__slide">
          <img
            src={imageFlayer11}
            width="900px"
            className="imageFlayer2"
            alt="Profile Image"
          ></img>
          <div className="text">
            <p className="title1"> Dr. Ana Martínez</p>
            <p className="text1">Dermatología Veterinaria</p>
            <p className="text2">
              Consulta general, diagnóstico por imagen, tratamiento
              dermatológico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
