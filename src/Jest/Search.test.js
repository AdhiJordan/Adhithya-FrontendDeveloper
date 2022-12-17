import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import Dashboard from './../Pages/Dashboard';

describe('List launches Sort', () => {
    it('renders default state', () => {
        const { getByTestId } = render(<Dashboard />);

        const serach_by_orbit = getByTestId('Search_orbit');
        const submit = getByTestId('searchByOrbitButton');

        expect(serach_by_orbit.value).toBe('');
        expect(submit).toHaveClass('Mui-disabled');
    });

    it('submit button to search by orbit', () => {
        const { getByTestId } = render(<Dashboard />);

        const serach_by_orbit = getByTestId('Search_orbit');
        const submit = getByTestId('searchByOrbitButton');

        fireEvent.click(confirm);
        expect(submit).toHaveClass('Mui-disabled');
    });
});
