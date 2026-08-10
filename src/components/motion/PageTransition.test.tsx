import { describe, expect, it, beforeEach } from "vitest";
import { act, render, screen, waitFor, cleanup } from "@testing-library/react";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { PageTransition, RouteProgress } from "./PageTransition";

/** كل مسارات المنصة (تُحاكى بمحتوى بسيط للتحقق من الرندر بعد الرجوع) */
const PATHS = [
  "/",
  "/cars",
  "/cars/compare",
  "/cars/toyota-camry-2026",
  "/offers",
  "/offers/summer-offer",
  "/purchase",
  "/purchase/customers",
  "/purchase/companies",
  "/services",
  "/about-us",
  "/contact-us",
  "/blog",
  "/blog/first-post",
  "/faq",
  "/jobs",
  "/privacy-policy",
  "/promotional-offers",
] as const;

function buildRouter(initialPath = "/") {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <RouteProgress />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </>
    ),
  });

  const children = PATHS.map((p) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path: p,
      component: () => <main data-testid="page">{`page:${p}`}</main>,
    }),
  );

  return createRouter({
    routeTree: rootRoute.addChildren(children),
    history: createMemoryHistory({ initialEntries: [initialPath] }),
    defaultPendingMs: 0,
  });
}

async function renderRouter(router: ReturnType<typeof buildRouter>) {
  render(<RouterProvider router={router} />);
  await waitFor(() => expect(screen.getByTestId("page")).toBeInTheDocument());
}

describe("PageTransition", () => {
  beforeEach(() => cleanup());

  it("يعرض المحتوى مباشرة عند أول تحميل", async () => {
    const router = buildRouter("/");
    await renderRouter(router);
    expect(screen.getByTestId("page")).toHaveTextContent("page:/");
  });

  it("لا يُخفي المحتوى (لا صفحة بيضاء) بعد الانتقال والرجوع لكل مسار", async () => {
    for (const path of PATHS.filter((p) => p !== "/")) {
      cleanup();
      const router = buildRouter("/");
      await renderRouter(router);

      await act(async () => {
        await router.navigate({ to: path as never });
      });
      await waitFor(() =>
        expect(screen.getByTestId("page")).toHaveTextContent(`page:${path}`),
      );

      await act(async () => {
        router.history.back();
      });

      // الرجوع يجب أن يعيد الصفحة الرئيسية مرئية وغير فارغة
      await waitFor(() => {
        const page = screen.getByTestId("page");
        expect(page).toHaveTextContent("page:/");
        expect(page.textContent?.trim().length).toBeGreaterThan(0);
      });
      expect(screen.queryAllByTestId("page")).toHaveLength(1);
    }
  }, 30000);

  it("يبقى المحتوى ظاهرًا بعد رجوع متكرر عبر عدة مسارات", async () => {
    const router = buildRouter("/");
    await renderRouter(router);

    const trail = ["/cars", "/cars/toyota-camry-2026", "/purchase", "/blog"];
    for (const p of trail) {
      await act(async () => {
        await router.navigate({ to: p });
      });
    }
    for (let i = trail.length - 1; i >= 0; i--) {
      await act(async () => {
        router.history.back();
      });
      const expected = i === 0 ? "/" : trail[i - 1];
      await waitFor(() =>
        expect(screen.getByTestId("page")).toHaveTextContent(`page:${expected}`),
      );
    }
    expect(screen.getByTestId("page")).toHaveTextContent("page:/");
  }, 20000);

  it("لا يُنشئ نسخًا معلّقة من الصفحة (لا تراكم AnimatePresence)", async () => {
    const router = buildRouter("/");
    await renderRouter(router);

    await act(async () => {
      await router.navigate({ to: "/cars" });
    });
    await act(async () => {
      router.history.back();
    });
    await act(async () => {
      await router.navigate({ to: "/offers" });
    });

    await waitFor(() =>
      expect(screen.getByTestId("page")).toHaveTextContent("page:/offers"),
    );
    expect(screen.queryAllByTestId("page")).toHaveLength(1);
  });

  it("عنصر الانتقال لا يترك opacity=0 بعد اكتمال الحركة", async () => {
    const router = buildRouter("/");
    await renderRouter(router);

    await act(async () => {
      await router.navigate({ to: "/cars" });
    });
    await act(async () => {
      router.history.back();
    });

    await waitFor(() => {
      const wrapper = screen.getByTestId("page").parentElement as HTMLElement;
      const opacity = wrapper.style.opacity;
      expect(opacity === "" || Number(opacity) > 0).toBe(true);
    });
  });
});

describe("RouteProgress", () => {
  it("لا يظهر شريط التحميل عند التنقل الفوري", async () => {
    const router = buildRouter("/");
    await renderRouter(router);

    await act(async () => {
      await router.navigate({ to: "/faq" });
    });
    await waitFor(() =>
      expect(screen.getByTestId("page")).toHaveTextContent("page:/faq"),
    );
    expect(document.querySelector(".origin-right")).toBeNull();
  });
});
