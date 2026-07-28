import { SPECIAL_CARE } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

export default function SpecialCare() {
    return (
        <section id="special" className="bg-texture py-16 md:py-24 lg:py-37.5" aria-labelledby="special-title">
            <div className="mx-auto w-full max-w-site px-5 md:px-8">
                <Reveal>
                    <p className="text-subheading font-medium text-primary">{SPECIAL_CARE.eyebrow}</p>
                    <h2 id="special-title" className="dot mt-2.5 inline-block text-heading font-bold text-primary">
                        {SPECIAL_CARE.title}
                    </h2>
                </Reveal>

                <div className="relative mx-auto mt-10 w-full max-w-[1110px] md:mt-14">
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0">
                        {SPECIAL_CARE.items.map((item, index) => {
                            const dark = item.tone === 'dark';
                            const stackDark = index % 2 === 1;
                            const leftColumn = index % 2 === 0;

                            const surface = `${stackDark ? 'bg-primary' : 'bg-accent-soft'} ${dark ? 'md:bg-primary' : 'md:bg-accent-soft'}`;
                            const strongTone = `${stackDark ? 'text-white' : 'text-primary'} ${dark ? 'md:text-white' : 'md:text-primary'}`;
                            const bodyTone = `${stackDark ? 'text-white/90' : 'text-primary'} ${dark ? 'md:text-white/90' : 'md:text-primary'}`;

                            return (
                                <li
                                    key={item.no}
                                    className={`overflow-hidden max-md:rounded-[14px] ${
                                        leftColumn ? 'md:rounded-l-[14px]' : 'md:rounded-r-[14px]'
                                    }`}
                                >
                                    <article
                                        className={`flex h-full flex-col items-center justify-center px-6 py-10 text-center md:min-h-[419px] md:px-5 lg:h-[419px] lg:px-5 ${surface}`}
                                    >
                                        <p className={`text-subheading font-extrabold ${strongTone}`}>{item.no}</p>
                                        <h3 className={`text-wrap-design mt-3 text-subheading font-bold ${strongTone}`}>
                                            {item.title.join('\n')}
                                        </h3>

                                        {item.highlight && (
                                            <p className="text-wrap-design mt-6 text-caption font-extrabold text-primary">
                                                <mark className="bg-white text-body font-extrabold text-primary">
                                                    {item.highlight}
                                                </mark>
                                            </p>
                                        )}

                                        <p
                                            className={`text-wrap-design mt-6 text-body leading-[30px] font-medium ${bodyTone}`}
                                        >
                                            {item.body.map((part) =>
                                                part.strong ? (
                                                    <strong key={part.text} className="font-black">
                                                        {part.text}
                                                    </strong>
                                                ) : (
                                                    <span key={part.text}>{part.text}</span>
                                                ),
                                            )}
                                        </p>
                                    </article>
                                </li>
                            );
                        })}
                    </ul>

                    {/* 점선 */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-[15px] left-1/2 hidden -translate-x-1/2 border-l-2 border-dashed border-primary md:block"
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[22px] top-1/2 hidden -translate-y-1/2 border-t-2 border-dashed border-primary md:block"
                    />
                </div>
            </div>
        </section>
    );
}
