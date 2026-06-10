import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import QRCode from "qrcode";
import { supabase } from "../lib/supabase";

export default function QrCodePage() {
    const { slug } = useParams();
    const [business, setBusiness] = useState(null);
    const [qrImage, setQrImage] = useState("");

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

        if (data) {
            setBusiness(data);

            const cardUrl = `${window.location.origin}/card/${data.slug}`;
            const qr = await QRCode.toDataURL(cardUrl, {
                width: 400,
                margin: 2,
            });

            setQrImage(qr);
        }
    }

    if (!business) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    return (
        <div style={{ minHeight: "100vh", padding: "30px", textAlign: "center" }}>
            <h1>{business.business_name}</h1>
            <p>Scan this QR code to open the business card</p>

            {qrImage && (
                <>
                    <img
                        src={qrImage}
                        alt="QR Code"
                        style={{ width: "280px", maxWidth: "100%" }}
                    />

                    <br />

                    <a href={qrImage} download={`${business.slug}-qr.png`}>
                        <button style={{ padding: "12px 20px", marginTop: "20px" }}>
                            Download QR Code
                        </button>
                    </a>
                </>
            )}

            <br />
            <br />

            <Link to={`/card/${business.slug}`}>Open Business Card</Link>
        </div>
    );
}