import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id }
        });

        if (!post) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();

        const post = await prisma.post.update({
            where: { id: params.id },
            data: {
                title: data.title,
                content: data.content,
                image: data.image || null,
                category: data.category,
                layoutType: data.layoutType,
                published: data.published,
                metaDescription: data.metaDescription || null,
                tags: data.tags || null,
                scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await prisma.post.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
