import Image from 'next/image';
import { SIGNATURE_CARE } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionTitle from '@/components/ui/SectionTitle';

export default function SignatureCare() {
    return (
        <section id="signature" className="bg-white py-16 md:py-20" aria-labelledby="signature-title">
            <div className="ml-auto rounded-l-[60px] bg-neutral-300 px-5 pt-14 pb-28 text-center md:rounded-l-[240px] md:px-8 lg:h-[474px] lg:w-[84.69%] lg:pt-[90px] lg:pr-[15.31%] lg:pb-0 lg:pl-0">
                <SectionTitle eyebrow="Signature Care" title="시그니처 진료" />
            </div>

            <div className="-mt-20 flex items-center rounded-r-[14px] bg-primary py-10 md:-mt-28 md:rounded-r-[240px] md:py-14 lg:-mt-[233px] lg:h-[474px] lg:w-[84.69%] lg:py-0">
                <div className="mx-auto w-full max-w-site px-5 md:pl-8 md:pr-20 lg:mx-0 lg:max-w-none lg:pl-[21.2%] lg:pr-14 min-[1680px]:pr-0">
                    <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:w-full min-[1680px]:w-[1068px]">
                        {SIGNATURE_CARE.map((item, index) => (
                            <li key={item.title}>
                                <Reveal kind="up" delay={index * 0.08}>
                                    <article className="rounded-[14px] bg-white p-2 transition-colors hover:bg-accent-soft">
                                        <div className="relative aspect-[236/181] w-full overflow-hidden rounded-[14px]">
                                            <Image
                                                src={item.image}
                                                alt={`연세진치과 ${item.title} 진료 이미지`}
                                                fill
                                                sizes="(max-width: 767px) 45vw, (max-width: 1679px) 22vw, 252px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="pt-[15px] pb-[18px] text-center text-subheading font-black text-primary">
                                            {item.title}
                                        </h3>
                                    </article>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
