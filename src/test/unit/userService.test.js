import { describe, expect, jest } from '@jest/globals';

jest.unstable_mockModule('../../repositoires/UserRepository.js', () => ({
    default: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            getByEmail: jest.fn(),
    },
}));

jest.unstable_mockModule('bcryptjs', () => ({
    default: {
        compare: jest.fn(),
        hash:jest.fn()
    }
}));

const { default: UserRepository } = await import('../../repositoires/UserRepository.js');
const { default: UserService } = await import('../../service/UserService.js');
const { default: bcrypt } = await import('bcryptjs');

beforeEach(() => {
    jest.clearAllMocks();
});


/*
UserService.getAll
├── deve retornar todos os usuários
└── deve lançar erro quando o repository falhar (opcional)
*/

describe('UserService.getAll', () =>{

    it('deve retornar todos os usuários', async ()=>{
        //Arange - simular o que o repository vai trazer do banco
        UserRepository.getAll.mockResolvedValue([
            {
                id:1,
                name:"Felipe"
            },
            {
                id:2,
                name:"Maria"
            }
        ] )

        //Act + Assert

        const users = await UserService.getAll();

        expect(users).toEqual([
            {
                id:1,
                name:"Felipe"
            },
            {
                id:2,
                name:"Maria"
            }
        ])

    })
})

//UserService.getById --> canario1: id não encontrado cenario 2: id encontrado 

describe('UserService.getById',() => {
    
    it('deve retornar null quando usuário não é encontrado', async () => {
        //Arrange - simula o que o respotisory vai trazer
        UserRepository.getById.mockResolvedValue(null);

        //Act
        const user = await UserService.getById(2);

        //Arrange
        await expect(user).toBeNull();
    })

    it('deve retornar o usuário encontrado', async () => {
        //Arrange - simula o que o respotisory vai trazer
        UserRepository.getById.mockResolvedValue({
            name:"Felipe",
            email:"felipe@gmail.com",
            password: "senha"
        });

        //Act
        const user = await UserService.getById(1)

        //Assert
        expect(user).toEqual({
            name:"Felipe",
            email:"felipe@gmail.com",
            password: "senha"
        })
    })


})

//UserService.create ---> camada de autenticação (canario1: body incorereto 2: id usuário criado)

describe('UserService.create', () => {

    it('deve retornar usuário criado', async () => {
        //Arrange - o que o repository vai retornar do banco
        UserRepository.create.mockResolvedValue({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'           
        })

        bcrypt.hash.mockResolvedValue('hash_da_senha')

        const user = await UserService.create({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'senha'           
        })

        expect(user).toEqual({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'           
        })

        expect(bcrypt.hash).toHaveBeenCalledWith('senha', 10);

        expect(UserRepository.create).toHaveBeenCalledWith({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'
        });

    })

    it('deve propagar erro quando bcrypt falhar', async () => {

        //Arrange
        bcrypt.hash.mockRejectedValue(new Error('Erro ao criptografar senha'))

        await expect(UserService.create({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'
        })).rejects.toThrow('Erro ao criptografar senha');
        
        expect(UserRepository.create).not.toHaveBeenCalled();
    })

    it('erro ao salvar no banco', async () => {

        //Arrange
        UserRepository.create.mockRejectedValue(new Error('Erro ao salvar no banco'))
        bcrypt.hash.mockResolvedValue('hash_da_senha')

        await expect(UserService.create({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'senha'
        })).rejects.toThrow('Erro ao salvar no banco');

        expect(bcrypt.hash).toHaveBeenCalledWith('senha', 10);
    })

})

//UserService.getByEmail ---> (canario1: body incorereto 2: id usuário criado) 

describe('UserService.getByEmail',() => {
    
    it('deve retornar null quando usuário não é encontrado', async () => {
        //Arrange - simula o que o respotisory vai trazer
        UserRepository.getByEmail.mockResolvedValue(null);

        //Act
        const user = await UserService.getByEmail("teste@gmail.com");

        //Assert
        expect(user).toBeNull();

        expect(UserRepository.getByEmail).toHaveBeenCalledWith("teste@gmail.com");
    })

    it('deve retornar o usuário encontrado', async () => {
        //Arrange - simula o que o respotisory vai trazer
        UserRepository.getByEmail.mockResolvedValue({
            name:"Felipe",
            email:"felipe@gmail.com",
            password: "senha"
        });

        //Act
        const user = await UserService.getByEmail("felipe@gmail.com")

        //Assert
        expect(user).toEqual({
            name:"Felipe",
            email:"felipe@gmail.com",
            password: "senha"
        })

        expect(UserRepository.getByEmail).toHaveBeenCalledWith("felipe@gmail.com");
    })


})