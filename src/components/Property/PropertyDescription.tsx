export default function PropertyDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="prose max-w-none text-sm text-neutral-700 mt-10">
      <h4 className="text-lg font-semibold">Description</h4>
      {description ?? (
        <>
          <p>
            Located in the heart of Lekki’s vibrant and nature-rich corridor,
            this stylish 3-bedroom flat offers the perfect blend of comfort,
            convenience, and cultural immersion. Whether you’re a wildlife
            enthusiast, a beach lover, or an art admirer, this beautifully
            furnished apartment places you right next to some of Lagos’ most
            iconic attractions.
          </p>{" "}
          *<h5 className="mt-4 font-medium">The Space:</h5>
          <ul className="list-disc list-inside">
            <li>
              Three airy, well-lit bedrooms with queen-size beds and cozy linens
            </li>
            <li>A fully equipped kitchen perfect for home-cooked meals</li>
            <li>
              A tastefully decorated living area with smart TV, Wi-Fi, and a
              dining space for up to 6
            </li>
            <li>
              Two sleek bathrooms with hot water and complimentary toiletries
            </li>
            <li>
              Private balcony overlooking a quiet street, ideal for morning
              coffee or evening wind-downs
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
