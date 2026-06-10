import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_PROXY_URL = 'http://tempo:4318/v1/traces';

export async function POST(request: NextRequest) {
  const body = await request.arrayBuffer();
  const contentType =
    request.headers.get('content-type') ?? 'application/x-protobuf';

  const response = await fetch(DEFAULT_PROXY_URL, {
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
