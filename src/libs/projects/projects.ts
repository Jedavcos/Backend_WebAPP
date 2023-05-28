export interface IProject{
    _id?: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const newProject: IProject = {
    name: '',
    description: '',
    isActive: false
};

const memoryProjects: IProject[] = [];
let createdProjects = 0;

export const createProjects = async (projects: IProject) => {
    const newProject = {...projects };
    newProject._id = (++createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updatedAt = newProject.createdAt;
    memoryProjects.push(newProject);
    return newProject;
}

/*export const updateProjects = async ( id:string, project: Partial<IProject>) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if(index === -1) throw new Error('Project not found');
    memoryProjects[index] = {...memoryProjects[index], ...project,
    updatedAt: new Date()}
    return memoryProjects[index];
}

export const deleteProjects = ( id:string) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if(index === -1) throw new Error('Project not found');
    memoryProjects.splice(index, 1);
    return true;
}*/

/*---------------------------Los del inge--------------------------------*/


export const updateProject = ( id:string, project:Partial<IProject>) => {
  /* Obtenemos el indice del proyecto basados en el id,
si obtenemos un -1 es que no encontró ninguna coincidencia
el méotodo findIndex utiliza una función donde se compara un parametro con el
valor del objecto que se esta iterando, si se evalua la comparación en verdadero,
se asigna el indice del objeto iterado.
*/
  const index = memoryProjects.findIndex(p => p._id === id);
  if (index === -1) throw new Error('Project not found');
// Usamos <<< spread operators ...variable >>> para extraer todas las llaves de un objeto con sus valores
// en este caso se destructura el projecto en el indice, el valor pasado desde el que
// llama la función y un atributo para actualizar la fecha de actualización,
// los atributos similares van sobreescribiendo los atributos ya asignados por tanto
// los atributos de memoryProjects[index] son sobreescritos con los atributos de project
// y el atributo updatedAt se sobreescribe con el nuevo Date.
  memoryProjects[index] = { ...memoryProjects[index], ...project, updatedAt: new Date() };
  return memoryProjects[index];
}

export const deleteProject = (id:string) => {
  const index = memoryProjects.findIndex(p => p._id === id);//Buscamos el indice para poder eliminarlo
  if (index === -1) throw new Error('Project not found');
  memoryProjects.splice(index, 1);
  return true;
}

export const getProjects = async () => {//consigue todos los métodos
    return memoryProjects;
};

export const getProject = async (id:string) => {//Encuentra por id
    const project = memoryProjects.find(p => p._id === id);//BUscamos el indice para acceder al valor 
    //El find es un arrreglo, tiene varios métodos que permiten recorrer por cada elemento y mandar los valores como parametros
    //Lambdas en otros lenguajes, a esta variable p apunta al elemento del arreglo que está iterando (current item), y luego esto devolverá verdadero o falso
    
    //Cuando encuentre el primero que coincida lo asigna al proyecto, sino encuentra a ninguno el proyecto queda nulo. 
    if(!project) throw new Error('Project not found');//Si el proyecto es nulo tiramos el error, y si no devolvemos el proyecto encontrado

    return project;
};

