const url = "https://script.google.com/macros/s/AKfycbwWVyGBVtenMuNJykrihQuucFiB5J-pBiFuWmICLBxQZFdZZ_df_RGx9fNB3tr4Xfmn/exec";

export async function submitRegistration(data) {
    const form = new FormData();

    for(const key in data){
        form.append(key, data[key]);
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: form,
        });

        if(!response.ok) {
            throw new Error("Error al enviar el registro");
        }

        return await response.json();
    } catch (error) {
        console.error("submitRegistration error:", error);
        throw error;
    }
}

export async function checkDuplicate(nombre) {
    try {
        const response = await fetch(`${url}?checkStudent=${encodeURIComponent(nombre)}`);

        if(!response.ok) {
            throw new Error("Alumno ya registrado");
        }

        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error("checkDuplicate error:", error);
        return false;
    }

    
}

export async function getStudents() {
const response = await fetch(`${url}?listStudents=true`);
const data = await response.json();
return data.students || [];    
}


export async function deleteStudent(nombre){
    const response = await fetch(`${url}?nombre=${encodeURIComponent(nombre)}`, {
        method: "DELETE",
    });
    return response.json();
}

export async function fetchStudents() {
  const response = await fetch(`${url}?listStudents=true`);
  const data = await response.json();
  return data.students || [];
}