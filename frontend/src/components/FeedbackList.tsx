type FeedbackListProps = {
  title: string;
  items: string[];
};

function FeedbackList({
  title,
  items,
}: FeedbackListProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-3 text-gray-700"
          >
            <span className="font-bold text-blue-600">
              •
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeedbackList;