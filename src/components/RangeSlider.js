import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


const RangeSlider = (props) => {

    const handleRangeSliderInputChanges = ({ min, max }) => {
        props.setMinAndMaxSelected({min, max, name: props.name });
    }

    return (
      <InputRange
        maxValue={props.initMaxValue}
        minValue={props.initMinValue}
        value={{ min: props.minSelected, max: props.maxSelected }}
        onChange={handleRangeSliderInputChanges}
        allowSameValues={true}
      />
    );
  }

  export default RangeSlider;
