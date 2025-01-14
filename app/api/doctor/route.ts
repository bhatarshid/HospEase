import { NextRequest, NextResponse } from "next/server";
import { getAllDoctors, getDoctorById } from "./get";

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  switch (action) {
    case "all":
      return getAllDoctors();
    case "single":
      return getDoctorById(request);
    default:
      return NextResponse.json({ message: "Route not found" }, { status: 404 });
  }
}