import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const PROXY_URL = process.env.OTEL_PROXY_URL;

export async function POST(request: NextRequest) {
  if (!PROXY_URL) {
    return new Response(null, { status: 204 });
  }

  const body = await request.arrayBuffer();
  const contentType =
    request.headers.get('content-type') ?? 'application/x-protobuf';

  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'content-type': contentType,
    },
    body,
    cache: 'no-store',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      'content-type':
        response.headers.get('content-type') ?? 'application/json',
    },
  });
}
