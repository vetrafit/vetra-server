import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './user.dto';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService, // Mock Prisma
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //  Helper function for timestamps
  const now = () => ({ createdAt: new Date(), updatedAt: new Date() });

  const mockUsers = [
    {
      id: '1',
      email: 'test1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      superAdmin: false,
      ...now(),
    },
    {
      id: '2',
      email: 'test2@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      superAdmin: false,
      ...now(),
    },
  ];

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    superAdmin: false,
    ...now(),
  };

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  //Test List
  it('should return all users', async () => {
    (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const users = await userService.list();

    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
  });

  //Test GetOne
  it('should return one user', async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const user = await userService.getOne('1');

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(user).toEqual(mockUser);
  });

  //Test Create
  it('should create a user', async () => {
    const mockCreateUser: CreateUserDTO = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      superAdmin: false,
    };

    const createdUser = { id: 'clerk_123', ...mockCreateUser, ...now() };

    (prismaService.user.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await userService.create('clerk_123', mockCreateUser);

    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: { id: 'clerk_123', ...mockCreateUser },
    });

    expect(result).toEqual(createdUser);
  });
});
