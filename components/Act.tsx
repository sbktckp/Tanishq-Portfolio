/**
 * A full-screen interlude where the particles spell a word. The same word is in
 * the page as text for screen readers, and shows when the 3D scene is off.
 */
export default function Act({
  id,
  word,
  caption,
}: {
  id: string;
  word: string;
  caption: string;
}) {
  return (
    <section id={id} className="relative h-[150vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-5 text-center">
        <h2 className="act-word text-gradient text-[clamp(3rem,15vw,12rem)] font-extrabold leading-none tracking-tighter">
          {word}
        </h2>
        <p className="absolute inset-x-5 bottom-16 mx-auto w-fit max-w-full rounded-full border border-line bg-night/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-ink sm:text-sm">
          {caption}
        </p>
      </div>
    </section>
  );
}
