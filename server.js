import Fastify from "fastify";
import { createRequestHandler } from "@mcansh/remix-fastify";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({ server: { middlewareMode: true } })
      );

const fastify = Fastify({ logger: true });
fastify.addHook("onRequest", async (request, reply) => {
  if (viteDevServer) {
    await new Promise((resolve, reject) => {
      viteDevServer.middlewares(request.raw, reply.raw, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
});

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await impor("./build/server/index.js");

fastify.get("/", createRequestHandler({ build }));

try {
  await fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(err);
  process.exit(1);
}
