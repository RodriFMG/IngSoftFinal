import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaClient } from '@prisma/client';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockPrismaClient = {
    usuario: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: PrismaClient, useValue: mockPrismaClient },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const mockDate = new Date('2024-12-04T03:00:12.065Z');
    it('should return all users', async () => {
      const mockDate = new Date('2024-12-04T03:00:12.065Z');
      const mockUsers = [
        { id: 1, alias: 'user1', nombre: 'User One', createdAt: mockDate },
        { id: 2, alias: 'user2', nombre: 'User Two', createdAt: mockDate },
      ];

      mockPrismaClient.usuario.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(
          mockUsers.map(user => ({
            id: user.id,
            alias: user.alias,
            nombre: user.nombre,
            DateCreated:mockDate,
          })),
      );
      expect(mockPrismaClient.usuario.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const id = 1;
      const mockUser = {
        id,
        alias: 'user1',
        nombre: 'User One',
        createdAt: new Date('2024-12-04T03:00:12.065Z'),
      };

      mockPrismaClient.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(id);

      expect(result).toEqual({
        id: mockUser.id,
        alias: mockUser.alias,
        nombre: mockUser.nombre,
        DateCreated: mockUser.createdAt,
      });
      expect(mockPrismaClient.usuario.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return undefined if user not found', async () => {
      const id = 1;

      mockPrismaClient.usuario.findUnique.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(result).toBeUndefined();
      expect(mockPrismaClient.usuario.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const id = 1;
      const updateUsuarioDto = { alias: 'updatedAlias', nombre: 'Updated User' };
      const mockUpdatedUser = {
        id,
        alias: 'updatedAlias',
        nombre: 'Updated User',
        createdAt: new Date('2024-12-04T03:00:12.065Z'),
      };

      mockPrismaClient.usuario.update.mockResolvedValue(mockUpdatedUser);

      const result = await service.update(id, updateUsuarioDto);

      expect(result).toEqual({
        alias: mockUpdatedUser.alias,
        nombre: mockUpdatedUser.nombre,
      });
      expect(mockPrismaClient.usuario.update).toHaveBeenCalledWith({
        where: { id },
        data: updateUsuarioDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const id = 1;
      const mockDeletedUser = {
        id,
        alias: 'user1',
        nombre: 'User One',
        createdAt: new Date('2024-12-04T03:00:12.065Z'),
      };

      mockPrismaClient.usuario.delete.mockResolvedValue(mockDeletedUser);

      const result = await service.remove(id);

      expect(result).toEqual({
        id: mockDeletedUser.id,
        alias: mockDeletedUser.alias,
        nombre: mockDeletedUser.nombre,
        DateCreated: mockDeletedUser.createdAt,
      });
      expect(mockPrismaClient.usuario.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});