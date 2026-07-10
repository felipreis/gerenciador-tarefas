import { expect, jest } from '@jest/globals';


jest.unstable_mockModule('../../repositoires/ProjectRepository.js', () => ({
    default: {
        create: jest.fn(),
        getAllProjects: jest.fn(),
        getProjectById: jest.fn(),
        updateProject: jest.fn(),
        deleteProjects: jest.fn()
    },
}));

const { default: ProjectRepository } = await import('../../repositoires/ProjectRepository');
const { default: ProjectService } = await import ('../../service/ProjectService')

beforeEach(() => {
    jest.clearAllMocks();
});

describe('ProjectService.create', () => {

    it('deve criar um projeto com sucesso', async () => {
        //mock do repository
        ProjectRepository.create.mockResolvedValue({
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        })

        const project = await ProjectService.create({
            name:"Projeto 01",
            description: "projeto 01 teste jest"},1)

        expect(project).toEqual({
            name:"Projeto 01",
            description: "projeto 01 teste jest",
            userId: 1
        })

        //certifica que o userId foi inserido antes de chamar o repository
        expect(ProjectRepository.create).toHaveBeenCalledWith({
            name: 'Projeto 01',
            description: 'projeto 01 teste jest',
            userId: 1
        });
    })

    it('deve propagar erro quando repository falhar', async () => {
       
        //mock do repository
        ProjectRepository.create.mockRejectedValue( new Error('erro ao criar projeto') )

        await expect(ProjectService.create({
            name:"Projeto 01",
            description: "projeto 01 teste jest"},1)).rejects.toThrow('erro ao criar projeto')

        //certifica que o userId foi inserido antes de chamar o repository
        expect(ProjectRepository.create).toHaveBeenCalledWith({
            name: 'Projeto 01',
            description: 'projeto 01 teste jest',
            userId: 1
        });
    })

})


describe('ProjectService.getAllProjects', () => {

    it('deve retornar todos projetos do usuário', async () => {

        ProjectRepository.getAllProjects.mockResolvedValue([{
            name:"p01",
            description:"d01",
            userId:2,
        },
        {
            name:"p02",
            description:"d02",
            userId:2,
        },
        {
            name:"p03",
            description:"d03",
            userId:2,
        }
        ])
        
        const projects = await ProjectService.getAllProjects(2);

        expect(projects).toEqual([{
            name:"p01",
            description:"d01",
            userId:2,
        },
        {
            name:"p02",
            description:"d02",
            userId:2,
        },
        {
            name:"p03",
            description:"d03",
            userId:2,
        }
        ])

        expect(ProjectRepository.getAllProjects).toHaveBeenCalledWith(2);

    })


    it('deve propagar erro do repository', async () => {

        ProjectRepository.getAllProjects.mockRejectedValue(
            new Error('erro ao buscar projetos')
        )

        await expect(ProjectService.getAllProjects(2)).rejects.toThrow('erro ao buscar projetos')


    })

})


describe('ProjectService.getProjectById', () => {

    it('projeto não existe.', async () => {

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(ProjectService.getProjectById(1,1)).rejects.toThrow('Projeto não encontrado');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1);

    })

    it('projeto pertence a outro usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        await expect(ProjectService.getProjectById(2,2)).rejects.toThrow('Não é possível acessar esse projeto');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(2);
    })

    it('retorna o projeto quando pertence ao usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        const project = await ProjectService.getProjectById(1,1);

        expect(project).toEqual({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        })

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1);

    })
})

describe('ProjectService.getProjectById', () => {

    it('projeto não existe.', async () => {

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(ProjectService.getProjectById(1,1)).rejects.toThrow('Projeto não encontrado');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1);

    })

    it('projeto pertence a outro usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        await expect(ProjectService.getProjectById(2,2)).rejects.toThrow('Não é possível acessar esse projeto');

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(2);
    })

    it('retorna o projeto quando pertence ao usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        const project = await ProjectService.getProjectById(1,1);

        expect(project).toEqual({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        })

        expect(ProjectRepository.getProjectById).toHaveBeenCalledWith(1);

    })
})


describe('ProjectService.updateProject', () => {

    it('projeto não existe.', async () => {

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(ProjectService.updateProject(1,1,{})).rejects.toThrow('Projeto não encontrado');

        //garante que não foi chamado o update no repository
        expect(ProjectRepository.updateProject).not.toHaveBeenCalled();

    })

    it('projeto pertence a outro usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        await expect(ProjectService.updateProject(2,2,{})).rejects.toThrow('Não é possível acessar esse projeto');

        //garante que não foi chamado o update no repository
        expect(ProjectRepository.updateProject).not.toHaveBeenCalled();
    })

    it('atualiza projeto com sucesso.', async () => {
        
        ProjectRepository.getProjectById.mockResolvedValue({
            id:1,
            name:"p01",
            description:"d01",
            userId:1
        })

        ProjectRepository.updateProject.mockResolvedValue({
            id:1,
            name:"p01",
            description:"d01 - atualizado",
            userId:1
        });

        const projectUpdate = await ProjectService.updateProject(1,1,{
            description: "d01 - atualizado"
        });

        expect(projectUpdate).toEqual({
            id:1,
            name:"p01",
            description:"d01 - atualizado",
            userId:1
        })

        expect(ProjectRepository.updateProject).toHaveBeenCalledWith(1, {
            description: "d01 - atualizado"
        });

    })
})

describe('ProjectService.deleteProjects', () => {

    it('projeto não existe.', async () => {

        ProjectRepository.getProjectById.mockResolvedValue(null);

        await expect(ProjectService.deleteProjects(1,1)).rejects.toThrow('Projeto não encontrado');

        //garante que não foi chamado o update no repository
        expect(ProjectRepository.deleteProjects).not.toHaveBeenCalled();

    })

    it('projeto pertence a outro usuário.', async () => {
        ProjectRepository.getProjectById.mockResolvedValue({
            projectId:1,
            name:"p01",
            description:"d01",
            userId:1
        });

        await expect(ProjectService.deleteProjects(2,2)).rejects.toThrow('Não é possível acessar esse projeto');

        //garante que não foi chamado o update no repository
        expect(ProjectRepository.deleteProjects).not.toHaveBeenCalled();
    })

    it('exclui projeto com sucesso.', async () => {
        
        ProjectRepository.getProjectById.mockResolvedValue({
            id:1,
            name:"p01",
            description:"d01",
            userId:1
        })

        ProjectRepository.deleteProjects.mockResolvedValue(true);

        const projectUpdate = await ProjectService.deleteProjects(1,1);

        expect(projectUpdate).toBe(true)

        expect(ProjectRepository.deleteProjects).toHaveBeenCalledWith(1);

    })
})

