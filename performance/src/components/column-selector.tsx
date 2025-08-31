import { useEffect, useState } from "react";

import Modal from "./modal";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  availableColumns: string[];
  selectedColumns: string[];
  onColumnsChange: (columns: string[]) => void;
}

function ColumnSelector({ isOpen, onClose, availableColumns, selectedColumns, onColumnsChange }: Props) {
  const [tempSelection, setTempSelection] = useState(selectedColumns);

  useEffect(() => {
    if (isOpen) {
      setTempSelection(selectedColumns);
    }
  }, [isOpen, selectedColumns]);

   const handleCheckboxChange = (column: string, isChecked: boolean) => {
     if (isChecked) {
       setTempSelection((prev) => [...prev, column]);
     } else {
       setTempSelection((prev) => prev.filter((col) => col !== column));
     }
   };

  const handleApply = () => {
    onColumnsChange(tempSelection);
    onClose();
  }

  const handleReset = () => {
    setTempSelection([]);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Select Columns">
      <div className="custom-scrollbar max-h-[60vh] space-y-3 overflow-y-auto">
        {availableColumns.map((column) => (
          <label key={column} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={tempSelection.includes(column)}
              onChange={(e) => handleCheckboxChange(column, e.target.checked)}
              className="ha-4 w-4"
            />
            <span className="capitalize">{column.replace(/_/g, ' ')}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <button type="button" className="custom-button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" className="custom-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default ColumnSelector;
