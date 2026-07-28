import { CLINIC } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

const GOOGLE_MAP_SRC =
    'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x356360a70ac0fe69%3A0xe7fac5aeed631523!2z6rK96riw64-EIOyXrOyjvOyLnCDshLjsooXroZwgMzc1LTEgMuy4tQ!5e0!3m2!1sko!2skr!4v1785218104182!5m2!1sko!2skr';

const DAY_LABEL = 'w-30 shrink-0 text-justify [text-align-last:justify] text-subheading font-medium text-white';

export default function Contact() {
    return (
        <section id="contact" className="bg-primary py-16 md:py-24 lg:py-28" aria-labelledby="contact-title">
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
                                    <dd className="text-subheading font-medium text-white">
                                        {item.time}
                                        {item.note && (
                                            <span className="ml-1 text-small text-white">
                                                <br className="block md:hidden" />({item.note})
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
                        <p className="mt-3.5 text-subheading font-extrabold text-white">{CLINIC.parking}</p>

                        <div className="mt-8 border-t border-white/50 pt-6 text-small font-extrabold text-white">
                            <p>병원명 : {CLINIC.name}</p>
                            <p>주소 : {CLINIC.address}</p>
                            <p>TEL : {CLINIC.tel}</p>
                        </div>
                    </Reveal>

                    <Reveal
                        kind="right"
                        className="order-1 flex flex-col mx-auto w-full max-w-[674px] lg:order-2 lg:mx-0 lg:max-w-none"
                    >
                        <h3 className="text-subheading font-extrabold text-white">오시는 길 안내</h3>
                        <div className="relative mt-6 min-h-[320px] w-full max-w-[674px] flex-1 overflow-hidden rounded-[20px] bg-neutral-300 md:min-h-[420px] lg:min-h-0">
                            <iframe
                                src={GOOGLE_MAP_SRC}
                                title={`${CLINIC.name} 위치 지도`}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="absolute inset-0 h-full w-full border-0"
                            />
                            <div className="pointer-events-none absolute top-2 right-2 rounded-sm bg-white/70 px-1.5 py-1.5 shadow-[0_4px_16px_rgb(0_0_0/0.18)]">
                                <p className="text-small font-extrabold text-primary">{CLINIC.name}</p>
                                <p className="mt-0.5 text-caption-sm text-basic/70">{CLINIC.address}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
