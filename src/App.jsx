import { useEffect, useState } from "react";
import {
  DEFAULT_BASE_CODE,
  DEFAULT_BASE_VALUE,
  DEFAULT_TARGET_CODE,
  DEFAULT_TARGET_VALUE,
  DEFAULT_TO_FIXED,
} from "./constants";
import { useConversionRate } from "./hooks/useConversionRate";
import Spinner from "./components/spinner/Spinner";
import Error from "./components/error/Error";
import CurrencyRow from "./components/currency-row/CurrencyRow";

function App() {
  const [baseCode, setBaseCode] = useState(DEFAULT_BASE_CODE);
  const [targetCode, setTargetCode] = useState(DEFAULT_TARGET_CODE);
  const [baseValue, setBaseValue] = useState(DEFAULT_BASE_VALUE);
  const [targetValue, setTargetValue] = useState(DEFAULT_TARGET_VALUE);
  const { conversionRate, isLoading, error, clearError } = useConversionRate({
    baseCode,
    targetCode,
  });

  // Обработчик для изменения значения baseValue
  const onBaseValueChange = (e) => {
    const value = Number(e.target.value);
    setBaseValue(value);
    if (conversionRate) {
      const targetValue = value * conversionRate;
      setTargetValue(targetValue.toFixed(DEFAULT_TO_FIXED));
    }
  };

  // Обработчик для изменения значения targetValue
  const onTargetValueChange = (e) => {
    const value = Number(e.target.value);
    setTargetValue(value);
    if (conversionRate) {
      const baseValue = value / conversionRate;
      setBaseValue(baseValue.toFixed(DEFAULT_TO_FIXED));
    }
  };

  const setDefaultValues = () => {
    setBaseValue(DEFAULT_BASE_VALUE);
    setTargetValue(DEFAULT_TARGET_VALUE);
  };

  // Обработчик для изменения baseCode
  const onBaseCodeChange = (value) => {
    setDefaultValues();
    setBaseCode(value);
  };

  // Обработчик для изменения targetCode
  const onTargetCodeChange = (value) => {
    setDefaultValues();
    setTargetCode(value);
  };

  // Обновление targetValue, если conversionRate меняется
  useEffect(() => {
    if (conversionRate) {
      setTargetValue((baseValue * conversionRate).toFixed(DEFAULT_TO_FIXED));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversionRate]);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Error description={error} onClose={clearError} />}

      <div className="container">
        <h1>Конвертер валют</h1>
        <CurrencyRow
          hasMargin
          inputValue={baseValue}
          inputDisabled={isLoading}
          selectValue={baseCode}
          onInputChange={onBaseValueChange}
          onSelectChange={onBaseCodeChange}
        />
        <CurrencyRow
          inputValue={targetValue}
          inputDisabled={isLoading}
          selectValue={targetCode}
          onInputChange={onTargetValueChange}
          onSelectChange={onTargetCodeChange}
        />
      </div>
    </>
  );
}

export default App;
