import { useState } from "react";

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

  const handleApply = () => {
    onColumnsChange(tempSelection);
    onClose();
  }

  const handleCancel = () => {
    setTempSelection(selectedColumns); 
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Select Columns">
      <div className="space-y-3">
        {availableColumns.map((column) => (
          <label
            key={column}
            className="flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={tempSelection.includes(column)}
              className="ha-4 w-4"
            />
            <span className="capitalize">{column.replace(/_/g, ' ')}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button type="button" className="custom-button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="custom-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default ColumnSelector;
