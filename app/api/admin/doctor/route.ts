import { NextRequest, NextResponse } from "next/server";
import { createDoctor, updateDoctor } from "./post";

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

export async function PUT (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  switch (action) {
    case 'update':
      return updateDoctor(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}