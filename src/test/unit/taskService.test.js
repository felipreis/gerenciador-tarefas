import { describe, expect, jest } from '@jest/globals';

jest.unstable_mockModule('../../repositoires/TaskRepository.js', () => ({
    default: {
        create: jest.fn(),
        getAllTask: jest.fn(),
        getTaskById: jest.fn(),
        updateTask: jest.fn(),
        deleteTask: jest.fn(),
        countByUser: jest.fn(),
        countByStatus: jest.fn(),
    },
}));

jest.unstable_mockModule('../../repositoires/ProjectRepository.js', () => ({
    default: {
        getProjectById: jest.fn(),
    },
}));

const { default: TaskRepository } = await import('../../repositoires/TaskRepository');
const { default: TaskService } = await import ('../../service/TaskService')
const { default: ProjectRepository } = await import('../../repositoires/ProjectRepository');

beforeEach(() => {
    jest.clearAllMocks();
});


describe('TaskService.create', ()  => {

    it('deve lançar erro quando projeto não existe', async () => {

        //arrange
        ProjectRepository.getProjectById.mockResolvedValue(null);

        const payload = {
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        }

        await expect(TaskService.create(payload,3)).rejects.toThrow('Projeto não encontrado')

        expect(TaskRepository.create).not.toHaveBeenCalled();

    })

    it('deve propagar erro do repository', async () => {

        //arrange
        ProjectRepository.getProjectById.mockResolvedValue({
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        })

        TaskRepository.create.mockRejectedValue( new Error ('Erro ao criar Tarefa'))

        const payload = {
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        }

        await expect(TaskService.create(payload,1)).rejects.toThrow('Erro ao criar Tarefa')

        expect(TaskRepository.create).toHaveBeenCalledWith({
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        });

    })


    it('deve lançar erro quando projeto pertence a outro usuário', async () => {

        //arrange
        ProjectRepository.getProjectById.mockResolvedValue({
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        })

        const payload = {
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        }

        await expect(TaskService.create(payload,3)).rejects.toThrow('Não é possível criar tarefa')

        expect(TaskRepository.create).not.toHaveBeenCalled();

    })

    it('deve criar tarefa com sucesso', async () => {

        //arrange
        ProjectRepository.getProjectById.mockResolvedValue({
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        })

        TaskRepository.create.mockResolvedValue({
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        })

        const payload = {
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        }

        const task = await TaskService.create(payload,1)

        expect(task).toEqual({
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        })

        expect(TaskRepository.create).toHaveBeenCalledWith({
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
        });

    })

})

describe('TaskService.getTaskById', () => {

    it('tarefa não encontrada', async () => {

        TaskRepository.getTaskById.mockResolvedValue(null);

        await expect(TaskService.getTaskById(1,2)).rejects.toThrow('Tarefa não encontrada');

        expect(ProjectRepository.getProjectById).not.toHaveBeenCalled()

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(2)

    })

    it('Projeto não encontrado', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(TaskService.getTaskById(1,1)).rejects.toThrow('Projeto não encontrado');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

    })

    it('Projeto pertence a outro usuário', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 2
        });

        await expect(TaskService.getTaskById(1,1)).rejects.toThrow('Não é possível acessar tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('Retorna tarefa', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        });

        const task = await TaskService.getTaskById(1,1)

        expect(task).toEqual({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('propaga erro do repository', async () => {

        TaskRepository.getTaskById.mockRejectedValue(new Error ('Não foi possível encontrar tarefa'));

        expect(TaskRepository.getTaskById(1)).rejects.toThrow('Não foi possível encontrar tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).not.toHaveBeenCalled()

    })

})


/*

├── atualiza tarefa
└── erro do repository
 */

describe('TaskService.updateTask', () => {

    it('tarefa não encontrada', async () => {

        TaskRepository.getTaskById.mockResolvedValue(null);

        await expect(TaskService.updateTask(1,2,{status: "complete"})).rejects.toThrow('Tarefa não encontrada');

        expect(ProjectRepository.getProjectById).not.toHaveBeenCalled()

        expect(TaskRepository.updateTask).not.toHaveBeenCalled()

    })

    it('Projeto não encontrado', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(TaskService.updateTask(1,1,{status: "complete"})).rejects.toThrow('Projeto não encontrado');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

        expect(TaskRepository.updateTask).not.toHaveBeenCalledWith()

    })

    it('Projeto pertence a outro usuário', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 2
        });

        await expect(TaskService.updateTask(1,1,{status: "complete"})).rejects.toThrow('Não é possível alterar a tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('Atualiza tarefa', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        });

        TaskRepository.updateTask.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "completed",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        })

        const task = await TaskService.updateTask(1,1,{status: "completed"})

        expect(task).toEqual({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "completed",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('propaga erro do repository', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        });

        TaskRepository.updateTask.mockRejectedValue(new Error ('Não foi possível alterar tarefa'));

        await expect(TaskService.updateTask(1,1,{status: "complete"})).rejects.toThrow('Não foi possível alterar tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

})

/**TaskService.deleteTask
├── tarefa não encontrada
├── projeto não encontrado
├── projeto pertence a outro usuário
├── exclui tarefa
└── erro do repository */

describe('TaskService.deleteTask', () => {

    it('tarefa não encontrada', async () => {

        TaskRepository.getTaskById.mockResolvedValue(null);

        await expect(TaskService.deleteTask(1,2)).rejects.toThrow('Tarefa não encontrada');

        expect(ProjectRepository.getProjectById).not.toHaveBeenCalled()

        expect(TaskRepository.deleteTask).not.toHaveBeenCalled()

    })

    it('Projeto não encontrado', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(TaskService.deleteTask(1,1)).rejects.toThrow('Projeto não encontrado');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

        expect(TaskRepository.deleteTask).not.toHaveBeenCalledWith()

    })

    it('Projeto pertence a outro usuário', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 2
        });

        await expect(TaskService.deleteTask(1,1)).rejects.toThrow('Não é possível deletar a tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('Exclui tarefa', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        });

        TaskRepository.deleteTask.mockResolvedValue("Tarefa deletada")

        const deletedTask = await TaskService.deleteTask(1,1)

        expect(deletedTask).toBe("Tarefa deletada");

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

    it('propaga erro do repository', async () => {

        TaskRepository.getTaskById.mockResolvedValue({
            id:1,
            projectId:1,
            title:"task",
            description: "d task",
            status: "pending",
            priority: "low",
            dueDate: "01/01/01",
            userId:1
        });

        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        });

        TaskRepository.deleteTask.mockRejectedValue(new Error ('Não foi possível deletar a tarefa'));

        await expect(TaskService.deleteTask(1,1)).rejects.toThrow('Não foi possível deletar a tarefa');

        expect(TaskRepository.getTaskById).toHaveBeenCalledWith(1)

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1)

    })

})