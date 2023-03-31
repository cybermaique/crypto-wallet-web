const formatValue = (value: number): string | undefined => {
  if (value === 0) return undefined;

  const units = [
    { limit: 1e12, symbol: 'T' },
    { limit: 1e9, symbol: 'B' },
    { limit: 1e6, symbol: 'M' },
    { limit: 1e3, symbol: 'K' },
  ];

  let formattedValue = '';
  units.some((unit) => {
    if (value >= unit.limit) {
      formattedValue = `U$${(value / unit.limit).toFixed(1)}${unit.symbol}`;
      return true;
    }
    return false;
  });

  return formattedValue || `U$${value.toFixed(1)}`;
};

export default formatValue;
