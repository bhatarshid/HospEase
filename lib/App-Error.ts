import { NextResponse } from "next/server";
import { ZodError } from "zod";

class AppError extends Error {
    constructor(message: string, statuscode: number){
        super(message);
        this.statusCode = statuscode;
        this.explanation = message;
    }
    
    public statusCode: number;
    public explanation: string;
}

export function handleErrorNextResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
  }

  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export default AppError 