import { NextRequest, NextResponse } from "next/server";
import { createService, addServiceDoctor } from "./post";

// TODO: Add admin authorization in below apis

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  switch (action) {
    case 'create':
      return createService(request);
    case 'add':
      return addServiceDoctor(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}