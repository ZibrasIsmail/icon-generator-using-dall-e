import ImageComponent from "./imageComponent"

export const ImageList = () => {
    return (
        <section className="container mx-auto py-12 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />

            </div>
        </section>
    )
}