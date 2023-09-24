"use client"

import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { CardInstagram } from "../CardInstagram"
import Image from "next/image"

interface SliderProps {
  numSlides: number
}

const instagramImgs = [
  {
    id: 1,
    name: "img01",
    src: "/instamImages/instamImage_01.jpeg",
  },
  {
    id: 2,
    name: "img02",
    src: "/instamImages/instamImage_02.jpeg",
  },
  {
    id: 3,
    name: "img03",
    src: "/instamImages/instamImage_03.jpeg",
  },
  {
    id: 4,
    name: "img04",
    src: "/instamImages/instamImage_04.jpeg",
  },
  {
    id: 5,
    name: "img05",
    src: "/instamImages/instamImage_05.jpeg",
  },
  {
    id: 6,
    name: "img06",
    src: "/instamImages/instamImage_06.jpeg",
  },
  {
    id: 7,
    name: "img07",
    src: "/instamImages/instamImage_07.jpeg",
  },
  {
    id: 8,
    name: "img08",
    src: "/instamImages/instamImage_08.jpeg",
  },
]

export function Slider({ numSlides }: SliderProps) {
  const settings: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: numSlides,
    navigation: true,
    pagination: {
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    draggable: true,
  }
  return (
    <>
      <div className="flex h-[40px] w-full items-center gap-4 rounded-t-lg bg-white pl-4">
        <Image
          src="/assets/logos/lg_doceGeleia_20x20.svg"
          alt="Instagram"
          width={18}
          height={18}
        />
        <p className="text-sm font-semibold">docegeleia.pt</p>
      </div>
      <Swiper
        className="w-full max-w-xs flex flex-col"
        modules={[Autoplay, Navigation, Pagination, A11y]}
        {...settings}
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#d1cece",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
      >
        {instagramImgs.map((img) => {
          return (
            <SwiperSlide key={img.id}>
              <CardInstagram img={img.src} alt={img.name} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
