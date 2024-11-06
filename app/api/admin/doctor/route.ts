import { NextRequest, NextResponse } from "next/server";
import { createDoctor } from "./post";

// TODO: Add admin authorization in below apis

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  switch (action) {
    case 'create':
      return createDoctor(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}