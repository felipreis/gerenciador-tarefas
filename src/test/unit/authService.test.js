import { jest } from '@jest/globals';

jest.unstable_mockModule('../../repositoires/UserRepository.js', () => ({
    default: {
        getByEmail: jest.fn(),
    },
}));

jest.unstable_mockModule('bcryptjs', () => ({
    default: {
        compare: jest.fn(),
    }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: jest.fn(),
    },
}));


const { default: jwt } = await import('jsonwebtoken')
const { default: bcrypt } = await import('bcryptjs');
const { default: UserRepository } = await import('../../repositoires/UserRepository.js');
const { default: AuthService } = await import('../../service/AuthService.js');

describe('AuthService.login', () => {

    it('deve lançar erro quando usuário não existe', async () => {
        // Arrange — simula que o banco não encontrou ninguém
        UserRepository.getByEmail.mockResolvedValue(null);

        // Act + Assert — verifica que a função lança o erro esperado
        await expect(
            AuthService.login('felipe@email.com', '123456')
        ).rejects.toThrow('Usuário ou senha inválidos');
    });

    it('deve lançar erro quando senha esta errada', async () => {
        // Arrange — simula que o usuario esta som senha errada
        UserRepository.getByEmail.mockResolvedValue({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'
        });

        bcrypt.compare.mockResolvedValue(false);

        // Act + Assert — verifica que a função lança o erro esperado
        await expect(AuthService.login('felipe@email.com', 'senhaErrada')).rejects.toThrow('Usuário ou senha inválidos.');
    });


    it('deve retornar um token quando login for realizado com sucesso', async () => {
        // Arrange — simula que o banco não encontrou login e credencias estão certas
        UserRepository.getByEmail.mockResolvedValue({
            id: 1,
            name: 'Felipe',
            email: 'felipe@email.com',
            password: 'hash_da_senha'
        });

        bcrypt.compare.mockResolvedValue(true);

        jwt.sign.mockReturnValue('token-falso');

        //ACT
        const token = await AuthService.login('felipe@email.com','123456');

        //Assert — verifica que a função lança esperado
        expect(token).toBe('token-falso')

    });


});



