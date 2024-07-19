import Image from "next/image";

export const testImg = "https://replicate.delivery/pbxt/LI5VAhU2v3jNTjuE76GMTzikT1XMiUoRSznZdXR0cAnK1XJS/ComfyUI_00362_.png"

export default function ImageComponent() {
    return (
        <div className="relative overflow-hidden rounded-lg group">
            <Image
                src={testImg}
                alt="Banner Image 2"
                width={300}
                height={300}
                className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
            />
        </div >
    )
}