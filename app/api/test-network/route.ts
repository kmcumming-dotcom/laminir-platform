import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/github");
    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: "Network works!",
      githubUser: data.login 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}