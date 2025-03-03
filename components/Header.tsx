import Image from "next/image"

export default function Header() {
  return (
    <div className="bg-primary w-full py-6 px-4">
      <div className="container mx-auto max-w-md flex justify-center items-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SendMe%20(1)-ZQ7hkaYsyN9dgarV82KeDsXptmZDVb.png"
          alt="SendMe Services"
          width={200}
          height={100}
          priority
          className="h-auto w-auto"
        />
      </div>
    </div>
  )
}

