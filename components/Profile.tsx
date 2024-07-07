import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Image
        src="/portrait/image.png"
        alt="JC's Portrait"
        width={128}
        height={128}
        priority
        className="rounded-full mx-auto mb-4"
      />
    </>
  );
}
