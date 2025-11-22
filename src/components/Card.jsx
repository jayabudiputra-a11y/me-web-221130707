export default function Card({ title, children, variant = "default" }) {
  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass =
        "bg-indigo-600 text-white shadow-lg border border-indigo-700";
      break;

    case "soft":
      variantClass =
        "bg-indigo-100 text-indigo-900 border border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-700";
      break;

    case "glass":
      variantClass =
        "card-glass backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-xl overflow-visible";
      break;

    default:
      variantClass = "";
  }

  return (
    <section className={`card card-float overflow-visible ${variantClass}`}>
      {title && <h2 className="section-title mb-3">{title}</h2>}
      {children}
    </section>
  );
}
