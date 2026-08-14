import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';

const NAVER_MAP_URL = 'https://naver.me/59vHMVNw';

const DAY_LABEL = 'w-30 shrink-0 text-justify [text-align-last:justify] text-subheading font-bold text-white';

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-primary py-16 md:py-24 lg:py-28 overflow-x-hidden"
            aria-labelledby="contact-title"
        >
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <Reveal className="text-center">
                    <h2 id="contact-title" className="text-heading lg:text-[30px] font-black leading-12 text-white">
                        <span className="dot inline-block">보다 편안한 진료를 위해</span>
                        <span className="block">예약 후 방문 부탁드립니다.</span>
                    </h2>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-10 md:mt-18.5 lg:grid-cols-[1fr_674px] lg:gap-14">
                    <Reveal
                        kind="left"
                        className="order-2 mx-auto w-full max-w-[674px] lg:order-1 lg:mx-0 lg:max-w-none"
                    >
                        <h3 className="text-subheading font-extrabold text-white">진료시간 안내</h3>
                        <dl className="mt-6 space-y-3">
                            {CLINIC.hours.map((item) => (
                                <div key={item.day} className="flex gap-7 items-baseline lg:gap-17">
                                    <dt className={DAY_LABEL}>{item.day}</dt>
                                    <dd className="text-subheading font-bold text-white">
                                        {item.time}
                                        {item.note && (
                                            <span className="ml-2 text-small text-white">
                                                <br className="block md:hidden" /> ({item.note})
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                            <div className="flex gap-7 items-baseline lg:gap-17 pt-2">
                                <dt className={DAY_LABEL}>{CLINIC.lunch.day}</dt>
                                <dd className="text-subheading font-medium text-white">{CLINIC.lunch.time}</dd>
                            </div>
                        </dl>

                        <ul className="mt-5.5 space-y-1 text-body font-medium text-white">
                            {CLINIC.notes.map((note) => (
                                <li key={note}>{note}</li>
                            ))}
                        </ul>
                        <p className="mt-3.5 flex items-center gap-2 text-subheading font-extrabold text-white">
                            <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
                                <Image src="/images/i-car.svg" alt="" width={22} height={22} />
                            </span>
                            {CLINIC.parking}
                        </p>

                        <div className="mt-8 border-t border-white/50 pt-6 text-small font-extrabold text-white">
                            <p>병원명 : {CLINIC.name}</p>
                            <p>주소 : {CLINIC.address}</p>
                            <p className="mt-1 font-black tracking-[0.04em] [font-variant-numeric:tabular-nums]">TEL : {CLINIC.tel}</p>
                        </div>
                    </Reveal>

                    <Reveal
                        kind="right"
                        className="order-1 flex flex-col mx-auto w-full max-w-[674px] lg:order-2 lg:mx-0 lg:max-w-none"
                    >
                        <h3 className="text-subheading font-extrabold text-white">오시는 길 안내</h3>
                        <a
                            href={NAVER_MAP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="네이버 지도에서 연세진치과 위치와 길찾기 보기"
                            className="group relative mt-6 min-h-[320px] w-full max-w-[674px] flex-1 overflow-hidden rounded-[20px] bg-neutral-200 md:min-h-[420px] lg:min-h-0"
                        >
                            <Image src="/images/map-naver.jpg" alt="연세진치과 주변 네이버 지도" fill sizes="(max-width: 1024px) 100vw, 674px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                            <span className="absolute left-[60%] top-[55%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
                                <span className="rounded-full bg-primary px-3 py-1.5 text-caption font-black text-white shadow-lg">연세진치과</span>
                                <span className="h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-primary" />
                            </span>
                            <span className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-caption font-black text-basic shadow-[0_4px_14px_rgb(0_0_0/0.18)] transition group-hover:-translate-y-0.5">
                                <Image src="/images/i-naver.svg" alt="" width={24} height={24} />
                                네이버 지도 열기
                            </span>
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
