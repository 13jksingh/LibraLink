import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  if (path === "all") {
    revalidatePath("student")
    revalidatePath("book")
  } else {
    revalidatePath(path)
  }
  revalidatePath("/dashboard");
  return NextResponse.json({ revalidated: true, now: Date.now() })
}