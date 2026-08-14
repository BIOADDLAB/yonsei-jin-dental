import Image from 'next/image';
import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
    return (
        <section className="relative h-[100dvh] min-h-[420px] w-full overflow-hidden">
            {/* TODO: 실제 병원 메인 이미지로 교체해야함 & 포지션도 교체되는 사진에 맞게 변경하기 */}
            <Image
                src="/images/bg-hero.jpg"
                alt="연세진치과 디지털 장비를 갖춘 진료실 전경"
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 200vw, 100vw"
                className="object-cover object-[75%_center] brightness-[1.03] saturate-[0.96] md:object-center"
            />
            <div className="absolute inset-0 bg-primary/[0.10]" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-primary/[0.14]" />

            <Reveal kind="scale" className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <p className="text-heading font-black text-white">{CLINIC.nameEn}</p>
                <h1 className="mt-1 text-display font-extrabold text-white [text-shadow:0_4px_10px_rgba(35,50,125,0.50)]">
                    {CLINIC.name}
                </h1>
            </Reveal>

            <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 md:bottom-13 md:gap-2 lg:bottom-15">
                <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white p-1 md:h-10 md:w-6">
                    <div className="h-1.5 w-0.5 animate-wheel rounded-full bg-white md:h-2 md:w-0.5" />
                </div>
                <img src="/images/i-arr-down-03.svg" alt="scroll down" className="w-3 md:w-auto" />
            </div>
        </section>
    );
}
