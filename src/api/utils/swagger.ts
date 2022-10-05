import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cryptochain API Docs',
      version: '1.0.0',
      description: `An exploration of blockchain concepts inspired by the fine course
[Build a Blockchain & Cryptocurrency | Full-Stack Edition](https://www.udemy.com/course/build-blockchain-full-stack)
by [David Joseph Katz](https://www.udemy.com/user/54cd8dd54e49b/)

Way, way over-engineered by [Me](https://www.linkedin.com/in/tgoshinski/)`,
    },
  },
  apis: ['./src/@interfaces/**/*.ts', './src/@types/**/*.ts', './src/api/routes.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
