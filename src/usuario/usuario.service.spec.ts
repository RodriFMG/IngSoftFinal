import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaClient } from '@prisma/client';
import { UsuarioDto } from './dto/create-usuario.dto';
import { plainToInstance } from 'class-transformer';



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

  describe('create', () => {
    it('should create a new user', async () => {

      const createUsuarioDto = { alias: 'testAlias', nombre: 'Test User' };
      const usuarioDto_ = plainToInstance(UsuarioDto, createUsuarioDto);
      const mockCreatedUser = {
        id: 1,
        alias: 'testAlias',
        nombre: 'Test User',
        createdAt: new Date(),
      };

      mockPrismaClient.usuario.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(usuarioDto_);

      expect(result).toEqual({
        id: mockCreatedUser.id,
        alias: mockCreatedUser.alias,
        nombre: mockCreatedUser.nombre,
        DateCreated: mockCreatedUser.createdAt,
      });
      expect(mockPrismaClient.usuario.create).toHaveBeenCalledWith({
        data: createUsuarioDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, alias: 'user1', nombre: 'User One', createdAt: new Date() },
        { id: 2, alias: 'user2', nombre: 'User Two', createdAt: new Date() },
      ];

      mockPrismaClient.usuario.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(
          mockUsers.map(user => ({
            id: user.id,
            alias: user.alias,
            nombre: user.nombre,
            DateCreated: user.createdAt,
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
        createdAt: new Date(),
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
        createdAt: new Date(),
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
        createdAt: new Date(),
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