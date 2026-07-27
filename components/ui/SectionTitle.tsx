import Reveal from '@/components/ui/Reveal';

type Props = {
    eyebrow: string;
    title: string;
    tone?: 'light' | 'dark';
    align?: 'center' | 'left';
};

export default function SectionTitle({ eyebrow, title, tone = 'dark', align = 'center' }: Props) {
    return (
        <Reveal className={align === 'center' ? 'text-center' : 'text-left'}>
            <p className={`text-subheading font-bold ${tone === 'dark' ? 'text-primary' : 'text-accent'}`}>{eyebrow}</p>
            <h2 className={`mt-2 text-heading font-extrabold ${tone === 'dark' ? 'text-primary' : 'text-white'}`}>
                {title}
            </h2>
        </Reveal>
    );
}
