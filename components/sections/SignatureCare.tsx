import Image from 'next/image';
import { SIGNATURE_CARE } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionTitle from '@/components/ui/SectionTitle';

export default function SignatureCare() {
    return (
        <section id="signature" className="bg-white py-16 md:py-20" aria-labelledby="signature-title">
            {/* 상단 패널. 오른쪽 끝까지 붙고 좌상단만 라운드 */}
            <div className="rounded-tl-[60px] bg-neutral-300 px-5 pb-28 pt-14 text-center md:rounded-tl-[120px] md:pb-36 md:pt-22.5 lg:ml-auto lg:w-[83%]">
                <SectionTitle eyebrow="Signature Care" title="시그니처 진료" />
            </div>

            {/* 하단 패널. 왼쪽 끝에서 시작해 상단 패널 위로 겹친다 */}
            <div className="-mt-20 rounded-r-full bg-primary py-10 md:-mt-28 md:py-14 lg:w-[84%]">
                <ul className="grid grid-cols-2 gap-4 px-5 md:gap-6 md:px-8 lg:ml-[18%] lg:grid-cols-4 lg:pr-8">
                    {SIGNATURE_CARE.map((item, index) => (
                        <li key={item.title}>
                            <Reveal kind="up" delay={index * 0.08}>
                                <article className="rounded-2xl bg-white p-3 transition hover:bg-accent-soft">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                                        <Image
                                            src={item.image}
                                            alt={`연세진치과 ${item.title} 진료 이미지`}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 20vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="py-3 text-center text-small font-extrabold text-primary">
                                        {item.title}
                                    </h3>
                                </article>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
