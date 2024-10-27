import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    const { prompt } = await request.json();

    try {
        // 環境変数からAPIキーを取得
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

        // Gemini APIに情報を送信する処理を追加
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const message = 'あなたはプロのエンジニアです。以下のソースをレビューしてください\n\n';
        const result = await model.generateContent(`${message}${prompt}`);
        const response = result.response;
        const text = response.text();
        return NextResponse.json({ review: text });
    } catch (error) {
        console.error('Error fetching Gemini review:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the review' }, { status: 500 });
    }
}
