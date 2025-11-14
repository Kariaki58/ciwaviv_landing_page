import Image from 'next/image';

export default function Logo() {
  return <Image src="/footer_logo.png" alt="ciwaviv logo" width={100} height={8} className="text-primary" />;
}