import Image from 'next/image';
import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function Intro() {
    return (
        <section className="bg-texture py-16 md:py-17.5">
            <Reveal className="mx-auto w-full max-w-site px-5 text-center">
                <div className="flex flex-col items-center gap-2.5 text-[#192757]">
                    <Image
                        src="/images/logo-02.svg"
                        alt="여주 연세진치과"
                        width={66}
                        height={65}
                        className="h-auto w-15.5 md:w-16.5"
                    />
                    <span className="text-small font-extrabold">{CLINIC.name}</span>
                </div>
                <p className="mt-4 text-subheading font-bold md:mt-7 text-[#192757]">
                    정직한 진료, 세심한 치료를 <br className="block md:hidden" />
                    약속드립니다.
                </p>
            </Reveal>
        </section>
    );
}
