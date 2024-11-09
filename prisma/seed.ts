import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const roles = ['superadmin', 'admin', 'partner', 'member'];
  roles.forEach(async (role) => {
    const roleExists = await prisma.role.findFirst({
      where: {
        name: role,
      },
    });
    if (!roleExists) {
      await prisma.role.create({
        data: { name: role },
      });
    }
  });
  const hashPassword = await bcrypt.hash('pass1234', 12);
  const role = await prisma.role.findFirst({ where: { name: 'superadmin' } });
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
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
