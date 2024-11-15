import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function userMain() {
  //   const roles = ['superadmin', 'admin', 'agent', 'student'];
  await prisma.role.createMany({
    data: [
      { name: 'superadmin' },
      { name: 'admin' },
      { name: 'agent' },
      { name: 'student' },
    ],
    skipDuplicates: true,
  });
  //   roles.forEach(async (role) => {
  //     const roleExists = await prisma.role.findFirst({
  //       where: {
  //         name: role,
  //       },
  //     });
  //     if (!roleExists) {
  //       await prisma.role.create({
  //         data: { name: role },
  //       });
  //     }
  //   });
  const hashPassword = await bcrypt.hash('P@ss1234', 12);
  const role = await prisma.role.findFirst({ where: { name: 'superadmin' } });
  const user = await prisma.user.findFirst({
    where: { email: 'superadmin@mail.com' },
  });
  if (!user) {
    await prisma.user.create({
      data: {
        name: 'superadmin',
        email: 'superadmin@mail.com',
        password: hashPassword,
        isActive: true,
        userRole: {
          create: {
            roleId: (await role).id,
          },
        },
      },
    });
  }
}
userMain()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function locationMain() {
  const locations = [
    { name: 'Toronto', address: 'Toronto', shortName: 'T' },
    { name: 'London', address: 'London', shortName: 'L' },
    { name: 'Scarborough', address: 'Scarborough', shortName: 'S' },
  ];
  locations.forEach(async ({ name, address, shortName }) => {
    const locationExists = await prisma.locations.findFirst({
      where: {
        name,
      },
    });
    if (!locationExists) {
      await prisma.locations.create({
        data: {
          name,
          address,
          shortName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toDateString(),
        },
      });
    }
  });
}
locationMain()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
