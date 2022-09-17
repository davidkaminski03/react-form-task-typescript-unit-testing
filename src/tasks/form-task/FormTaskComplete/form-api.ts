import { Type_SubmitData } from "./@form-types";
export const saveUserForm = (submitData: Type_SubmitData) =>
    new Promise((f) => {
        setTimeout(f, 1000);
    })
    .then(() => {
        console.log("Form is called", submitData);
        console.log('Form is saved');
    });