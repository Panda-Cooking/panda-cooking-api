"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipesPacthSchema = exports.recipesSchemaResponse = exports.recipesSchema = void 0;
const yup = __importStar(require("yup"));
const recipesSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    time: yup.string().required(),
    portions: yup.number().required(),
    imagesRecipes: yup
        .array()
        .of(yup.object({
        url: yup.string().url().required(),
    }))
        .required(),
    ingredients: yup
        .array()
        .of(yup.object({
        amount: yup.string().required(),
        name: yup.string().required(),
    }))
        .required(),
    preparations: yup
        .array()
        .of(yup.object({
        description: yup.string().required(),
    }))
        .required(),
});
exports.recipesSchema = recipesSchema;
const recipesPacthSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
    category: yup.string(),
    time: yup.string(),
    portions: yup.number(),
});
exports.recipesPacthSchema = recipesPacthSchema;
const recipesSchemaResponse = yup.object({
    preparations: yup
        .array()
        .of(yup.object({
        description: yup.string().required(),
    }))
        .required(),
    ingredients: yup
        .array()
        .of(yup.object({
        amount: yup.string().required(),
        name: yup.string().required(),
    }))
        .required(),
    imagesRecipes: yup
        .array()
        .of(yup.object({
        url: yup.string().required(),
    }))
        .required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        imageProfile: yup.string().required(),
        isAdm: yup.boolean().required(),
    }),
    portions: yup.number().required(),
    time: yup.string().required(),
    category: yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
    }),
    description: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.recipesSchemaResponse = recipesSchemaResponse;
