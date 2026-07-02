import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextRequest, NextResponse } from "next/server";

// Aquest endpoint sempre s'ha d'executar al servidor, mai cachejat.
export const dynamic = "force-dynamic";

const SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        if (!SECRET) {
            return NextResponse.json(
                { message: "Falta SANITY_WEBHOOK_SECRET al servidor" },
                { status: 500 }
            );
        }

        // Llegim el cos CRU (string) perquè la firma es calcula sobre el text exacte.
        const body = await req.text();
        const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? "";

        const valid = await isValidSignature(body, signature, SECRET);
        if (!valid) {
            return NextResponse.json(
                { message: "Firma del webhook invàlida" },
                { status: 401 }
            );
        }

        // Regenerem la pàgina d'inici (única pàgina que consumeix Sanity).
        revalidatePath("/");

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error("Error revalidant:", err);
        return NextResponse.json(
            { message: "Error intern revalidant" },
            { status: 500 }
        );
    }
}
