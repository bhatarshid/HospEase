import { NextRequest, NextResponse } from "next/server";
import { getAllServices } from "./get";

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'all':
      return getAllServices();
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}