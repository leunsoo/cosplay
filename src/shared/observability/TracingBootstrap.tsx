'use client';

import { useEffect } from 'react';
import { getApiConfig } from '@/shared/api/apiConfig';

declare global {
  interface Window {
    __llowaTracingInitialized?: boolean;
  }
}

type TracingBootstrapProps = {
  serviceName: string;
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPropagationTargets(apiBaseUrl: string) {
  const targets: RegExp[] = [/^\/api\//];

  if (!apiBaseUrl) {
    return targets;
  }

  try {
    const origin = new URL(apiBaseUrl, window.location.origin).origin;
    targets.push(new RegExp(`^${escapeRegex(origin)}`));
  } catch {
    return targets;
  }

  return targets;
}

export function TracingBootstrap({ serviceName }: TracingBootstrapProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (window.__llowaTracingInitialized) {
      return;
    }

    window.__llowaTracingInitialized = true;

    void (async () => {
      const [
        { resourceFromAttributes },
        { SEMRESATTRS_DEPLOYMENT_ENVIRONMENT, SEMRESATTRS_SERVICE_NAME },
        { SimpleSpanProcessor },
        { WebTracerProvider },
        { ZoneContextManager },
        { OTLPTraceExporter },
        { registerInstrumentations },
        { DocumentLoadInstrumentation },
        { FetchInstrumentation },
        { XMLHttpRequestInstrumentation },
      ] = await Promise.all([
        import('@opentelemetry/resources'),
        import('@opentelemetry/semantic-conventions'),
        import('@opentelemetry/sdk-trace-base'),
        import('@opentelemetry/sdk-trace-web'),
        import('@opentelemetry/context-zone'),
        import('@opentelemetry/exporter-trace-otlp-http'),
        import('@opentelemetry/instrumentation'),
        import('@opentelemetry/instrumentation-document-load'),
        import('@opentelemetry/instrumentation-fetch'),
        import('@opentelemetry/instrumentation-xml-http-request'),
      ]);

      const ignoredUrls = [/\/api\/otel\/v1\/traces$/];
      const propagateTraceHeaderCorsUrls = buildPropagationTargets(
        getApiConfig().baseURL
      );

      const exporter = new OTLPTraceExporter({
        url: '/api/otel/v1/traces',
      });

      const provider = new WebTracerProvider({
        resource: resourceFromAttributes({
          [SEMRESATTRS_SERVICE_NAME]: serviceName,
          [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: 'browser',
        }),
        spanProcessors: [new SimpleSpanProcessor(exporter)],
      });

      provider.register({
        contextManager: new ZoneContextManager(),
      });

      registerInstrumentations({
        instrumentations: [
          new DocumentLoadInstrumentation(),
          new FetchInstrumentation({
            clearTimingResources: true,
            ignoreUrls: ignoredUrls,
            propagateTraceHeaderCorsUrls,
          }),
          new XMLHttpRequestInstrumentation({
            ignoreUrls: ignoredUrls,
            propagateTraceHeaderCorsUrls,
          }),
        ],
      });
    })().catch((error) => {
      console.error('Failed to initialize browser tracing', error);
      window.__llowaTracingInitialized = false;
    });
  }, [serviceName]);

  return null;
}
