type FormData = {
    id: string;
  }
export const saveFormData = (formData: FormData[]): void => {
    localStorage.setItem('formData', JSON.stringify(formData));
  };
  
export const getFormData = (): FormData[] => {
    const formDataJSON = localStorage.getItem('formData');
    return formDataJSON ? JSON.parse(formDataJSON) : [];
  };
  
  export const deleteFormData = (id: string): void => {
    const formData = getFormData();
    const updatedFormData = formData.filter(data => data.id !== id);
    saveFormData(updatedFormData);
  };

  