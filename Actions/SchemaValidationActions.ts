import { validateSchema } from 'playwright-schema-validator';



export function validateSchemaWithFile(context: any, responseBody: any, schemaPath: string) {
    return validateSchema(context, responseBody, { path: schemaPath });
};

export function validateSchemaWithObject(context: any, responseBody: any, schemaObject: any) {
    return validateSchema(context, responseBody, { schema: schemaObject });
};