import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Store in uploads directory
    const uploadsDir = join(process.cwd(), 'uploads');
    const filepath = join(uploadsDir, file.name);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      filename: file.name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}
