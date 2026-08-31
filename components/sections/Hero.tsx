import Image from 'next/image';
import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
    return (
        <section className="relative h-[100dvh] min-h-[420px] w-full overflow-hidden">
            {/* 자동재생이 막히거나 영상을 못 받는 환경에서는 첫 프레임 사진이 그대로 남는다 */}
            <Image
                src="/images/hero-sum-02.jpg"
                alt="연세진치과 디지털 장비를 갖춘 진료실 전경"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center saturate-[0.92]"
            />

            <video
                className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.92]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero-sum.jpg"
                aria-hidden="true"
                tabIndex={-1}
            >
                <source src="/videos/hero-main.mp4" type="video/mp4" />
            </video>

            {/* 타원: 타이틀 뒤쪽만 좁게 눌러 대비 확보 / 선형: 헤더·스크롤 인디케이터용 최소 스크림 */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        'radial-gradient(ellipse 44% 32% at 50% 48%, rgba(6, 26, 66, 0.42) 0%, rgba(6, 26, 66, 0) 100%), linear-gradient(180deg, rgba(6, 26, 66, 0.46) 0%, rgba(6, 26, 66, 0.37) 45%, rgba(6, 26, 66, 0.51) 100%)',
                }}
            />

            <Reveal kind="scale" className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <p className="text-heading font-black text-white [text-shadow:0_2px_8px_rgba(6,26,66,0.7)]">
                    {CLINIC.nameEn}
                </p>

                <h1 className="mt-1 text-display font-extrabold text-white [text-shadow:0_2px_8px_rgba(6,26,66,0.7)]">
                    {CLINIC.name}
                </h1>
            </Reveal>

            <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 md:bottom-13 md:gap-2 lg:bottom-15">
                <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white p-1 md:h-10 md:w-6">
                    <div className="h-1.5 w-0.5 animate-wheel rounded-full bg-white md:h-2 md:w-0.5" />
                </div>

                <Image src="/images/i-arr-down-03.svg" alt="" width={14} height={8} className="h-auto w-3 md:w-auto" />
            </div>
        </section>
    );
}
