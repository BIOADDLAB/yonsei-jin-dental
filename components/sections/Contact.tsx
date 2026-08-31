import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import Image from 'next/image';
import NaverMap from '@/components/sections/NaverMap';

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

                        {/* 목요일 휴진은 놓치지 않도록 가볍게만 강조 */}
                        <p className="mt-5.5 inline-flex items-center rounded-full border border-white/45 px-4 py-1 text-[16px] font-bold text-white">
                            {CLINIC.closedDay}
                        </p>

                        <ul className="mt-3 space-y-1 text-body font-medium text-white">
                            {CLINIC.notes.map((note) => (
                                <li key={note}>{note}</li>
                            ))}
                        </ul>
                        <p className="mt-3.5 flex items-center gap-2 text-subheading font-bold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary"
                            >
                                <Image src="/images/i-car.svg" alt="" width={22} height={22} />
                            </span>
                            {CLINIC.parking}
                        </p>

                        <div className="mt-8 border-t border-white/50 pt-6 text-small font-semibold tracking-[0.04em] text-white">
                            <p>병원명 : {CLINIC.name}</p>
                            <p>주소 : {CLINIC.address}</p>
                            <p className="mt-1 font-semibold tracking-[0.04em] [font-variant-numeric:tabular-nums]">
                                TEL : {CLINIC.tel}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal
                        kind="right"
                        className="order-1 flex flex-col mx-auto w-full max-w-[674px] lg:order-2 lg:mx-0 lg:max-w-none"
                    >
                        <h3 className="text-subheading font-extrabold text-white">오시는 길 안내</h3>
                        {/* isolate: 네이버 지도가 만든 높은 z-index 컨트롤이 고정 헤더 위로 튀어나오지 않게 가둔다 */}
                        <div className="relative isolate mt-6 min-h-[320px] w-full max-w-[674px] flex-1 overflow-hidden rounded-[20px] bg-neutral-300 md:min-h-[420px] lg:min-h-0">
                            <NaverMap lat={CLINIC.lat} lng={CLINIC.lng} name={CLINIC.name} />

                            {/* 지도 위에 치과 전경 사진을 얹는다. 지도 컨트롤(좌상단 줌·우상단 버튼)과 겹치지 않는 좌하단 */}
                            <div className="pointer-events-none absolute bottom-3 left-3 w-[38%] max-w-[240px] min-w-[120px] overflow-hidden rounded-[12px] border-2 border-white shadow-[0_6px_18px_rgb(0_0_0/0.28)]">
                                <Image
                                    src="/images/img-map.jpg"
                                    alt="연세진치과가 있는 건물 외관"
                                    width={1600}
                                    height={1066}
                                    className="h-auto w-full object-cover"
                                />
                            </div>

                            <div className="absolute right-2 top-2 flex flex-col gap-2 sm:flex-row">
                                <a
                                    href={NAVER_MAP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-caption font-bold text-basic shadow-[0_2px_8px_rgb(0_0_0/0.15)] transition hover:bg-neutral-50 active:scale-[0.98]"
                                >
                                    <Image src="/images/i-naver.svg" alt="" width={24} height={24} />
                                    네이버 지도
                                </a>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-caption font-bold text-basic shadow-[0_2px_8px_rgb(0_0_0/0.15)] transition hover:bg-neutral-50 active:scale-[0.98]"
                                >
                                    <Image src="/images/i-google.svg" alt="" width={24} height={24} />
                                    구글 지도
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
