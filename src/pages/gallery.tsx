import Image from "next/image"
import { testImg } from "~/components/imageComponent"

export default function GalleryPage() {
    return <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 1"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 2"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 3"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 4"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 5"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 6"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 7"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
                <Image
                    src={testImg}
                    alt="Gallery Image 8"
                    width={300}
                    height={300}
                    className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                />
            </div>
        </div>
    </section>
}