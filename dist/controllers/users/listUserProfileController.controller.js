"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserProfileController = void 0;
const listUserProfileService_service_1 = require("../../services/users/listUserProfileService.service");
const listUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield (0, listUserProfileService_service_1.listUserProfileService)(req.userId);
    return res.json(userProfile);
});
exports.listUserProfileController = listUserProfileController;
