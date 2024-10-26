import { NextRequest, NextResponse } from "next/server";
import { getAllServices, getServiceDetails } from "./get";
import { bookAppointment } from "./post";

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'all':
      return getAllServices();
    case 'view':
      return getServiceDetails(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'appointment':
      return bookAppointment(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}