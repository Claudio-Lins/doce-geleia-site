import Image from 'next/image'

interface CardInstagramProps {
  img: string
  alt: string
}

export function CardInstagram({ img, alt }: CardInstagramProps) {
  return (
    <div className='flex w-[320px] flex-col rounded-lg shadow'>
     
      <Image src={img} alt={alt} width={620} height={775} />
      <footer className='flex h-10 w-full items-center rounded-b-lg bg-gray-50 pl-4'>
        {/* <Heart color='#950303' size={24} /> */}
      </footer>
    </div>
  )
}
