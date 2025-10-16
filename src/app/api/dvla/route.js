export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const reg = (searchParams.get("reg") || "").toUpperCase();

  // TODO: replace with a real DVLA/vehicle API later.
  const mock = {
    registration: reg || "OO07 HAD",
    make: "BMW",
    model: "118D",
    bodyType: "5 DOOR HATCHBACK",
    colour: "BLUE",
    year: 2019,
    fuelType: "HEAVY OIL",
    transmission: "Automatic",
    driveType: "FWD",
  };

  return new Response(JSON.stringify(mock), { headers: { "content-type": "application/json" } });
}
