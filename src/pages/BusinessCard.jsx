import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp, FaViber, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import bgImage from "../assets/shorttime-bg.jpg";
import "./BusinessCard.css";

export default function BusinessCard() {
    const { slug } = useParams();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        loadBusiness();
    }, [slug]);

    async function loadBusiness() {
        const { data, error } = await supabase
            .from("business_cards")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) console.error(error);
        setBusiness(data);
    }

    if (!business) return <h2 className="loading">Loading...</h2>;

    const phone = business.phone || "";
    const whatsapp = business.whatsapp || phone;
    const viber = business.viber || phone;

    return (
        <main className="page" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="overlay">
                <section className="content">
                    <section className="glass-box title-box" dir="rtl">
                        ئاڵو گۆڕ - ناردنی پارەی ناوخۆ - ناردنی پارەی دەرەوە
                    </section>

                    <section className="glass-box kurdish-box" dir="rtl">
                        ئێمە لێرەین بۆ جێبەجێ کردنی مامەڵە داراییەکانت وەک
                        ئاڵو و گۆڕی دراو یاخود ناردنی پارە بەشێوازی کاش یاخود
                        لەڕێگای بانک، سەردانمان بکە و کارەکانتان بۆ جێبەجێ
                        دەکەین بە باشترین شێواز و بە زووترین کات
                    </section>

                    <section className="glass-box english-box">
                        We are here to handle your financial transactions such as currency
                        exchange or send money in cash or through bank. Visit us and we will
                        do your job in the best way and as soon as possible.
                    </section>

                    <section className="glass-box bottom-line" dir="rtl">
                        مامەڵەی دارای لەگەڵ هەموو وڵاتانی ئاسیا و ئەوروپا و ئەمریکاو ئەفریقا
                    </section>

                    <section className="contact-icons">
                        {whatsapp && (
                            <a
                                className="contact-item whatsapp"
                                href={`https://wa.me/${whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="circle">
                                    <FaWhatsapp />
                                </div>
                                <span>WhatsApp</span>
                            </a>
                        )}

                        {viber && (
                            <a
                                className="contact-item viber"
                                href={`viber://chat?number=${viber}`}
                            >
                                <div className="circle">
                                    <FaViber />
                                </div>
                                <span>Viber</span>
                            </a>
                        )}

                        {phone && (
                            <a className="contact-item call" href={`tel:${phone}`}>
                                <div className="circle">
                                    <FaPhoneAlt />
                                </div>
                                <span>Call Now</span>
                            </a>
                        )}
                    </section>

                    <a
                        className="site-footer"
                        href="https://shorttime-iq.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGlobe />
                        <span>shorttime-iq.com</span>
                    </a>
                </section>
            </div>
        </main>
    );
}