import Image from 'next/image';
import { CLINIC } from '@/data/site';

export default function Footer() {
    const info = [
        CLINIC.name,
        `대표원장 : ${CLINIC.owner}`,
        CLINIC.address,
        CLINIC.tel,
        `사업자등록번호 : ${CLINIC.bizNo}`,
    ];

    return (
        <footer className="bg-basic py-14 text-center md:py-25">
            <div className="mx-auto w-full max-w-site px-5">
                <div className="flex items-center justify-center gap-2 text-white">
                    <Image src="/images/logo.svg" alt="" width={180} height={46} />
                </div>

                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-caption-sm text-white/90">
                    {info.map((item) => (
                        <li
                            key={item}
                            className="after:ml-3 after:text-white/25 after:content-['|'] last:after:content-['']"
                        >
                            {item}
                        </li>
                    ))}
                </ul>

                <p className="mt-2 text-caption-sm text-white/90">
                    COPYRIGHT (C) 2026 CODE YONSEI JIN DENTAL. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}
