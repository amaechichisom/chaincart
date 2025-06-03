import { IPriceBox } from "./PriceBox";

export function SpecialPrice({ price, isSpecialOffer = false }: IPriceBox) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        {price?.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 8,
        })}
      </h2>

      {isSpecialOffer && (
        <div className="mb-3">
          <p className="text-sm font-medium text-blue-600 mb-1">
            Special offer:
          </p>
          <div className="flex gap-2 text-xs text-white">
            <div className="bg-blue-500 px-2 py-1 rounded">4d</div>
            <div className="bg-blue-500 px-2 py-1 rounded">23h</div>
            <div className="bg-blue-500 px-2 py-1 rounded">25m</div>
          </div>
        </div>
      )}
    </section>
  );
}
