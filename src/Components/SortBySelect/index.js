import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        width: '100%',
    }),
    control: (provided, state, props) => ({
        ...provided,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0,
        },
        width: '100%',
        height: 45,
        minHeight: 45,
        marginTop: '12px',
        borderRadius: '4px',
        background: '#F0F3F8',
        cursor: 'pointer',
    }),
    placeholder: (provided, state) => ({
        color: '#c2c4d1',
        position: 'absolute',
        fontWeight: 300,
        paddingLeft: 12,
        fontSize: '0.96rem',
    }),
    indicatorsContainer: (provided, state) => ({
        border: 'none',
        marginRight: 10,
    }),
    menu: (provided, state) => ({
        ...provided,
        border: '1px solid #ebebeb',
        width: '100%',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#91A2B2',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '24px',
    }),
};

const SortBySelect = ({ sortByOptions, userSelectedValue, id }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [listedOptions, setListedOptions] = useState(sortByOptions);

    const handleSelection = (selectedValue) => {
        userSelectedValue(selectedValue.value);
    };

    return (
        <Select
            options={listedOptions}
            styles={customStyles}
            // value={selectedValue ? selectedValue : listedOptions[0]}
            onChange={handleSelection}
            placeholder="Sort By :"
        />
    );
};
export default SortBySelect;
