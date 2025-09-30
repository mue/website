export const metadata = {
  title: "Uninstall Survey - Mue Tab",
  description: "Help us improve Mue by sharing your feedback",
};

export default function UninstallPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center">
        <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          We&apos;re sorry to see you go
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          Your feedback helps us make Mue better for everyone. Please take a
          moment to share why you&apos;re uninstalling.
        </p>

        <div className="mt-12 w-full min-h-screen">
          <div className="mx-auto max-w-3xl lg:p-12 px-3 py-1 bg-[#B13854] rounded-xl">
            <iframe
              data-tally-src="https://tally.so/embed/nPpGd1?hideTitle=1&amp;dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="858"
              title="Thank you for using Mue."
              data-tally-embed-widget-initialized="1"
              src="https://tally.so/embed/nPpGd1?hideTitle=1&amp;dynamicHeight=1&amp;originPage=%2Funinstall"
              id="iFrameResizer0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
