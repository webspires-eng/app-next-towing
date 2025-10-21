const REVIEWS = [
  { name: "Asif K.", text: "Called at 2am on the M60—arrived in 35 minutes. Professional and careful.", rating: 5 },
  { name: "Jodie R.", text: "Flatbed tow from city centre. Clear price upfront, no surprises.", rating: 5 },
  { name: "Mark D.",  text: "Jump start within 25 min. Friendly driver, great service.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="section-alt text-white">
      <div className="container-1300 section-space">
        <header className="section-head">
          <h2 className="text-white">What customers say</h2>
        </header>
        <div className="reviews">
          {REVIEWS.map(r => (
            <figure key={r.name} className="review">
              <div className="stars" aria-label={`${r.rating} out of 5`}>★★★★★</div>
              <blockquote>{r.text}</blockquote>
              <figcaption>— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
