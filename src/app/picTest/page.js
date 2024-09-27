import Image from "next/image"

export default function picTestPage(){
    return(
        <div>
            This page is to test S3
            <div>
                <Image src="https://anothercoolpic.s3.us-east-2.amazonaws.com/IMG_1530_2.jpg"
                       width={500}
                       height={500}
                       alt="Picture of the author"/>

            </div>
        </div>
    )
}