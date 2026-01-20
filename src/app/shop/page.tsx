"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { CartBadge } from "@/components/layout/CartBadge";

export default function Shop() {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-grid-bg-light dark:bg-background-dark shadow-2xl overflow-hidden border-x border-gray-100 dark:border-gray-800 font-display">
            <header className="sticky top-0 z-50 bg-grid-bg-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-200">
                <div className="flex items-center justify-between p-4 pb-2">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <span
                            className="material-symbols-outlined text-text-main"
                            style={{ fontSize: "28px" }}
                        >
                            menu
                        </span>
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold tracking-widest uppercase text-grid-primary mb-0.5">
                            Dr. Selection
                        </span>
                        <h2 className="text-text-main text-xl font-extrabold leading-none tracking-tight">
                            Prescription Pad
                        </h2>
                    </div>
                    <Link href="/cart" className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <span
                            className="material-symbols-outlined text-text-main"
                            style={{ fontSize: "24px" }}
                        >
                            shopping_bag
                        </span>
                        <CartBadge />
                    </Link>
                </div>
                <div className="w-full overflow-x-auto hide-scrollbar pb-4 pt-2 px-4">
                    <div className="flex gap-3 min-w-max">
                        <button className="flex h-10 items-center gap-2 rounded-xl bg-text-main px-5 shadow-sm transition-transform active:scale-95 cursor-pointer">
                            <span className="text-white text-sm font-bold">All</span>
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 shadow-sm transition-transform active:scale-95 cursor-pointer">
                            <span className="text-text-main dark:text-gray-200 text-sm font-medium">
                                Knee
                            </span>
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 shadow-sm transition-transform active:scale-95 cursor-pointer">
                            <span className="text-text-main dark:text-gray-200 text-sm font-medium">
                                Back
                            </span>
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 shadow-sm transition-transform active:scale-95 cursor-pointer">
                            <span className="text-text-main dark:text-gray-200 text-sm font-medium">
                                Wrist
                            </span>
                        </button>
                        <button className="flex h-10 items-center gap-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 shadow-sm transition-transform active:scale-95 cursor-pointer">
                            <span className="text-text-main dark:text-gray-200 text-sm font-medium">
                                Ankle
                            </span>
                        </button>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 pb-24">
                <div className="mb-6 px-1">
                    <h1 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                        Patient Essentials
                    </h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400 font-medium leading-relaxed">
                        Curated orthopedic solutions for your recovery journey.{" "}
                        <span className="text-grid-primary font-bold">
                            Verified by Dr. Smith.
                        </span>
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Joint Pain
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Person wearing a grey knee compression sleeve"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3DhggKNGkhcfIpnM8Py6dPQDcnmNq03BdwDgH21RtTAlAEnyQK4-8XUK5Dh7GMsjjTbtkVrGtBpbb08DS8xmkWhVH0Fvsb8d4jMT9mS0J7_3XOudygq19ou157SfcUuq2AAD_seSDR-aZVF2lrCBy4RmPmmshQ85kD0Z634ubZtyvnchzcDylGclDEYsuesLX0ntYjQXmfkbld7KoATEePWlZAX2XX54OxNLC2sosr4eC13_4om3jzNWAZG82tZt0RZU0AU850uA"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Knee Brace Pro
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $45.00
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'knee-brace-pro',
                                            name: 'Knee Brace Pro',
                                            price: 45.00,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3DhggKNGkhcfIpnM8Py6dPQDcnmNq03BdwDgH21RtTAlAEnyQK4-8XUK5Dh7GMsjjTbtkVrGtBpbb08DS8xmkWhVH0Fvsb8d4jMT9mS0J7_3XOudygq19ou157SfcUuq2AAD_seSDR-aZVF2lrCBy4RmPmmshQ85kD0Z634ubZtyvnchzcDylGclDEYsuesLX0ntYjQXmfkbld7KoATEePWlZAX2XX54OxNLC2sosr4eC13_4om3jzNWAZG82tZt0RZU0AU850uA"
                                        });
                                        window.alert('Knee Brace Pro이(가) 장바구니에 담겼습니다.');
                                    }}
                                    aria-label="Add to cart"
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Post-Op
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Ergonomic lumbar support pillow on a chair"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpyMdcrfRbebWK2QPxgffBBPSWj5zlwz5lDzbGvBY93VocFWl0NvgtdhnUwxHXpuOMNBD9JSwY3dFoyr4f65gnQtF-MHu4mU9IrSw_Ydatp2xYSOBLbIt0eQoKpMj4R-pP5KCcJzYopVIJh0jnu5_Iv9srQCP20GoriWfokWGbswMT8sZ5OyNLu_F35DUT57TpsqNN-kzvFb8-PuHFgT7XvtbkCTCcpGmmO-9Oh3RGuh2vk7pe-deKRaVz5LxpbR2ISCTm7ooFZ8c"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Lumbar Support
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $89.99
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'lumbar-support',
                                            name: 'Lumbar Support',
                                            price: 89.99,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpyMdcrfRbebWK2QPxgffBBPSWj5zlwz5lDzbGvBY93VocFWl0NvgtdhnUwxHXpuOMNBD9JSwY3dFoyr4f65gnQtF-MHu4mU9IrSw_Ydatp2xYSOBLbIt0eQoKpMj4R-pP5KCcJzYopVIJh0jnu5_Iv9srQCP20GoriWfokWGbswMT8sZ5OyNLu_F35DUT57TpsqNN-kzvFb8-PuHFgT7XvtbkCTCcpGmmO-9Oh3RGuh2vk7pe-deKRaVz5LxpbR2ISCTm7ooFZ8c"
                                        });
                                        window.alert('Lumbar Support이(가) 장바구니에 담겼습니다.');
                                    }}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer">
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Daily Care
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Comfortable orthopedic slip-on shoes"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhtfXAc-qYUFQD3dnT-5nUMUcoPFM26pSgcwWWBFe-Kgf0OgisG5VpDufC7hWDKJSXMiF3bSrwYP2S9eH2hUiYiQI1Klvs3bqQBJp04UKm7yF4VEmwcQyH4l5zPja7nDfU358R50ZQZFjXfUV4UDO1gGYS9MjkTb3AxKapuKRRSx4o6NdgbdyoHlxNm2aqJeAHPDIkUqG4O-Ylbp6I1elNscetNVIKd3_0DfDLWva2EZPl-hysVF3JjbGyORreRYwBFTP2h08Gh4o"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Ortho Slippers
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $32.50
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'ortho-slippers',
                                            name: 'Ortho Slippers',
                                            price: 32.50,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhtfXAc-qYUFQD3dnT-5nUMUcoPFM26pSgcwWWBFe-Kgf0OgisG5VpDufC7hWDKJSXMiF3bSrwYP2S9eH2hUiYiQI1Klvs3bqQBJp04UKm7yF4VEmwcQyH4l5zPja7nDfU358R50ZQZFjXfUV4UDO1gGYS9MjkTb3AxKapuKRRSx4o6NdgbdyoHlxNm2aqJeAHPDIkUqG4O-Ylbp6I1elNscetNVIKd3_0DfDLWva2EZPl-hysVF3JjbGyORreRYwBFTP2h08Gh4o"
                                        });
                                        window.alert('Ortho Slippers이(가) 장바구니에 담겼습니다.');
                                    }}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer">
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Tendonitis
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Elastic wrist compression band on arm"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNcLFJxPMBGHCOBGS80jibnSGAzNZQQKa8qmz79dAH1FstJ7o_I-B-zioMD2k5TBcpAlR97B_luYuVLOmHbtjTMAs2A87-Q15GN9Rjw7iLYTX5tXhf2hLdFJADzuT9o3ggc2IC6b17X8cfzC6h99w4A8R6EORFqQxrRx2csJrT5XdcDuJNuFz5EortFD3-bTkuqW5r_jG_Cx75DA129c1ZHfCTdASjPeDmt-M_Fk3q3QhUIXeN0jOq5Hlv3uLVqkQ0zhhaLQitmAQ"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Wrist Stabilizer
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $24.00
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'wrist-stabilizer',
                                            name: 'Wrist Stabilizer',
                                            price: 24.00,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNcLFJxPMBGHCOBGS80jibnSGAzNZQQKa8qmz79dAH1FstJ7o_I-B-zioMD2k5TBcpAlR97B_luYuVLOmHbtjTMAs2A87-Q15GN9Rjw7iLYTX5tXhf2hLdFJADzuT9o3ggc2IC6b17X8cfzC6h99w4A8R6EORFqQxrRx2csJrT5XdcDuJNuFz5EortFD3-bTkuqW5r_jG_Cx75DA129c1ZHfCTdASjPeDmt-M_Fk3q3QhUIXeN0jOq5Hlv3uLVqkQ0zhhaLQitmAQ"
                                        });
                                        window.alert('Wrist Stabilizer이(가) 장바구니에 담겼습니다.');
                                    }}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer">
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Therapy
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Assorted colored resistance bands for therapy"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw-fKa2OcfPPWroVCf1CGyuUNPEDxZyh_qNfO4ywIs_SBcdeO60xmmRixZla8TWXkWI-NR6FgCi8KDJ7ISavkqeW2yi_whFb68346Y7-6lJvjdQFX3sIcrz-USONwEx-9cCB99KCRW6etkmOvyQK-ltPXfzgohyGn6urKsQgZOl-VLzdSwTL-O_tP-WOV-LTjPwlt6ZjJDyrFqNJHlzi5mplG-xLiVL0s78KYRgDipN7jASHen93QYmQG_Hus1xfKtFEeym5PryyQ"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Flex Bands
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $15.00
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'flex-bands',
                                            name: 'Flex Bands',
                                            price: 15.00,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw-fKa2OcfPPWroVCf1CGyuUNPEDxZyh_qNfO4ywIs_SBcdeO60xmmRixZla8TWXkWI-NR6FgCi8KDJ7ISavkqeW2yi_whFb68346Y7-6lJvjdQFX3sIcrz-USONwEx-9cCB99KCRW6etkmOvyQK-ltPXfzgohyGn6urKsQgZOl-VLzdSwTL-O_tP-WOV-LTjPwlt6ZjJDyrFqNJHlzi5mplG-xLiVL0s78KYRgDipN7jASHen93QYmQG_Hus1xfKtFEeym5PryyQ"
                                        });
                                        window.alert('Flex Bands이(가) 장바구니에 담겼습니다.');
                                    }}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer">
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-1">
                            <span className="material-symbols-outlined gold-cross text-lg font-bold">
                                medical_services
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                                RX ONLY
                            </span>
                        </div>
                        <div className="absolute top-8 left-0 right-0 z-10 flex justify-center">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                Rx: Relief
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] w-full p-4 flex items-center justify-center rx-vignette mt-6">
                            <img
                                alt="Soft electric heating pad"
                                className="object-contain h-full w-full drop-shadow-lg mix-blend-multiply transform transition-transform group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi6rr41lBqy5oRWcxRRHRyxZpNP7Ve_KXtgi7TvRXV_D9eUX0uxjlZrqCdZpzHQ5xu9Ah27lJIdOM-5xR2ZrEFKkewh8iL4tMIn9IxZtJfLpJ6eTASSvzZZRGiCT_H-jYQEPU_NdKq1Abcotbx3fjvwpB8_3TkpO556Qzaza9aKAMga8g2hsOfvI1c15jRP00HFBxG8LE4cWjzYpZbizMO_RU8-z3kkigtim5X-HsTi9S8L28NSVDOegnZVhbEb0JQvkrmiRGwDVI"
                            />
                        </div>
                        <div className="relative z-10 px-3 pb-4 pt-1 flex flex-col gap-1 bg-white/60 backdrop-blur-[1px]">
                            <h3 className="font-handwriting text-lg text-slate-800 leading-tight transform -rotate-1 origin-left border-b border-dashed border-slate-300 pb-1">
                                Heat Pad
                            </h3>
                            <div className="flex items-end justify-between mt-3">
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
                                        COST
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 font-handwriting">
                                        $55.00
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: 'heat-pad',
                                            name: 'Heat Pad',
                                            price: 55.00,
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi6rr41lBqy5oRWcxRRHRyxZpNP7Ve_KXtgi7TvRXV_D9eUX0uxjlZrqCdZpzHQ5xu9Ah27lJIdOM-5xR2ZrEFKkewh8iL4tMIn9IxZtJfLpJ6eTASSvzZZRGiCT_H-jYQEPU_NdKq1Abcotbx3fjvwpB8_3TkpO556Qzaza9aKAMga8g2hsOfvI1c15jRP00HFBxG8LE4cWjzYpZbizMO_RU8-z3kkigtim5X-HsTi9S8L28NSVDOegnZVhbEb0JQvkrmiRGwDVI"
                                        });
                                        window.alert('Heat Pad이(가) 장바구니에 담겼습니다.');
                                    }}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-grid-primary hover:bg-grid-primary-dark text-white shadow-lg shadow-primary/20 transition-colors active:scale-95 cursor-pointer">
                                    <span className="material-symbols-outlined text-xl font-bold">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-6 p-6 rounded-2xl bg-white dark:bg-gray-800 paper-shadow border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-white opacity-90 pointer-events-none bg-pattern-dots"
                    ></div>
                    <div className="relative z-10 flex flex-col items-center text-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-grid-primary/10 flex items-center justify-center text-grid-primary mb-1">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "28px" }}
                            >
                                medical_services
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-text-main dark:text-white">
                            Not sure what you need?
                        </h3>
                        <p className="text-text-secondary dark:text-gray-400 text-sm">
                            Consult Dr. Smith directly for a personalized prescription.
                        </p>
                        <button className="mt-2 w-full max-w-[200px] h-11 rounded-xl bg-text-main text-white font-bold text-sm shadow-lg hover:bg-black transition-colors cursor-pointer">
                            Start Consultation
                        </button>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-24 right-4 z-40">
                <button className="flex items-center gap-3 bg-grid-primary hover:bg-grid-primary-dark text-text-main font-bold py-3 pl-4 pr-5 rounded-xl shadow-xl shadow-primary/30 transition-all hover:scale-105 group cursor-pointer">
                    <span className="bg-white/20 rounded-lg p-1">
                        <span
                            className="material-symbols-outlined text-white"
                            style={{ fontSize: "20px" }}
                        >
                            chat
                        </span>
                    </span>
                    <span className="text-white text-sm">Ask Nurse</span>
                </button>
            </div>
            <nav className="fixed bottom-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-safe">
                <div className="flex justify-around items-center h-16 px-2">
                    <a
                        href="/"
                        className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-grid-primary transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                            home
                        </span>
                        <span className="text-[10px] font-bold">Home</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 p-2 text-grid-primary cursor-pointer"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined fill-current material-symbols-filled"
                            style={{ fontSize: "24px" }}
                        >
                            storefront
                        </span>
                        <span className="text-[10px] font-bold">Shop</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-text-main dark:hover:text-white transition-colors cursor-pointer"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "24px" }}
                        >
                            stethoscope
                        </span>
                        <span className="text-[10px] font-bold">Consult</span>
                    </a>
                    <a
                        className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-text-main dark:hover:text-white transition-colors cursor-pointer"
                        href="#"
                    >
                        <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                            <img
                                alt="Profile"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4iduQdp3Y3MYTBto1Dqak0TgzoB0aNCyH-lp0_QiQEMCLGXM995lzUL-1YuJThkP6TidisZzrpbtdyhsdeGe7kozltsjVtyWlI0NYGMOOC53NNSCa-uW4tqPUFvvh1OVsHgm6HtAV7o9yKaLcrRkgstAfv7u1z3eKDbq3gpmCHTFOfy786r5Yyb_ntBsmdNPx79dY8leWwH9PgZGIOI7Gs85t1tPLVeDU3OcyLhj9PEBp95b-iP-JJkaHtjTlWaNt2qadQNGIHAI"
                            />
                        </div>
                        <span className="text-[10px] font-bold">Profile</span>
                    </a>
                </div>
            </nav>
            <div className="h-safe-bottom bg-white dark:bg-gray-900"></div>
        </div>
    );
}
