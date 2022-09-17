import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormTaskComplete } from './FormTaskComplete';

describe('FormTaskCompoenent Test', () => {
    test('Loading test', () => {

        render(<FormTaskComplete/>);
        const firstnameField = screen.getByLabelText(/First name/i);
        const lastnameField = screen.getByLabelText(/Last name/i);
        const birthdayField = screen.getByLabelText(/birthday/i);
        const userTypeField = screen.getByLabelText(/user type/i);
        const userInActivityField = screen.getByLabelText(/User Inactivity Date/i);
        const saveButton = screen.getByText(/Save/i);

        expect(firstnameField).toBeInTheDocument();
        expect(lastnameField).toBeInTheDocument();
        expect(birthdayField).toBeInTheDocument();
        expect(userTypeField).toBeInTheDocument();
        expect(userInActivityField).toBeInTheDocument();
    });

    test('Functional test', () => {
        const saveUserForm = jest.fn();
        render(<FormTaskComplete saveUserForm={saveUserForm} />);

        const firstnameField = screen.getByLabelText(/First name/i);
        const lastnameField = screen.getByLabelText(/Last name/i);
        const birthdayField = screen.getByLabelText(/birthday/i);
        const userTypeField = screen.getByLabelText(/user type/i);
        const userInActivityField = screen.getByLabelText(/User Inactivity Date/i);
        const saveButton = screen.getByText(/Save/i);

        userEvent.type(firstnameField, "David");
        userEvent.type(lastnameField, 'Kaminski');
        userEvent.type(birthdayField, '1995-03-06');
        userEvent.selectOptions(userTypeField, 'InActive');
        userEvent.type(userInActivityField, '1995-03-06');
        userEvent.click(saveButton);

        expect(saveUserForm).toHaveBeenCalled();
        expect(saveUserForm).toHaveBeenCalledWith( {
            firstname: "David", 
            lastname: "Kaminski", 
            birthDay: "1995-03-06", 
            userType: "InActive",
            inActivityDate: "1995-03-06"
        })
    })
})
