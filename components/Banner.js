import Image from "next/image";
function Banner() {
    return (
        <div className="relative z-10 h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:[700px]">
            <Image
            src="https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=960"
            layout="fill"
            objectFit="cover"
            />
            <div className="absolute text-center md:text-left top-1/3 md:top-1/4 md:justify-start md:p-6 md:pt-0 md:pl-24">
                <p className="text-3xl md:text-6xl w-full md:w-96 text-white font-bold md:pb-3">Olympian & Paralympian Online Experiences</p>
                <button className="text-purple-500 border-4 hover:border-purple-500 md:justify-start md:flex bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
