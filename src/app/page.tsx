import ClickToCallWidget from "@/components/click-to-call-widget";

export default function Home() {
  return (
    <>
      <main className="container mx-auto p-8 min-h-screen">
        <header className="text-center my-12 md:my-20">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
            Click2Call Widget
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Este es un demo de un botón flotante de "Click to Call".
            Desplázate hacia abajo para ver que el botón permanece fijo en su
            lugar.
          </p>
        </header>

        <div className="space-y-6 text-lg max-w-4xl mx-auto leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Integer vitae justo eget magna fermentum iaculis. Proin gravida nibh
            vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum
            auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
            Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a
            ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.
          </p>
          <p>
            Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
            Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
            libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
            blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio
            et ante tincidunt tempus. Donec vitae sapien ut libero venenatis
            faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec
            sodales sagittis magna.
          </p>
        </div>
      </main>
      <ClickToCallWidget />
    </>
  );
}
