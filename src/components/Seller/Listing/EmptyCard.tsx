function EmptyCard({ image, title, text, buttonText, buttonHref }: {
  image: string;
  title: string;
  text: string;
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white rounded-lg ">
      <img src={image} alt="empty state" className="w-40 h-40 object-contain mb-4" />
      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 mb-4">{text}</p>
      <a
        href={buttonHref}
        className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        {buttonText}
      </a>
    </div>
  );
}

export default EmptyCard;
