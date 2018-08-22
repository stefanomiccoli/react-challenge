import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./grid.scss";

const Grid = props => {
  const { size, baseColor, selectedColor, selected, onSelect } = props;

  // prepare styled component for standard and correct cell
  const BaseCell = styled.div`
    background-color: hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%);
  `;
  const SelectedCell = styled.div`
    background-color: hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%);
  `;

  let i = 0;
  const grid = [];
  let cells = [];
  for (var r = 0; r < size; r++) {
    // add cells to row
    cells = [];
    for (var c = 0; c < size; c++) {
      const currentIndex = i;
      cells.push(
        <div className={i === selected ? "chosen-cell box" : "box"} onClick={() => onSelect(currentIndex)} key={currentIndex}>
          {i === selected && <SelectedCell className="inner" />}
          {i !== selected && <BaseCell className="inner" />}
        </div>
      );
      i++;
    }
    // add rows to grid
    grid.push(
      <div className="row" key={r}>
        {cells}
      </div>
    );
  }

  return (
    <div>
      <div className="grid">{grid}</div>
    </div>
  );
};

const HSLType = PropTypes.shape({
  h: PropTypes.number,
  s: PropTypes.number,
  l: PropTypes.number
});

Grid.propTypes = {
  size: PropTypes.number.isRequired,
  baseColor: HSLType.isRequired,
  selectedColor: HSLType.isRequired,
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func
};

export default Grid;
