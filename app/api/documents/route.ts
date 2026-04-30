export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  // TODO: Finish API route
  
  return new Response(JSON.stringify({ success: true, name }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
