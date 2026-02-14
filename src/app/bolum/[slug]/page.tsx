"use client";
import { use } from "react";
import { chapters } from "@/data/chapters";
import { notFound } from "next/navigation";
import ChapterLayout from "@/components/ChapterLayout";
import dynamic from "next/dynamic";

const simulations: Record<string, React.ComponentType> = {
    "otoriteye-itaat": dynamic(() => import("@/simulations/Sim01")),
    "korku-ve-aciliyet": dynamic(() => import("@/simulations/Sim02")),
    "merak-duygusu": dynamic(() => import("@/simulations/Sim03")),
    "guven-ve-nezaket": dynamic(() => import("@/simulations/Sim04")),
    "dijital-ayak-izi": dynamic(() => import("@/simulations/Sim05")),
    "sahte-web-siteleri": dynamic(() => import("@/simulations/Sim06")),
    "deepfake-yapay-zeka": dynamic(() => import("@/simulations/Sim07")),
    "sifre-psikolojisi": dynamic(() => import("@/simulations/Sim08")),
    "oyun-hilesi": dynamic(() => import("@/simulations/Sim09")),
    "evdeki-casuslar": dynamic(() => import("@/simulations/Sim10")),
    "fidye-yazilimlari": dynamic(() => import("@/simulations/Sim11")),
    "bedava-internet": dynamic(() => import("@/simulations/Sim12")),
    "ikinci-el-tuzaklari": dynamic(() => import("@/simulations/Sim13")),
    "emlak-dolandirici": dynamic(() => import("@/simulations/Sim14")),
    "yaslilar-dijital-ucurum": dynamic(() => import("@/simulations/Sim15")),
    "kargo-tuzaklari": dynamic(() => import("@/simulations/Sim16")),
    "akademik-serap": dynamic(() => import("@/simulations/Sim17")),
    "sazan-sarmali": dynamic(() => import("@/simulations/Sim18")),
    "sahte-villa": dynamic(() => import("@/simulations/Sim19")),
    "gorev-dolandiriciligi": dynamic(() => import("@/simulations/Sim20")),
    "sahte-yatirim": dynamic(() => import("@/simulations/Sim21")),
    "truva-ati": dynamic(() => import("@/simulations/Sim22")),
    "zipkinla-avlama": dynamic(() => import("@/simulations/Sim23")),
    "sinav-sorulari": dynamic(() => import("@/simulations/Sim24")),
    "kiralik-hesaplar": dynamic(() => import("@/simulations/Sim25")),
};

export default function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const chapter = chapters.find((c) => c.slug === slug);
    if (!chapter) notFound();

    const SimComponent = simulations[slug];
    if (!SimComponent) notFound();

    return (
        <ChapterLayout chapter={chapter}>
            <SimComponent />
        </ChapterLayout>
    );
}
