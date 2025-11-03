import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      carReg,
      pickup,
      dropoff,
      date,
      time,
      rolling,
      message = "",
    } = body;

    // Validation
    if (!phone || !email || !carReg || !pickup || !dropoff || !date || !time || !rolling) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        name: name || "",
        phone,
        email,
        carRegistration: carReg,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        date,
        time,
        isRolling: rolling,
        message: message || "",
        status: "pending",
      },
    });

    // TODO: Send email notification using Resend, SendGrid, etc.
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM,
    //   to: process.env.EMAIL_TO,
    //   subject: `New Booking: ${carReg}`,
    //   html: `<p>New booking from ${name}</p>...`
    // });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        message: "Booking submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking", detail: error.message },
      { status: 500 }
    );
  }
}
