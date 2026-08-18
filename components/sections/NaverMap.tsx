'use client';

import { useCallback, useEffect, useRef } from 'react';
import Script from 'next/script';

const CLIENT_ID = 'awktiak1l9';

declare global {
    interface Window {
        naver: typeof naver;
    }
}

type Props = {
    lat: number;
    lng: number;
    name: string;
};

export default function NaverMap({ lat, lng, name }: Props) {
    const mapEl = useRef<HTMLDivElement>(null);
    const mapRef = useRef<naver.maps.Map | null>(null);

    const initMap = useCallback(() => {
        if (!mapEl.current || !window.naver?.maps || mapRef.current) return;

        const position = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(mapEl.current, {
            center: position,
            zoom: 17,
            scaleControl: false,
            logoControl: true,
            mapDataControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_LEFT,
            },
        });

        new naver.maps.Marker({
            position,
            map,
            title: name,
        });

        mapRef.current = map;
        naver.maps.Event.trigger(map, 'resize');
        map.setCenter(position);
    }, [lat, lng, name]);

    useEffect(() => {
        initMap();

        const el = mapEl.current;
        if (!el) return;

        let didCenter = false;
        const observer = new ResizeObserver((entries) => {
            if (!mapRef.current || !window.naver?.maps) return;
            naver.maps.Event.trigger(mapRef.current, 'resize');
            const { width, height } = entries[0].contentRect;
            if (!didCenter && width > 0 && height > 0) {
                mapRef.current.setCenter(new naver.maps.LatLng(lat, lng));
                didCenter = true;
            }
        });
        observer.observe(el);

        return () => {
            observer.disconnect();
            mapRef.current = null;
        };
    }, [initMap, lat, lng]);

    return (
        <>
            <Script
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`}
                strategy="afterInteractive"
                onLoad={initMap}
            />
            <div
                ref={mapEl}
                role="img"
                aria-label={`${name} 위치 지도`}
                className="absolute inset-0 h-full w-full"
            />
        </>
    );
}
