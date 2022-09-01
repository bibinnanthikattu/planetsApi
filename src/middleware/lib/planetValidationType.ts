import { Static, Type } from '@sinclair/typebox';
import { type } from 'os';

export const planetSchema = Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    diameter: Type.Integer(),
    moon: Type.Integer()
}, { additionalProperties: false });

export type planetData = Static<typeof planetSchema>

export * from './planetValidationType'