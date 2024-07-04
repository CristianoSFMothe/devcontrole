import Image from 'next/image'
import heroImg from "@/asserts/hero.svg"

export default function Home() {
  return (
    <main className='text-white flex items-center flex-col justify-center min-h-[calc(100vh -80px)]'>
     <h2 className='font-medium text-2xl mb-2 subTitle'>Gerencie sua empresa</h2>

     <h1 className='font-bold text-3xl mb-8 text-blue-500 md:text-4xl title'>Atendimento, clientes</h1>

     <Image 
      src={heroImg}
      alt='Logo hero do dev controle'
      width={600}
      className='max-w-sm md:max-w-xl logo'
     />
    </main>
  )
}
