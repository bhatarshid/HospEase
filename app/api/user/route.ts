import { NextRequest, NextResponse } from "next/server";
import { registerPatient, signup } from "./post";
import { getAllUsers, getUserFromPhoneNumberOrID } from "./get";

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'signup':
      return signup(request);
    case 'register':
      return registerPatient(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'all':
      return getAllUsers();
    case 'single':
      return getUserFromPhoneNumberOrID(request);
    default:
      return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  }
}