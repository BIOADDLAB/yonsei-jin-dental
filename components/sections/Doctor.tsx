import Image from 'next/image';
import { DOCTOR } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Doctor() {
    return (
        <section id="doctor" className="relative py-16 md:py-24 lg:py-37" aria-labelledby="doctor-title">
            <Image
                src="/images/bg-sub-02.jpg"
                alt="의료진 배경"
                fill
                sizes="100vw"
                priority
                className="absolute inset-0 -z-10 object-cover object-center"
            />

            <div className="relative z-10 mx-auto w-full max-w-site px-5 md:px-8">
                <SectionTitle eyebrow="Yonsei JIN Doctor" title="의료진 소개" />

                <div className="mt-12 grid grid-cols-1 items-center justify-center gap-10 md:mt-21.25 xl:grid-cols-[478px_auto] xl:gap-20">
                    <Reveal kind="left">
                        <div className="relative mx-auto aspect-[478/678] w-full max-w-[280px] md:max-w-[360px] xl:max-w-[478px] overflow-hidden rounded-[239px] bg-[#E3E7F0]">
                            <Image
                                src={DOCTOR.image}
                                alt={`연세진치과 ${DOCTOR.name} ${DOCTOR.role} 프로필 사진`}
                                fill
                                sizes="(max-width: 768px) 280px, (max-width: 1280px) 360px, 478px"
                                className="object-cover object-top"
                            />
                        </div>
                    </Reveal>

                    <Reveal kind="right">
                        <div className="mx-auto w-full max-w-[360px] sm:max-w-[400px] md:max-w-[478px] xl:mx-0 xl:max-w-none">
                            <h3 className="relative dot  inline-block text-display font-black text-primary">
                                {DOCTOR.name}
                                <span className="ml-3 text-lead font-extrabold text-primary">{DOCTOR.role}</span>
                            </h3>

                            <dl className="mt-8 space-y-8 md:mt-14">
                                {DOCTOR.groups.map((group, index) => (
                                    <div key={group.label || `group-${index}`}>
                                        {group.label && (
                                            <dt className="mb-4 flex items-center gap-2 text-body font-extrabold text-[#111]">
                                                <svg
                                                    width="12"
                                                    height="14"
                                                    viewBox="0 0 12 14"
                                                    fill="#1C2B54"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M12 1.4C12 0.626 11.373 0 10.6 0H1.4C0.626 0 0 0.626 0 1.4V12.6C0 13.373 0.626 14 1.4 14H10.6C11.373 14 12 13.373 12 12.6V1.4ZM3 4H9V5H3V4ZM9 7H3V8H9V7ZM3 10H7V11H3V10Z"
                                                    />
                                                </svg>
                                                {group.label}
                                            </dt>
                                        )}
                                        <dd>
                                            <ul className="space-y-1.5 text-small font-bold leading-[32px] leading-relaxed text-[#333]">
                                                {group.items.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
